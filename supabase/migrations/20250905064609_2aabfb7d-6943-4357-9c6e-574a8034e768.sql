-- Create admin_users table for authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'Recruiter',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users
CREATE POLICY "Admin users can view all admin users" 
ON public.admin_users 
FOR SELECT 
USING (true);

CREATE POLICY "Admin users can update all admin users" 
ON public.admin_users 
FOR UPDATE 
USING (true);

CREATE POLICY "Admin users can insert admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (true);

-- Create job_postings table
CREATE TABLE public.job_postings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Full-time', 'Part-time', 'Internship', 'Freelance')),
  location TEXT NOT NULL,
  experience TEXT NOT NULL,
  salary TEXT,
  description TEXT NOT NULL,
  responsibilities TEXT NOT NULL,
  requirements TEXT NOT NULL,
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Active', 'Draft', 'Closed')),
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;

-- Create policies for job_postings
CREATE POLICY "Anyone can view active job postings" 
ON public.job_postings 
FOR SELECT 
USING (status = 'Active' AND is_visible = true);

CREATE POLICY "Admin users can manage all job postings" 
ON public.job_postings 
FOR ALL 
USING (true);

-- Create applicants table
CREATE TABLE public.applicants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.job_postings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  status TEXT NOT NULL DEFAULT 'Applied' CHECK (status IN ('Applied', 'Shortlisted', 'Rejected', 'Interviewed', 'Hired')),
  notes TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;

-- Create policies for applicants
CREATE POLICY "Admin users can manage all applicants" 
ON public.applicants 
FOR ALL 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at
  BEFORE UPDATE ON public.job_postings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applicants_updated_at
  BEFORE UPDATE ON public.applicants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

