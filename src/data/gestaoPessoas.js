// Fonte única de verdade — dados de Gestão de Pessoas
// TODO: [Supabase] supabase.from('avaliacoes').select('*'), supabase.from('processo_seletivo').select('*')

export const INITIAL_GESTAO_PESSOAS = {
  avaliacoes: [
    {
      id: 1,
      membroId: 2,
      avaliadorId: 4,
      nota: 9.2,
      feedbacks: [
        { texto: 'Excelente desempenho este mês! Demonstrou proatividade nas prospecções e entregou resultados acima da meta.', data: '2026-06-10', avaliadorId: 4 },
        { texto: 'Ótimo trabalho na apresentação para o cliente TechStart. A proposta foi bem estruturada e o follow-up foi exemplar.', data: '2026-05-28', avaliadorId: 1 },
        { texto: 'Participação ativa nas reuniões de equipe. Bom engajamento com os novos processos do CRM.', data: '2026-05-05', avaliadorId: 4 },
      ],
      metas: [
        { descricao: 'Fechar 3 contratos no mês de junho', status: 'pendente', prazo: '2026-06-30' },
        { descricao: 'Completar treinamento de negociação avançada', status: 'concluida', prazo: '2026-05-31' },
        { descricao: 'Atualizar CRM semanalmente', status: 'concluida', prazo: '2026-06-14' },
      ],
      historico: [
        { mes: 'Jan', nota: 7.2 }, { mes: 'Fev', nota: 7.8 },
        { mes: 'Mar', nota: 8.1 }, { mes: 'Abr', nota: 8.5 },
        { mes: 'Mai', nota: 8.9 }, { mes: 'Jun', nota: 9.2 },
      ],
    },
    {
      id: 2,
      membroId: 3,
      avaliadorId: 1,
      nota: 8.5,
      feedbacks: [
        { texto: 'Bruno tem mantido o processo seletivo muito bem organizado. Excelente gestão da equipe de GP.', data: '2026-06-10', avaliadorId: 1 },
      ],
      metas: [
        { descricao: 'Contratar 2 trainees até julho', status: 'pendente', prazo: '2026-07-31' },
        { descricao: 'Implementar pesquisa de clima', status: 'andamento', prazo: '2026-06-20' },
      ],
      historico: [
        { mes: 'Jan', nota: 7.5 }, { mes: 'Fev', nota: 7.9 },
        { mes: 'Mar', nota: 8.0 }, { mes: 'Abr', nota: 8.2 },
        { mes: 'Mai', nota: 8.4 }, { mes: 'Jun', nota: 8.5 },
      ],
    },
    {
      id: 3,
      membroId: 4,
      avaliadorId: 3,
      nota: 8.8,
      feedbacks: [
        { texto: 'Daniela se destaca pela atenção aos detalhes no processo de avaliação. Muito proativa.', data: '2026-06-08', avaliadorId: 3 },
      ],
      metas: [
        { descricao: 'Finalizar avaliações do ciclo Jun/2026', status: 'andamento', prazo: '2026-06-30' },
      ],
      historico: [
        { mes: 'Jan', nota: 7.8 }, { mes: 'Fev', nota: 8.0 },
        { mes: 'Mar', nota: 8.2 }, { mes: 'Abr', nota: 8.5 },
        { mes: 'Mai', nota: 8.6 }, { mes: 'Jun', nota: 8.8 },
      ],
    },
  ],

  processoSeletivo: [
    { id: 1, name: 'Lucas Campos',   email: 'lucas.campos@email.com',   role: 'Analista de Marketing',  stage: 'prova',               date: '2026-06-11', score: 72, notes: 'Bom portfólio de design' },
    { id: 2, name: 'Mariana Torres', email: 'mariana.torres@email.com', role: 'Analista Financeiro',    stage: 'entrevista_diretoria', date: '2026-06-12', score: 91, notes: 'Excelente conhecimento em finanças' },
    { id: 3, name: 'Rafael Brito',   email: 'rafael.brito@email.com',   role: 'Trainee de GP',          stage: 'aprovado',             date: '2026-06-08', score: 78, notes: 'Aprovado para início em julho' },
    { id: 4, name: 'Camila Rocha',   email: 'camila.rocha@email.com',   role: 'Trainee Comercial',      stage: 'inscricao',            date: '2026-06-14', score: 0,  notes: 'Currículo recebido, aguardando triagem' },
    { id: 5, name: 'João Pinto',     email: 'joao.pinto@email.com',     role: 'Analista de Projetos',   stage: 'reprovado',            date: '2026-05-28', score: 55, notes: 'Não atendeu os requisitos técnicos' },
  ],
}
