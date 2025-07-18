import { isNil } from '@bpm2025-website/shared/validation';

/**
 * Creates an HTML markup, useful for displaying tables
 * @param {Object} options - Options for the table.
 * @param {string} [options.name='Table'] - The title of the table.
 * @param {Record<string, unknown>[]} options.rows - Array of objects representing table rows. Each object key is a column.
 * @param {Record<number, string>} options.colors - Optional. An object mapping row indices to background color values.
 */
export function generateTableMarkup(
  { name = 'Table', description, rows = [], colors = {} }:
  {
    name?: string;
    description?: string;
    rows: Record<string, unknown>[];
    colors?: Record<number, string>;
  } = { rows: [], colors: {} }
) {
  const keys = new Set<string>();

  for (const row of rows) {
    for (const key in row) {
      keys.add(key);
    }
  }

  const columns = [...keys.values()];

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
  ${description ? `<p>${description}</p>` : `<b>Number of rows shown:</b> ${rows.length}`}
    <table>
        <thead>
            <tr>
                ${columns.map(key => `<th>${key}</th>`).join('\n')}
            </tr>
        </thead>
        <tbody>
            ${rows.map((row, index) => `
            <tr ${index in colors ? `style="background-color: ${colors[index]};"` : ''}>  
                ${columns.map(key => `<td>${key in row && !isNil(row[key])
                  ? (() => {
                      const text = String(row[key]).replaceAll('\n', '<br />');

                      if (text.length > 100) {
                        return `<details>${text}</details>`;
                      }

                      return text;
                    })()
                  : '-'}</td>`).join('\n')}
            </tr>
            `).join('\n')}
        </tbody>
    </table>
</body>
</html>`;
}
