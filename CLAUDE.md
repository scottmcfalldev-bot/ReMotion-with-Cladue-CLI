# B-roll Kit (Remotion)

## Brand Configs (`brands/`)

Each client has a JSON file in `brands/` (e.g. `brands/bmp.json`). When
producing an asset plan from a transcript, read the matching brand file and
use its values for all render props instead of template defaults.

**Matching rule:** compare each path segment of the transcript file (case-insensitive)
against brand filenames (without `.json`). First match wins.
Example: `/Pods/BMP/Episodes/26_...srt` → `brands/bmp.json`.

Brand file fields: `name`, `primaryColor`, `accentColor`, `textColor`,
`backgroundColor`, `fontFamily`, `fontWeight`.

Reusable Remotion "B-roll kit" for quick one-off animated overlays for podcast
videos edited in **DaVinci Resolve Studio 21** on macOS. The owner is not a
hand-coder — Claude writes all code; the owner tweaks via natural language or
the Remotion Studio props panel.

Consult the Remotion best-practices skill at
`.agents/skills/remotion-best-practices/` before writing or editing any
Remotion code.

## Conventions

- **Defaults: 1920x1080 @ 30fps.** Every template is registered twice in
  `src/Root.tsx`: landscape under its plain id (e.g. `Counter`) and a 9:16
  vertical 1080x1920 variant under `<id>-Vertical` (e.g. `Counter-Vertical`).
- **Transparent by default.** Templates never bake in a background. Every
  template has an optional `backgroundColor` prop (plain `z.string()`, default
  `"transparent"`) for full-frame use. Keep it as `z.string()`, not `zColor()`,
  so `"transparent"` stays valid.
- **Props via zod.** Every template exports: the component, a zod `schema`
  (use `zColor()` from `@remotion/zod-types` for real colors → color picker in
  Studio), and a `<name>DefaultProps` object. Templates whose duration depends
  on a prop (e.g. `durationInSeconds`, `totalSeconds`) also export a
  `calculateMetadata` function.
- **Animation style** (per the Remotion skill): drive motion from
  `useCurrentFrame()` + `interpolate()` with `extrapolate*: 'clamp'`; springs
  only for physics feel. Individual CSS transform props (`scale`, `translate`,
  `rotate`) instead of `transform` strings. CSS transitions/animations are
  forbidden — they don't render.
- **Minimal dependencies**: remotion, @remotion/cli, @remotion/zod-types,
  react, react-dom, zod, typescript. Ask before adding anything else.
- Shared constants (FPS, sizes, default font stack) live in `src/constants.ts`.

## Commands

```bash
npm run dev                          # Remotion Studio (preview + props panel)
npm run typecheck                    # tsc --noEmit

# Render for DaVinci Resolve (ProRes 4444 .mov WITH ALPHA) into ./out/:
npm run overlay -- <CompositionId>

# Render full-frame H.264 .mp4 into ./out/:
npm run fullframe -- <CompositionId>

# Extra remotion flags pass through, e.g. custom props:
npm run overlay -- Counter --props='{"from":100,"to":0,"durationInSeconds":5}'

# Render into a per-episode subfolder (out/42_Jane Doe/):
npm run overlay -- Counter --out-dir="42_Jane Doe"
```

Output filenames are `out/<CompositionId>_<mode>_<timestamp>.<ext>` — nothing
gets overwritten. Per-episode renders go in `out/<number>_<guest name>/`,
named after the transcript file (no "ep" prefix; anything after the guest
name is dropped). Both scripts are thin wrappers around
`scripts/render.mjs`, which adds the codec flags (overlay = `--codec=prores
--prores-profile=4444 --pixel-format=yuva444p10le --image-format=png`).

## Templates (src/templates/, one file each)

| Composition id | Props |
|---|---|
| `Counter` | from, to, durationInSeconds, suffix, fontSize, color, fontFamily, fontWeight, easing (`linear`\|`easeOut`), backgroundColor |
| `CountdownTimer` | totalSeconds (drives duration), color, fontSize, backgroundColor |
| `ProgressBar` | fromPercent, toPercent, barColor, trackColor, height, borderRadius, showLabel, backgroundColor |
| `BigStatReveal` | value, label, color, accentColor, backgroundColor |
| `LowerThird` | name, title, accentColor, textColor, backgroundColor |

Append `-Vertical` to any id for the 9:16 variant.

## Adding a new template

1. Create `src/templates/<Name>.tsx` exporting: `<name>Schema` (zod),
   `<Name>Props` type, `<name>DefaultProps`, the `<Name>` component, and — if
   duration should follow a prop — `calculate<Name>Metadata`.
2. Component renders inside `<AbsoluteFill style={{backgroundColor}}>` with no
   other background. Size things relative to the composition
   (`useVideoConfig()`, percentages) so both orientations look right.
3. Register it twice in `src/Root.tsx` (Landscape folder + Vertical folder,
   `<id>-Vertical`).
4. `npm run typecheck`, then eyeball it in Studio or render a still:
   `npx remotion still <id> --frame=30 --scale=0.25 /tmp/check.png`.
5. Add a row to the table above.

## Verifying alpha in renders

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,pix_fmt <file.mov>
```

`pix_fmt` must start with `yuva` (the `a` = alpha) for overlay renders. The
encoder reports `yuva444p12le` because ProRes 4444 is 12-bit internally, even
though the render flag requests `yuva444p10le` — both are correct.
