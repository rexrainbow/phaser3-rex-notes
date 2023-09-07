# Drag drop

## Demo

[Demo](https://rexrainbow.github.io/phaser3-rex-notes/examples/ui-scrollablepanel/dragdrop/app/index.html)

- Drag & drop item to another column panel
- Drag & drop column panel to swap panels

## Window hierarchy

- ColumnPanelsBox : Sizer
    - ColumnPanel : Dialog, child of Sizer
        - ItemsBox : Sizer, content element of Dialog
            - Item : Label, child of Sizer

