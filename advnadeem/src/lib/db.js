import { supabase } from './supabase'

// ─── SETTINGS ────────────────────────────────────────────────────────────────
export async function fetchSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .single()
  if (error) throw error
  return data
}

export async function updateSettings(fields) {
  const { data: existing } = await supabase.from('settings').select('id').limit(1).single()
  const { data, error } = await supabase
    .from('settings')
    .update(fields)
    .eq('id', existing.id)
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
export async function fetchAbout() {
  const { data, error } = await supabase
    .from('about')
    .select('*')
    .limit(1)
    .single()
  if (error) throw error
  return data
}

export async function updateAbout(fields) {
  const { data: existing } = await supabase.from('about').select('id').limit(1).single()
  const { data, error } = await supabase
    .from('about')
    .update(fields)
    .eq('id', existing.id)
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── PRACTICE AREAS ──────────────────────────────────────────────────────────
export async function fetchPracticeAreas() {
  const { data, error } = await supabase
    .from('practice_areas')
    .select('*')
    .order('sort_order')
  if (error) throw error
  return data
}

export async function upsertPracticeArea(area) {
  const { data, error } = await supabase
    .from('practice_areas')
    .upsert(area)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deletePracticeArea(id) {
  const { error } = await supabase.from('practice_areas').delete().eq('id', id)
  if (error) throw error
}

// ─── POSTS ───────────────────────────────────────────────────────────────────
export async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function fetchAllPosts() {
  // Admin view — includes unpublished
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function fetchPostBySlug(slug) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

export async function createPost(post) {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updatePost(id, fields) {
  const { data, error } = await supabase
    .from('posts')
    .update(fields)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deletePost(id) {
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw error
}
