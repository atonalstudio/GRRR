var tests = [

    // ── Base ─────────────────────────────────────────────────────

    {
        name: 'Base · 12 cols',
        expects: 'Board centred. Columns have a max width — off areas absorb remaining space equally on both sides.',
        className: 'grrr',
        html: () => makeBoard(12),
        css: () => `#container{${grrrConfig()}}`
    },
    {
        name: 'Base · 8 cols',
        expects: 'Same as 12-col base but with only 8 columns. Off areas should be wider.',
        className: 'grrr',
        html: () => makeBoard(8),
        css: () => `#container{${grrrConfig(8)}}`
    },
    {
        name: 'Base · 16 cols',
        expects: 'Same as 12-col base but with 16 columns. Columns should be narrower.',
        className: 'grrr',
        html: () => makeBoard(16),
        css: () => `#container{${grrrConfig(16)}}`
    },
    {
        name: 'Base · Fluid',
        expects: 'Columns stretch to fill all available width. Off area is 0. No max column width.',
        className: 'grrr grrr--fluid',
        html: () => makeBoard(12),
        css: () => `#container{${grrrConfig()}}`
    },

    // ── Still ────────────────────────────────────────────────────

    {
        name: 'Still · Default (cols 3–10)',
        expects: 'Cols 3–10 are fixed-width. Cols 1–2 and 11–12 are fluid.',
        className: 'grrr grrr--still',
        html: () => makeBoard(12) + stillAreaItem(),
        css: () => `#container{${grrrConfig()}}`
    },
    {
        name: 'Still · Start (cols 2–5)',
        expects: 'Cols 2–5 are fixed-width. Col 1 and cols 6–12 are fluid.',
        className: 'grrr grrr--still',
        html: () => makeBoard(12) + stillAreaItem(),
        css: () => `
        #container{
            ${grrrConfig()}
            --grrr-still-start: 2;
            --grrr-still-end: 5;
        }
        `
    },
    {
        name: 'Still · End (cols 8–11)',
        expects: 'Cols 8–11 are fixed-width. Cols 1–7 are fluid. Col 12 is fluid. Regression: used to produce 13 columns.',
        className: 'grrr grrr--still',
        html: () => makeBoard(12) + stillAreaItem(),
        css: () => `
        #container{
            ${grrrConfig()}
            --grrr-still-start: 8;
            --grrr-still-end: 11;
        }
        `
    },
    {
        name: 'Still · From first (cols 1–5)',
        expects: 'Still starts at col 1 — no fluid cols before the still area. Cols 6–12 are fluid.',
        className: 'grrr grrr--still grrr--still--from-first',
        html: () => makeBoard(12) + stillAreaItem(),
        css: () => `
        #container{
            ${grrrConfig()}
            --grrr-still-end: 5;
        }
        `
    },
    {
        name: 'Still · To last (cols 6–12)',
        expects: 'Still ends at col 12 — no fluid cols after the still area. Cols 1–5 are fluid.',
        className: 'grrr grrr--still grrr--still--to-last',
        html: () => makeBoard(12) + stillAreaItem(),
        css: () => `
        #container{
            ${grrrConfig()}
            --grrr-still-start: 6;
        }
        `
    },
    {
        name: 'Still · From first, near last (cols 1–11)',
        expects: 'Still cols 1–11. Only col 12 remains fluid on the right.',
        className: 'grrr grrr--still grrr--still--from-first',
        html: () => makeBoard(12) + stillAreaItem(),
        css: () => `
        #container{
            ${grrrConfig()}
            --grrr-still-end: 11;
        }
        `
    },
    {
        name: 'Still · To last, near first (cols 2–12)',
        expects: 'Still cols 2–12. Only col 1 remains fluid on the right.',
        className: 'grrr grrr--still grrr--still--to-last',
        html: () => makeBoard(12) + stillAreaItem(),
        css: () => `
        #container{
            ${grrrConfig()}
            --grrr-still-start: 2;
        }
        `
    },

    // ── Gutter ───────────────────────────────────────────────────

    {
        name: 'Gutter · Large (40px)',
        expects: 'Wide gutters between columns. Board width shrinks to compensate.',
        className: 'grrr',
        html: () => makeBoard(12),
        css: () => `
        #container{
            --grrr-cols: 12;
            --grrr-gutter: 40px;
            --grrr-col-width: 64px;
            --grrr-margin: 20px;
        }
        `
    },
    {
        name: 'Gutter · Zero',
        expects: 'No space between columns — gutter blocks should be invisible (zero width).',
        className: 'grrr',
        html: () => makeBoard(12),
        css: () => `
        #container{
            --grrr-cols: 12;
            --grrr-gutter: 0px;
            --grrr-col-width: 64px;
            --grrr-margin: 20px;
        }
        `
    },
    {
        name: 'Gutter · Fluid',
        expects: 'Gutters shrink with columns',
        className: 'grrr',
        html: () => makeBoard(8),
        css: () => `
        #container{
            --grrr-gutter: minmax(0, 84px);
            --grrr-cols: 8;
        }
        `
    },
    {
        name: 'Gutter · Collapsable',
        expects: 'Gutters shrink before the columns',
        className: 'grrr',
        html: () => makeBoard(12),
        css: () => `
        #container{
            --grrr-gutter: 1fr;
        }
        `
    },
    {
        name: 'Gutter · Clamp',
        expects: 'Gutters shrink before the columns down to 10px',
        className: 'grrr',
        html: () => makeBoard(12),
        css: () => `
        #container{
            --grrr-gutter: minmax(10px,1fr);
        }
        `
    },

    // ── Margin ───────────────────────────────────────────────────

    {
        name: 'Margin · Asymmetric (left 60px, right 8px)',
        expects: 'Board is visually closer to the right edge. Left margin is much wider.',
        className: 'grrr',
        html: () => makeBoard(12),
        css: () => `
        #container{
            --grrr-cols: 12;
            --grrr-gutter: 18px;
            --grrr-col-width: 64px;
            --grrr-margin-left: 60px;
            --grrr-margin-right: 8px;
        }
        `
    },

    // ── Off ──────────────────────────────────────────────────────

    {
        name: 'Off · None (both sides)',
        expects: 'No off area on either side. Board is flush against both margins.',
        className: 'grrr',
        html: () => makeBoard(12),
        css: () => `
        #container{
            ${grrrConfig()}
            --grrr-off: 0px;
        }
        `
    },
    {
        name: 'Off · Left only collapsed',
        expects: 'No off area on the left. Board is pushed to the left — left margin is flush with col 1.',
        className: 'grrr',
        html: () => makeBoard(12),
        css: () => `
        #container{
            ${grrrConfig()}
            --grrr-off-left: 0px;
        }
        `
    },
    {
        name: 'Off · Right only collapsed',
        expects: 'No off area on the right. Board is pushed to the right — right margin is flush with col 12.',
        className: 'grrr',
        html: () => makeBoard(12),
        css: () => `
        #container{
            ${grrrConfig()}
            --grrr-off-right: 0px;
        }
        `
    },

    // ── Known issues ─────────────────────────────────────────────

    {
        name: '⚠ Forbidden · 1 column',
        expects: 'repeat(0) bug: setting --grrr-cols: 1 generates 2 columns instead of 1.',
        className: 'grrr',
        html: () => makeBoard(2),
        css: () => `
        #container{
            --grrr-cols: 1;
        }
        `
    },
    {
        name: '⚠ Forbidden · Still single column (start = end)',
        expects: 'repeat(0) bug: still-start = still-end collapses the repeat, adding a phantom still column.',
        className: 'grrr grrr--still',
        html: () => makeBoard(13) + stillAreaItem(),
        css: () => `
        #container{
            ${grrrConfig()}
            --grrr-still-start: 6;
            --grrr-still-end: 6;
        }
        `
    },
];

function grrrConfig(cols=12){
    return `
    --grrr-cols: ${cols};
    --grrr-gutter: 18px;
    --grrr-col-width: 64px;
    --grrr-margin: 20px;
    `
}

function makeBoard(cols = 12) {
    let board = '';
    for (let i = 1; i <= cols; i++) {
        board += makeCol(i, i < cols)
    }
    return `
        <div class="col col--margin">margin</div>
        <div class="col col--off">off</div>
        ${board}
        <div class="col col--off">off</div>
        <div class="col col--margin">margin</div>
    `
}

function makeCol(n, gutter = true) {
    let col = `<div class="col">col-${n}</div>`
    if (gutter) {
        col += '<div class="col col--gutter"></div>'
    }
    return col;
}

function stillAreaItem() {
    return `<div class="area" style="grid-column:var(--grrr-use-still-area)">still area</div>`;
}