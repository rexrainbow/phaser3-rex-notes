# List Recipes

These recipes are reduced from RexUI examples and are self-contained around `this.rexUI.add.*`. They do not require reading `examples/` at skill usage time.

## Virtual Inventory Grid

Derived from `examples/ui-gridtable/simple.js` and `examples/ui-gridtable/cell-interactive.js`, reduced for skill reference.

```js
const items = Array.from({ length: 100 }, (_, id) => ({
  id,
  name: `Item ${id}`,
  color: Phaser.Math.Between(0x555555, 0xffffff)
}));

const selected = new Set();

const table = this.rexUI.add.gridTable({
  x: 400,
  y: 300,
  width: 360,
  height: 420,
  scrollMode: 'vertical',
  background: this.rexUI.add.roundRectangle({ radius: 10, color: 0x1f1f1f }),
  table: {
    cellWidth: 150,
    cellHeight: 96,
    columns: 2,
    mask: { padding: 2 },
    reuseCellContainer: true,
    interactive: true
  },
  slider: {
    track: this.rexUI.add.roundRectangle({ width: 12, radius: 6, color: 0x333333 }),
    thumb: this.rexUI.add.roundRectangle({ radius: 8, color: 0xffffff })
  },
  mouseWheelScroller: { focus: true, speed: 0.1 },
  space: { left: 12, right: 12, top: 12, bottom: 12, table: 8 },
  items,
  createCellContainerCallback(cell, cellContainer) {
    const scene = cell.scene;
    const item = cell.item;

    if (cellContainer === null) {
      cellContainer = scene.rexUI.add.label({
        width: cell.width,
        height: cell.height,
        orientation: 'y',
        background: scene.rexUI.add.roundRectangle({ radius: 8 }),
        icon: scene.rexUI.add.roundRectangle({ width: 28, height: 28, radius: 6 }),
        text: scene.add.text(0, 0, '', { fontSize: 14 }),
        space: { left: 8, right: 8, top: 8, bottom: 8, icon: 8 }
      });
    }

    cellContainer.setMinSize(cell.width, cell.height);
    cellContainer.getElement('icon').setFillStyle(item.color);
    cellContainer.getElement('text').setText(item.name);
    cellContainer.getElement('background').setFillStyle(
      selected.has(item.id) ? 0x444400 : 0x2a2a2a
    );
    return cellContainer;
  }
}).layout();

table.on('cell.click', (cellContainer, cellIndex) => {
  const item = table.items[cellIndex];
  if (selected.has(item.id)) {
    selected.delete(item.id);
  } else {
    selected.add(item.id);
  }
  table.updateVisibleCell(cellIndex);
});
```

## Scrollable Chip Panel

Derived from `examples/ui-scrollablepanel/fix-width-sizer.js`, reduced for skill reference.

```js
const words = 'alpha beta gamma delta epsilon zeta eta theta iota kappa'.split(' ');

const panelBackground = this.rexUI.add.roundRectangle({ radius: 8, color: 0x111111 });

const chips = this.rexUI.add.fixWidthSizer({
  space: { left: 4, right: 4, top: 4, bottom: 4, item: 8, line: 8 }
});

words.forEach((word) => {
  chips.add(this.rexUI.add.label({
    background: this.rexUI.add.roundRectangle({ radius: 12, color: 0x333333 }),
    text: this.add.text(0, 0, word, { fontSize: 16 }),
    space: { left: 10, right: 10, top: 5, bottom: 5 }
  }));
});

const panel = this.rexUI.add.scrollablePanel({
  x: 400,
  y: 300,
  width: 300,
  height: 220,
  scrollMode: 'vertical',
  background: panelBackground,
  panel: {
    child: chips,
    mask: { padding: 1 }
  },
  slider: {
    track: this.rexUI.add.roundRectangle({ width: 12, radius: 6, color: 0x222222 }),
    thumb: this.rexUI.add.roundRectangle({ radius: 8, color: 0xffffff }),
    hideUnscrollableSlider: true,
    adaptThumbSize: true
  },
  space: { left: 10, right: 10, top: 10, bottom: 10, panel: 8 }
}).layout();
```

## Scroll To Named Child

Derived from `examples/ui-scrollablepanel/scroll-to-child.js`, reduced for skill reference.

