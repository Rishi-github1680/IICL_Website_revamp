# Claude Code tooling setup

Everything needed to replicate this machine's Claude Code tooling on another account.
Captured 2026-07-27 from a working install (gstack v1.60.1.0).

## Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code)
- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/) v1.0 or newer
- [Node.js](https://nodejs.org/) — required on Windows

## 1. Install gstack (terminal)

Third-party skill suite by Garry Tan. Source: https://github.com/garrytan/gstack

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup
```

Installs to `~/.claude/skills/gstack`. The `./setup` step also builds the headless
Chromium daemon that `/browse` and `/qa` depend on, so don't skip it.

What you get (UI/design relevant):

| Skill | What it does |
|---|---|
| `/design-review` | Designer's eye QA — finds spacing, hierarchy, and consistency problems, then fixes them |
| `/design-shotgun` | Generates multiple design variants, opens a comparison board, iterates on feedback |
| `/design-consultation` | Proposes a full design system: aesthetic, typography, color, layout, spacing, motion |
| `/design-html` | Generates production-quality HTML/CSS |
| `/browse` | Headless Chromium — screenshots, responsive captures, console/network inspection |
| `/qa` and `/qa-only` | Walks user flows and reports (or fixes) bugs |
| `/benchmark` | Performance regression detection |
| `/plan-design-review` | Design critique of a plan, before any code is written |

Plus non-UI skills: `/review`, `/ship`, `/investigate`, `/office-hours`, `/spec`,
`/autoplan`, `/cso`, `/retro`, and others. Run `/gstack` to list them all.

## 2. Add the official marketplace and plugins (inside Claude Code)

These are built-in slash commands — type them into Claude Code, not the terminal.

```
/plugin marketplace add anthropics/claude-plugins-official
/plugin install frontend-design@claude-plugins-official
/plugin install playground@claude-plugins-official
/plugin install project-artifact@claude-plugins-official
/plugin install code-simplifier@claude-plugins-official
```

The first two lines match the current account exactly. The last three are additions:

- **frontend-design** — guidance for distinctive UI/UX implementation so new work
  doesn't read as templated defaults
- **playground** — self-contained single-file HTML explorers with visual controls and
  live preview. Useful for tuning 3D motion constants with sliders instead of
  edit-rebuild-screenshot cycles
- **project-artifact** — generates a tabbed project status page for stakeholders
- **code-simplifier** — refines code for clarity and consistency without changing behavior

## 3. Optional external MCP plugins

Third-party. Anthropic does not control what's inside these and cannot verify they
behave as intended — check each plugin's homepage before installing.

```
/plugin install context7@claude-plugins-official
/plugin install playwright@claude-plugins-official
```

- **context7** — pulls version-specific library documentation from source repos.
  Handy for Three.js API questions pinned to the exact installed version
- **playwright** — Microsoft's browser automation MCP server. Overlaps heavily with
  gstack's `/browse`; only worth it if you specifically want its e2e test format

## Verify the install

```
/gstack     → lists available gstack skills
/plugin     → shows installed plugins and marketplaces
```

## Keeping it current

- **gstack:** run `/gstack-upgrade`. Do not `git pull` by hand — the setup step
  rebuilds the browser daemon, and a bare pull leaves it stale
- **plugins:** re-run `/plugin install <name>@claude-plugins-official` to update

## Notes

- gstack is a third-party repository, not an Anthropic product
- gstack has a "team mode" that commits itself into a project so collaborators pick it
  up automatically. That requires the project to be a git repository —
  `IICL_Website_revamp` currently is not one
- `/code-review ultra` is a user-triggered, billed multi-agent cloud review. It has to
  be run by you; Claude cannot launch it
