export const matrixTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '4C9855' },
    { token: 'string', foreground: '24FF00' },
    { token: 'keyword', foreground: '00FF41' },
    { token: 'number', foreground: '2FE6C7' },
    { token: 'operator', foreground: '00FF41' }
  ],
  colors: {
    'editor.background': '#0D0208',
    'editor.foreground': '#00FF41',
    'editor.lineHighlightBackground': '#00FF4120',
    'editor.selectionBackground': '#00FF4140',
    'editorCursor.foreground': '#00FF41',
    'editorLineNumber.foreground': '#00FF4180'
  }
};