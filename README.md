# setup-captain

This is a GitHub action for using setting up `captain` in your job.

## Inputs

### `version`

The version of `captain` to install. Defaults to `v1`. Possible values are `v1`,
`latest`, or a semantic version number.

`latest` will look up the latest release across all major versions.

`v1` refers to the latest release with major version 1, i.e. `v1.x.x`.

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

