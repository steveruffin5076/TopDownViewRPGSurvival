# DUSKWARD — Full Game Plan
### A stealth-first, colourised spiritual successor to *Ares Virus*

**Working title:** DUSKWARD (alternates: *Pale Lantern*, *Emberfall*)
**Status:** Pre-production plan · **Author:** built from the Ares Virus research report in this repo
**Date:** 28 Sep 2026

---

## 1. Decisions locked (from our Q&A)

| Decision | Choice | Consequence for this plan |
|---|---|---|
| Platforms | Mobile **and** PC | PC ships first; mobile is a **port**, not a parallel build |
| Engine | Beginner → **Godot 4.x** | See §9 for why |
| Team / time | Solo, part-time (~10–15 h/wk) | Timeline is **24–30 months to dual-platform launch** |
| Stealth style | **Real-time** stealth: cones, noise, hiding, alarms | Core loop is light/sound management, not gunplay |

> If any of these change, §13 (scope triage) tells you what to cut first.

---

## 2. The pitch (one paragraph)

The sun stopped rising twelve years ago. Nine cities survive around nine great Furnaces, and everything between them is the **Duskward** — a dark full of things that hunt by sound. You play **Ves**, a courier for the Lantern Order, sworn to carry sealed flame between the cities. On a routine run you discover your cargo is not oil but a **Wick** — a child born the night the sun failed, whose body keeps a furnace burning for forty years — and that the Order has been manufacturing Wicks as fuel. Hunted by the Order that raised you, burned by the raider cult that wants the Lantern destroyed, and stalked by what lives in the black, you have to walk the Duskward with one lamp, a finite tank of oil, and a child who cannot walk fast.

**Tagline:** *Light keeps the dark out. Light tells them where you are.*

### Design pillars (every feature must serve at least one)
1. **Every step is a decision about light and sound.** Moving, seeing, and being safe are three separate currencies.
2. **You are never unarmed — you are outmatched.** Combat is a failure state with a real cost, never the optimal path.
3. **The world remembers.** Alert level, bodies found, who lived, faction standing — all persist and shape the ending.
4. **Colour is information.** Warm/saturated = lit, exposed, human-controlled. Cold/desaturated = hidden, unlit, dangerous.
5. **Survival is a resource, not a punishment.** Hunger debuffs stamina but never kills; food never rots; checkpoints are generous. (This is exactly what Ares Virus players praised.)

---

## 3. How this differs from Ares Virus

| Ares Virus | DUSKWARD |
|---|---|
| Monochrome ballpoint-pen ink, blood-red accent only | **Full colour**, hand-inked line work, per-zone palettes |
| Twin-stick assault, crafted ammo, durability tanks | **Stealth-first**; weapons are mostly non-lethal tools |
| Enemy = Infestors + "Locust" gang, gunfights | Enemies = **guards with cones + the Hollow (sound-hunters)**; both must be managed differently |
| Antibody / virus / traitor-scientist story | **The Dimming** / the Wick / the Order — low-fantasy, grounded, no virus |
| One shelter only (top complaint) | **Three regional hideouts** + fast travel |
| Rough machine-translated English (top complaint) | **Professional localisation** EN / 简体中文 / 日本語 from day one |
| Frozen after v1.0.9 in 2022 (abandonware) | **Data-driven JSON content**, patch cadence, public roadmap |

Everything below keeps the *Ares Virus* backbone that made it work — free-roam quest structure, shelter crafting stations, a bestiary, durability and upgrade tiers, choice-driven open ending, forgiving survival — so it reads as the same family of game while playing completely differently.

---

## 4. Story, characters, factions

### 4.1 Premise
Twelve years ago the sun failed over the continent of **Vess**. It was not an explosion; the light simply stopped arriving. Civilisation contracted to nine furnace-cities. The Lantern Order — part church, part utility — maintains the flame, and quietly maintains the Wicks.

