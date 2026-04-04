
# GRRR Documentation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Official website: [grrr.atonalstudio.com](https://grrr.atonalstudio.com)

## About GRRR

GRRR experiment is not a library, it's a consept.

GRRR is a CSS Grid system designed around runtime configuration via CSS custom properties. Rather than baking values into compiled CSS, every sizing decision — columns, gutters, margins, off areas — lives in variables that cascade and inherit like normal CSS. This means a single class can power layouts across breakpoints, themes, and nested contexts without re-compiling.

It pairs naturally with subgrid for nested components and named grid lines for semantic placement. When used consistently it can significantly reduce the CSS footprint of block-based or component-driven UIs since it's a simple library with less than 1kb gzipped.

---

## Getting Started

**CDN**

```html
<link rel="stylesheet" href="https://atonalstudio.github.io/GRRR/dist/latest/grrr.min.css">
```

**Download**

Visit the [GRRR Repository](https://github.com/atonalstudio/GRRR) and grab the files from the `dist` directory.

---

## Core Concepts

### Named grid areas

GRRR uses named lines in `grid-template-columns` to expose semantic placement areas.

| Area     | Description                             | Example placement                           |
| -------- | --------------------------------------- | ------------------------------------------- |
| `col`    | Individual column tracks                | `col-start 2 / col-end 5`                  |
| `gutter` | Space between columns                   | `gutter-start 2 / gutter-end 5`            |
| `board`  | All columns + gutters combined          | `board`                                     |
| `off`    | Space between `board` and `margin`      | `off-start 1 / off-end 2`                  |
| `margin` | Space between `off` and the window edge | `margin-start 1 / margin-end 1` (left side) |
| `full`   | The entire grid, edge to edge           | `full`                                      |

### Notes

- GRRR does **not** use `gap` or `column-gap`. Gutters are real column tracks.
- `row-gap` is safe to use.
- Bear in mind `grid-column: span <value> / span <value>` works really diferent here. See `grrr-span` in [Sass Functions](#sass-functions).

---

## Basic Usage

```html
<div class="grrr">
  <div class="comp-1"></div>
  <div class="comp-2"></div>
</div>
```

```css
:root {
  --grrr-cols: 12;
  --grrr-gutter: 18px;
  --grrr-margin: 20px;
  --grrr-col-width: 84px;

  /* Define named areas once, use everywhere */
  --content-area: col-start 4 / col-end 9;
  --wide-area: col-start 2 / col-end 11;
}

@media (max-width: 1024px) {
  :root {
    --grrr-cols: 8;
    --grrr-gutter: 12px;
    --content-area: col-start 2 / col-end 7;
    --wide-area: board;
  }
}

@media (max-width: 768px) {
  :root {
    --grrr-cols: 4;
    --content-area: board;
    /* Switch to fluid at mobile */
    --grrr-off: 0;
    --grrr-fluid-col: var(--grrr-use-fluid-col);
  }
}

.comp-1 { grid-column: var(--content-area); }
.comp-2 { grid-column: var(--wide-area); }
```

---

## Variations

### `grrr`

The base bounded grid. Columns have a maximum width (`--grrr-col-width`). The board is centred; off areas absorb remaining space on both sides.

**Setup variables**

| Variable              | Description                                      | Default          |
| --------------------- | ------------------------------------------------ | ---------------- |
| `--grrr-cols`         | Number of columns                                | `12`             |
| `--grrr-gutter`       | Space between columns                            | `18px`           |
| `--grrr-margin`       | Margin on both sides                             | `20px`           |
| `--grrr-margin-left`  | Left margin (overrides `--grrr-margin`)          | —                |
| `--grrr-margin-right` | Right margin (overrides `--grrr-margin`)         | —                |
| `--grrr-col-width`    | Max column width                                 | `84px`           |
| `--grrr-off`          | Off area on both sides                           | `minmax(0, 1fr)` |
| `--grrr-off-left`     | Left off area (overrides `--grrr-off`)           | —                |
| `--grrr-off-right`    | Right off area (overrides `--grrr-off`)          | —                |

```html
<div class="grrr">
  <div class="comp-1"></div>
  <div class="comp-2"></div>
</div>
```

---

### `grrr--fluid`

Columns stretch to fill all available width. Off area collapses to zero. No max column width.

```html
<div class="grrr grrr--fluid">
  <div class="comp-1"></div>
  <div class="comp-2"></div>
</div>
```

---

### `grrr--still`

A range of columns (`still-start` → `still-end`) keeps its bounded width. Columns outside that range shrink to zero as the viewport narrows — making the still area "sticky" within the layout.

**Setup variables**

| Variable             | Description                                                              | Default   |
| -------------------- | ------------------------------------------------------------------------ | --------- |
| `--grrr-cols`        | Number of columns                                                        | `12`      |
| `--grrr-gutter`      | Space between columns                                                    | `18px`    |
| `--grrr-margin`      | Margin on both sides                                                     | `20px`    |
| `--grrr-col-width`   | Max column width                                                         | `84px`    |
| `--grrr-still-start` | First column of the still area                                           | `3`       |
| `--grrr-still-end`   | Last column of the still area                                            | `10`      |
| `--grrr-still`       | Column sizing for still tracks. Set to `var(--grrr-unstill)` to disable | `initial` |

```html
<div class="grrr grrr--still">
  <div class="comp-1"></div>
  <div class="comp-2"></div>
</div>
```

**Modifier classes**

| Class                      | Description                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| `.grrr--still--from-first` | Still area starts at column 1 — no fluid columns before it.       |
| `.grrr--still--to-last`    | Still area ends at the last column — no fluid columns after it.   |
| `.grrr--still--off`        | Disables still — all columns behave as fluid (`--grrr-unstill`).  |

> You cannot combine `--from-first` and `--to-last`. For a fully bounded layout use a plain `.grrr`.

---

### `grrr--fluid` + `grrr--still`

Combine both modifiers to get fluid columns outside the still range and bounded columns inside it.

```html
<div class="grrr grrr--fluid grrr--still">
  <div class="comp-1"></div>
  <div class="comp-2"></div>
</div>
```

---

### `grrr--inherit`

Inherits the complete grid definition from a parent GRRR. Useful for wrapper elements that must pass grid tracks through without re-declaring them.

```html
<div class="grrr">
  <div class="comp-1"></div>
  <div class="grrr--inherit">
    <div class="comp-2"></div>
    <div class="comp-3"></div>
  </div>
</div>
```

---

### `grrr--unset`

Deactivates the grid entirely on an element.

```html
<div class="grrr grrr--unset"></div>
```

---

## Utility Variables

GRRR exposes read-only CSS custom properties that reflect computed grid values. These are available on any element that uses a GRRR mixin and are useful for sizing components that live outside the grid tracks (flex children, absolutely positioned elements, canvas layers, etc.).

| Variable                          | Description                                                                             |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| `--grrr-use-col-width`            | Resolved column width: `min(responsive-width, --grrr-col-width)`                        |
| `--grrr-use-col-responsive-width` | Column width computed from available space: `board-width / cols`                        |
| `--grrr-use-still-area`           | Shorthand for the still area placement: `col-start N / col-end M`                       |
| `--grrr-unstill`                  | The fluid column value. Assign to `--grrr-still` to turn off the still effect.          |
| `--grrr-use-fluid-col`            | The fluid column value (`minmax(0, 1fr)`). Assign to `--grrr-fluid-col` to go fluid.   |

**Sizing a flex child to match a column span:**

```css
.my-component {
  display: flex;
  /* width of 3 columns + 2 gutters between them */
  width: calc(var(--grrr-use-col-width) * 3 + var(--grrr-gutter) * 2);
}
```

**Switching to fluid at a breakpoint without a modifier class:**

```css
@media (max-width: 768px) {
  .my-grrr {
    --grrr-fluid-col: var(--grrr-use-fluid-col);
    --grrr-off: 0;
  }
}
```

---

## Canvas Width

GRRR needs to know its own width to compute `--grrr-use-col-responsive-width` and derived utility variables. This is controlled by `--grrr-canvas-width`.

| Variable              | Description                             | Default  |
| --------------------- | --------------------------------------- | -------- |
| `--grrr-canvas-width` | Canvas width used for utility variables | `100cqw` |

### `100cqw` — default

Resolves to the width of the nearest `container-type: inline-size` ancestor, which is `.grrr` itself (GRRR sets this automatically). No setup required.

> **Limitation:** if any element between `.grrr` and the element consuming utility variables declares `container-type: inline-size`, `cqw` will resolve against that intermediate container instead of the grid, producing incorrect values. In that case, switch to `100dvw` approach.

### `100dvw` — viewport-based

Resolves to the full viewport width regardless of nesting or intermediate containers.

Switch to this approach when both of the following are true:
- You use utility variable calculations (e.g. `--grrr-use-col-width`) inside descendants of `.grrr`.
- Those descendants have their own or intermediate `container-type` defined.

```css
:root {
  --grrr-canvas-width: 100dvw;
}
```

To compensate for scrollbars or other fixed UI elements, subtract their width manually. For pixel-perfect values, use the `ResizeObserver` API to measure the actual available width and expose it as a CSS variable.

```css
:root {
  --grrr-canvas-width: calc(100dvw - var(--my-scrollbar-width));
}
```

---

## Sass Functions

> Optional. Most useful for elements inside a GRRR parent that use a different display model (flex, `position: absolute`, canvas, etc.) and need widths that match the grid.

### `grrr-span`

Returns the grid-column end line for a span of N columns, including the gutters between them.

| Parameter | Required | Description               |
| --------- | -------- | ------------------------- |
| `$span`   | yes      | Number of columns to span |

```scss
.my-class {
  grid-column: col-start 2 / grrr-span(4);
}
```

---

### `grrr-span-width`

Returns the computed width of N columns including the gutters between them, for a bounded grid.

| Parameter          | Required | Default | Description               |
| ------------------ | -------- | ------- | ------------------------- |
| `$n-cols`          | yes      | —       | Number of columns         |
| `$n-extra-gutters` | no       | `0`     | Additional gutters to add |

```scss
.my-class {
  width: grrr-span-width(3);
}
```

---

### `grrr-span-width-fluid`

Same as `grrr-span-width` but uses the responsive column width rather than the fixed maximum.

| Parameter          | Required | Default | Description               |
| ------------------ | -------- | ------- | ------------------------- |
| `$n-cols`          | yes      | —       | Number of columns         |
| `$n-extra-gutters` | no       | `0`     | Additional gutters to add |

```scss
.my-class {
  width: grrr-span-width-fluid(4, 1);
}
```

---

### `grrr-span-width-still`

Returns the computed width for columns within a still area.

| Parameter          | Required | Default                  | Description           |
| ------------------ | -------- | ------------------------ | --------------------- |
| `$n-cols`          | yes      | —                        | Number of columns     |
| `$n-extra-gutters` | no       | `0`                      | Additional gutters    |
| `$col-width`       | no       | `var(--_grrr-col-width)` | Override column width |
| `$gutter-width`    | no       | grid gutter              | Override gutter width |

```scss
.my-class {
  width: grrr-span-width-still(2, 1);
}
```

---

## Subgrid

GRRR works seamlessly with CSS Subgrid. A child of a `.grrr` can inherit the parent's column tracks, letting deeply nested components align to the same grid without re-declaring it.

### Basic subgrid

A component placed on the board spans the full grid width and passes column tracks down to its own children.

```html
<div class="grrr">
  <section class="my-section">
    <div class="my-section__text"></div>
    <div class="my-section__media"></div>
  </section>
</div>
```

```css
.my-section {
  display: grid;
  grid-column: full;               /* span the entire grid width */
  grid-template-columns: subgrid;  /* inherit all parent tracks */
}

.my-section__text  { grid-column: col-start 1 / col-end 6; }
.my-section__media { grid-column: col-start 7 / col-end 12; }
```

---

### Subgrid with named area variables

Pair subgrid with named area variables to keep placement decoupled from the grid structure. Changing the variable at a breakpoint reflows every component using it.

```css
:root {
  --content-area: col-start 4 / col-end 9;
  --wide-area:    col-start 2 / col-end 11;
}

.my-section {
  display: grid;
  grid-column: full;
  grid-template-columns: subgrid;
}

.my-section__intro { grid-column: var(--wide-area); }
.my-section__body  { grid-column: var(--content-area); }
```

```css
@media (max-width: 768px) {
  :root {
    --content-area: board;
    --wide-area: board;
  }
}
```

---

### Subgrid inside a still area

When a component lives inside a `.grrr--still`, subgrid inherits the still column tracks. Use `--grrr-use-still-area` to snap the wrapper exactly over the still range.

```html
<div class="grrr grrr--still">
  <div class="panel">
    <div class="panel__label"></div>
    <div class="panel__content"></div>
  </div>
</div>
```

```css
.panel {
  display: grid;
  grid-column: var(--grrr-use-still-area); /* snaps to the still area */
  grid-template-columns: subgrid;
}

.panel__label   { grid-column: col-start 1 / col-end 2; }
.panel__content { grid-column: col-start 3 / col-end 8; }
```

---

## License

[MIT License](./LICENSE) — free for commercial and non-commercial use. Credit to [atonal.studio](https://atonal.studio) appreciated.
