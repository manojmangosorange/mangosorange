import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, subject, message }: ContactFormRequest = await req.json();

    console.log("Received contact form submission:", { name, email, subject });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Recipients
    const recipients = [
      "sainipulkit902@gmail.com",
      "info@mangosorange.com"
    ];

    const emailContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission - MangosOrange</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #495057; }
          .value { margin-top: 5px; padding: 10px; background: #f8f9fa; border-radius: 4px; }
          .message-field { background: #fff; border: 1px solid #dee2e6; padding: 15px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; color: #007bff;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; color: #6c757d;">MangosOrange Website</p>
          </div>
          
          <div class="content">
            <h2>Contact Details</h2>
            
            <div class="field">
              <div class="label">Full Name:</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">Phone Number:</div>
              <div class="value">${phone}</div>
            </div>
            
            <div class="field">
              <div class="label">Email Address:</div>
              <div class="value">${email}</div>
            </div>
            
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${subject}</div>
            </div>
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="message-field">${message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <hr style="margin: 30px 0;">
            
            <p style="color: #6c757d; font-size: 14px;">
              This message was submitted through the MangosOrange contact form on ${new Date().toLocaleString()}.
            </p>
          </div>
        </div>
      </body>
    </html>
    `;

    // Send email notifications to all recipients using the existing send-email function
    const emailPromises = recipients.map(async (recipient) => {
      try {
        const { data, error } = await supabase.functions.invoke('send-email', {
          body: {
            to: recipient,
            subject: `Contact Form: ${subject} - from ${name}`,
            html: emailContent,
          }
        });

        if (error) {
          console.error(`Error sending email to ${recipient}:`, error);
          return { recipient, success: false, error };
        }

        console.log(`Contact email sent successfully to ${recipient}:`, data);
        return { recipient, success: true, data };
      } catch (err: any) {
        console.error(`Exception sending email to ${recipient}:`, err);
        return { recipient, success: false, error: err.message };
      }
    });

    const results = await Promise.all(emailPromises);
    const successCount = results.filter(r => r.success).length;
    
    console.log(`Contact email results: ${successCount}/${recipients.length} emails sent successfully`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Contact form submitted successfully. Notification sent to ${successCount}/${recipients.length} recipients`,
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
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);