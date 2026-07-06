# dummy-fixed-monorepo

A dummy fixed-mode pnpm workspaces monorepo to test [simple-release](https://github.com/TrigenSoftware/simple-release) flows in real conditions.

- Project type: [`@simple-release/pnpm#PnpmWorkspacesProject`](https://github.com/TrigenSoftware/simple-release/tree/main/packages/pnpm#readme) with `mode: fixed`
- Release automation: [simple-release-action](https://github.com/TrigenSoftware/simple-release-action)
- Publishes `@trigensoftware/dummy-fixed-monorepo-{foo,bar,baz}` to GitHub Packages, all with the same version
- `bar` depends on `foo` through the `workspace:` protocol
- Maintenance branches are enabled in [`.simple-release.json`](.simple-release.json)

## Test scenarios

### Regular release

Push a `feat(foo): ...` or `fix(bar): ...` commit to `main`. The action creates or updates a single release pull request bumping all packages to the same version. Merge it to tag (`vX.Y.Z`), publish all packages, and create a GitHub release.

### Manual release (version bump form)

Actions → Release → Run workflow. Fill in `version`, `as`, `prerelease`, or `by-project` (e.g. `{"@trigensoftware/dummy-fixed-monorepo-foo":{"skip":true}}`) to shape the bump.

### Options via pull request comment

Comment on an open release pull request:

````md
!simple-release/set-options

```json
{
  "bump": {
    "prerelease": "alpha"
  }
}
```
````

### Snapshot release

Actions → Snapshot → Run workflow. Publishes temporary snapshot versions of all packages (timestamped prerelease) to GitHub Packages under the given npm tag without committing anything.

### Maintenance branches

Release a new major (e.g. `1.x` → `2.0.0`) — a `v1` maintenance branch is created from the previous release tag. Then push a `fix: ...` commit to `v1` — the release pull request will target `v1` and the release will be published from it under the `release-1.x` npm tag without touching `latest`.
