// Retourne une icône unicode ou emoji selon le type d'IO ou le nom symbolique
export function getIOIcon(type?: string, symbolicName?: string): string {
  if (!type) return '';
  if (type === 'AI' || /temp/i.test(symbolicName || '')) return '🌡️';
  if (type === 'AI' && /hum/i.test(symbolicName || '')) return '💧';
  if (type === 'DI' || /bp|bouton|switch/i.test(symbolicName || '')) return '💡';
  if (type === 'DO' && /relais|ventilateur|fan/i.test(symbolicName || '')) return '🔌';
  if (type === 'DO') return '💡';
  return '';
}