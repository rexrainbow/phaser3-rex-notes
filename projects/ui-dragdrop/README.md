# Drag drop

## Demo

[Demo](https://rexrainbow.github.io/phaser3-rex-notes/examples/projects/ui-dragdrop/app/index.html)

- Drag & drop item to another column panel
- Drag & drop column panel to swap panels


## Sizer structure

- ScrollablePanel : top ui
    - ColumnPanelsBox : Sizer, panel of ScrollablePanel
        - ColumnPanel : Dialog, child of Sizer
            - ItemsBox : Sizer, content element of Dialog
                - background : round-rectangle shape, for drop zone
                - Item : Label, child of Sizer
    - SliderX
    - SliderY


## Drag & drop

### ColumnPanel

Drag & drop column panel to swap panels

1. Drag ColumnPanel
1. Remove this ColumnPanel from ColumnPanelsBox
2. Drop, insert this ColumnPanel into ColumnPanelsBox
3. Move ColumnPanels in ColumnPanelsBox
    1. For each ColumnPanel in ColumnPanelsBox, save current position
    2. Layout top most ui
    3. Move ColumnPanel from current postion to new position

### Item

Drag & drop item to another column panel

Setup drop-zone for a ItemsBox, store ItemsBox as currentItemsBox into drop-zone's Data

1. Drag Item
1. Store ItemsBox as previousItemsBox and index in Item's Data
1. Remove this Item from ItemsBox
1. Drop, insert this Item into currentItemsBox (drop-zone's Data)
1. Move Items to new position in previousItemsBox, currentItemsBox
    1. For each item, save current position
    1. Layout top most ui
    1. Move Item from current postion to new position

### Scrollable Panel

- Set config's parameter `panel.mask.updateMode` to `'everyTick'`, to get masked
  game object every tick, since ColumnPanel or Item can move without scrolling.
