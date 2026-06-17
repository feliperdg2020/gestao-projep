// Fonte única de verdade — projetos da PROJEP
// TODO: [Supabase] supabase.from('projetos').select('*, tarefas(*)')

export const INITIAL_PROJETOS = {
  projetos: [
    {
      id: 1,
      contractId: 1,
      nome: 'Consultoria TechStart',
      clienteId: 'nexus-tech',
      clienteNome: 'Nexus Tech',
      responsavelId: 2,
      membros: [2, 5],
      status: 'ativo',
      dataInicio: '2026-06-09',
      dataFim: '2026-09-09',
      valor: 45000,
      descricao: 'Consultoria em processos organizacionais e reestruturação de fluxos internos.',
      tarefas: [
        { id: 1, titulo: 'Diagnóstico inicial',           responsavelId: 2, status: 'concluida', prazo: '2026-06-20' },
        { id: 2, titulo: 'Mapeamento de processos',       responsavelId: 5, status: 'andamento', prazo: '2026-07-15' },
        { id: 3, titulo: 'Entrega do relatório final',    responsavelId: 2, status: 'pendente',  prazo: '2026-09-01' },
      ],
    },
    {
      id: 2,
      contractId: 2,
      nome: 'Transformação Digital',
      clienteId: 'omega-digital',
      clienteNome: 'Omega Digital',
      responsavelId: 1,
      membros: [1, 5],
      status: 'ativo',
      dataInicio: '2026-06-02',
      dataFim: '2026-08-02',
      valor: 28000,
      descricao: 'Transformação digital e mapeamento de processos para modernização do negócio.',
      tarefas: [
        { id: 4, titulo: 'Levantamento de sistemas atuais', responsavelId: 5, status: 'concluida', prazo: '2026-06-10' },
        { id: 5, titulo: 'Proposta de arquitetura digital',  responsavelId: 1, status: 'concluida', prazo: '2026-06-25' },
        { id: 6, titulo: 'Implementação fase 1',             responsavelId: 5, status: 'andamento', prazo: '2026-07-20' },
        { id: 7, titulo: 'Documentação e treinamento',       responsavelId: 1, status: 'pendente',  prazo: '2026-08-01' },
      ],
    },
    {
      id: 3,
      contractId: 3,
      nome: 'Pesquisa de Mercado Beta',
      clienteId: 'beta-solutions',
      clienteNome: 'Beta Solutions',
      responsavelId: 3,
      membros: [3, 7],
      status: 'concluido',
      dataInicio: '2026-04-01',
      dataFim: '2026-06-01',
      valor: 18000,
      descricao: 'Pesquisa de mercado e benchmarking do setor de tecnologia educacional.',
      tarefas: [
        { id: 8, titulo: 'Coleta de dados primários',  responsavelId: 7, status: 'concluida', prazo: '2026-04-20' },
        { id: 9, titulo: 'Análise e relatório final',  responsavelId: 3, status: 'concluida', prazo: '2026-05-30' },
      ],
    },
  ],
}
