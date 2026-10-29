-- Apply this once in the Supabase SQL Editor to enable opt-in ELIZ chat collection.
CREATE TABLE IF NOT EXISTS public.eliz_chat_samples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    turn_index INTEGER NOT NULL CHECK (turn_index > 0),
    visitor_message TEXT NOT NULL CHECK (char_length(visitor_message) BETWEEN 1 AND 1000),
    eliz_reply TEXT NOT NULL CHECK (char_length(eliz_reply) BETWEEN 1 AND 6000),
    consent_version TEXT NOT NULL CHECK (consent_version = 'eliz-chat-v1'),
    consented_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (session_id, turn_index)
);

ALTER TABLE public.eliz_chat_samples ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Opted-in visitors can submit ELIZ samples" ON public.eliz_chat_samples;
CREATE POLICY "Opted-in visitors can submit ELIZ samples" ON public.eliz_chat_samples
    FOR INSERT TO anon, authenticated
    WITH CHECK (
        consent_version = 'eliz-chat-v1'
        AND char_length(visitor_message) BETWEEN 1 AND 1000
        AND char_length(eliz_reply) BETWEEN 1 AND 6000
        AND turn_index > 0
    );

DROP POLICY IF EXISTS "Authenticated Studio users can review ELIZ samples" ON public.eliz_chat_samples;
CREATE POLICY "Authenticated Studio users can review ELIZ samples" ON public.eliz_chat_samples
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated Studio users can delete ELIZ samples" ON public.eliz_chat_samples;
CREATE POLICY "Authenticated Studio users can delete ELIZ samples" ON public.eliz_chat_samples
    FOR DELETE TO authenticated USING (true);

REVOKE ALL ON public.eliz_chat_samples FROM anon, authenticated;
REVOKE ALL ON public.eliz_chat_samples FROM PUBLIC;
GRANT INSERT ON public.eliz_chat_samples TO anon, authenticated;
GRANT SELECT, DELETE ON public.eliz_chat_samples TO authenticated;