```js
const rows = this.rexUI.add.sizer({ orientation: 'y', space: { item: 4 } });

for (let i = 0; i < 50; i++) {
  rows.add(this.rexUI.add.label({
    name: `item-${i}`,
    background: this.rexUI.add.roundRectangle({ radius: 4, color: 0x303030 }),
    text: this.add.text(0, 0, `Item ${i}`),
    space: { left: 10, right: 10, top: 8, bottom: 8 }
  }), { expand: true });
}

const panel = this.rexUI.add.scrollablePanel({
  width: 300,
  height: 260,
  panel: { child: rows, mask: { padding: 1 } },
  slider: {
    track: this.rexUI.add.roundRectangle({ width: 12, radius: 6, color: 0x222222 }),
    thumb: this.rexUI.add.roundRectangle({ radius: 8, color: 0xffffff })
  }
}).layout();

panel.scrollToChild(panel.getByName('item-20', true), 'center', 300, 'Cubic');
```

## Tabbed Pages With Scrollable Content

Derived from `examples/ui-tabpages/tabpages.js`, reduced for skill reference.

```js
const createTab = (scene, text) => scene.rexUI.add.label({
  background: scene.rexUI.add.roundRectangle({ radius: 4, color: 0x333333 }),
  text: scene.add.text(0, 0, text),
  space: { left: 10, right: 10, top: 6, bottom: 6 }
});

const createPage = (scene, text) => scene.rexUI.add.textArea({
  text: scene.rexUI.add.BBCodeText(0, 0, '', { fontSize: 18 }),
  content: `${text}\n\n` + Array.from({ length: 40 }, (_, i) => `Line ${i}`).join('\n'),
  slider: {
    track: scene.rexUI.add.roundRectangle({ width: 12, radius: 6, color: 0x222222 }),
    thumb: scene.rexUI.add.roundRectangle({ radius: 8, color: 0xffffff })
  },
  space: { text: 10 }
});

const tabPages = this.rexUI.add.tabPages({
  x: 400,
  y: 300,
  width: 480,
  height: 340,
  tabPosition: 'top',
  tabs: { space: { item: 4 } },
  pages: { fadeIn: 200 },
  align: { tabs: 'center' },
  space: { left: 8, right: 8, top: 8, bottom: 8, item: 8 }
})
  .on('tab.focus', (tab) => tab.getElement('background').setStrokeStyle(2, 0xffff00))
  .on('tab.blur', (tab) => tab.getElement('background').setStrokeStyle());

tabPages
  .addPage({ key: 'items', tab: createTab(this, 'Items'), page: createPage(this, 'Items') })
  .addPage({ key: 'stats', tab: createTab(this, 'Stats'), page: createPage(this, 'Stats') })
  .layout()
  .swapFirstPage();
```

## Nested Folder

Derived from `examples/ui-folder/nested-folder.js`, reduced for skill reference.

```js
function createRow(scene, text) {
  return scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle({ radius: 4, color: 0x2a2a2a }),
    text: scene.add.text(0, 0, text),
    space: { left: 10, right: 10, top: 6, bottom: 6 }
  });
}

function createFolder(scene, titleText, rows) {
  const title = scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle({ radius: 4, color: 0x333333 }),
    icon: scene.rexUI.add.triangle({ color: 0xffffff, padding: 2 }),
    text: scene.add.text(0, 0, titleText),
    space: { left: 10, right: 10, top: 6, bottom: 6, icon: 6 }
  });

  const child = scene.rexUI.add.sizer({ orientation: 'y', space: { item: 4 } });
  rows.forEach((row) => child.add(row, { expand: true }));

  return scene.rexUI.add.folder({
    orientation: 'y',
    title,
    child,
    toggleByTarget: title.getElement('icon'),
    transition: { duration: 150 },
    space: { childLeft: 24 }
  })
    .on('expand.start', () => title.getElement('icon').setDirection('down'))
    .on('collapse.start', () => title.getElement('icon').setDirection('right'))
    .expand(0);
}

const audio = createFolder(this, 'Audio', [
  createRow(this, 'Music'),
  createRow(this, 'SFX')
]);

createFolder(this, 'Settings', [audio, createRow(this, 'Controls')])
  .setPosition(40, 40)
  .setMinWidth(280)
  .layout();
```
