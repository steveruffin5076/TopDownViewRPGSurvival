# DUSKWARD — Development Progress & Phase Plan

**Project:** DUSKWARD — a stealth-first, colourised successor to *Ares Virus*
**Working doc for:** continuing development in **Cursor AI**
**Last updated:** 28 Sep 2026
**North star:** *Light keeps the dark out. Light tells them where you are.*

### The three things this document optimises for

| Pillar | What it means in practice | Measured by |
|---|---|---|
| **EXCITEMENT** | Every action gives immediate, readable feedback; tension rises and releases; the player feels clever | Playtesters say "one more try" without prompting; time-to-first-gasp < 2 min |
| **REPLAYABILITY** | Multiple valid solutions per situation; scores to chase; choices that change outcomes | Testers voluntarily replay a level 3+ times and try a *different* route |
| **IMMERSIVE STORY** | The world tells its own story through light, sound, objects and consequence — not cutscenes | Testers can retell the story back to you without being told it |

---

## 1. How to use this document

1. **Work one phase at a time, in order.** Do not start Phase N+1 until Phase N is signed off.
2. **Each phase ends with a Test Plan.** You are the *director and tester* — run it yourself, log bugs, send them back for fixing.
3. **The gate rule:** a phase is complete only when every test case passes (or is explicitly waived by you in the sign-off log). No exceptions — this is what stops a 30-month solo project from rotting.
4. **Cursor AI:** paste the relevant phase section into Cursor as the task brief. Section 5 gives copy-paste prompts and hard rules.
5. **Always run the automated test after any change:** `node prototype/test-logic.js` — 20 assertions must stay green.

---

## 2. Current progress audit (verified 28 Sep 2026)

### What exists and works

`prototype/index.html` — a single 598-line, zero-dependency HTML/Canvas file. **It runs and is playable.**

| System | Status | Notes |
|---|---|---|
| Tile world + follow camera | ✅ Done | 56×30 map, built from explicit segments so row widths can't drift |
| Movement (walk / sprint / sneak) | ✅ Done | Sprint is noisy, sneak is slow and quiet |
| **Lamp** (OFF / DIM / BRIGHT) | ✅ Done | Different radii + oil burn rates; oil is finite; flasks in-level |
| **Light vs. stealth tension** | ✅ Done | Lit = safe from Hollow, human detection ×2.6. Unlit = human detection ×0.06, Hollow hunts you |
| **Vision cones with real occlusion** | ✅ Done | 26 raycasts/guard against the tile grid — cones wrap corners, stop at walls |
| **Awareness meter** | ✅ Done | 0–100, driven by `LIGHT × SPEED × DISTANCE`; HUD names the cause (`LIT`/`CLOSE`/`MOVING`/`NOISE`) |
| **Noise events** | ✅ Done | Sprint emits a 230 px noise radius; heard without line of sight |
| **Guard FSM** | ✅ Done | `PATROL → SUSPICIOUS → HUNT → SEARCH`, alarm tiers 0–3, decays after 9 s unseen |
| **Alarm propagation** | ✅ Done | A sighting pulls nearby guards into investigation |
| **The Hollow** | ✅ Done | Hunts sound, flees light, shrieks to raise the alarm |
| Darkness rendering | ✅ Done | Offscreen canvas: fill black → `destination-out` holes → additive warm pass |
| **Focus mode** | ✅ Done | Hold `Tab`: slow-mo + all cones and hearing rings revealed |
| Win / lose + restart | ✅ Done | Reach the furnace district, or get caught; `R` restarts cleanly |
| Headless logic tests | ✅ Done | `node prototype/test-logic.js` → **20/20 passing**, ~0.04 ms/frame |

**The test harness caught three real bugs during development:** ragged map rows (would have crashed on load), a helper named `W` colliding with the canvas width variable (fatal `SyntaxError`), and `reset()` not restoring guard spawn positions.

### What does NOT exist yet

- Combat, takedowns, hidespots, lures, sabotage, disguises
- Any art beyond coloured rectangles (no hatch shader yet)
- Inventory, crafting, oil economy beyond pickups, hideout, save/load
- Story, characters, dialogue, quests, choices, endings, faction reputation
- More than one zone; no bosses; no progression or scoring
- Audio beyond simple oscillator beeps; no music
- Mobile touch controls; no store build

### Verdict

**Phase 0 (prove the core loop) is complete.** The light/sound/detection thesis works and is provable in two minutes of play. Everything after this is content and depth.

---

## 3. Research findings → enhancement backlog

Findings from design research (sources in §9), each mapped to a concrete backlog item and a phase.

### 3.1 Excitement / game feel
> *"Screen shake is the single highest-impact, lowest-effort improvement you can make… implement it in 30 minutes and your game will feel 50% better instantly."* — egmatic
> *"Every action or event that is even a bit relevant to the player has a little audio or visual cue."* — r/gamedesign on *Nuclear Throne*

