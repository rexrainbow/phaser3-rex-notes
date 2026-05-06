# High-Frequency Demo Patterns

This reference maps common RexUI example names to the skill/reference files that should be loaded when recreating the pattern. It is an index, not a dependency on `examples/`.

Use these entries when a user asks for something like "the scrollablePanel panel demo", "textbox demo", "yes-no dialog", "popup menu", "gridtable", or "tabs table".

## Demo Map

| User/demo intent | Main RexUI components | Load next |
| --- | --- | --- |
| Scrollable panel with composed content | `scrollablePanel`, `sizer`, `label`, `roundRectangle`, `slider` | `rexui-scroll-lists-and-tables/references/scrollablepanel-config.md`, `rexui-scroll-lists-and-tables/references/list-recipes.md`, `rexui-layout-sizers` |
| Dialogue textbox with typing and next-page input | `textBox`, `BBCodeText`, `textTyping`, action prompt | `rexui-text-and-input/references/rich-text-recipes.md`, `rexui-text-and-input/references/text-catalog.md` |
| Yes/no dialog | `dialog` or `confirmDialog`, action buttons, `modalPromise` | `rexui-dialogs-and-popups/references/dialog-recipes.md`, `rexui-dialogs-and-popups/references/modal-patterns.md` |
| Popup hierarchical menu | `menu`, nested item data, label buttons, pointer-outside collapse | `rexui-dialogs-and-popups/references/dialog-config.md`, `rexui-interactions-and-effects/references/gesture-behaviors.md` |
| Full custom dialog | `dialog`, title/content/description/choices/actions/toolbars | `rexui-dialogs-and-popups/references/dialog-config.md`, `rexui-dialogs-and-popups/references/dialog-recipes.md` |
| Virtual item grid/table | `gridTable`, reusable cell containers, slider, cell events | `rexui-scroll-lists-and-tables/references/gridtable-config.md`, `rexui-scroll-lists-and-tables/references/list-recipes.md` |
| Tabs driving table filters | `tabs`, `gridTable`, label tab buttons, `setItems()` | `rexui-basic-widgets/references/basic-widget-recipes.md`, `rexui-scroll-lists-and-tables/references/gridtable-config.md` |

## Source Provenance

These are the high-frequency examples this reference summarizes. Do not require future skill users to read these files; use them only as provenance while authoring or auditing skills.

| Origin example | Pattern name in this reference |
| --- | --- |
| `examples/ui-scrollablepanel/panel.js` | Scrollable Panel |
| `examples/ui-textbox/textbox.js` | Dialogue TextBox |
| `examples/ui-dialog/yes-no-dialog.js` | Yes/No Dialog |
| `examples/ui-menu/popup-menu.js` | Popup Menu |
| `examples/ui-dialog/dialog.js` | Full Custom Dialog |
| `examples/ui-gridtable/gridtable.js` | GridTable |
| `examples/ui-tabs/tabstable.js` | Tabs + Table |

## Scrollable Panel

Use when the UI has one scrollable composed child, such as a vertical list of labels, a form, a chip panel, or nested layout content.

Core shape:

```js
const background = this.rexUI.add.roundRectangle({ radius: 8, color: 0x111111 });

const content = this.rexUI.add.sizer({
  orientation: 'y',
  space: { item: 6 }
});

items.forEach((item) => {
  content.add(this.rexUI.add.label({
    background: this.rexUI.add.roundRectangle({ radius: 6, color: 0x2a2a2a }),
    text: this.add.text(0, 0, item.label),
    space: { left: 10, right: 10, top: 8, bottom: 8 }
  }), { expand: true });
});

const panel = this.rexUI.add.scrollablePanel({
  x: 400,
  y: 300,
  width: 360,
  height: 420,
  scrollMode: 'vertical',
  background,
  panel: {
    child: content,
    mask: { padding: 1 }
  },
  slider: {
    track: this.rexUI.add.roundRectangle({ width: 12, radius: 6, color: 0x222222 }),
    thumb: this.rexUI.add.roundRectangle({ radius: 8, color: 0xffffff }),
    adaptThumbSize: true,
    hideUnscrollableSlider: true
  },
  mouseWheelScroller: { focus: true, speed: 0.1 },
  space: { left: 10, right: 10, top: 10, bottom: 10, panel: 8 }
}).layout();
```

Rules:

- `panel.child` is one object. Put multiple children inside `sizer`, `gridSizer`, or `fixWidthSizer`.
- Create opaque backgrounds before content when display-list order matters.
- Call `.layout()` after content creation and after mutating the panel or child.
- Use `gridTable` instead if the list is large and every row/cell has the same shape.

## Dialogue TextBox

