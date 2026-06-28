import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  CheckCircle2,
  Edit2,
  ExternalLink,
  FileText,
  FolderOpen,
  GraduationCap,
  Lightbulb,
  Plus,
  Search,
  Tags,
  Trash2,
  User,
  X,
} from 'lucide-react'
import { useData } from '../../contexts/DataContext'
import { PROJECT_TAG_OPTIONS } from '../../data/projetos'

const INPUT = 'w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#CE7028] transition-colors placeholder-gray-700'
const LABEL = 'text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block'

const TAB_META = {
  projeto: {
    label: 'Resumos dos Projetos',
    short: 'Projeto',
    icon: FolderOpen,
    empty: 'Nenhum projeto cadastrado.',
  },
  treinamento: {
    label: 'Treinamentos',
    short: 'Treinamento',
    icon: GraduationCap,
    empty: 'Nenhum treinamento cadastrado.',
  },
  manual: {
    label: 'Manuais dos Servicos',
    short: 'Manual',
    icon: BookOpen,
    empty: 'Nenhum manual cadastrado.',
  },
}

const STATUS_OPTIONS = ['Planejado', 'Em andamento', 'Concluído', 'Arquivado']
const STATUS_CLASS = {
  Planejado: 'bg-yellow-500/10 text-yellow-400 border-yellow-700/30',
  'Em andamento': 'bg-[#CE7028]/10 text-[#FF882D] border-[#CE7028]/30',
  Concluído: 'bg-green-500/10 text-green-400 border-green-700/30',
  Arquivado: 'bg-gray-500/10 text-gray-400 border-gray-700/30',
}

const EMPTY_FORM = {
  tipo: 'projeto',
  titulo: '',
  responsavelId: '',
  responsavel: '',
  data: new Date().toISOString().split('T')[0],
  ano: new Date().getFullYear().toString(),
  status: 'Planejado',
  tags: [],
  descricao: '',
  pontosFortes: '',
  pontosFracos: '',
  problemas: '',
  errosEquipe: '',
  errosCliente: '',
  licoesAprendidas: '',
  cargaHoraria: '',
  link: '',
}

const idsEqual = (a, b) => String(a ?? '') === String(b ?? '')
const listToText = value => Array.isArray(value) ? value.join('\n') : value || ''
const textToList = value => `${value || ''}`.split('\n').map(item => item.trim()).filter(Boolean)

