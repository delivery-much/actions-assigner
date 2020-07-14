# @delivery-much/actions-assigner

Assign and request review functions are defined in [github.js](src/github.js).

If `reviewers` or `team-reviewers` are not set, the Action will only auto assign the PR.

## Inputs

| Name | Description | Example |
| --- | --- | --- |
| `token` | **Required if using team-reviewers** A `repo` scoped personal access token. [Why](https://github.com/peter-evans/create-pull-request/issues/155#issuecomment-611904487). [Create one here](https://github.com/settings/tokens/new). | ${{ secrets.GH_TOKEN }} |
| `reviewers` | GitHub usernames, separated by comma | user1,user2,user3
| `team-reviewers` | Organization team names, separated by comma | backend

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
          team-reviewers: backend
```
