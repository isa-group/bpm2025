import { execSync } from 'node:child_process';
import type { LiteralUnion } from 'type-fest';

const encoding = 'utf8';

const monorepoRoot = execSync('npm prefix', {
  encoding
}).trim();
const packagePaths = (() => {
  const listing = JSON.parse(execSync('npm query .workspace', {
    encoding,
    cwd: monorepoRoot
  }));

  const relation = new Map<string, string>();

  for (const list of listing) {
    if (list.path && list.name) {
      relation.set(list.name, list.path);
    }
  }

  return relation;
})();

/**
 * Gets the path of a monorepo package
 */
export function getPackagePath(
  packageName: LiteralUnion<'bpm2025-website', string>
): string | undefined {
  return packageName === 'bpm2025-website'
    ? monorepoRoot
    : packagePaths.get(packageName);
}
