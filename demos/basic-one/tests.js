var tests = [
    {
        name: 'Simple GRRR',
        expects: '12 flexible columns bounded with max width',
        className: 'grrr',
        html: () => makeBoard(12),
        css: () => `#container{#{grrrConfig()}}`
    },
    {
        name: 'Simple Fluid GRRR',
        expects: '12 flexible columns no max width and no off area',
        className: 'grrr grrr--fluid',
        html: () => makeBoard(12),
        css: () => `#container{#{grrrConfig()}}`
    },
    {
        name: 'GRRR Still',
        expects: '12 columns, expects 3-10 shrinks for last',
        className: 'grrr grrr--still',
        html: () => makeBoard(12) + stillAreaItem(),
        css: () => `#container{#{grrrConfig()}}`
    },
    {
        name: 'GRRR Still 2',
        expects: '12 columns, expects 2-5 shrinks for last',
        className: 'grrr grrr--still',
        html: () => makeBoard(12) + stillAreaItem(),
        css: () => `
        #container{
            #{grrrConfig()}
            --grrr-still-start: 2;
            --grrr-still-end: 5;
        }
        `
    },
    {
        name: 'GRRR Still 3',
        expects: '12 columns, expects 8-11 shrinks for last',
        className: 'grrr grrr--still',
        html: () => makeBoard(12) + stillAreaItem(),
        css: () => `
        #container{
            #{grrrConfig()}
            --grrr-still-start: 8;
            --grrr-still-end: 11;
        }
        `
    },
    {
        name: 'GRRR Still From First',
        expects: '12 columns, expects 1-5 shrinks for last',
        className: 'grrr grrr--still grrr--still--from-first',
        html: () => makeBoard(12) + stillAreaItem(),
        css: () => `
        #container{
            #{grrrConfig()}
            --grrr-still-end: 5;
        }
        `
    },
    {
        name: 'GRRR Still To Last',
        expects: '12 columns, expects 6-12 shrinks for last',
        className: 'grrr grrr--still grrr--still--to-last',
        html: () => makeBoard(12) + stillAreaItem(),
        css: () => `
        #container{
            #{grrrConfig()}
            --grrr-still-start: 6;
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