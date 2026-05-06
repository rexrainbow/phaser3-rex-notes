# Pages, Trees, And Events

Use this reference for non-virtual list structure: page swapping, tabs, folders, and nested trees.

## Pages

`pages` is an `overlapSizer` that keeps multiple page objects and swaps visibility or destroys old pages depending on `swapMode`.

```js
const pages = this.rexUI.add.pages({
  fadeIn: 200,
  swapMode: 'invisible',
  space: { left: 12, right: 12, top: 12, bottom: 12 }
})
  .addPage(createInventoryPage(this), 'inventory', 'center', 0, true)
  .addPage(createStatsPage(this), 'stats', 'center', 0, true)
  .layout()
  .swapPage('inventory');
```

Main methods:

- `addPage(gameObject, key, align, padding, expand, minWidth, minHeight)`
- `swapPage(key, fadeInDuration)`
- `getPage(key)`
- `currentKey`, `previousKey`, `keys`

Gotcha: `Pages.d.ts` documents an object config for `addPage`, but the current implementation aliases `OverlapSizer.add` and uses positional arguments. Existing examples also use `addPage(pageObject, key)`. Prefer the positional form above unless the source changes.

Events:

- `pagevisible(page, key, pages)`
- `pageinvisible(page, key, pages)`

Use `swapMode: 'destroy'` only when a page can be recreated safely.

## TabPages

`tabPages` combines a tab button area and an internal `pages` object.

```js
const tabPages = this.rexUI.add.tabPages({
  x: 400,
  y: 300,
  width: 500,
  height: 360,
  tabPosition: 'top',
  tabs: { space: { item: 4 } },
  pages: { fadeIn: 200 },
  align: { tabs: 'center' },
  space: { left: 8, right: 8, top: 8, bottom: 8, item: 8 }
})
  .on('tab.focus', (tab, key) => {
    tab.getElement('background').setStrokeStyle(2, 0xffff00);
  })
  .on('tab.blur', (tab, key) => {
    tab.getElement('background').setStrokeStyle();
  });

tabPages
  .addPage({
    key: 'items',
    tab: createTab(this, 'Items'),
    page: createItemsPage(this)
  })
  .addPage({
    key: 'stats',
    tab: createTab(this, 'Stats'),
    page: createStatsPage(this)
  })
  .layout()
  .swapFirstPage();
```

Main methods:

- `addPage({ key, tab, page })`
- `addPage(key, tabGameObject, pageGameObject)`
- `removePage(key, destroyChild)`
- `swapPage(key, fadeInDuration)`
- `swapFirstPage()`, `swapLastPage()`
- `setTabPosition('top' | 'bottom' | 'left' | 'right')`

Events:

- `tab.focus(tab, key)`
- `tab.blur(tab, key)`
- `page.focus(page, key)`
- `page.blur(page, key)`

## Folder

`folder` is a collapsible title + child container.

```js
const title = this.rexUI.add.label({
  background: this.rexUI.add.roundRectangle({ radius: 4, color: 0x333333 }),
  icon: this.rexUI.add.triangle({ color: 0xffffff, padding: 2 }),
  text: this.add.text(0, 0, 'Options'),
  space: { left: 8, right: 8, top: 6, bottom: 6, icon: 6 }
});

const child = this.rexUI.add.sizer({ orientation: 'y', space: { item: 4 } });
child.add(createRow(this, 'Music'), { expand: true });
child.add(createRow(this, 'SFX'), { expand: true });

const folder = this.rexUI.add.folder({
  orientation: 'y',
  title,
  child,
  toggleByTarget: title.getElement('icon'),
  transition: { duration: 200 },
  space: { childLeft: 24 }
})
  .setOrigin(0)
  .layout()
  .expand(0);
```

Folder events:

- `expand.start`
- `expand.complete`
- `collapse.start`
- `collapse.complete`
- Child title/body objects also receive `folder.expand` and `folder.collapse`.

## Trees

`trees` manages nested `tree` objects and leaf nodes. Use it when nodes should be addressable by key.

```js
const trees = this.rexUI.add.trees({
  x: 40,
  y: 40,
  width: 320,
  tree: {
    space: {
      indent: 28,
      nodeLeft: 8,
      nodeRight: 8,
      nodeTop: 6,
      nodeBottom: 6,
      toggleButton: 6
    },
    toggleButton(scene) {
      return scene.rexUI.add.triangle({ color: 0xffffff, padding: 2 })
        .on('expand.start', (gameObject) => gameObject.setDirection('down'))
        .on('collapse.start', (gameObject) => gameObject.setDirection('right'));
    },
    nodeBody(scene) {
      return scene.rexUI.add.label({
        text: scene.add.text(0, 0, ''),
        space: { left: 6, right: 6, top: 4, bottom: 4 }
      });
    },
    expanded: false
  }
}).setOrigin(0);

const root = trees.addTree('root');
root.getElement('nodeBody').text = 'Root';

const group = root.addTree('weapons');
group.getElement('nodeBody').text = 'Weapons';

const sword = group.addNode('sword');
sword.getElement('nodeBody').text = 'Sword';

trees
  .setChildrenInteractive()
  .on('child.click', (child) => {
    const body = child.getElement('nodeBody');
    selectNode(body.text);
  })
  .layout();
```

Tree methods:

- `trees.addTree(keyOrConfig)`
- `tree.addTree(keyOrConfig)`
- `tree.addNode(keyOrGameObject)`
- `trees.getTree(nodeKey)`
- `trees.getNode(nodeKey)`
- `tree.getAllNodes()`

Tree events:

- `tree.expand.start(tree)`
- `tree.collapse.start(tree)`
- `child.click(child, pointer, event)`

Call `.layout()` after adding/removing nodes or changing expanded state.
