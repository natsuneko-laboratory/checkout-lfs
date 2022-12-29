# @natsuneko-laboratory/checkout-lfs

GitHub Actions for checkout with external (non-GitHub) LFS storage

## Properties

| Property     | Type      | Required              | Description                                           |
| ------------ | --------- | --------------------- | ----------------------------------------------------- |
| `url`        | `string`  | Yes                   | URL of external LFS storage (or proxy)                |
| `auth`       | `boolean` | No (default: `false`) | Set to `true` if the `url` is required authentication |
| `credential` | `string`  | No (default: `null`)  | Set to credential if the `auth` set to `true`         |

## Usage

```yaml
name: "CI"

on:
  push:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          lfs: false

      - uses: natsuneko-laboratory/checkout-lfs@v1.0.0
        with:
          url: https://git-lfs.natsuneko.moe
          auth: true
          credential: $GITHUB_TOKEN
```

## License

MIT by [@6jz](https://twitter.com/6jz)
