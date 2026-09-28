# DUSKWARD — Task Checklist

Derived from `GAME-PLAN.md`. Tick as you go. Hour estimates assume ~43 productive hours/month at 10–15 h/week. **Total ≈ 1,300–1,700 h ≈ 24–30 months.**

Legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Phase 0 — Prototype (Months 0–2 · ~80 h)

**Goal: prove the light/sound/detection loop feels good. Nothing else matters yet.**

- [ ] Install Godot 4.x; complete the official "Your first 2D game" tutorial (~6 h)
- [ ] Set up git + GitHub + Git LFS; commit the empty project
- [ ] Player controller: 8-way move, sneak/walk/sprint, crouch (~8 h)
- [ ] Lamp: 3 states (off/dim/bright), oil counter draining at different rates (~6 h)
- [ ] `Light2D` + `LightOccluder2D` on a test room; confirm walls block the cone (~4 h)
- [ ] Guard: patrol route via `NavigationAgent2D`, cone, hearing radius (~12 h)
- [ ] Detection: awareness meter 0–100, fill-rate multipliers (light, distance, speed, cover) (~10 h)
- [ ] Noise event system with radius table (~6 h)
- [ ] Alarm FSM: Idle → Suspicious → Alert → Hunt → Search → Reset, with 60 s decay (~10 h)
- [ ] Focus mode (slow-mo + visible cones/rings) (~4 h)
- [ ] One Hollow that hunts by sound and cannot cross lit ground (~6 h)
- [ ] Placeholder SFX: footsteps ×3 speeds, glass, alarm, Hollow shriek (~4 h)
- [ ] **Playtest with 3 friends.** Only question: *"Was it obvious why you were caught?"* (~2 h)
- [ ] Tune until the answer is yes, every time (~10 h)

**Phase 0 DoD:** a greybox room where you can sneak past a guard in the dark, get spotted for a reason you can name, and escape the alarm.

---

## Phase 1 — Vertical Slice (Months 2–5 · ~170 h)

**Goal: one complete, start-to-finish mission with every system present in rough form.**

- [ ] Hatch shader: paper grain + luminance cross-hatching + ink bleed (~16 h) ⭐ *highest-leverage task in the project*
- [ ] Tilemap pipeline + Emberford + Hollow Road tilesets, flat-coloured (~30 h)
- [ ] Player character: 4 directions × 6 anims, flat art (~20 h)
- [ ] Guard + Hollow art and animation (~16 h)
- [ ] Hideout scene + 6 station props + interaction UI (~16 h)
- [ ] Hidespots: lockers, reed, floorboards, hay carts, corpses (~8 h)
- [ ] Lure throwing + saboteable objects (bell, gate, generator, breaker) (~10 h)
- [ ] Silent takedown (non-lethal) + body hide (~8 h)
- [ ] Items/recipes/resources as JSON → typed Resources (~10 h)
- [ ] Inventory + equip + durability/repair UI (~10 h)
- [ ] Save/load (JSON, versioned) + autosave at safe corners (~8 h)
- [ ] Field Notes / bestiary unlock screen (~6 h)
- [ ] One scripted mission with objective → exfil, objective markers, quest log (~10 h)
- [ ] Main menu, pause, settings, accessibility options (~8 h)
- [ ] Build pipeline: Windows + Linux export (~4 h)

**Phase 1 DoD:** a stranger finishes the mission, can explain each detection, and wants to play another.

---

## Phase 2 — Validate (Months 5–7 · ~85 h)

- [ ] 10–20 external playtest sessions; record time-seen per player (~15 h)
- [ ] Iterate detection fairness, Focus mode, alarm decay (~20 h)
- [ ] Difficulty sliders wired to real values (~8 h)
- [ ] Steam page live: 5 screenshots, capsule, short description, wishlist (~6 h)
- [ ] First trailer (30 s, a near-miss clip) (~10 h)
- [ ] GitHub Actions: auto-build Windows/Linux on push (~8 h)
- [ ] Start the devlog cadence: every 2 weeks (~18 h over the phase)

---

## Phase 3 — Production (Months 7–17 · ~450 h)

### Systems
- [ ] Lamp Bench + oil crafting chain
- [ ] Full weapon/tool set (slingshot, crossbow darts: sleep/noise/tranq, bolas, caltrops, snare, oil slick, smoke, flash-mirror) (~30 h)
- [ ] Companion follow/order + companion survival tracking
- [ ] Faction reputation system + price/quest gating
- [ ] Disguise system
- [ ] Hidden stats: Ghost / Clean Hands / Kept
- [ ] Audio manager with positional audio + occlusion + alarm stings
- [ ] Adaptive music: 4 alert layers × light level
- [ ] Localisation pipeline (gettext or JSON keys) + EN/CN/JA

### Content
- [ ] Zones 1–12 blockout → final art pass (~30–50 h each)
- [ ] 18–22 missions/quests incl. 3 faction chains
- [ ] 25–30 enemy variants + counters
- [ ] Boss 1: Choir Mother · Boss 2: Sister Cradle (light/dark phases) · optional boss
- [ ] 8–10 NPCs, ~60 recipes, 40 items
- [ ] 4 endings + secret ending + epilogue slides
- [ ] Side content: collectibles, Field Notes entries, optional companion arcs

### Art/audio
- [ ] Remaining tilesets + prop kits (~6 palettes)
- [ ] Remaining character art
- [ ] Commission/license music + SFX ($2–5k)

---

## Phase 4 — Polish (Months 17–20 · ~130 h)

- [ ] Balance pass: oil economy, detection tuning, mission pacing
- [ ] Accessibility: colourblind modes, remapping, subtitle options, reduced flicker
- [ ] Performance: light budget, occlusion culling, low-end device tier
- [ ] Full playthrough bug sweep + crash reporting
- [ ] Localisation review pass by native speakers
- [ ] Steam Deck verify + controller support
- [ ] Feature complete freeze

---

## Phase 5 — PC Launch (Months 20–26 · ~200 h)

- [ ] Public demo for Steam Next Fest
- [ ] Wishlist campaign to 7,000–10,000
- [ ] Small-streamer key batches, devlog cadence
- [ ] Early Access launch at $14.99
- [ ] 3–6 months of EA: bugfix, balance, community feedback
- [ ] 1.0 launch at $19.99

---

## Phase 6 — Mobile Port (Months 26–30 · ~170 h)

- [ ] Touch control scheme + haptics + tap-to-hide
- [ ] UI scaling and safe-area handling
- [ ] Performance pass on mid-range Android
- [ ] Android build + store assets + Google Play ($25)
- [ ] iOS build via macOS CI runner + Apple Developer ($99/yr)
- [ ] Mobile monetisation: $6.99 full unlock, no ads during stealth
- [ ] Mobile launch + simultaneous PC/mobile update cadence

---

## Standing weekly rhythm (protects against the 30-month risk)

- [ ] **3 × 90 min** focused sessions per week, same days, same time
- [ ] One shippable thing per week (a build, a GIF, a system)
- [ ] Devlog post every 2 weeks
- [ ] Never open a new system before the current phase's DoD is met