### 4.2 Cast
| Character | Role | Ares Virus analogue |
|---|---|---|
| **Vesna "Ves" Kolar** | Player character. Order courier ("a Wick-runner"). Practical, not a soldier. | Neil |
| **The Lantern / "Little"** | The cargo: a 9-year-old Wick. Silent, warm, and the only thing that can rekindle a furnace. | the antibody sample |
| **Halloran** | Order lamp-tender who pulls you from the wreck and hides you. **Dusk-touched** (wasting sickness from dark exposure). Refuses the cure, because the cure consumes the Lantern. | Bodden |
| **Captain Rell** | Ashwarden officer. Blows the bridge behind you to stop the Choir and is presumed dead. **Returns in the finale.** | Captain K |
| **Sister Cradle** | The Order's Keeper of Wicks. Created the Wick program. Final boss — dusk-touched, fused to a furnace. | the Biologist |
| **The Choir Mother** | Cinder Choir leader. Wants the Lantern unmade, not used. | Camp Leader |
| **Tam** | A Choir defector who becomes an optional companion and your best source of Choir intel. | — |

### 4.3 Factions & reputation
- **Lantern Order** — theocratic, control light distribution, best gear, worst morals.
- **Ashwardens** — city militia; will trade with anyone; run the waystations.
- **Cinder Choir** — dark-worshipping raiders; burn furnaces; their camps are stealth playgrounds.
- **The Hollow** — not a faction. The things in the Duskward. Hunt by sound, cannot cross lit ground.
- Reputation is a per-faction score that changes shop prices, quest availability, who shows up in the finale, and two of the four endings.

### 4.4 Endings (4)
1. **Keep the Flame** — deliver the Lantern. The cities burn forty more years. The Wick program continues. Vesna is made a Sister. *(Bitter, "safe" ending.)*
2. **Share the Dark** — free the Lantern and re-light the furnaces with Choir mirror-lamps. Hardest path, most lives saved, ends the Wick program. *(True ending — requires faction balance + companion survival.)*
3. **Snuff** — destroy the Lantern. The Hollow recede permanently, the cities go dark, Vesna vanishes into legend. *(Sacrifice.)*
4. **The Wick's Choice** *(secret)* — unlocked by the optional "Nine Small Rooms" quest chain. The child speaks, and chooses. Unlocks a per-NPC epilogue slide for everyone you kept alive.

**Design note (Ares Virus parity):** the end card reads *"Open ending. Your choices decided who else survived."* Track three hidden stats across the whole game: **Ghost** (missions undetected), **Clean Hands** (no kills), and **Kept** (companions alive). No score is ever shown to the player until the end card.

---

## 5. Core systems — the stealth loop (the heart of the game)

### 5.1 Light model
The player carries a **lamp** with three states and a finite **oil** resource.

| State | Radius | Oil drain | Effect |
|---|---|---|---|
| **Off** | 0 | 0 | Invisible to humans (≈20% detection rate). The Hollow aggro within 350 px and hunt you. |
| **Dim** | ~90 px | 1 oil / 40 s | Hollow will not approach within 220 px. Normal human detection. |
| **Bright** | ~200 px | 1 oil / 12 s | Safe zone widens; **human detection rate ×2.5**. Reveals hidden loot and clues. |

- Oil starts at 3, caps at 10, crafted at the **Lamp Bench** (animal fat + resin + wick cloth).
- **Ambient light** (furnaces, street lamps, fires, generator bulbs) is part of level design. Many zones have a **breaker** you can cut — a risk/rerew trade, because cutting light also lets the Hollow in.
- Light is occluded by walls (`LightOccluder2D`), so cones are blocked honestly. The player must always be able to *see* why they were seen.

### 5.2 Detection (humans)
Guard brain is a small **FSM**: `Idle / Patrol → Suspicious → Alert → Hunt`, plus `Search` and `Reset`.

- **Awareness meter** 0–100, filled by line-of-sight inside the cone.
- Fill rate multipliers: distance (near = fast), **light level** (in the dark ≈ 0.15×, in your lamp ≈ 2.5×), player movement (sneak 0.4×, walk 1×, sprint 2.5×), crouched in cover ≈ 0.1×.
- Guards also have a **hearing radius** with a noise event system (§5.3).
- **Focus mode** (hold `Tab` / right-stick click): time slows slightly, all cones and hearing rings become visible. Used sparingly — it is the "read the puzzle" verb, and it drains a small stamina slice so it cannot be spammed.
- **Fairness rule:** if a guard spots you, the player must be able to name the cause. Every factor is either visible in Focus mode or telegraphed by audio.

### 5.3 Noise events
| Event | Radius |
|---|---|
| Footstep (sneak / walk / sprint) | 60 / 130 / 220 px |
| Broken glass, knocked crate | 500 px |
| Gunshot | 900 px — raises zone-wide alarm |
| Body dropped | 200 px |
| Oil fire lit | 400 px |
| The Hollow's shriek | 700 px — **attracts other Hollow** |

