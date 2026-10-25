-- =========================================================================
-- DATABASE SCHEMA: Vasudev Saras K M - Portfolio Studio (Supabase)
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    short_description TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('published', 'draft', 'archived')),
    project_state TEXT NOT NULL CHECK (project_state IN ('Completed', 'In Development', 'Prototype Validated', 'Research / Concept')),
    cover_image TEXT NOT NULL,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    technologies TEXT[] DEFAULT '{}',
    problem_statement TEXT,
    design_process TEXT,
    hardware_software_architecture TEXT,
    personal_contribution TEXT,
    challenges_and_solutions JSONB DEFAULT '[]'::jsonb,
    results TEXT,
    lessons_learned TEXT,
    source_code_url TEXT,
    demo_url TEXT,
    documentation_url TEXT,
    specifications JSONB DEFAULT '{}'::jsonb,
    is_featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Certifications Table
CREATE TABLE IF NOT EXISTS public.certifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    issuing_organization TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    expiry_date TEXT,
    verification_url TEXT,
    credential_id TEXT,
    certificate_file_url TEXT,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Experiments Table
CREATE TABLE IF NOT EXISTS public.experiments (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    summary TEXT NOT NULL,
    technical_details TEXT NOT NULL,
    media_url TEXT,
    tags TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    level TEXT,
    tools TEXT[] DEFAULT '{}',
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Milestones Table
CREATE TABLE IF NOT EXISTS public.milestones (
    id TEXT PRIMARY KEY,
    year TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    organization TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    highlights TEXT[] DEFAULT '{}',
    category TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Profile Table
CREATE TABLE IF NOT EXISTS public.profile (
    id TEXT PRIMARY KEY DEFAULT 'main',
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    college TEXT NOT NULL,
    degree TEXT NOT NULL,
    headline TEXT NOT NULL,
    introduction TEXT NOT NULL,
    about_bio TEXT NOT NULL,
    public_email TEXT NOT NULL,
    github_url TEXT NOT NULL,
    linkedin_url TEXT NOT NULL,
    resume_url TEXT DEFAULT '',
    profile_image_url TEXT DEFAULT '',
    location TEXT NOT NULL,
    status_indicator TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'main',
    site_title TEXT NOT NULL,
    meta_description TEXT NOT NULL,
    show_certifications BOOLEAN DEFAULT true,
    show_experiments BOOLEAN DEFAULT true,
    show_milestones BOOLEAN DEFAULT true,
    show_system_architecture BOOLEAN DEFAULT true,
    enable_hero_animations BOOLEAN DEFAULT true,
    github_repo_url TEXT DEFAULT 'https://github.com/thecrazydabi/Portfolio',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Media Items Table
CREATE TABLE IF NOT EXISTS public.media_items (
    id TEXT PRIMARY KEY,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    alt_text TEXT,
    category TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;

-- Anonymous public policy: Can ONLY view published records
CREATE POLICY "Public can view published projects" ON public.projects
    FOR SELECT TO anon USING (status = 'published');

CREATE POLICY "Public can view published certs" ON public.certifications
    FOR SELECT TO anon USING (status = 'published');

CREATE POLICY "Public can view published experiments" ON public.experiments
    FOR SELECT TO anon USING (status = 'published');

CREATE POLICY "Public can view all skills" ON public.skills
    FOR SELECT TO anon USING (true);

CREATE POLICY "Public can view all milestones" ON public.milestones
    FOR SELECT TO anon USING (true);

CREATE POLICY "Public can view profile" ON public.profile
    FOR SELECT TO anon USING (true);

CREATE POLICY "Public can view site settings" ON public.site_settings
    FOR SELECT TO anon USING (true);

CREATE POLICY "Public can view media" ON public.media_items
    FOR SELECT TO anon USING (true);

-- Authenticated Administrator Policies: Full access to all CRUD operations
CREATE POLICY "Admin full access projects" ON public.projects
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access certs" ON public.certifications
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access experiments" ON public.experiments
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access skills" ON public.skills
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access milestones" ON public.milestones
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access profile" ON public.profile
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access settings" ON public.site_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access media" ON public.media_items
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage bucket creation for media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can read, only authenticated can upload/delete
CREATE POLICY "Public can view portfolio media" ON storage.objects
    FOR SELECT TO anon USING (bucket_id = 'portfolio-media');

CREATE POLICY "Admin can upload portfolio media" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-media');

CREATE POLICY "Admin can update portfolio media" ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-media');

CREATE POLICY "Admin can delete portfolio media" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'portfolio-media');
