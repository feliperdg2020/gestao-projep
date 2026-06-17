export default function UserAvatar({
  user,
  size = 40,
  fallbackColor = '#CE7028',
  className = '',
  textClassName = '',
}) {
  const initials = user?.avatar || user?.nome
    ?.split(/\s+/)
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?'

  const style = { width: size, height: size }

  if (user?.fotoPerfil) {
    return (
      <img
        src={user.fotoPerfil}
        alt={`Foto de ${user.nome || 'membro'}`}
        className={`rounded-full object-cover flex-shrink-0 ${className}`}
        style={style}
      />
    )
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${textClassName} ${className}`}
      style={{ ...style, background: fallbackColor }}
      aria-label={`Avatar de ${user?.nome || 'membro'}`}
    >
      {initials}
    </div>
  )
}
