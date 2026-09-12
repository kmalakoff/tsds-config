## tsds-config

Shared TypeScript and Biome configuration for projects using ts-dev-stack. The package exports `tsconfig.json` and `biome.json`.

Install it as a development dependency:

```bash
npm install --save-dev tsds-config
```

Extend the TypeScript configuration in your project's `tsconfig.json`:

```json
{
  "extends": "tsds-config/tsconfig.json"
}
```

Extend the Biome configuration in `biome.json`:

```json
{
  "extends": ["tsds-config/biome.json"]
}
```

Use these presets with the commands and project layout described in [ts-dev-stack](https://www.npmjs.com/package/ts-dev-stack).
