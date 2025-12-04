import assert from 'assert';
import fs from 'fs';

import config, { biomeConfigPath, tsconfigPath } from '../../src/index.ts';

// Node 0.8 compatible endsWith
function endsWith(str: string, suffix: string): boolean {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

describe('tsds-config', () => {
  describe('exports', () => {
    it('should export biomeConfigPath', () => {
      assert.ok(biomeConfigPath);
      assert.ok(typeof biomeConfigPath === 'string');
      assert.ok(endsWith(biomeConfigPath, 'biome.json'));
    });

    it('should export tsconfigPath', () => {
      assert.ok(tsconfigPath);
      assert.ok(typeof tsconfigPath === 'string');
      assert.ok(endsWith(tsconfigPath, 'tsconfig.json'));
    });

    it('should export default object with paths', () => {
      assert.ok(config);
      assert.strictEqual(config.biomeConfigPath, biomeConfigPath);
      assert.strictEqual(config.tsconfigPath, tsconfigPath);
    });
  });

  describe('config files exist', () => {
    it('biome.json should exist and be valid JSON', () => {
      assert.ok(fs.existsSync(biomeConfigPath), `biome.json not found at ${biomeConfigPath}`);
      const content = JSON.parse(fs.readFileSync(biomeConfigPath, 'utf8'));
      assert.ok(content.$schema);
      assert.ok(content.formatter);
      assert.ok(content.linter);
    });

    it('tsconfig.json should exist and be valid JSON', () => {
      assert.ok(fs.existsSync(tsconfigPath), `tsconfig.json not found at ${tsconfigPath}`);
      const content = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
      assert.ok(content.compilerOptions);
    });
  });
});
