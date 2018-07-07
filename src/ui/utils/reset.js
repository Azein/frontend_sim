export const common = `
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
`

export const control = `
  font-family: inherit;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
`

export const list = `
  list-style: none;
`
export const quote = `
  quotes: none;
  &:before, &:after {
      content: '';
      content: none;
  }
`

export const table = `
  border-collapse: collapse;
  border-spacing: 0;
  table, caption, tbody, tfoot, thead, tr, th, td {
    ${common}
  }
`
