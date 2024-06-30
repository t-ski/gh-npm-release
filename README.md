# GitHub + NPM Release

Simple NPM package release with a linked redirect to GitHub Releases.

``` console
npm i -D t-ski/gh-npm-release
```

## CLI

``` console
npx ghnpm <type|type-shorthand>
```

| Release Type | `type` | `type-shorthand` |
| :- | :- | :- |
| Major |`--major` | `-M` |
| Minor | `--minor` | `-m` |
| Patch | `--patch` | `-p` |

> The command `ghnpm` has an alias `release`.

### Examples

``` console
npx ghnpm --major
```

> 🫧 A release requires the git working directory to be clean.

<sub>package.json</sub>
```
{
  "scripts": {
    "release": "npx release",
    "release:minor": "npm release -- -m",
    "release:patch": "npm release -- -p"
  }
}
```

``` console
npm run release:patch
```

## API

``` ts
release(type: Type): void
```

``` ts
enum Type {
    MAJOR,
    MINOR,
    PATCH
}
```

### Example

``` js
const ghnpm = require("@t-ski/gh-npm-release");

const ghnpm.release(gnr.Type.MINOR);
```

## Abstract Procedure

1. 🏷️ Bump package version:
    1. Increase version according to specified Semver type.
    2. Create a related git tag `v<version>`.
2. 📢 Publish package to NPM registry.
3. 🔗 Open GitHub Releases with tag information.

> 💡 In case of an error during the procedure, the version bump is reverted.

##

<sub>&copy; Thassilo Martin Schiepanski</sub>