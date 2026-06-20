import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const root = process.cwd()
const envPath = path.join(root, '.env.local')
const env = Object.fromEntries(
  fs.readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && line.includes('='))
    .map(line => {
      const index = line.indexOf('=')
      return [line.slice(0, index), line.slice(index + 1)]
    }),
)

const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_PUBLISHABLE_KEY,
)

const demoEmails = [
  'ana.silva@projep.com.br',
  'bruno.costa@projep.com.br',
  'daniela.rocha@projep.com.br',
  'eduardo.nunes@projep.com.br',
  'fernanda.pires@projep.com.br',
  'gustavo.mendes@projep.com.br',
  'helena.cardoso@projep.com.br',
]

const felipeId = '00000000-0000-4000-8001-000000000001'
const sectors = [
  { id: 'diretoria', name: 'Diretoria' },
  { id: 'administrativo-financeiro', name: 'Adm e Fin' },
  { id: 'comercial', name: 'Comercial' },
  { id: 'projetos', name: 'Projetos' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'gestao-pessoas', name: 'Gestão de Pessoas' },
]

const steps = [
  ['upsert sectors', () => supabase.from('sectors').upsert(sectors, { onConflict: 'id' })],
  ['delete demo profiles', () => supabase.from('profiles').delete().in('email', demoEmails)],
  ['delete communication messages', () => supabase.from('chat_messages').delete().neq('id', '00000000-0000-4000-8003-000000000000')],
  ['delete notifications', () => supabase.from('notifications').delete().neq('id', '00000000-0000-4000-8004-000000000000')],
  ['upsert Felipe profile', () => supabase.from('profiles').upsert({
    id: felipeId,
    name: 'Felipe Daniel',
    initials: 'FD',
    email: 'felipedaniel.wk@gmail.com',
    phone: null,
    role: 'presidente',
    position: 'Presidente',
    sector_id: 'diretoria',
    avatar_url: null,
    status: 'active',
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' })],
]

for (const [label, run] of steps) {
  const { error } = await run()
  if (error) {
    console.error(`${label}: ${error.message}`)
    process.exitCode = 1
  } else {
    console.log(`${label}: ok`)
  }
}
