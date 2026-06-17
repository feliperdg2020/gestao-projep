export default function ProjepLogo({
  width = 477,
  height = 301,
  className = '',
  symbolColor = '#CF7029',
  textColor = '#114946',
  animated = false,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 477 301"
      width={width}
      height={height}
      className={`${animated ? 'projep-logo-interactive' : ''} ${className}`.trim()}
      role="img"
      aria-label="PROJEP"
    >
      <g
        className="projep-logo-symbol"
        stroke={symbolColor}
        fill="none"
        strokeWidth="13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path className="projep-logo-axis" d="M94 28 L94 273" />
        <path className="projep-logo-line projep-logo-line-1" d="M94 28 L168 150" />
        <path className="projep-logo-line projep-logo-line-2" d="M94 83 L58 83 L19 150" />
        <path className="projep-logo-line projep-logo-line-3" d="M19 150 H168" />
        <path className="projep-logo-line projep-logo-line-4" d="M19 150 L94 273" />
        <path className="projep-logo-line projep-logo-line-5" d="M168 150 L130 216 L94 216" />
      </g>

      <g className="projep-logo-wordmark" fill={textColor} fillRule="evenodd">
        <path className="projep-logo-letter projep-logo-letter-1" d="M205 141 V72 H247 Q262 72 262 88 V105 Q262 121 247 121 H228 V141 Z M228 88 V104 H239 Q242 104 242 101 V92 Q242 88 239 88 Z" />
        <path className="projep-logo-letter projep-logo-letter-2" d="M280 141 V72 H320 Q335 72 335 87 V98 Q335 106 328 111 L336 123 V141 H314 L302 119 V141 Z M302 88 V103 H313 Q316 103 316 100 V91 Q316 88 313 88 Z" />
        <path className="projep-logo-letter projep-logo-letter-3" d="M381 70 H397 Q420 70 420 93 V119 Q420 142 397 142 H381 Q358 142 358 119 V93 Q358 70 381 70 Z M385 89 Q381 89 381 93 V119 Q381 123 385 123 H393 Q397 123 397 119 V93 Q397 89 393 89 Z" />
        <path className="projep-logo-letter projep-logo-letter-4" d="M239 160 H261 V213 Q261 230 244 230 H222 Q205 230 205 213 V194 Q205 191 208 191 H225 Q228 191 228 194 V207 Q228 211 233 211 H235 Q239 211 239 207 Z" />
        <path className="projep-logo-letter projep-logo-letter-5" d="M287 160 H339 V177 H309 V186 H331 V202 H309 V211 H339 V229 H287 Z" />
        <path className="projep-logo-letter projep-logo-letter-6" d="M363 229 V160 H405 Q420 160 420 176 V193 Q420 210 405 210 H386 V229 Z M386 176 V192 H397 Q400 192 400 189 V179 Q400 176 397 176 Z" />
      </g>
    </svg>
  )
}

export function ProjepSymbol({ width = 34, height = 54, className = '', symbolColor = '#CF7029' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 187 301"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="Símbolo PROJEP"
    >
      <g
        stroke={symbolColor}
        fill="none"
        strokeWidth="13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M94 28 L94 273" />
        <path d="M94 28 L168 150" />
        <path d="M94 83 L58 83 L19 150" />
        <path d="M19 150 H168" />
        <path d="M19 150 L94 273" />
        <path d="M168 150 L130 216 L94 216" />
      </g>
    </svg>
  )
}
