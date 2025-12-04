import fs from 'fs';
import path from 'path';
import url from 'url';

// Compatible __dirname resolution (works in ESM and CJS)
const __dirname = path.dirname(typeof __filename === 'undefined' ? url.fileURLToPath(import.meta.url) : __filename);

// Find package root by looking for package.json
function findPackageRoot(startDir: string): string {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      try {
        const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
        if (pkg.name === 'tsds-config') {
          return dir;
        }
      } catch {
        // Ignore parse errors
      }
    }
    dir = path.dirname(dir);
  }
  // Fallback: assume dist/esm/ or dist/cjs/ structure
  return path.resolve(startDir, '..', '..');
}

const root = findPackageRoot(__dirname);

export const biomeConfigPath = path.join(root, 'biome.json');
export const tsconfigPath = path.join(root, 'tsconfig.json');

export default {
  biomeConfigPath,
  tsconfigPath,
};
