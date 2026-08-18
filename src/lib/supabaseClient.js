// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Graceful degrade: if the env vars aren't present at BUILD time (e.g. a deploy
// whose platform env didn't inject VITE_SUPABASE_*), do NOT throw here. This
// module is imported by the blog components, and an uncaught throw at module
// load tears down the whole React tree with no error boundary — the page goes
// black and unresponsive the moment BlogSection mounts (mid-homepage scroll).
// Export null instead; consumers detect it and fall back to static content.
let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
    console.warn(
        "[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — " +
            "blog features are disabled and fall back to static content. " +
            "Set these in the deploy platform's build environment.",
    );
}

export { supabase };
