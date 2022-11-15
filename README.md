# setup-captain

This is a GitHub Action for installing the Captain CLI.

For more information on Captain see https://www.rwx.com/captain

For documentation on using the CLI see https://www.rwx.com/captain/docs

## Inputs

### `version`

The version of `captain` to install. Defaults to `v1` - alternatively, a
semantic version number can be supplied as well (e.g. `v0.7.1`)

## Example usage

### Recommended
```yaml
uses: rwx-research/setup-captain@v1
```

### Pinned to a specific CLI version
```yaml
uses: rwx-research/setup-captain@v1
with:
  version: 0.7.1
```