Use for RPG-style dialogue, tutorials, message paging, or typewriter text.

Core shape:

```js
const textBox = this.rexUI.add.textBox({
  x: 80,
  y: 420,
  width: 640,
  height: 140,
  typingMode: 'page',
  background: this.rexUI.add.roundRectangle({ radius: 14, color: 0x222222 }),
  text: this.rexUI.add.BBCodeText(0, 0, '', {
    fontSize: 20,
    wrap: { mode: 'word', width: 520 },
    maxLines: 3
  }),
  action: this.add.text(0, 0, 'Next').setVisible(false),
  expandTextWidth: true,
  expandTextHeight: true,
  space: { left: 18, right: 18, top: 14, bottom: 14, text: 12 },
  align: { action: 'bottom' }
})
  .setOrigin(0)
  .layout();

textBox
  .setInteractive()
  .on('pointerdown', () => {
    textBox.getElement('action').setVisible(false);

    if (textBox.isTyping) {
      textBox.stop(true);
    } else if (!textBox.isLastPage) {
      textBox.typeNextPage();
    }
  })
  .on('pageend', () => {
    if (!textBox.isLastPage) {
      textBox.getElement('action').setVisible(true);
      textBox.resetChildVisibleState(textBox.getElement('action'));
    }
  });

textBox.start('[color=yellow]Guide[/color]: Welcome.', 35);
```

Rules:

- Use `BBCodeText` when the content needs rich inline formatting.
- Keep `wrap.width` aligned with textbox inner width.
- Use `pageend` to show the next prompt; use `complete` to hide it.

## Yes/No Dialog

Use `confirmDialog` for generic yes/no confirmation. Use `dialog` only when the layout needs custom slots or custom button grouping.

Generic confirmation:

```js
this.rexUI.add.confirmDialog(style)
  .setPosition(400, 300)
  .resetDisplayContent({
    title: 'Confirm',
    content: 'Apply this change?',
    buttonA: 'Yes',
    buttonB: 'No'
  })
  .layout()
  .modalPromise()
  .then((data) => {
    if (data.index === 0) {
      applyChange();
    }
  });
```

Custom dialog action row:

```js
const dialog = this.rexUI.add.dialog({
  x: 400,
  y: 300,
  background: this.rexUI.add.roundRectangle({ radius: 16, color: 0x222222 }),
  title: makeLabel(this, 'Title'),
  content: this.add.text(0, 0, 'Continue?'),
  actions: [makeLabel(this, 'Yes'), makeLabel(this, 'No')],
  align: { actions: 'right' },
  space: { left: 20, right: 20, top: 20, bottom: 20, title: 16, content: 16, action: 8 },
  expand: { content: false }
}).layout().popUp(180);

dialog.on('button.click', (button, groupName, index) => {
  if (groupName === 'actions' && index === 0) {
    applyChange();
  }
});
```

Rules:

- Use `.modalPromise()` when callers need a result.
- Use `.popUp()` for visual entrance only; it is not a modal result mechanism by itself.
- Pure Phaser text in `content` often needs `expand: { content: false }`.

## Popup Menu

Use for hierarchical context menus, right-click/tap menus, or hover-expanded submenus.

Core shape:

```js
const menu = this.rexUI.add.menu({
  x: pointer.x,
  y: pointer.y,
  orientation: 'y',
  items: [
    { name: 'Open' },
    { name: 'Export', children: [{ name: 'PNG' }, { name: 'JSON' }] },
    { name: 'Delete' }
  ],
  createBackgroundCallback(items) {
    return items.scene.rexUI.add.roundRectangle({ radius: 6, color: 0x222222 });
  },
  createButtonCallback(item, index, items) {
    const scene = items.scene;
    return scene.rexUI.add.label({
      background: scene.rexUI.add.roundRectangle({ radius: 0, color: 0x333333 }),
      text: scene.add.text(0, 0, item.name),
      space: { left: 12, right: 12, top: 8, bottom: 8 }
    });
  },
  easeIn: { duration: 120, orientation: 'y' },
  easeOut: { duration: 100, orientation: 'y' },
  pointerDownOutsideCollapsing: true
});

menu
  .on('button.over', (button) => button.getElement('background').setStrokeStyle(1, 0xffffff))
  .on('button.out', (button) => button.getElement('background').setStrokeStyle())
  .on('button.click', (button) => runMenuAction(button.text));
```

Rules:

- `items` is data; `createButtonCallback` maps each item to a RexUI button object.
- Use `pointerDownOutsideCollapsing` or `clickOutside` to close floating menus.
- Highlight in `button.over` / `button.out`; execute commands in `button.click`.

## Full Custom Dialog

Use when the demo-style dialog includes toolbars, title, content, description, choices, and actions.

