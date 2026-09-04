import { createClient } from '@supabase/supabase-js';

// Pegue esses valores no painel do Supabase em: Project Settings (engrenagem) > API
const supabaseUrl = 'SUA_URL_AQUI'; // Ex: https://xyz.supabase.co
const supabaseAnonKey = 'SUA_CHAVE_ANON_AQUI'; // Chave longa sob "anon public"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);