- **B1** Screen shake scaled to event, fast decay, **with a reduced-motion toggle** (accessibility is explicitly called out in the research). → Phase 1
- **B2** Hit-stop 40–80 ms on heavy moments (a takedown landing, an alarm bell). → Phase 1
- **B3** Layered audio with ±10–15% pitch variation so repetition never fatigues; **every** action gets a sound. → Phase 1
- **B4** Particles on every verb (footstep dust, oil hiss, dart impact, alarm sparks). → Phase 1
- **B5** "Close call" moment: when a guard's cone sweeps within a few pixels of you, time dilates briefly and the audio ducks — the single best tension beat in stealth. → Phase 1
- **B6** Camera look-ahead and a subtle zoom punch on alarm escalation. → Phase 1

### 3.2 Replayability
> *"At every moment in gameplay you should have many options available to you."* / *"Complex, intertwining playground leads to multiple approach and retreat routes. It helps greatly in replayability."* — r/truegaming
> *Mark of the Ninja*: point-scoring tiers per level, hidden collectibles that tell backstory, New Game+ that re-frames the same levels at max difficulty.

- **B7** Multiple verbs that solve the *same* problem (lure vs. cut-the-light vs. wait vs. go around). Never one solution. → Phase 2
- **B8** Per-mission score and rank tiers (S/A/B/C) shown on the results screen. → Phase 6
- **B9** Hidden collectibles that carry story fragments, so exploration is rewarded with narrative. → Phase 4
- **B10** New Game+ / "Duskward+" with harder detection and scarcer oil. → Phase 6
- **B11** Optional mission objectives (ghost, no-kill, time, no-alarm) as replay hooks. → Phase 6
- **B12** Seeded daily run (fixed map + guard seed) so players compare scores. → Phase 6 (stretch)

### 3.3 Immersion & story
> *Ready or Not* tells "an intricate and deeply emotional story… entirely through environmental storytelling without using any cutscenes," with a team under 30. Lighting and colour are used to guide emotion.
> *"A crumpled note in a wastepaper basket carries more narrative impact than a cutscene because the player's active role in discovering it makes the moment feel earned rather than delivered."*

- **B13** Zero-cutscene story: notes, graffiti, set dressing, audio logs, NPC barks. → Phase 4
- **B14** Colour as narrative: zone palettes shift with story state (Emberford amber → Choir rust → Hollow blue-black). → Phase 4
- **B15** Choices with visible consequences: who lives, faction standing, and which of 4 endings you get. → Phase 6
- **B16** "Designer hugs" — small authored vignettes (a corpse shielding a smaller one) that cost little and make the world feel real. → Phase 4
- **B17** Ludonarrative resonance: scarcity of oil *is* the story's theme (a world running out of light). → Phase 4/5

### 3.4 Stealth fairness (protects all three pillars)
> *"It should be obvious when an enemy is panicked, when he's alert, when he's patrolling… challenging enough to be threatening, but predictable enough that you can execute stealth consistently."*
> *"Not auto-fail on detection, but being seen puts you at a severe disadvantage."*

