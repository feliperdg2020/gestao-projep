import { Component } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Erro não tratado na página', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="min-h-[45vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#111111] border border-red-900/40 rounded-md p-6 text-center">
          <AlertTriangle className="w-9 h-9 text-red-400 mx-auto mb-4" />
          <h2 className="text-white font-bold text-lg">Não foi possível carregar esta área</h2>
          <p className="text-gray-500 text-sm mt-2">Os seus dados continuam salvos. Recarregue a página para tentar novamente.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-[#CE7028] hover:bg-[#B5611F] text-white text-sm font-semibold rounded"
          >
            <RefreshCw className="w-4 h-4" /> Recarregar
          </button>
        </div>
      </div>
    )
  }
}
