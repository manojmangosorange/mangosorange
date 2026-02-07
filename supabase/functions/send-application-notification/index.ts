import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ApplicationNotificationRequest {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  resumeUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicantName, applicantEmail, applicantPhone, resumeUrl }: ApplicationNotificationRequest = await req.json();

    console.log("Received application notification request:", { applicantName, applicantEmail, applicantPhone });

    // Initialize Supabase client for email sending
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Recipients
    const recipients = [
      "sainipulkit902@gmail.com", 
      "info@mangosorange.com",
      "pulkit24@amityonline.com"
    ];

    const emailContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Job Application - MangosOrange</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #495057; }
          .value { margin-top: 5px; }
          .cta-button { 
            display: inline-block; 
            background: #007bff; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; color: #007bff;">New Job Application Received</h1>
            <p style="margin: 10px 0 0 0; color: #6c757d;">MangosOrange Career Portal</p>
          </div>
          
          <div class="content">
            <h2>Applicant Details</h2>
            
            <div class="field">
              <div class="label">Full Name:</div>
              <div class="value">${applicantName}</div>
            </div>
            
            <div class="field">
              <div class="label">Email Address:</div>
              <div class="value">${applicantEmail}</div>
            </div>
            
            <div class="field">
              <div class="label">Phone Number:</div>
              <div class="value">${applicantPhone}</div>
            </div>
            
            <div class="field">
              <div class="label">Resume:</div>
              <div class="value">
                <a href="${resumeUrl}" class="cta-button">Download Resume</a>
              </div>
            </div>
            
            <hr style="margin: 30px 0;">
            
            <p style="color: #6c757d; font-size: 14px;">
              This application was submitted through the MangosOrange careers page. 
              Please review the applicant's details and resume to determine next steps.
            </p>
          </div>
        </div>
      </body>
    </html>
    `;

    // Send email notifications to all recipients
    const emailPromises = recipients.map(async (recipient) => {
      try {
        const { data, error } = await supabase.functions.invoke('send-email', {
          body: {
            to: recipient,
            subject: `New Job Application from ${applicantName}`,
            html: emailContent,
          }
        });

        if (error) {
          console.error(`Error sending email to ${recipient}:`, error);
          return { recipient, success: false, error };
        }

        console.log(`Email sent successfully to ${recipient}:`, data);
        return { recipient, success: true, data };
      } catch (err: any) {
        console.error(`Exception sending email to ${recipient}:`, err);
        return { recipient, success: false, error: err.message };
      }
    });

    const results = await Promise.all(emailPromises);
    const successCount = results.filter(r => r.success).length;
    
    console.log(`Email notification results: ${successCount}/${recipients.length} emails sent successfully`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Application notification sent to ${successCount}/${recipients.length} recipients`,
        results 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-application-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);