Slot checklist:

| Slot | Typical object |
| --- | --- |
| `background` | `roundRectangle`, `ninePatch`, or state-aware background |
| `title` | `label` |
| `toolbar`, `leftToolbar` | arrays of small `label` buttons |
| `content` | `label`, `text`, `sizer`, `textArea`, or custom object |
| `description` | `label` or text block |
| `choices` | array of labels/buttons |
| `actions` | array of labels/buttons |

Core rules:

- Call `.setDraggable('background')` or `.setDraggable('title')` only after the target element exists.
- `dialog.on('button.click', (button, groupName, index) => {})` is the central event.
- Use `groupName` to distinguish `choices`, `actions`, `toolbar`, and `leftToolbar`.
- Keep spacing explicit: `choice`, `action`, `toolbarItem`, `leftToolbarItem`, and section gaps are separate fields.

## GridTable

Use for large repeated item sets, inventories, level selects, logs, and filtered data grids.

Core shape:

```js
const table = this.rexUI.add.gridTable({
  x: 400,
  y: 300,
  width: 360,
  height: 420,
  scrollMode: 'vertical',
  table: {
    cellWidth: 120,
    cellHeight: 64,
    columns: 2,
    mask: { padding: 2 },
    interactive: true,
    reuseCellContainer: true
  },
  slider: {
    track: this.rexUI.add.roundRectangle({ width: 12, radius: 6, color: 0x222222 }),
    thumb: this.rexUI.add.roundRectangle({ radius: 8, color: 0xffffff })
  },
  items,
  createCellContainerCallback(cell, cellContainer) {
    const scene = cell.scene;
    const item = cell.item;

    if (cellContainer === null) {
      cellContainer = scene.rexUI.add.label({
        width: cell.width,
        height: cell.height,
        background: scene.rexUI.add.roundRectangle({ radius: 4 }),
        text: scene.add.text(0, 0, ''),
        space: { left: 10, right: 10 }
      });
    }

    cellContainer.setMinSize(cell.width, cell.height);
    cellContainer.getElement('text').setText(item.name);
    return cellContainer;
  }
}).layout();

table.on('cell.click', (cellContainer, cellIndex) => {
  selectItem(table.items[cellIndex]);
});
```

Rules:

- The cell callback is both creator and updater. Reset all item-dependent state on every call.
- Do not close over a stale item in a reused cell.
- Use `table.setItems(nextItems).scrollToTop()` or `.layout()` after filtering/sorting.

## Tabs + Table

Use when side/top buttons filter or sort one central `gridTable`. This is different from `tabPages`, where each tab owns a separate page.

Core shape:

```js
const table = this.rexUI.add.gridTable({
  table: {
    width: 260,
    height: 400,
    cellWidth: 120,
    cellHeight: 60,
    columns: 2,
    mask: { padding: 2 },
    reuseCellContainer: true
  },
  items: [],
  createCellContainerCallback: createCell
});

const tabs = this.rexUI.add.tabs({
  x: 400,
  y: 300,
  panel: table,
  leftButtons: ['AA', 'BB', 'CC'].map((key) => makeTabButton(this, key)),
  rightButtons: ['+', '-'].map((key) => makeTabButton(this, key)),
  space: {
    leftButtonsOffset: 20,
    rightButtonsOffset: 30,
    leftButton: 2,
    rightButton: 2
  }
}).layout();

let selectedType = 'AA';
let descending = false;

tabs.on('button.click', (button, groupName) => {
  if (groupName === 'left') {
    selectedType = button.text;
  } else if (groupName === 'right') {
    descending = button.text === '-';
  }

  const nextItems = filterAndSortItems(allItems, selectedType, descending);
  tabs.getElement('panel').setItems(nextItems).scrollToTop();
});
```

Rules:

- Use `tabs` when buttons surround one panel.
- Use `tabPages` when each tab swaps a separate page.
- Keep selected tab visual state in `button.click`, `button.over`, or `setValueCallback`.
- Keep data filtering outside the UI code; the UI only calls `setItems()`.

## Common Gotchas Across These Demos

- Call `.layout()` before popups, modals, hit tests, anchor resizing, and animations.
- Use package paths such as `phaser4-rex-plugins/templates/ui/ui-plugin.js` in npm projects.
- Avoid copying example-only dependencies such as random demo data, local image assets, logging text, or third-party demo databases.
- If a background or cover hides content, check Phaser display-list order and depth. Create opaque backgrounds before content or bring content above the background.
- When the pattern is ambiguous, choose by data shape: composed child -> `scrollablePanel`; many repeated cells -> `gridTable`; one central panel controlled by buttons -> `tabs`; multiple independent pages -> `tabPages`.
