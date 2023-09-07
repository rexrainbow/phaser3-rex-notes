# Drag drop

## Demo

[Demo](https://rexrainbow.github.io/phaser3-rex-notes/examples/ui-scrollablepanel/dragdrop/app/index.html)

- Drag & drop item to another column panel
- Drag & drop column panel to swap panels

## Sizer structure

- ColumnPanelsBox : Sizer
    - ColumnPanel : Dialog, child of Sizer
        - ItemsBox : Sizer, content element of Dialog
            - Item : Label, child of Sizer

## Drag & drop

### ColumnPanel

1. Drag ColumnPanel
1. Remove this ColumnPanel from ColumnPanelsBox
1. Drop, insert this ColumnPanel into ColumnPanelsBox, with new position
1. Layout top most ui
1. Move ColumnPanels in ColumnPanelsBox

### Item

1. Setup drop-zone for a ItemsBox, store ItemsBox as currentItemsBox into drop-zone's Data
1. Drag Item
1. Store ItemsBox as previousItemsBox and index in Item's Data
1. Remove this Item from ItemsBox
1. Drop, insert this Item into currentItemsBox (drop-zone's Data)
1. Layout top most ui
1. Move Items in previousItemsBox, currentItemsBox

