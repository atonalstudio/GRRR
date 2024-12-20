
# GRRR Documentation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Official website: [grrr.atonalstudio.com](https://grrr.atonalstudio.com)

## Proof of Concept

The GRRR experiment is still a proof of concept, meaning we are extensively testing and seeking community feedback before continuing its evolution. That said, some features may not yet be in their final form.

## Getting Started

You can use the **GRRR** by importing it via a CDN or downloading it from the GitHub repository.

**CDN**:

```html
<link  rel="stylesheet"  href="https://atonalstudio.github.io/GRRR/dist/poc/grrr.min.css">
```

**GitHub**:

Visit the [GRRR Repository](https://github.com/atonalstudio/GRRR) and go to `dist` directory to download the CSS and SASS version.

## Basic Usage

### HTML Structure

You can use a `div` container with the class `grrr` and nested child elements to create grid layouts:

```html
<div class="my-container grrr">
  <div class="my-component-1"></div>
  <div class="my-component-2"></div>
</div>
```

### CSS Setup Variables

Define setup variables to customize your grid inside your containers or in the `:root` if you prefer.

```css
.my-container.grrr {
  --grrr-cols: 12; /* Number of columns */
  --grrr-gutter: 18px; /* Space between columns */
  --grrr-margin: 20px; /* Margin to the window */
  --grrr-col-width: 84px; /* Column width */
  
  /* You can optionally define variables for your 
  /* grid areas to be used for nested components */
  --content-area: col-start 4 / col-end 9;
  --wide-area: col-start 2 / col-end 11;
  --board-area: board;
  --full-area: full;
  
  /* your other styles... */
}
 /* breakpoints */
 @media (max-width: 1024px) { 
  .my-container.grrr{
    --grrr-cols: 84; /* Number of columns */
    --grrr-gutter: 12px; /* Space between columns */

    /* You can modify your areas */
    --content-area: col-start 2 / col-end 11;
    --wide-area: board

    /* your other styles... */
    }
}

@media (max-width: 768px) { 
  .my-container.grrr{
    --grrr-cols: ; /* Number of columns */
	
    /* You can turn a bounded GRRR into fluid with these two lines */
    --grrr-fluid-off: 0;
    --grrr-fluid-col: 1fr;

    /* You can modify your areas */
    --content-area: board

    /* your other styles... */
    }
} 
 
.my-component-1{
	grid-column: var(--content-area);
	/* your other styles... */
}

.my-component-2{
	grid-column: var(--wide-area);
	/* your other styles... */
}
```

## Before diving deeper
- It is designed to be used with at least two columns.
- Our strategy is to use named ranges in our `grid-template-columns`. Therefore, if you intend to use `span`, we have a Sass function to assist with this.
- We do not use `gap` or `column-gap`. The GRRR gutter is created using columns. But you can use `row-gap` without any issues.
- That said, GRRR is an experimental tool, so feel free to break these rules.
 
## Grid Areas
| Area      | Description                           | grid-column:  |
| --------- | ------------------------------------- | ------------- |
| `col`     | The columns area                      | `col-start 2 / col-end 5`       |
| `gutter`  | Space between columns                 | `gutter-start 2 / gutter-end 5` |
| `board`   | The total area of columns and gutters | `board`                         |
| `off`     | Space between `board` and `margin`. Also, the protection area of the modifier `.grrr__sub--off-gutter` | Left: `off-start 1 / off-end 1`, Right: `off-start 2 / off-end 2` |
| `margin`  | Space between `off` and window edges  | Left: `margin-start 1 / margin-end 1`, Right: `margin-start 2 / margin-end 2` |
| `full`    | The entire grid area, side to side    | `full`            |

## Variations

## `grrr`

The `grrr` class is the base grid structure. It defines a flexible grid layout with a default column and gutter system. 

#### Variables

| Variable           | Description             | Default Value |
| ------------------ | ----------------------- | ------------- |
| `--grrr-cols`      | Number of columns       | `12`          |
| `--grrr-gutter`    | Space between columns   | `18px`        |
| `--grrr-margin`    | Margin outside the grid | `20px`        |
| `--grrr-col-width` | Default column width    | `84px`        |
| `--grrr-fluid-col` + `--grrr-fluid-off` | Turns on/off the fluid behaviour, **off**: both - `initial` **on**: `--grrr-fluid-col: 1fr; --grrr-fluid-off: 0` | off |


#### HTML

```html
<div class="grrr">
  <div class="my-component-1"></div>
  <div class="my-component-2"></div>
</div>
```

## `grrr--fluid`

The `grrr--fluid` class creates a fluid grid layout where columns automatically resize to fit the container width.


#### Variables

| Variable           | Description             | Default Value |
| ------------------ | ----------------------- | ------------- |
| `--grrr-cols`      | Number of columns       | `12`          |
| `--grrr-gutter`    | Space between columns   | `18px`        |
| `--grrr-margin`    | Margin outside the grid | `20px`        | 
| `--grrr-fluid-col` + `--grrr-fluid-off`| Turns on/off the fluid behaviour, **off**: both -: `initial` **on**: `--grrr-fluid-col: 1fr; --grrr-fluid-off: 0`    | on        |

#### HTML

```html
<div class="grrr grrr--fluid">
  <div class="my-component-1"></div>
  <div class="my-component-2"></div>
</div>
```

## `grrr--still`

The `grrr--still` class creates a grid where specific columns maintain their largest possible size while the other columns outside the still range will shrink to zero.

#### Setup Variables

| Variable           | Description             | Default Value |
| ------------------ | ----------------------- | ------------- |
| `--grrr-cols`      | Number of columns       | `12`          |
| `--grrr-gutter`    | Space between columns   | `18px`        |
| `--grrr-margin`    | Margin outside the grid | `20px`        |
| `--grrr-col-width` | Default column width    | `84px`        |
| `--grrr-still-start` | Starting column for fixed area | `5`           |
| `--grrr-still-end`   | Ending column for fixed area   | `10` |
| `--grrr-col-stilfluid-col` | Turns on/off the still columnsfluid behaviour, off: `initial` on: `var(--_grrr-col-default)0`    | `initial`      |
| `--grrr-fluid-col` + `--grrr-fluid-ff` | Turns on/off the  behaviour, **off**: both - `initial` **on**: `--grrr-fluid-col: 1fr; --grrr-fluid-off: 0`    | off |
| `--grrr-col-still` | Turns on/off the still behaviour, off: `initial` on: `var(--grrr-col-default)`    | `initial`      |

#### HTML

```html
<div class="grrr grrr--still">
  <div class="my-component-1"></div>
  <div class="my-component-2"></div>
</div>
```

#### Modifier Classes
| Classes                    | Description                                  | 
| -------------------------- | -------------------------------------------- |
| `.grrr--still--from-first` | Starts the still area from the first column. |
| `.grrr--still--to-last`    | Extends the still area to the last column.   |

#### Observations
 - You cannot set still areas starting from the first column or ending at the last column without the modifier classes
 - You cannot use both modifiers together and there is no need, just use a regular `.grrr` and achieve the same result.


## `grrr__sub`

The `grrr__sub` class is used for nested grids occupying restrict areas, similar to `grid-column: subgrid`.

#### Setup Variables

| Variable           | Description                  | Default Value |
| ------------------ | ---------------------------- | ------------- |
| `--grrr-col-start` | Starting column for sub-grid | `3`           |
| `--grrr-col-end`   | Ending column for sub-grid   | `9`           |

#### HTML

```html
<div class="grrr">
  <div class="grrr__sub">
    <div class="my-component-1"></div>
    <div class="my-component-2"></div>
  </div>
</div>
```

#### Modifier Classes
| Classes                | Description                                                                                     | 
| ---------------------- | ----------------------------------------------------------------------------------------------- |
|`.grrr__sub--from-full` | Expands the sub-grid from the `full-start` area of its parent until the given `--grrr-col-end`. |
|`.grrr__sub--to-full`   | Expands the subgrid from the given `--grrr-col-start` until the `full-end` area of its parent.  |
|`.grrr__sub--off-gutter`| Expands to the gutters on the edges.                                                            |

### Observations
 - Not tested grrr__sub `inside` grrr__sub`
 - Inside `grrr--still` the behaviour is not consistent.

## `grrr--inherit`

Allows to inherit the complete GRRR from a parent.         

#### HTML

```html
<div class="grrr">
  <div class="grrr--inherit">
    <div class="my-component-1"></div>
    <div class="my-component-2"></div>
  </div>
</div>
```

## `grrr--unset`

Deactivate the GRRR grid.

#### HTML

```html
<div class="grrr grrr--unset"></div>
```

## Sass Functions

**Not mandatory**: The GRRR Sass functions are utilities designed to calculate column sizes within GRRRs, including responsive, fluid, and bounded layouts. They are especially useful for determining column span sizes within child divs of a GRRR that use other display properties (e.g.`display: flex`) or distinct grids where the GRRR columns are no longer applied.`gr

### `grrr-span`
Calculates the span merge of columns including the gutters.

**Parameters**:  
- `$span` *(required)*: Number of columns to span.  

**Usage Example**:  
```scss
.my-class {
  grid-column: col-start 2 / grrr-span(4); // Span across 4 columns
}
```
### `grrr-span-width`
Calculates the span width of the current columns within a GRRR grid.

**Parameters**:  
- `$n-cols` *(required)*: Number of columns to span.  
- `$n-extra-gutters` *(optional, default: `0`)*: Additional gutters to include.  


**Usage Example**:  
```scss
.my-class {
  width: grrr-span-width(3); // Span width across 3 columns
}
```

### `grrr-span-width-fluid`
Calculates the span width of columns within a fluid GRRR grid, adapting to responsive column widths.

**Parameters**:  
- `$n-cols` *(required)*: Number of columns to span.  
- `$n-extra-gutters` *(optional, default: `0`)*: Additional gutters to include.  

**Usage Example**:  
```scss
.my-class {
  width: grrr-span-width-fluid(4, 1); // 4 columns + 1 extra gutter
}
```

### `grrr-span-width-still`
Calculates the span width of columns for still areas or ensures fixed dimensions even when resizing.

**Parameters**:  
- `$n-cols` *(required)*: Number of columns to span.  
- `$n-extra-gutters` *(optional, default: `0`)*: Additional gutters to include.  
- `$col-width` *(optional, default: `false`)*: Custom column width. Defaults to `var(--_grrr-col-width)` if not set.  
- `$gutter-width` *(optional, default: `false`)*: Custom gutter width. Defaults to the grid's gutter width if not set.  

**Usage Example**:  
```scss
.my-class {
  width: grrr-span-width-still(2, 1); // 2 columns + 1 extra gutter
}
```

**Avoiding GRRR Sass functions  miscalculations**

The GRRR Sass functions rely on the CSS variable `--grrr-ui-out` to account for external UI elements, such as scrollbars. The following JavaScript snippet dynamically solves miscalculations caused by the browser scrollbar:

```javascript
window.addEventListener('DOMContentLoaded', () => {
  // Dynamically calculate scrollbar width and update the CSS variable.
    const scrollbarWidth = () => {
      let w = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--grrr-ui-out', w + "px");
    };
    new ResizeObserver(scrollbarWidth).observe(document.body);
});
```

We recommend using the GRRR Sass calculation functions within 100% window-width containers. If you have external UI elements (e.g., fixed sidebars, additional browser scrollbars, or toolbars) that reduce the GRRR dimensions and you plan to use the GRRR Sass calculation functions, you can dynamically update the `--grrr-ui-out` variable within the target GRRR scope. This adjustment is necessary because the calculations are based on the viewport width (dvw). **Important:** The `--grrr-ui-out` variable expects the total width of the area outside the container.

## License

This project is licensed under the [MIT License](./LICENSE). You are free to use it in commercial and non-commercial projects, as long as you give credit to the original author: atonal.studio.