### 5.4 Alarm escalation
Three tiers — **Curious → Searching → Hunt**. Each tier increases patrol density, closes gates, and lights more lamps. It **decays** after 60 s of being unseen, so an alert is a problem you can escape rather than a game-over. Hunt state opens a timed extraction window; escaping resets to tier 1.

### 5.5 Player stealth verbs
`sneak` · `crouch` · `hide` (lockers, tall reed, under floorboards, hay carts, **inside corpses**) · `throw lure` (coin, stone, bone — pulls a patrol off route) · `cut light` · `sabotage` (alarm bell, gate winch, generator) · `distract` (meat for dogs) · `silent takedown` (non-lethal: choke, sleep dart, bolas) · `lethal takedown` (raises Clean Hands cost) · `hide body` · `wear disguise` (found on bodies; guards of equal rank won't spot you, **officers see through it**).

### 5.6 Enemy archetypes & counters
| Archetype | Threat | Counter |
|---|---|---|
| **Sentry** | Lantern + cone, slow turn | Cut the lamp, or flank in the dark |
| **Hound** | Smell — ignores darkness and cover | Meat lure, smoke, crosswind |
| **Officer** | Sees through disguises, checks hidespots | Stay out of direct LoS entirely |
| **Heavy** | Armoured, slow turn, alarm horn | Lure into hazards / oil slicks |
| **Sniper-Nun** | Long cone across open ground | Use light-occluding geometry |
| **Hollow – Stalker** | Sound-hunter, fast in black | Stay lit, or move only while it shrieks |
| **Hollow – Chorus** | Screams, calls more Hollow | Kill fast (the only loud solution) |
| **Boss: Sister Cradle** | Fused to furnace, light-and-dark phases | Phase = manage both systems at once |

### 5.7 Why this is not just "Ares Virus with quieter guns"
In Ares Virus the loop is *loot → craft → fight harder*. In DUSKWARD the loop is **scout → plan → move light and sound → extract**. Crafting feeds *options* (more oil, better darts, quieter boots) rather than *damage*. Weapons are tools for avoiding conflict.

---

## 6. Survival, crafting and RPG layer (Ares Virus parity)

- **Hideouts (3, one per region)** — each with **6 stations**: Workbench, Sewing Table, Forging Table, Med-Bench, Kitchen, **Lamp Bench** (new).
- **Resources:** scrap, cloth, chemicals, hardwood, animal parts, oil, batteries, sealed glass.
- **Blueprints** from loot, trade, and quest rewards. Stations upgrade through tiers.
- **Durability + repair + "intensified" upgrade tier** — same language players already understand.
- **Hunger/thirst → stamina debuff only.** Never death. Food never spoils. (Deliberate: this was a praised Ares Virus trait.)
- **Saves:** autosave at hideouts and at "safe corners" in every zone; manual save anywhere (stealth needs checkpoints more than survival games do).
- **Field Notes** — the bestiary. Unlocks enemy weaknesses, drops and a "recommended approach" line, exactly like Ares Virus' Monster Manual.
- **Companions** (up to 2 travelling with you) with simple follow/order verbs. Their survival is tracked for the ending.
- **Quest log** with clear markers and optional "hint" text — fixing Ares Virus' vaguest complaint.

---

## 7. Structure and content scope

| Act | Zones | Purpose |
|---|---|---|
| **I — The Run** | Hideout (collapsed waystation), Hollow Road | Teach light + sound. 1 tutorial-zone mission set. |
| **II — Emberford** | Waystation town, Outer yards | Hub, traders, quests, faction intro. |
| **III — The Choir** | Choir camp, Bone Orchard | Full infiltration playground, boss 1. |
| **IV — Deep Dark** | The Hollow nest, Sunken rail | Light becomes scarce; horror act. |
| **V — Furnace City** | Order quarter, The Furnace, Rooftops | Finale, all factions converge, boss 2 + secret boss. |

**Totals:** 12 zones · 18–22 missions/quests · **15–18 h main story, 22–26 h completionist**.
25–30 enemy variants · 40 weapons/items · ~60 recipes · 8–10 NPCs · 2 bosses + 2 optional.
(Scoped down from Ares Virus' 38 zones / 30+ hours on purpose — see §13.)

---

## 8. Art direction — "coloured ink"

**Look:** hand-drawn black contour lines + hatching over **flat colour**, with paper grain and a per-zone colour grade. Readable at mobile resolution, distinctive in a Steam capsule.

**Colour language (gameplay-critical):**
- **Warm / saturated** = lit, exposed, Order-controlled.
- **Cold / desaturated** = dark, hidden, Hollow territory.
- **Blood-red** = interactive/important (the one inherited accent from Ares Virus).

**Zone palettes:** Emberford sodium-amber vs teal shadow · Choir camp rust-orange and bone-white · Hollow nest near-monochrome blue-black with magenta Hollow accents · Furnace City white-hot vs soot.

**The key technical trick for a solo dev — the Hatch Shader:**
Author art **flat** (clean shapes, no hatching) and apply a screen-space-relative shader that adds cross-hatching density from luminance plus paper grain and subtle ink bleed. You get the sketchbook look on every asset *after* it's made, at zero per-asset art cost. Budget 1–2 weeks to build and tune; it pays for itself across ~600 assets.

**Production rules:** 64×64 tiles, 4-directional characters (mirrored), 6 anims each (idle, walk, sneak, interact, takedown, hide). Props built as a small kit and recombined. Bake static light into textures; reserve dynamic lights for the player lamp, guard lanterns, fires and alarm effects.

---

## 9. Technical plan — Godot 4.x

**Why Godot over Unity for you:** free (no licence or runtime-fee risk), tiny and fast to iterate (matters when you have 12 h/week), genuinely good 2D lighting and shadows (the core of this game), simple export to Windows/Linux/Android/iOS/Web from one project, and GDScript is the friendliest language for a first-time engine user. Unity is the safer long-term hire/marketplace bet, but the learning overhead and project weight are the wrong trade for solo part-time.

**Architecture**
- **GDScript (typed)**, scene composition, one scene = one system.
- **Autoloads:** `GameState`, `SignalBus`, `SaveManager`, `Audio`, `Localization`, `SceneRouter`.
- **Data-driven content:** items, recipes, enemies, dialogue and patrol routes as **JSON/CSV** imported into typed `Resource` classes. You author content in a spreadsheet and the game reads it. This is what makes a solo dev fast, and it opens the door to community mods.
- **Dialogue:** a small custom JSON runner, or the **Dialogic** plugin (pin the version — plugin breakage is a real risk on a long project).
- **Guard AI:** `NavigationAgent2D` + hand-rolled FSM. Avoid behaviour-tree plugins until you need them.
- **Detection:** raycasts from guard to player against the occluder layer, run staggered at 10–20 Hz per guard; ~20 guards per zone max.
- **Lighting:** raise the per-canvas dynamic light limit in Project Settings and budget ~8–16 active lights per view; bake the rest.
- **Save:** JSON snapshot of world state + player; versioned with a migration function.
- **VCS:** git + GitHub with **Git LFS** for art/audio.
- **CI:** GitHub Actions building Windows/Linux/Android on every push; macOS runners for iOS.
- **Steam Deck:** controller support + verify (Godot handles this well; just budget the pass).

**Controls**
- **PC:** WASD move · Shift sneak · Ctrl crouch · L lamp cycle · F interact · Q lure · E takedown · Tab focus · mouse aim for throws.
- **Mobile:** left virtual stick, right button cluster (lamp, sneak toggle, interact, lure, takedown), tap-to-hide, haptics on detection. No virtual joystick camera drag.
- **Accessibility:** colourblind-safe cone patterns, toggle-vs-hold for everything, difficulty sliders (detection speed, alarm persistence, oil drain), full remapping, directional audio indicators, subtitle sizes, reduced-flicker mode.

**Platform costs (real money):** Steam Direct $100 (recoupable) · Apple Developer $99/yr · Google Play $25 one-off · **an iOS build needs macOS + Xcode** — use a GitHub Actions macOS runner, a cloud Mac, or borrow one. Budget music/SFX at $2–5k (commissioned or licensed) and localisation at $1–3k for three languages.

---

## 10. Monetisation & publishing

- **PC:** Early Access at **$14.99** → **$19.99** at 1.0, 3–6 months in EA. Demo for Steam Next Fest.
- **Mobile (port, month ~27):** free to download with a **single $6.99 "full unlock"** IAP plus optional tip jars. **No ads during stealth** (an ad break destroys the core loop), rewarded ads only on the mission-complete screen. No energy timers, no loot boxes. Ares Virus' restrained monetisation is exactly why it's still loved — copy that, don't copy the genre default.
- **Store page:** get it live as soon as you have 5 screenshots and a capsule, long before you feel ready. Wishlist target before launch: **7,000–10,000**.
- **Build in public:** devlog every 2 weeks, short-form clips of *near-misses* (stealth games market themselves), r/gamedev + r/indiegames, small-streamer key batches.

---

## 11. Timeline (solo, 10–15 h/week)

**The honest math:** ~43 productive hours/month. A tileset costs 20–40 h, a fully animated character 12–20 h, a blockout-to-finished zone 30–50 h, a scripted mission 10–20 h. Twelve zones alone ≈ 480 h ≈ **11 months**. Add systems, story, polish and it lands at 24–30 months. The plan is built to survive that, not to deny it.

| Phase | Months | Deliverable |
|---|---|---|
| **0 — Prototype** | 0–2 | Godot basics + a greybox room proving light, sound and guard detection *feel* right. Nothing else. |
| **1 — Vertical slice** | 2–5 | One complete mission: hideout → Hollow Road → objective → exfil, all systems present in rough form. |
| **2 — Validate** | 5–7 | 10–20 external playtests, iterate on detection fairness. Steam page live, first trailer. |
| **3 — Production** | 7–17 | All 12 zones, story, NPCs, bosses, crafting, localisation. |
| **4 — Polish** | 17–20 | Balance, accessibility, performance, bugfix. Feature complete. |
| **5 — PC launch** | 20–26 | Demo + Next Fest → Early Access → 1.0 on Steam. |
| **6 — Mobile port** | 26–30 | Touch controls, performance pass, store assets, mobile launch. |

**Vertical slice Definition of Done:** a stranger can finish the mission, describe why they were caught each time, and want to play another one.

---

## 12. Risks and mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| Scope explosion | **Critical** | §13 cut list; 12 zones is already the floor; ship 8 if behind |
| Solo burnout over 30 months | **Critical** | Fixed 3-session weekly rhythm, public accountability, never skip Phase 0 fun |
| Art throughput | High | Hatch shader, prop kits, 4-directional characters, buy/commission tilesets where cheaper than your time |
| Stealth AI feels unfair | High | Focus mode, telegraphed states, 60 s decay, 20+ playtest sessions |
| iOS build blocked (no Mac) | Medium | Ship Android first; use CI macOS runners; defer iOS |
| Mobile perf with many lights | Medium | Light budget, baked static light, occlusion culling, low-end device tier |
| Plugin breakage mid-project | Medium | Pin versions, minimise plugins, keep dialogue/save systems in-house |
| Rough translation (AV's worst sin) | Medium | Human translators, native review pass, no MT shipping |
| Dual-platform QA doubling | Medium | Sequential launches, single codebase, automated builds |

---

## 13. Scope triage — cut in this order

1. iOS at launch (Android first)
2. Secret ending + optional boss
3. Disguise system (fold into a single quest reward)
4. Companion orders (reduce to "follow / stay")
5. Side quests beyond 2 per zone
6. Zones 11–12 (act as a shorter finale)

**Never cut:** the light/sound core loop, Focus mode, alarm decay, one finished zone, the main story through Act V.

---

## 14. Open questions for you (answer when convenient)

1. Confirm the setting — is the "failed sun" premise the direction you want, or would you prefer something more grounded/contemporary (a quarantined city, a research station, a generation ship)?
2. Preferred tone: grim and quiet (This War of Mine-ish) or adventurous with dark edges (Ares Virus-ish)?
3. Is this a portfolio/passion project or do you intend to sell it? (Changes how much polish and localisation matter.)
4. Any hard deadline or event you're aiming at (a game jam, a graduation, a release window)?
5. Do you already have any art or code skills, or is Godot your first engine?

---

## 15. Immediate next steps (this week)

1. Install Godot 4.x, do the official "Your first 2D game" tutorial (≈6 h).
2. Build the **one-room prototype**: a player with a lamp, one guard with a cone, one Hollow. No art — coloured rectangles. Target: 2 sessions.
3. Playtest it on 3 friends. Ask only one question: *"Was it obvious why you were caught?"*
4. Open the Steam page (free, do it now — it costs nothing and starts the clock).
5. Set up git + GitHub + LFS, and a 3×90-minute weekly slot in your calendar.

The companion checklist with per-phase tasks and hour budgets is in **`GAME-PLAN-TASKS.md`**.