function normalizeTags(value) {
  const source = Array.isArray(value) ? value : `${value || ''}`.split(',')
  const seen = new Set()
  return source
    .flatMap(item => `${item || ''}`.split(','))
    .map(tag => tag.trim().replace(/\s+/g, ' '))
    .filter(Boolean)
    .filter(tag => {
      const key = tag.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
}

function toForm(record = EMPTY_FORM) {
  return {
    ...EMPTY_FORM,
    ...record,
    tags: normalizeTags(record.tags),
    pontosFortes: listToText(record.pontosFortes),
    pontosFracos: listToText(record.pontosFracos),
    problemas: listToText(record.problemas),
    errosEquipe: listToText(record.errosEquipe),
    errosCliente: listToText(record.errosCliente),
    licoesAprendidas: listToText(record.licoesAprendidas),
    cargaHoraria: record.cargaHoraria || '',
  }
}

function fromForm(form) {
  return {
    ...form,
    tags: normalizeTags(form.tags),
    pontosFortes: textToList(form.pontosFortes),
    pontosFracos: textToList(form.pontosFracos),
    problemas: textToList(form.problemas),
    errosEquipe: textToList(form.errosEquipe),
    errosCliente: textToList(form.errosCliente),
    licoesAprendidas: textToList(form.licoesAprendidas),
    cargaHoraria: form.tipo === 'treinamento' && form.cargaHoraria ? Number(form.cargaHoraria) : '',
    ano: `${form.ano || form.data?.slice(0, 4) || new Date().getFullYear()}`,
  }
}

function countList(record, key) {
  return Array.isArray(record[key]) ? record[key].length : 0
}

function formatDate(date) {
  if (!date) return 'Sem data'
  return new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR')
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-[#111111] border border-[#1E1E1E] rounded-md p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
          <p className="text-3xl font-bold text-white mt-3 tabular-nums">{value}</p>
        </div>
        <div className="w-10 h-10 rounded bg-[#CE7028]/10 border border-[#CE7028]/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#FF882D]" />
        </div>
      </div>
    </div>
  )
}

function TagSelector({ value, options, onChange }) {
  const selected = normalizeTags(value)
  const selectedKeys = new Set(selected.map(tag => tag.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()))

  const toggle = tag => {
    const key = tag.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    if (selectedKeys.has(key)) {
      onChange(selected.filter(item => item.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== key))
      return
    }
    onChange([...selected, tag])
  }

  return (
    <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded p-3">
      {selected.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-3">
          {selected.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
              className="inline-flex items-center gap-1.5 text-xs text-[#FF882D] bg-[#CE7028]/10 border border-[#CE7028]/30 rounded px-2 py-1 hover:bg-[#CE7028]/20 transition-colors"
            >
              {tag}
              <X className="w-3 h-3" />
            </button>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-600 mb-3">Selecione uma ou mais tags padronizadas.</p>
      )}

      <div className="max-h-44 overflow-y-auto pr-1 flex flex-wrap gap-2">
        {options.map(tag => {
          const active = selectedKeys.has(tag.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
              className={`text-xs border rounded px-2 py-1 transition-colors ${
                active
                  ? 'bg-[#CE7028] border-[#CE7028] text-white'
                  : 'bg-[#111111] border-[#1E1E1E] text-gray-400 hover:text-white hover:border-[#CE7028]/60'
              }`}
            >
              {tag}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function DetailList({ title, icon: Icon, items, tone = 'text-gray-400' }) {
  return (
    <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${tone}`} />
        <h4 className="text-white text-sm font-semibold">{title}</h4>
        <span className="text-[10px] text-gray-600">{items.length}</span>
      </div>
      {items.length ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={`${item}-${index}`} className="text-sm text-gray-400 leading-relaxed flex gap-2">
              <span className="text-[#CE7028] mt-0.5">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-700">Nada registrado.</p>
      )}
    </div>
  )
}

function KnowledgeModal({ record, members, onClose, onSave }) {
  const [form, setForm] = useState(() => toForm(record))
  const [error, setError] = useState('')
  const isEditing = Boolean(record?.id)
  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const submit = event => {
    event.preventDefault()
    const result = onSave(fromForm(form))
    if (result?.success === false) {
      setError(result.error)
      return
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-[#1E1E1E] rounded-md w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-[#111111] z-10 flex items-center justify-between px-6 py-4 border-b border-[#1E1E1E]">
          <div>
            <h3 className="text-white font-semibold">{isEditing ? 'Editar registro' : 'Novo registro'}</h3>
            <p className="text-gray-600 text-xs mt-0.5">Base de Conhecimento de Projetos</p>
          </div>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-5">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className={LABEL}>Tipo</label>
              <select value={form.tipo} onChange={event => set('tipo', event.target.value)} className={INPUT}>
                {Object.entries(TAB_META).map(([key, meta]) => <option key={key} value={key}>{meta.short}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Data</label>
              <input type="date" value={form.data} onChange={event => {
                setForm(prev => ({ ...prev, data: event.target.value, ano: event.target.value?.slice(0, 4) || prev.ano }))
              }} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Ano</label>
              <input value={form.ano} onChange={event => set('ano', event.target.value)} className={INPUT} placeholder="2026" />
            </div>
          </div>

          <div>
            <label className={LABEL}>Titulo *</label>
            <input required value={form.titulo} onChange={event => set('titulo', event.target.value)} className={INPUT} placeholder="Nome do projeto, treinamento ou manual" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className={LABEL}>Responsavel</label>
              <select value={form.responsavelId || ''} onChange={event => {
                const member = members.find(item => idsEqual(item.id, event.target.value))
                setForm(prev => ({ ...prev, responsavelId: member?.id || '', responsavel: member?.nome || '' }))
              }} className={INPUT}>
                <option value="">Informar manualmente</option>
                {members.filter(member => member.status === 'ativo').map(member => (
                  <option key={member.id} value={member.id}>{member.nome} - {member.cargo}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL}>Responsavel manual</label>
              <input value={form.responsavel} onChange={event => set('responsavel', event.target.value)} className={INPUT} placeholder="Nome do responsavel" />
            </div>
            <div>
              <label className={LABEL}>Status</label>
              <select value={form.status} onChange={event => set('status', event.target.value)} className={INPUT}>
                {STATUS_OPTIONS.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={LABEL}>Tags</label>
              <TagSelector
                value={form.tags}
                options={PROJECT_TAG_OPTIONS}
                onChange={tags => set('tags', tags)}
              />
            </div>
            {form.tipo === 'treinamento' && (
              <div>
                <label className={LABEL}>Carga horaria</label>
                <input type="number" min="0" value={form.cargaHoraria} onChange={event => set('cargaHoraria', event.target.value)} className={INPUT} placeholder="2" />
              </div>
            )}
          </div>

          <div>
            <label className={LABEL}>Descricao / contexto *</label>
            <textarea required rows={4} value={form.descricao} onChange={event => set('descricao', event.target.value)} className={`${INPUT} resize-y`} placeholder="Contexto completo do registro..." />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div><label className={LABEL}>Pontos fortes</label><textarea rows={3} value={form.pontosFortes} onChange={event => set('pontosFortes', event.target.value)} className={`${INPUT} resize-y`} placeholder="Um item por linha" /></div>
            <div><label className={LABEL}>Pontos fracos</label><textarea rows={3} value={form.pontosFracos} onChange={event => set('pontosFracos', event.target.value)} className={`${INPUT} resize-y`} placeholder="Um item por linha" /></div>
            <div><label className={LABEL}>Problemas encontrados</label><textarea rows={3} value={form.problemas} onChange={event => set('problemas', event.target.value)} className={`${INPUT} resize-y`} placeholder="Um item por linha" /></div>
            <div><label className={LABEL}>Licoes aprendidas</label><textarea rows={3} value={form.licoesAprendidas} onChange={event => set('licoesAprendidas', event.target.value)} className={`${INPUT} resize-y`} placeholder="Um item por linha" /></div>
            <div><label className={LABEL}>Erros da equipe</label><textarea rows={3} value={form.errosEquipe} onChange={event => set('errosEquipe', event.target.value)} className={`${INPUT} resize-y`} placeholder="Um item por linha" /></div>
            <div><label className={LABEL}>Erros do cliente</label><textarea rows={3} value={form.errosCliente} onChange={event => set('errosCliente', event.target.value)} className={`${INPUT} resize-y`} placeholder="Um item por linha" /></div>
          </div>

          <div>
            <label className={LABEL}>Link / material externo</label>
            <input value={form.link} onChange={event => set('link', event.target.value)} className={INPUT} placeholder="https://..." />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded border border-[#1E1E1E] text-gray-500 hover:text-white text-sm transition-all">Cancelar</button>
            <button type="submit" className="flex-1 py-2.5 rounded bg-[#CE7028] hover:bg-[#B5611F] text-white font-semibold text-sm transition-colors">
              {isEditing ? 'Salvar alteracoes' : 'Criar registro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DetailModal({ record, onClose }) {
  const meta = TAB_META[record.tipo] || TAB_META.projeto
  const Icon = meta.icon
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-[#1E1E1E] rounded-md w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-[#111111] z-10 flex items-start justify-between px-6 py-4 border-b border-[#1E1E1E]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-[#CE7028]/10 border border-[#CE7028]/20 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-[#FF882D]" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{record.titulo}</h3>
              <p className="text-gray-600 text-xs mt-1">{meta.short} - {formatDate(record.data)}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid md:grid-cols-4 gap-3">
            <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded p-3"><p className="text-[10px] text-gray-600 uppercase tracking-wider">Status</p><p className="text-white text-sm font-semibold mt-1">{record.status}</p></div>
            <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded p-3"><p className="text-[10px] text-gray-600 uppercase tracking-wider">Responsavel</p><p className="text-white text-sm font-semibold mt-1">{record.responsavel || 'Nao informado'}</p></div>
            <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded p-3"><p className="text-[10px] text-gray-600 uppercase tracking-wider">Ano</p><p className="text-white text-sm font-semibold mt-1">{record.ano}</p></div>
            <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded p-3"><p className="text-[10px] text-gray-600 uppercase tracking-wider">Categoria</p><p className="text-white text-sm font-semibold mt-1">{meta.short}</p></div>
          </div>

          <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md p-5">
            <h4 className="text-white text-sm font-semibold mb-2">Descricao completa</h4>
            <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">{record.descricao}</p>
            {record.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {record.tags.map(tag => <span key={tag} className="text-xs text-[#FF882D] bg-[#CE7028]/10 border border-[#CE7028]/20 rounded px-2 py-1">{tag}</span>)}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <DetailList title="Pontos fortes" icon={CheckCircle2} items={record.pontosFortes || []} tone="text-green-400" />
            <DetailList title="Pontos fracos" icon={AlertTriangle} items={record.pontosFracos || []} tone="text-yellow-400" />
            <DetailList title="Problemas encontrados" icon={AlertTriangle} items={record.problemas || []} tone="text-red-400" />
            <DetailList title="Licoes aprendidas" icon={Lightbulb} items={record.licoesAprendidas || []} tone="text-[#FF882D]" />
            <DetailList title="Erros da equipe" icon={X} items={record.errosEquipe || []} tone="text-red-400" />
            <DetailList title="Erros do cliente" icon={AlertTriangle} items={record.errosCliente || []} tone="text-blue-400" />
          </div>

          {record.link && (
            <a href={record.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#FF882D] hover:text-[#CE7028] text-sm font-semibold">
              <ExternalLink className="w-4 h-4" /> Abrir material externo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function KnowledgeCard({ record, onView, onEdit, onDelete }) {
  const meta = TAB_META[record.tipo] || TAB_META.projeto
  const Icon = meta.icon
  return (
    <div className="bg-[#111111] border border-[#1E1E1E] rounded-md p-5 hover:border-[#CE7028]/30 transition-colors group">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded bg-[#CE7028]/10 border border-[#CE7028]/20 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-[#FF882D]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-semibold leading-snug truncate">{record.titulo}</h3>
            <p className="text-gray-600 text-xs mt-1 line-clamp-2">{record.descricao}</p>
          </div>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-1 rounded border flex-shrink-0 ${STATUS_CLASS[record.status] || STATUS_CLASS.Planejado}`}>
          {record.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs mb-4">
        <div className="flex items-center gap-2 text-gray-500"><User className="w-3.5 h-3.5" />{record.responsavel || 'Sem responsavel'}</div>
        <div className="flex items-center gap-2 text-gray-500"><Calendar className="w-3.5 h-3.5" />{formatDate(record.data)}</div>
        <div className="flex items-center gap-2 text-gray-500"><Tags className="w-3.5 h-3.5" />{record.tags?.length || 0} tags</div>
        {record.tipo === 'treinamento' && record.cargaHoraria ? (
          <div className="flex items-center gap-2 text-gray-500"><GraduationCap className="w-3.5 h-3.5" />{record.cargaHoraria}h</div>
        ) : (
          <div className="flex items-center gap-2 text-gray-500"><FileText className="w-3.5 h-3.5" />{record.ano}</div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {[
          ['Fortes', countList(record, 'pontosFortes')],
          ['Fracos', countList(record, 'pontosFracos')],
          ['Problemas', countList(record, 'problemas')],
          ['Licoes', countList(record, 'licoesAprendidas')],
        ].map(([label, value]) => (
          <div key={label} className="bg-[#0D0D0D] border border-[#1E1E1E] rounded p-2 text-center">
            <p className="text-white text-sm font-bold tabular-nums">{value}</p>
            <p className="text-[10px] text-gray-600 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      {record.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {record.tags.slice(0, 4).map(tag => <span key={tag} className="text-[10px] text-gray-400 bg-[#0D0D0D] border border-[#1E1E1E] rounded px-2 py-1">{tag}</span>)}
          {record.tags.length > 4 && <span className="text-[10px] text-gray-600 px-2 py-1">+{record.tags.length - 4}</span>}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-[#1E1E1E]">
        <button onClick={() => onView(record)} className="text-xs text-[#FF882D] hover:text-[#CE7028] font-semibold transition-colors">
          Abrir detalhes
        </button>
        <div className="flex items-center gap-1">
          {record.link && (
            <a href={record.link} target="_blank" rel="noreferrer" className="p-2 rounded text-gray-600 hover:text-[#FF882D] hover:bg-[#CE7028]/10 transition-all">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button onClick={() => onEdit(record)} className="p-2 rounded text-gray-600 hover:text-[#FF882D] hover:bg-[#CE7028]/10 transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
          <button onClick={() => onDelete(record)} className="p-2 rounded text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </div>
  )
}

export default function BaseConhecimentoProjetos() {
  const {
    members,
    knowledgeRecords,
    addKnowledgeRecord,
    updateKnowledgeRecord,
    deleteKnowledgeRecord,
  } = useData()
  const [activeTab, setActiveTab] = useState('projeto')
  const [query, setQuery] = useState('')
  const [year, setYear] = useState('todos')
  const [status, setStatus] = useState('todos')
  const [detail, setDetail] = useState(null)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const records = useMemo(() => knowledgeRecords || [], [knowledgeRecords])
  const years = useMemo(() => [...new Set(records.map(record => record.ano).filter(Boolean))].sort((a, b) => b.localeCompare(a)), [records])
  const stats = useMemo(() => {
    const responsibleIds = new Set(records.map(record => record.responsavelId || record.responsavel).filter(Boolean))
    return {
      projetos: records.filter(record => record.tipo === 'projeto').length,
      treinamentos: records.filter(record => record.tipo === 'treinamento').length,
      manuais: records.filter(record => record.tipo === 'manual').length,
      responsaveis: responsibleIds.size,
    }
  }, [records])

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase()
    return records
      .filter(record => record.tipo === activeTab)
      .filter(record => year === 'todos' || record.ano === year)
      .filter(record => status === 'todos' || record.status === status)
      .filter(record => {
        if (!text) return true
        const fields = [
          record.titulo,
          record.responsavel,
          record.descricao,
          ...(record.tags || []),
          ...(record.pontosFortes || []),
          ...(record.pontosFracos || []),
          ...(record.problemas || []),
          ...(record.errosEquipe || []),
          ...(record.errosCliente || []),
          ...(record.licoesAprendidas || []),
        ]
        return fields.some(field => `${field || ''}`.toLowerCase().includes(text))
      })
  }, [records, activeTab, year, status, query])

  const openNew = () => {
    setEditing({ ...EMPTY_FORM, tipo: activeTab })
    setShowForm(true)
  }

  const save = data => {
    return data.id ? updateKnowledgeRecord(data.id, data) : addKnowledgeRecord(data)
  }

  const remove = record => {
    if (!window.confirm(`Excluir "${record.titulo}" da base de conhecimento?`)) return
    deleteKnowledgeRecord(record.id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Base de Conhecimento de Projetos</h1>
          <p className="text-gray-500 text-sm mt-1">Registre aprendizados, manuais, treinamentos e historico tecnico do setor.</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center justify-center gap-2 bg-[#CE7028] hover:bg-[#B5611F] text-white font-semibold px-4 py-2.5 rounded text-sm transition-colors">
          <Plus className="w-4 h-4" /> Novo registro
        </button>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={FolderOpen} label="Total de projetos" value={stats.projetos} />
        <StatCard icon={GraduationCap} label="Treinamentos" value={stats.treinamentos} />
        <StatCard icon={BookOpen} label="Manuais" value={stats.manuais} />
        <StatCard icon={User} label="Responsaveis" value={stats.responsaveis} />
      </div>

      <div className="bg-[#111111] border border-[#1E1E1E] rounded-md p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(TAB_META).map(([key, meta]) => {
            const Icon = meta.icon
            const active = activeTab === key
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold border transition-all ${
                  active
                    ? 'bg-[#CE7028] border-[#CE7028] text-white'
                    : 'bg-[#0D0D0D] border-[#1E1E1E] text-gray-500 hover:text-white hover:border-[#CE7028]/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {meta.label}
                <span className="text-xs opacity-70">{records.filter(record => record.tipo === key).length}</span>
              </button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_160px_180px] gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-700 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              className={`${INPUT} pl-9`}
              placeholder="Buscar por titulo, responsavel, tags, problemas, erros ou licoes..."
            />
          </div>
          <select value={year} onChange={event => setYear(event.target.value)} className={INPUT}>
            <option value="todos">Todos os anos</option>
            {years.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
          <select value={status} onChange={event => setStatus(event.target.value)} className={INPUT}>
            <option value="todos">Todos os status</option>
            {STATUS_OPTIONS.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#111111] border border-dashed border-[#1E1E1E] rounded-md p-12 text-center">
          <FileText className="w-10 h-10 text-gray-700 mx-auto mb-3" />
          <h2 className="text-white font-semibold">{TAB_META[activeTab].empty}</h2>
          <p className="text-gray-600 text-sm mt-1">Use o botao "Novo registro" para comecar a documentar o conhecimento do setor.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(record => (
            <KnowledgeCard
              key={record.id}
              record={record}
              onView={setDetail}
              onEdit={item => { setEditing(item); setShowForm(true) }}
              onDelete={remove}
            />
          ))}
        </div>
      )}

      {showForm && (
        <KnowledgeModal
          record={editing}
          members={members}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSave={save}
        />
      )}
      {detail && <DetailModal record={detail} onClose={() => setDetail(null)} />}
    </div>
  )
}
