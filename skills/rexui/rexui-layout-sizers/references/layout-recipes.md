# RexUI Layout Recipes

These recipes are reduced from RexUI examples and are self-contained around `this.rexUI.add.*`. They assume `UIPlugin` is installed with `mapping: 'rexUI'`.

## Linear Row Or Column With Sizer

Use `sizer` for the default row/column case.

```js
const row = this.rexUI.add.sizer({
    x: 400,
    y: 300,
    width: 420,
    height: 56,
    orientation: 'x',
    space: { left: 12, right: 12, item: 8 }
});

row
    .addBackground(this.rexUI.add.roundRectangle(0, 0, 1, 1, 8, 0x222222))
    .add(this.add.text(0, 0, 'Name'), {
        proportion: 0,
        padding: { right: 8 }
    })
    .add(this.add.zone(), {
        proportion: 1,
        expand: true
    })
    .add(this.add.text(0, 0, 'Value'), {
        proportion: 0,
        align: 'right'
    })
    .layout();
```

Derived from `examples/ui-sizer/proportion.js`, reduced for skill reference.

## Fixed Cell Grid With GridSizer

Use `gridSizer` when child positions belong to known row/column cells.

```js
const grid = this.rexUI.add.gridSizer({
    x: 400,
    y: 300,
    column: 3,
    row: 3,
    columnProportions: 1,
    rowProportions: 1,
    space: { column: 8, row: 8 }
});

grid.addBackground(this.rexUI.add.roundRectangle(0, 0, 1, 1, 12, 0x222222));

for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
        grid.add(
            this.rexUI.add.roundRectangle(0, 0, 48, 48, 8, 0x4e79a7),
            { column, row, expand: true, key: `cell-${column}-${row}` }
        );
    }
}

grid.layout();
```

Derived from `examples/ui-gridsizer/gridsizer.js`, reduced for skill reference.

## Wrapping Chips With FixWidthSizer

Use `fixWidthSizer` when item count or item width is variable and rows should wrap.

```js
const tags = ['Attack', 'Defense', 'Magic', 'Rare', 'Equipped', 'Quest'];

const flow = this.rexUI.add.fixWidthSizer({
    x: 400,
    y: 300,
    width: 280,
    space: {
        left: 8,
        right: 8,
        top: 8,
        bottom: 8,
        item: 8,
        line: 8
    },
    align: 'left'
});

flow.addBackground(this.rexUI.add.roundRectangle(0, 0, 1, 1, 10, 0x222222));

for (const tag of tags) {
    flow.add(this.rexUI.add.label({
        background: this.rexUI.add.roundRectangle(0, 0, 1, 1, 10, 0x555555),
        text: this.add.text(0, 0, tag),
        space: { left: 10, right: 10, top: 6, bottom: 6 }
    }));
}

flow.layout();
```

Derived from `examples/ui-fixwidthsizer/fix-width-sizer.js`, reduced for skill reference.

## Overlay With OverlapSizer

Use `overlapSizer` when objects occupy the same rectangle with different alignment.

```js
const card = this.rexUI.add.overlapSizer({
    x: 400,
    y: 300,
    width: 320,
    height: 180,
    space: { left: 12, right: 12, top: 12, bottom: 12 }
});

card
    .add(this.rexUI.add.roundRectangle(0, 0, 1, 1, 16, 0x222222), {
        key: 'background',
        expand: true
    })
    .add(this.add.text(0, 0, 'READY'), {
        key: 'title',
        align: 'center',
        expand: false
    })
    .add(this.rexUI.add.roundRectangle(0, 0, 36, 36, 18, 0xffcc00), {
        key: 'badge',
        align: 'right-top',
        offsetX: -8,
        offsetY: 8,
        expand: false
    })
    .layout();
```

Derived from `examples/ui-overlapsizer/overlapsizer.js`, reduced for skill reference.

## Nested Sizers

Use nested sizers to keep UI readable. Build child layouts first, then add them to the parent.

```js
const header = this.rexUI.add.sizer({
    orientation: 'x',
    space: { item: 8 }
})
    .add(this.add.text(0, 0, 'Inventory'), { proportion: 1 })
    .add(this.add.text(0, 0, '12/20'), { proportion: 0 });

const content = this.rexUI.add.gridSizer({
    column: 4,
    row: 2,
    space: { column: 6, row: 6 }
});

for (let i = 0; i < 8; i++) {
    content.add(
        this.rexUI.add.roundRectangle(0, 0, 48, 48, 8, 0x444444),
        { column: i % 4, row: Math.floor(i / 4), expand: true }
    );
}

this.rexUI.add.sizer({
    x: 400,
    y: 300,
    width: 320,
    orientation: 'y',
    space: { left: 12, right: 12, top: 12, bottom: 12, item: 10 }
})
    .addBackground(this.rexUI.add.roundRectangle(0, 0, 1, 1, 12, 0x222222))
    .add(header, { proportion: 0, expand: true })
    .add(content, { proportion: 1, expand: true })
    .layout();
```
