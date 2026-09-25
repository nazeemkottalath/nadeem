import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const SITE_URL = process.env.VITE_SITE_URL || 'https://nadeem-azure.vercel.app'

function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    async closeBundle() {
      const url  = process.env.VITE_SUPABASE_URL
      const anon = process.env.VITE_SUPABASE_ANON_KEY
      let posts = []
      if (url && anon) {
        try {
          const sb = createClient(url, anon)
          const { data } = await sb.from('posts').select('slug, updated_at').eq('published', true)
          posts = data || []
        } catch (e) { console.warn('[sitemap]', e.message) }
      }
      const staticUrls = [
        { loc: `${SITE_URL}/`,                 priority: '1.0', changefreq: 'monthly' },
        { loc: `${SITE_URL}/about`,            priority: '0.9', changefreq: 'monthly' },
        { loc: `${SITE_URL}/practice-areas`,   priority: '0.9', changefreq: 'monthly' },
        { loc: `${SITE_URL}/legal-insights`,   priority: '0.8', changefreq: 'weekly'  },
        { loc: `${SITE_URL}/contact`,          priority: '0.8', changefreq: 'monthly' },
      ]
      const postUrls = posts.map(p => ({
        loc: `${SITE_URL}/legal-insights/${p.slug}`,
        lastmod: p.updated_at ? new Date(p.updated_at).toISOString().split('T')[0] : undefined,
        priority: '0.6', changefreq: 'monthly',
      }))
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].map(u => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`
      const outDir = path.resolve('dist')
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml)
      console.log(`[sitemap] Generated with ${postUrls.length} posts`)
    }
  }
}

export default defineConfig({ plugins: [react(), sitemapPlugin()] })
