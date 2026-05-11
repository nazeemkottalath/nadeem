export const C = {
  navy:        '#1a2744',
  navyLight:   '#253460',
  gold:        '#8B6914',
  white:       '#ffffff',
  offWhite:    '#f7f8fa',
  border:      '#dde2ec',
  borderDark:  '#c0c8d8',
  textPrimary: '#1a2744',
  textBody:    '#374151',
  textMuted:   '#6b7280',
  textFaint:   '#9ca3af',
  red:         '#c0392b',
  green:       '#276749',
}

export const IS = {
  width: '100%',
  background: C.offWhite,
  border: `1px solid ${C.borderDark}`,
  borderRadius: 6,
  padding: '10px 12px',
  color: C.textPrimary,
  fontSize: '0.95rem',
  boxSizing: 'border-box',
  outline: 'none',
  fontFamily: 'inherit',
}

export const TS = { ...IS, resize: 'vertical', lineHeight: 1.7 }
