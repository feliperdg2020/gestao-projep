export const SETORES = [
  { id: 'diretoria', nome: 'Diretoria', labelCadastro: 'Presidência', moduleKey: 'presidencia', aliases: ['Presidência'] },
  { id: 'administrativo-financeiro', nome: 'Adm e Fin', labelCadastro: 'Adm e Fin', moduleKey: 'adminFinanceiro', aliases: ['Administrativo', 'Financeiro', 'Adm. e Financeiro', 'Administrativo e Financeiro'] },
  { id: 'comercial', nome: 'Comercial', labelCadastro: 'Comercial', moduleKey: 'comercial', aliases: [] },
  { id: 'projetos', nome: 'Projetos', labelCadastro: 'Projetos', moduleKey: 'projetos', aliases: [] },
  { id: 'marketing', nome: 'Marketing', labelCadastro: 'Marketing', moduleKey: 'marketing', aliases: [] },
  { id: 'gestao-pessoas', nome: 'Gestão de Pessoas', labelCadastro: 'Gestão de Pessoas', moduleKey: 'gestaoPessoas', aliases: ['GP', 'Dir. de GP'] },
]

export const SETOR_OPTIONS = SETORES.map(setor => ({
  value: setor.id,
  label: setor.labelCadastro,
}))

export function resolveSetor(value) {
  const normalized = `${value || ''}`.trim().toLocaleLowerCase('pt-BR')
  return SETORES.find(setor =>
    setor.id.toLocaleLowerCase('pt-BR') === normalized ||
    setor.nome.toLocaleLowerCase('pt-BR') === normalized ||
    setor.labelCadastro.toLocaleLowerCase('pt-BR') === normalized ||
    setor.aliases.some(alias => alias.toLocaleLowerCase('pt-BR') === normalized)
  ) || null
}
