import assert from 'node:assert/strict'

const store = new Map()
globalThis.localStorage = {
  getItem: key => store.has(key) ? store.get(key) : null,
  setItem: (key, value) => store.set(key, String(value)),
  removeItem: key => store.delete(key),
  clear: () => store.clear(),
}

const { createServer } = await import('vite')
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
const [{ default: db }, access, authorization, { INITIAL_USUARIOS }] = await Promise.all([
  vite.ssrLoadModule('/src/data/db.js'),
  vite.ssrLoadModule('/src/config/accessControl.js'),
  vite.ssrLoadModule('/src/config/authorization.js'),
  vite.ssrLoadModule('/src/data/usuarios.js'),
])

const president = INITIAL_USUARIOS.find(user => user.role === 'presidente')
const hunter = INITIAL_USUARIOS.find(user => user.cargo === 'Trainee Comercial')
const gpDirector = INITIAL_USUARIOS.find(user => user.cargo === 'Diretor de GP')

assert.ok(access.hasPathAccess(president, '/presidencia/seguranca'))
assert.ok(access.hasPathAccess(president, '/comercial/contratos'))
assert.equal(access.hasPathAccess(hunter, '/comercial'), false)
assert.ok(access.hasPathAccess(hunter, '/comercial/pipeline'))
assert.equal(access.getDefaultPath(hunter), '/comercial/pipeline')
assert.ok(authorization.canApproveUsers(gpDirector))
assert.equal(authorization.canManagePermissions(gpDirector), false)

const ids = new Set(Array.from({ length: 100 }, () => db.createId()))
assert.equal(ids.size, 100)

db.set('usuarios', INITIAL_USUARIOS)
const activeUserIds = new Set(db.get('usuarios').map(user => user.id))
const normalizedFinance = db.get('usuarios').find(user => user.cargo === 'Diretora Financeira')
assert.equal(normalizedFinance.setor, 'Adm e Fin')
assert.equal(normalizedFinance.setorId, 'administrativo-financeiro')

for (const project of db.get('projetos').projetos) {
  if (project.responsavelId) assert.ok(activeUserIds.has(project.responsavelId))
  project.membros.forEach(memberId => assert.ok(activeUserIds.has(memberId)))
  project.tarefas.forEach(task => {
    if (task.responsavelId) assert.ok(activeUserIds.has(task.responsavelId))
  })
}
for (const evaluation of db.get('gestaoPessoas').avaliacoes) {
  assert.ok(activeUserIds.has(evaluation.membroId))
  if (evaluation.avaliadorId) assert.ok(activeUserIds.has(evaluation.avaliadorId))
  evaluation.feedbacks.forEach(feedback => assert.ok(activeUserIds.has(feedback.avaliadorId)))
}
for (const message of db.get('comunicacao').mensagens) {
  if (message.remetenteId !== 'system') assert.ok(activeUserIds.has(message.remetenteId))
  if (typeof message.destinatarioId === 'number') assert.ok(activeUserIds.has(message.destinatarioId))
}
db.get('comercial').hunters.forEach(entry => assert.ok(activeUserIds.has(entry.userId)))
db.get('comercial').closers.forEach(entry => assert.ok(activeUserIds.has(entry.userId)))
db.get('comercial').contratos.forEach(contract => {
  if (contract.responsavelId) assert.ok(activeUserIds.has(contract.responsavelId))
})

const removableUser = INITIAL_USUARIOS.find(user => user.id === 2)
assert.ok(removableUser)
const removedHunterIds = db.get('comercial').hunters
  .filter(hunterEntry => hunterEntry.userId === removableUser.id)
  .map(hunterEntry => hunterEntry.id)
const removedCloserIds = db.get('comercial').closers
  .filter(closerEntry => closerEntry.userId === removableUser.id)
  .map(closerEntry => closerEntry.id)
db.removeUser(removableUser.id)
assert.equal(db.get('usuarios').some(user => user.id === removableUser.id), false)
assert.equal(db.get('comunicacao').mensagens.some(message =>
  message.remetenteId === removableUser.id || message.destinatarioId === removableUser.id
), false)
assert.equal(db.get('projetos').projetos.some(project =>
  project.responsavelId === removableUser.id ||
  project.membros.includes(removableUser.id) ||
  project.tarefas.some(task => task.responsavelId === removableUser.id)
), false)
assert.equal(db.get('comercial').contratos.some(contract => contract.responsavelId === removableUser.id), false)
assert.equal(db.get('comercial').hunters.some(hunterEntry => hunterEntry.userId === removableUser.id), false)
assert.equal(db.get('comercial').closers.some(closerEntry => closerEntry.userId === removableUser.id), false)
assert.equal(db.get('comercial').leads.some(lead =>
  removedHunterIds.includes(lead.hunterId) || removedCloserIds.includes(lead.closerId)
), false)

console.log('Smoke tests passed: access, IDs, normalization and cascade deletion.')
await vite.close()
