# DUSKWARD — playable prototype (HTML5 / Canvas 2D)

A single-file, dependency-free browser prototype that proves the core loop of the
game described in [`../GAME-PLAN.md`](../GAME-PLAN.md):

> **Light keeps the dark out. Light tells them where you are.**

## Run it

Open `index.html` directly in a browser, or serve the folder:

```bash
cd prototype && python3 -m http.server 8080
# then open http://localhost:8080
```

## Controls

| Key | Action |
|---|---|
| `WASD` / arrows | move |
| `Shift` | sprint — fast, **noisy** (guards hear you) |
| `Ctrl` / `C` | sneak — slow, quiet, harder to see |
| `L` | cycle lamp **OFF → DIM → BRIGHT** (burns oil) |
| `Tab` (hold) | focus — slow motion, reveals every vision cone and hearing ring |
| `R` | restart |

## Objective

Reach the marked **furnace district** in the far corner. Four guards patrol fixed
routes; two Hollow roam the dark. There is no shooting.

## What this prototype demonstrates

| System | How it works here |
|---|---|
| **Light as a resource** | Lamp has 3 states with different radii and oil burn rates. Oil is finite; flasks are scattered in the level. |
| **Light vs. stealth tension** | Lit = safe from the Hollow, but human detection runs at **2.6×**. Unlit = nearly invisible to humans (**0.06×**), but the Hollow hunts you. |
| **Vision cones** | Real raycast occlusion against the tile grid — cones wrap around corners and stop at walls, so you can always see *why* you were seen. |
| **Noise** | Sprinting emits a 230 px noise event that raises awareness even with no line of sight. |
| **Awareness, not binary** | 0–100 meter driven by `LIGHT × SPEED × DISTANCE`. Guards escalate `PATROL → SUSPICIOUS → HUNT → SEARCH`, then decay after 9 s unseen. |
| **The Hollow** | Hunts sound, cannot abide light — it flees when you're lit and shrieks to raise the alarm. |
| **Darkness rendering** | One offscreen canvas: fill black, punch holes with `destination-out` radial gradients at every light, then an additive warm pass. |
| **Focus mode** | Slow-mo + full cone/hearing reveal — the "read the puzzle" verb that keeps stealth fair. |

## Tests

```bash
node prototype/test-logic.js     # 20 assertions, headless, no browser needed
```

The harness extracts the `<script>` block, stubs the DOM/canvas, and drives the
real `update()` loop. It caught three genuine bugs during development: ragged map
rows, a helper name colliding with the canvas width variable, and `reset()` not
restoring guard spawn positions.

## Deliberately NOT in the prototype

Combat, crafting, inventory, saves, dialogue, stealth takedowns, hidespots, loot,
companions, and all 12 zones. Those are Phase 1–3 work in the plan. This file exists
to prove the *feel* of the light/sound loop before any content is built.
