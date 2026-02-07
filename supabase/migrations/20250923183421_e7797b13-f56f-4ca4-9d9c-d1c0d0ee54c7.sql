-- Allow job_id to be nullable for general interest applications
ALTER TABLE public.applicants ALTER COLUMN job_id DROP NOT NULL;