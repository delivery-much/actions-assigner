# @delivery-much/actions-assigner

Assign and request team review functions are defined in [github.js](src/github.js).

## Inputs

### `token`

**Required** A `repo` scoped personal access token. [Why](https://github.com/peter-evans/create-pull-request/issues/155#issuecomment-611904487).

### `team`

**Required** GitHub organization team name.

## Example workflow

- Create a file `pull-request.yml` in `.github/workflows/` directory with the following content:

```yaml
name: pull-request
on:
  pull_request:
    types: [opened, reopened]
jobs:
  assign:
    runs-on: ubuntu-latest
    steps:
      - uses: delivery-much/actions-assigner@v1
        with:
          token: ${{ secrets.GH_TOKEN }}
          team: backend
```