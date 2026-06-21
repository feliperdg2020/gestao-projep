import { ACCESS_MODULES } from './accessControl'

export const ROLE_PRESETS = [
  {
    value: 'membro',
    label: 'Membro (somente Chat)',
    role: 'membro',
    permissions: { chat: true },
  },
  {
    value: 'diretor-comercial',
    label: 'Diretor Comercial',
    role: 'diretor',
    permissions: { comercial: true, chat: true },
  },
  {
    value: 'hunter-comercial',
    label: 'Hunter Comercial',
    role: 'membro',
    permissions: {
      comercial: true,
      chat: true,
      subareas: {
        'comercial.dashboard': false,
        'comercial.pipeline': true,
        'comercial.calendario': true,
        'comercial.ranking': false,
        'comercial.contratos': false,
        'comercial.equipe': false,
      },
    },
  },
  {
    value: 'diretor-gp',
    label: 'Diretor de GP',
    role: 'diretor',
    permissions: { gestaoPessoas: true, chat: true },
  },
  {
    value: 'membro-gp',
    label: 'Membro de GP',
    role: 'membro',
    permissions: {
      gestaoPessoas: true,
      chat: true,
      subareas: {
        'gestaoPessoas.dashboard': true,
        'gestaoPessoas.membros': true,
        'gestaoPessoas.processo': true,
        'gestaoPessoas.aprovacoes': false,
      },
    },
  },
  {
    value: 'projetos',
    label: 'Projetos',
    role: 'membro',
    permissions: { projetos: true, chat: true },
  },
  {
    value: 'marketing',
    label: 'Marketing',
    role: 'membro',
    permissions: { marketing: true, chat: true },
  },
  {
    value: 'adm-fin',
    label: 'Adm e Fin',
    role: 'membro',
    permissions: { adminFinanceiro: true, chat: true },
  },
  {
    value: 'presidente',
    label: 'Presidente',
    role: 'presidente',
    permissions: Object.fromEntries(ACCESS_MODULES.map(module => [module.key, true])),
  },
]

export function getAvailableRolePresets(user) {
  return user?.role === 'presidente'
    ? ROLE_PRESETS
    : ROLE_PRESETS.filter(preset => preset.role !== 'presidente' && preset.role !== 'diretor')
}

export function getSuggestedRolePreset(approver, pendingUser) {
  const options = getAvailableRolePresets(approver)
  const sectorDefaults = {
    comercial: 'hunter-comercial',
    'gestao-pessoas': 'membro-gp',
    projetos: 'projetos',
    marketing: 'marketing',
    'administrativo-financeiro': 'adm-fin',
    diretoria: 'presidente',
  }
  const requestedDirector = `${pendingUser?.cargo || ''}`.toLocaleLowerCase('pt-BR').includes('diretor')
  const directorDefaults = {
    comercial: 'diretor-comercial',
    'gestao-pessoas': 'diretor-gp',
  }
  const preferred = requestedDirector && approver?.role === 'presidente'
    ? directorDefaults[pendingUser?.setorId]
    : sectorDefaults[pendingUser?.setorId]

  return options.find(option => option.value === preferred) ||
    options.find(option => option.value === 'membro') ||
    options[0] || null
}