- **B18** Never auto-fail on detection — you can break line of sight and recover. (Already true; keep it true.)
- **B19** Every guard state is visually and audibly distinct. → Phase 3
- **B20** Sound visualisation: show noise as expanding rings so the game is playable on mute (*Mark of the Ninja*'s best trick). → Phase 1

---

## 4. Target architecture (do this refactor in Phase 1)

The single file works at 598 lines. It will not survive 12 zones. Cursor should split it into ES modules — **no build step, no dependencies**:

```
prototype/
  index.html              boot + <canvas> + HUD DOM
  src/
    main.js               loop, timeScale, frame pacing
    state.js              game state, reset(), save/load (Phase 5)
    map.js                map building from segment helpers, tile queries, pathfinding
    player.js             movement, lamp, oil, stealth state
    guard.js              FSM, patrols, detection maths, alarm propagation
    hollow.js             sound-hunter behaviour
    stealth.js            verbs: hide, lure, takedown, sabotage (Phase 2)
    light.js              darkness overlay, light pools, colour grading
    render.js             all canvas drawing
    audio.js              WebAudio synth layer, pitch variation, music states
    input.js              keyboard + (Phase 8) touch
    ui.js                 HUD, results screen, menus
    juice.js              shake, hitstop, particles, close-call slow-mo (Phase 1)
    data/
      maps.json           zone maps as data, not code
      items.json          items + recipes (Phase 5)
      dialogue.json       story content (Phase 4)
  test-logic.js           headless harness — keep green, extend per phase
```

**Rules:** `<script type="module">` (requires a local server — `python3 -m http.server 8080`), keep `update(dt)` and `draw()` separated, entities stay plain `{x, y, r}` objects, all tunables live in named constant tables at the top of their module (like `LAMP` and `LIGHT_MUL` today), and content lives in `data/*.json` so it is editable without touching code.

---

## 5. Cursor AI working rules

**Paste this into Cursor's rules / `.cursorrules` file:**

```
PROJECT: DUSKWARD — 2D top-down stealth game, vanilla JS + Canvas 2D, NO dependencies, NO build step.
STYLE: ES modules under prototype/src/. Keep update(dt) and draw() separate. Entities are plain
{x,y,r} objects. Tunables go in named const tables at the top of their module. Content goes in
prototype/src/data/*.json — never hardcode content into logic.
TESTING: `node prototype/test-logic.js` must stay green (20 assertions). Every new system needs a
new assertion in that file. Never delete an assertion to make it pass.
GATE: One phase at a time from progress.md. Do not start the next phase until the current phase's
test plan is signed off.
NO new npm packages. NO engines. NO frameworks. Canvas 2D + WebAudio only.
PERF: keep update() under 2ms/frame; the game must run on a 5-year-old Android.
ACCESSIBILITY: reduced-motion, colourblind-safe indicators, remappable keys, subtitle sizes.
```

**Good phase prompt template:**

> Read `progress.md` sections 2 and Phase N. Implement only the tasks listed for Phase N.
> Do not touch other phases. Split `prototype/index.html` into the module structure in
> section 4 first if you haven't. Add assertions to `prototype/test-logic.js` for every new
> behaviour. Then give me the test plan from Phase N so I can test it.

**Bad prompt (avoid):** "add a bunch of cool stuff" / "make the game bigger" — this is how a solo
project dies. Always reference a phase number.

---

## 6. Phase plan

Each phase: **objective → tasks → acceptance criteria → test plan (for you) → gate.**
Phases are ordered by impact-per-hour, not by comfort.

---

### PHASE 1 — Feel & Feedback (Juice) · *Excitement*

**Why first:** the research is unanimous — juice is the highest impact-per-hour work in game
development, and it must be built *before* content, on grey rectangles, or you'll polish twice.
Right now the prototype is *correct* but silent and weightless.

**Tasks**
- [ ] Split `index.html` into the §4 module structure (do this first; everything after depends on it)
- [ ] `juice.js`: screen shake (event-scaled, ~0.15 s decay), hit-stop (40–80 ms), camera look-ahead, alarm zoom punch
- [ ] Particle system: footstep dust, oil hiss, dart/impact bursts, alarm sparks, Hollow shriek rings
- [ ] `audio.js` replacing raw beeps: layered one-shots with ±10–15% pitch variation; footstep audio tied to speed and surface; lamp hiss loop; Hollow directional growl; alarm stings per tier
- [ ] **Close-call moment:** cone sweeps within ~12 px → 0.25 s time dilation, audio duck, vignette pulse
- [ ] **Sound visualisation:** noise events render as expanding rings (playable on mute)
- [ ] Results flash: exposure bar pulses red, threat tier banner slams in
- [ ] Accessibility: reduced-motion toggle (kills shake/flash), master volume, subtitle/indicator sizes
- [ ] Extend `test-logic.js` with assertions for shake decay, hitstop timing, audio-gate (no throw when AudioContext unavailable)

**Acceptance criteria**
- [ ] A tester says the game "feels different" within 30 seconds of the previous build, unprompted
- [ ] Every player action produces both a visual and an audio cue
- [ ] Reduced-motion mode removes all shake and flashing with zero loss of information
- [ ] `node prototype/test-logic.js` → 20+ assertions green
- [ ] update() still < 2 ms/frame

**Test plan — run this yourself**

| # | Test | Steps | Expected | Pass criteria |
|---|---|---|---|---|
| 1.1 | Movement feedback | Walk, then sprint, then sneak across 20 tiles | Footstep audio changes with speed; dust particles emit; noise rings only on sprint | All three speeds are audibly and visibly distinct |
| 1.2 | Lamp feedback | Cycle lamp OFF→DIM→BRIGHT×3 | Hiss sound per state; light pool grows; oil drains faster on BRIGHT | Each state has a unique sound and visible radius |
| 1.3 | Close call | Let a guard's cone sweep past you without hitting you | Time dilates ~0.25 s, audio ducks, vignette pulses | You *feel* it; it never fires when you're actually seen |
| 1.4 | Detection feedback | Get spotted from calm | Threat banner slams in, shake + sting, cone turns red | The moment of being seen is unmistakable |
| 1.5 | Alarm decay | Hide after a tier-3 alarm | Music/SFX tension decays over ~9 s; cones return to blue | Decay is audible and readable, not instant |
| 1.6 | Sound visualisation | Sprint behind a wall with the game muted | Expanding noise rings still show where your sound went | You can play correctly on mute |
| 1.7 | Hollow tell | Stand unlit near a Hollow | Directional growl + shriek ring before it reaches you | You always get ≥1 s of warning |
| 1.8 | Reduced motion | Enable reduced-motion, get spotted | No shake, no flash, no dilation — but banner + audio still fire | No information is lost |
| 1.9 | No-audio fallback | Block AudioContext (devtools) and play 2 min | No exceptions, game fully playable | Zero console errors |
| 1.10 | Perf | Play 5 min on the weakest device you have | Steady frame rate, no memory growth | No visible stutter; update < 2 ms |

**Gate:** all 10 pass (or waived in writing) → **Phase 2**

---

### PHASE 2 — Stealth Verbs & Player Expression · *Excitement + Replayability*

**Why:** the research is blunt — *"at every moment in gameplay you should have many options
available to you."* Right now the only verb is "walk differently". Multiple solutions to the same
problem is the engine of replayability.

**Tasks**
- [ ] **Hidespots**: lockers, reed, floorboards, hay carts. Enter/exit, guard search behaviour when a hidespot is suspected
- [ ] **Lures**: throw stone/coin/bone to pull a patrol off route (costs a turn of vulnerability)
- [ ] **Silent takedown** (non-lethal default): choke, sleep dart, bolas — with body-hide requirement
- [ ] **Lethal takedown** as an explicit, costly choice (raises the hidden `Clean Hands` counter)
- [ ] **Sabotage**: cut a lamp/breaker (plunges the area into darkness — helps you, invites the Hollow), ring an alarm bell to redirect guards, jam a gate
- [ ] **Body disposal**: drag and hide bodies; a found body raises alarm and spawns investigation
- [ ] Verb wheel / hotbar UI with cooldowns and resource costs
- [ ] Each verb gets full Phase-1 juice (sound, particles, hitstop)
- [ ] Assertions for every verb: state transitions, noise emission, alarm effects

**Acceptance criteria**
- [ ] Every guard encounter in the prototype map can be solved at least **three** different ways
- [ ] A verb that fails (wrong range, wrong state) gives clear feedback, never a silent no-op
- [ ] Lethal vs non-lethal is a *meaningful* choice tracked from the first minute
- [ ] No verb can be spammed to trivially win

**Test plan**

| # | Test | Steps | Expected | Pass criteria |
|---|---|---|---|---|
| 2.1 | Hide | Enter a hidespot as a guard approaches | Guard walks past; cone does not register you | Undetected 3/3 attempts |
| 2.2 | Suspect hidespot | Hide, then let a guard *see* you enter | Guard investigates that spot specifically | Investigation targets the right tile |
| 2.3 | Lure | Throw a stone behind a patrol | Patrol breaks route, investigates the noise | Route change is visible and predictable |
| 2.4 | Takedown | Silent takedown from behind at correct range | Hitstop, sound, body drops, `Clean Hands` intact | Works first try; no debug artefacts |
| 2.5 | Body found | Leave a body in a lit corridor | Next guard finds it → alarm tier 2 + investigation | Consequence is real and readable |
| 2.6 | Body hidden | Drag the body into a hidespot | No alarm | Rewards the extra effort |
| 2.7 | Cut the light | Sabotage a lamp | Area goes dark; Hollow aggros; human detection drops | Both effects fire; you can feel the trade |
| 2.8 | Alarm bell | Ring a bell far from your route | Guards converge there; your path clears | A genuine tactical option, not a gimmick |
| 2.9 | Three solutions | Same guard, three runs: lure / hide / sabotage | All three succeed | Proves the design pillar |
| 2.10 | Fail feedback | Use a verb out of range/on cooldown | Clear "can't do that" cue | Never a silent failure |
| 2.11 | No exploit | Spam every verb on cooldown | No infinite-stun, no free passage | Verbs have real cost |

**Gate:** all 11 pass → **Phase 3**

---

### PHASE 3 — Guard AI Depth & Data-Driven Levels · *Immersion + Replayability*

**Why:** *Mark of the Ninja*'s designer notes that 2D stealth has no corners to break line of sight,
so the *player* needs movement verbs and the *level* needs structure. And levels must become data,
or you can never build 12 of them.

**Tasks**
- [ ] Move maps into `data/maps.json` with a small ASCII-authoring format + the segment helpers
- [ ] Guard archetypes with distinct counters: **Sentry** (lantern, slow turn), **Hound** (smell — ignores darkness), **Officer** (sees disguises, checks hidespots), **Heavy** (armoured, slow, alarm horn)
- [ ] Guard-to-guard communication: radio call, line-of-sight relay, shared last-known-position
- [ ] Investigation behaviour: search last-known-position with expanding radius, then give up
- [ ] Cover points / navigation hints so guards path believably around props
- [ ] Grid A* pathfinding (replaces direct steering), with wall-slide fallback
- [ ] Patrol route **visualisation tool** (dev overlay: draw routes, cones, cover — press `F3`)
- [ ] Zone lighting presets + colour grading per zone
- [ ] Assertions: pathfinding never enters walls, archetype counters work, alarm propagation is bounded

**Acceptance criteria**
- [ ] Guards never walk through walls or get permanently stuck (test 3.7 runs 10 min)
- [ ] Each archetype has a documented counter the player can discover
- [ ] A new zone can be authored by editing JSON only — zero code changes
- [ ] `F3` overlay makes level debugging possible without reading code

**Test plan**

| # | Test | Steps | Expected | Pass criteria |
|---|---|---|---|---|
| 3.1 | New zone from JSON | Add a zone in `maps.json`, load it | Appears and plays with no code edit | Content-only change |
| 3.2 | Archetype counters | Test each archetype vs its documented counter | Counter works; wrong approach fails | All 4 archetypes verified |
| 3.3 | Hound vs dark | Sneak past a Hound in full darkness | It still finds you (smell) | Darkness is not a universal answer |
| 3.4 | Officer vs hide | Hide from an Officer | It checks your hidespot | Archetype identity matters |
| 3.5 | Alarm propagation | Get spotted by one guard in a 4-guard zone | Others converge on last-known-position, not telepathically on you | Bounded, believable response |
| 3.6 | Investigation | Break line of sight after a sighting | Guards search the area, then give up and resume patrols | Full loop returns to calm |
| 3.7 | Stuck test | Run 10 min with all guards active | No guard pinned to a wall or jittering | Zero stuck states |
| 3.8 | Pathfinding | Guards path around new props | Smooth routes, no corner clipping | Visually clean |
| 3.9 | F3 overlay | Toggle the dev overlay | Routes, cones, cover, alarm radius all drawn | You can debug a level without code |
| 3.10 | Zone grading | Enter each zone | Palette shifts; colour carries story state | Distinct, intentional looks |

**Gate:** all 10 pass → **Phase 4**

---

### PHASE 4 — Story, Characters & Environmental Storytelling · *Immersion*

**Why:** *Ready or Not* proves a sub-30-person team can tell a deep, emotional story with **zero
cutscenes**, entirely through environment, lighting and detail. That is the cheapest, most immersive
path available to a solo dev — and it's the one Ares Virus players would have wanted.

**Tasks**
- [ ] Dialogue system in `data/dialogue.json`: nodes, conditions, consequences, no engine dependency
- [ ] **Notes / letters / graffiti / audio logs** as collectible story fragments (reward exploration — see B9)
- [ ] Set-dressing system: authored props that tell a story (the "designer hug" vignettes)
- [ ] NPC barks and idle conversation that react to world state and your reputation
- [ ] Colour-as-narrative pass: zone palettes shift with story progress
- [ ] Quest log with clear objectives *and* an optional "hint" line
- [ ] Implement the Act structure from `GAME-PLAN.md` §7 as 5 authored acts with named NPCs (Ves, the Lantern, Halloran, Captain Rell, Sister Cradle, the Choir Mother, Tam)
- [ ] Companion follow/order verbs; companion survival tracked
- [ ] Assertions: dialogue conditions resolve, collectibles persist in save, quest state machine can't dead-end

**Acceptance criteria**
- [ ] A tester can retell the story back to you after one playthrough **without** you explaining it
- [ ] Every story beat is discoverable through play, not through a cutscene
- [ ] No quest can become unfinishable (state machine is acyclic or has escape hatches)
- [ ] At least 10 story fragments are hidden in optional, explorable places

**Test plan**

| # | Test | Steps | Expected | Pass criteria |
|---|---|---|---|---|
| 4.1 | First 5 minutes | Play cold, no instructions | You know who you are, what you carry, and why it matters | Tester answers correctly unprompted |
| 4.2 | Retell test | Finish a act, then describe the story back | Coherent narrative emerges from play alone | No cutscene needed |
| 4.3 | Collectibles | Find 5 hidden fragments | Each adds story; none are required to progress | Optional content feels valuable |
| 4.4 | Set dressing | Walk through a furnished room | The room tells you who lived/died there | Story readable without text |
| 4.5 | NPC reaction | Change faction standing, talk to the same NPC | Dialogue and prices change | World reacts to you |
| 4.6 | Companion | Recruit a companion, lose them, retry | Their survival is tracked and referenced later | Choices have weight |
| 4.7 | Quest integrity | Abandon a quest mid-way, return later | Quest resumes or closes cleanly | No dead ends, no softlocks |
| 4.8 | Colour narrative | Progress the story, revisit an early zone | Palette and lighting reflect the new state | Visual storytelling lands |
| 4.9 | No-cutscene audit | Watch a full playthrough | Story is delivered by play, never by a non-interactive scene | Zero cutscenes |
| 4.10 | Localisation readiness | Extract all strings | 100% of text comes from data, none hardcoded | Translation-ready |

**Gate:** all 10 pass → **Phase 5**

---

### PHASE 5 — Survival, Crafting & RPG Layer · *Progression (Ares Virus parity)*

**Why:** this is the backbone that made *Ares Virus* a 30-hour game instead of a 2-hour one, and the
oil economy is already thematically perfect — scarcity of light *is* the story.

**Tasks**
- [ ] Inventory + equip UI; drag/assign on mobile later
- [ ] Resources: scrap, cloth, chemicals, hardwood, animal parts, **oil**, sealed glass
- [ ] Recipes as JSON; blueprints from loot, trade and quests
- [ ] Hideout with 6 stations (Workbench, Sewing, Forging, Med-Bench, Kitchen, **Lamp Bench**) — 3 regional hideouts, not one (fixes Ares Virus' biggest complaint)
- [ ] Durability + repair + "intensified" upgrade tier
- [ ] Hunger/thirst → stamina debuff only; food never spoils (forgiving by design)
- [ ] Save/load: JSON snapshot, versioned with a migration function; autosave at hideouts and "safe corners"
- [ ] Fast travel between discovered hideouts (fixes the backtracking complaint)
- [ ] Assertions: save→load round-trip is lossless, recipes can't produce negative resources, economy can't be duped

**Acceptance criteria**
- [ ] A full loop works: mission → loot → craft → upgrade → harder mission
- [ ] Save/load round-trips with zero drift across 3 consecutive cycles
- [ ] No resource can be duplicated or driven negative
- [ ] Progression is visible: the player can name what got stronger

**Test plan**

| # | Test | Steps | Expected | Pass criteria |
|---|---|---|---|---|
| 5.1 | Core loop | Loot → craft → upgrade → replay a cleared area | Clear power delta; area feels different | Tester notices the change unprompted |
| 5.2 | Recipe validity | Attempt every recipe with insufficient resources | Clean refusal with a reason | No negative inventories |
| 5.3 | Durability | Use a tool to breaking, repair, intensify | Repair and upgrade both work; costs are sane | Numbers hold up over 30 min |
| 5.4 | Hunger | Starve the character | Stamina debuff only — never death, food never rots | Matches the design pillar |
| 5.5 | Save/load | Save at 3 points, reload each | Identical world, inventory, quest and flags | Zero drift ×3 cycles |
| 5.6 | Version migration | Load a save from an older build | Migrates or fails cleanly with a message | No corrupt states |
| 5.7 | Hideouts | Travel between 3 hideouts | Fast travel works; each has all 6 stations | No forced backtracking |
| 5.8 | Economy dupe | Try to dupe resources via trade/craft/save | Impossible | No exploit found in 20 min |
| 5.9 | Oil scarcity | Play 30 min without picking up flasks | Oil becomes a real strategic constraint | Tension without frustration |
| 5.10 | Mobile UI | Resize to a phone viewport | Inventory and stations usable | No clipped or unreachable UI |

**Gate:** all 10 pass → **Phase 6**

---

### PHASE 6 — Choices, Endings & Replay Systems · *Replayability*

**Why:** this is where replayability is actually manufactured. Three hidden stats, faction
reputation, four endings, and per-mission scoring give the player a reason to run it again — and the
research says roguelite-style meta-loops are what turn a finished game into a habit.

**Tasks**
- [ ] Hidden persistent stats: **Ghost** (missions undetected), **Clean Hands** (no kills), **Kept** (companions alive) — never shown until the end card
- [ ] Faction reputation (Order / Ashwardens / Choir) affecting prices, quests, and who appears in the finale
- [ ] Consequence system: choices change NPC availability and zone state
- [ ] **Four endings**: Keep the Flame / Share the Dark / Snuff / The Wick's Choice (secret)
- [ ] Per-mission results screen: time, detections, kills, oil used, optional objectives → S/A/B/C rank
- [ ] **New Game+ ("Duskward+")**: harder detection, scarcer oil, carried-over unlocks
- [ ] Optional mission objectives as replay hooks (ghost / no-alarm / no-kill / speedrun)
- [ ] Seeded daily run (fixed map + guard seed) with a local best score — stretch goal
- [ ] Assertions: ending conditions resolve correctly for every stat combination, NG+ modifiers apply, ranks compute deterministically

**Acceptance criteria**
- [ ] All 4 endings are reachable and meaningfully different
- [ ] Every optional objective is achievable without sequence breaks
- [ ] Rank calculation is deterministic and explainable
- [ ] A tester voluntarily replays a level to chase a better rank

**Test plan**

| # | Test | Steps | Expected | Pass criteria |
|---|---|---|---|---|
| 6.1 | Ending: Keep the Flame | Deliver the Lantern, high Order standing | Correct ending + epilogue | Matches design doc |
| 6.2 | Ending: Share the Dark | Balance factions, keep companions alive | True ending; Wick program ends | Hardest path is completable |
| 6.3 | Ending: Snuff | Destroy the Lantern | Sacrifice ending; Hollow recede | Distinct outcome |
| 6.4 | Secret ending | Complete the "Nine Small Rooms" chain | The Wick's Choice + per-NPC epilogue slides | Discoverable but not obvious |
| 6.5 | Stat tracking | Play a ghost/no-kill run | Stats accumulate silently; nothing leaks to the HUD | No spoilers mid-run |
| 6.6 | Reputation | Max one faction, min another | Prices, quests and finale cast change | World reacts visibly |
| 6.7 | Results screen | Finish a mission 3 different ways | Rank changes with approach | S rank feels earned, not arbitrary |
| 6.8 | Optional objectives | Attempt each objective solo | All achievable; none contradictory | No impossible combos |
| 6.9 | New Game+ | Finish once, start NG+ | Harder detection, scarcer oil, unlocks retained | Feels like a new game, not a reskin |
| 6.10 | Replay test | Hand the build to a tester with no brief | They replay a level to chase a better rank | **The single most important test in this document** |
| 6.11 | Daily seed | Play the same seed twice | Identical guards/map; score comparable | Deterministic |

**Gate:** all 11 pass → **Phase 7**

---

### PHASE 7 — Content Production · *All three pillars*

**Why:** everything above is machinery. This is the game.

**Tasks**
- [ ] 12 zones across 5 acts (per `GAME-PLAN.md` §7): Hollow Road, Emberford, Choir camp, Bone Orchard, Hollow nest, Sunken rail, Furnace City…
- [ ] 18–22 missions/quests including 3 faction chains
- [ ] 25–30 enemy variants; 2 main bosses (Choir Mother, Sister Cradle) + 2 optional
- [ ] 8–10 NPCs with full dialogue; ~60 recipes; 40 items
- [ ] Art pass: hatch shader over flat colour (highest-leverage art task), 6 tileset palettes, 4-directional characters
- [ ] Audio: commissioned/licensed music + SFX; adaptive layers per alarm tier and light level
- [ ] Content QA: every zone completable ghost / loud / mixed

**Acceptance criteria**
- [ ] 15–18 h main story, 22–26 h completionist
- [ ] Every zone has ≥2 entry routes and ≥1 secret
- [ ] No zone requires a specific verb the player might not have
- [ ] Full playthrough completable without a game-breaking bug

**Test plan**

| # | Test | Steps | Expected | Pass criteria |
|---|---|---|---|---|
| 7.1 | Full clean run | Play start to finish, no debug tools | Completes; no blockers | Zero game-breaking bugs |
| 7.2 | Ghost run | Whole game undetected | Possible, brutally hard but fair | Achievable by a skilled player |
| 7.3 | Loud run | Whole game fighting/alarming | Possible with real cost | Assault is a valid, punished path |
| 7.4 | Mixed run | Alternate styles per zone | No style is soft-locked | Player expression holds |
| 7.5 | Route count | Per zone, count distinct solutions | ≥2 per zone, ≥1 secret | Verified zone by zone |
| 7.6 | Boss 1 | Choir Mother | Telegraphed, counterable, fair | Beatable without a specific verb |
| 7.7 | Boss 2 | Sister Cradle (light/dark phases) | Both systems matter at once | The thesis is the boss fight |
| 7.8 | Art legibility | Play at 50% zoom on a phone | Readable at distance | No visual noise |
| 7.9 | Audio mix | Play with music on, 30 min | Adaptive layers audible; nothing masks cues | Cues always audible |
| 7.10 | Pacing | Log where you got bored | No 10-min dead spots | Director sign-off on pacing |

**Gate:** all 10 pass → **Phase 8**

---

### PHASE 8 — Polish, Accessibility, Localisation & Platform · *Shipping*

**Tasks**
- [ ] Accessibility: colourblind-safe cone patterns, toggle-vs-hold, detection-speed and oil-drain sliders, full remapping, directional audio indicators, subtitle sizes, reduced flicker
- [ ] Localisation: EN / 简体中文 / 日本語 by human translators (Ares Virus' worst-reviewed flaw was machine translation — do not repeat it)
- [ ] Performance pass: light budget, occlusion culling, low-end device tier
- [ ] Touch controls: virtual stick + verb cluster, tap-to-hide, haptics on detection
- [ ] Steam Deck verify + controller support
- [ ] Build pipeline: Windows/Linux/Android exports; Electron or NW.js wrapper for Steam; Capacitor for mobile
- [ ] Store page, trailer, demo, wishlist campaign

**Test plan**

| # | Test | Steps | Expected | Pass criteria |
|---|---|---|---|---|
| 8.1 | Colourblind modes | Play with each mode on | Cones and states still distinguishable | No information lost |
| 8.2 | Difficulty sliders | Set detection to min, oil drain to max | Game still functions and stays tense | Sliders change feel, not break it |
| 8.3 | Remapping | Rebind every key | All actions reachable | No hardcoded keys |
| 8.4 | Mute play | Play 20 min muted | Fully playable via visualisation | No sound-dependent puzzle |
| 8.5 | Translation | Play each language | No overflow, no MT artefacts | Native-speaker sign-off |
| 8.6 | Low-end device | Run on a 5-year-old phone | Playable frame rate | No thermal throttling crash |
| 8.7 | Touch play | Full mission on a phone | All verbs reachable one-handed-ish | No misclicks in 20 min |
| 8.8 | Controller | Full mission on a gamepad | Complete parity | No keyboard-only action |
| 8.9 | Cold boot | Fresh install, first launch | Straight into play, <10 s | No crash, no config step |
| 8.10 | 2-hour soak | Continuous play | No leak, no degradation | Stable memory and frame rate |

**Gate:** all 10 pass → **ship candidate**

---

## 7. Phase gate & sign-off log

| Phase | Status | Date tested | Bugs found | Bugs fixed | Signed off by |
|---|---|---|---|---|---|
| 0 — Core loop prototype | ✅ Complete | 28 Sep 2026 | 3 (all fixed) | 3 | — |
| 1 — Feel & Feedback | ☐ Not started | | | | |
| 2 — Stealth Verbs | ☐ Not started | | | | |
| 3 — AI Depth & Data Levels | ☐ Not started | | | | |
| 4 — Story & Environment | ☐ Not started | | | | |
| 5 — Survival & Crafting | ☐ Not started | | | | |
| 6 — Choices & Replay | ☐ Not started | | | | |
| 7 — Content Production | ☐ Not started | | | | |
| 8 — Polish & Platform | ☐ Not started | | | | |

**Bug log**

| # | Phase | Test case | Description | Severity | Status |
|---|---|---|---|---|---|
| | | | | | |

---

## 8. Decisions still needed from you

1. **Confirm the premise** — the "failed sun / the Wick" setting from `GAME-PLAN.md`, or something more contemporary (quarantine city, research station, generation ship)?
2. **Tone** — grim and quiet (*This War of Mine*) or adventurous with dark edges (*Ares Virus*)?
3. **Is this for sale or portfolio?** Changes localisation and polish budgets.
4. **Art budget** — commission the hatch shader + tilesets (~$2–5k) or hand-make everything?
5. **Phase 1 module split** — do you want Cursor to do the §4 refactor as the very first commit of Phase 1? (Recommended: yes.)

---

## 9. Sources

- Replayability & stealth design: [dualshockers — Best Stealth Games With High Replay Value](https://www.dualshockers.com/best-stealth-games-with-high-replay-value/), [r/truegaming — What makes a stealth game good?](https://www.reddit.com/r/truegaming/comments/i50egx/what_makes_a_stealth_game_good/), [fictionhorizon — 25 Games With The Smartest Stealth Design](https://fictionhorizon.com/25-games-with-the-smartest-stealth-design/)
- 2D stealth specifically: [Destructoid — Interview: Defining 2D stealth in Mark of the Ninja](https://www.destructoid.com/interview-defining-2d-stealth-in-mark-of-the-ninja/), [r/patientgamers — Mark of the Ninja](https://www.reddit.com/r/patientgamers/comments/oc9dqk/mark_of_the_ninja_is_a_fantastic_2d_stealth_platformer/)
- Game feel / juice: [egmatic — How to Make Your Game Feel Good](https://egmatic.com/blog/how-to-make-your-game-feel-good), [resprawn — Making a Game Feel "Juicy"](https://resprawn.medium.com/when-you-play-a-great-game-it-feels-good-d23761b6ecc4), [r/gamedesign — Good examples of game juice?](https://www.reddit.com/r/gamedesign/comments/198fctp/good_examples_of_game_juice_game_feel/)
- Environmental storytelling: [gamedesignskills — Environmental Storytelling in Video Games](https://gamedesignskills.com/game-design/environmental-storytelling/), [Wayline — Reviving Environmental Storytelling](https://www.wayline.io/blog/reclaiming-narrative-reviving-environmental-storytelling), [Medium — Crafting Immersive Narratives in Ready or Not](https://medium.com/@justinwuchingyin/crafting-immersive-narratives-the-art-of-environmental-storytelling-in-ready-or-not-8ffc95a247ab)
- Meta-progression & retention: [Heroic Labs — What Is Meta Game Design?](https://heroiclabs.com/blog/metagame-design-guide/), [Wikipedia — Roguelike](https://en.wikipedia.org/wiki/Roguelike), [gamerant — Roguelites With The Best Progression Systems](https://gamerant.com/roguelite-games-with-best-progression-systems/)
- Original concept: `GAME-PLAN.md` and `Ares-Virus-Research-Report.md` in this repo.
