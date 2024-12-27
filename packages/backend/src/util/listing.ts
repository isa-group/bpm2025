/**
 * Creates an HTML markup, useful for displaying tables
 */
export function generateTableMarkup(
  { name = 'Table', rows = [] }:
  { name?: string; rows: Array<Record<string, unknown>> } = { rows: [] }
) {
  const keys = new Map<string, undefined>();

  for (const row of rows) {
    for (const key in row) {
      keys.set(key, undefined);
    }
  }

  const columns = [...keys.keys()];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <style>
        table { border-collapse: collapse; width: 100%; max-width: 800px; margin: 20px auto; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f5f5f5; }
    </style>
</head>
<body>
  <h1>${name}</h1>
    <table>
        <thead>
            <tr>
                ${columns.map(key => `<th>${key}</th>`).join('\n')}
            </tr>
        </thead>
        <tbody>
            ${rows.map(row => `
            <tr>  
                ${columns.map(key => `<td>${key in row && Boolean(row[key]) ? row[key] : '-'}</td>`).join('\n')}
            </tr>
            `).join('\n')}
        </tbody>
    </table>
</body>
</html>
    `;
}
