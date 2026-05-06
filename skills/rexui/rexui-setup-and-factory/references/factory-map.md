# RexUI Factory Map

This map is for choosing the correct `this.rexUI.add.*` entry point. Use component-specific skills and `.d.ts` files for detailed config.

## Setup

Source:

- `templates/ui/ui-plugin.js`
- `templates/ui/ui-plugin.d.ts`
- `templates/ui/<component>/Factory.js`

All entries below are scene-plugin factories used as:

```js
this.rexUI.add.<factoryName>(...)
```

## Layout And Composition

### Layout Chooser

Use these four layout factories first:

| Need | Use | Reason |
|---|---|---|
| A row or column | `sizer` | Primary linear layout. Use for horizontal/vertical panels, toolbars, form rows, and nested UI. |
| Fixed rows and columns | `gridSizer` | Use when children belong in known cells, such as inventories, button grids, stat tables, or keypad-like layouts. |
| Wrapping flow layout | `fixWidthSizer` | Use when children should wrap by available width, such as tag chips, dynamic button lists, or responsive option groups. |
| Stacked or overlaid children | `overlapSizer` | Use for layers in the same rectangle, such as background plus content, badge overlays, progress overlays, or centered labels on graphics. |

Default to `sizer` unless the user clearly needs a grid, wrapping flow, or overlay.

| Factory | Folder | Common use |
|---|---|---|
| `container` | `container` | Lightweight container for child objects. |
| `sizer` | `sizer` | Horizontal or vertical layout. |
| `gridSizer` | `gridsizer` | Grid layout with rows and columns. |
| `fixWidthSizer` | `fixwidthsizer` | Wrapping layout with fixed width. |
| `overlapSizer` | `overlapsizer` | Stack/overlay layout. |
| `space` | `space` | Flexible spacer in sizers. |
| `holyGrail` | `holygrail` | Header/footer/sidebar/content layout. |
| `splitPanels` | `splitpanels` | Split panel layout. |
| `sides` | `sides` | Side-region layout helper. |
| `pages` | `pages` | Page switching container. |
| `tabPages` | `tabpages` | Pages controlled by tabs. |

## Basic Widgets

| Factory | Folder | Common use |
|---|---|---|
| `label` | `label` | Background + icon + text + action composition. |
| `simpleLabel` | `simplelabel` | Label with built-in creators. |
| `titleLabel` | `titlelabel` | Title/content label layout. |
| `simpleTitleLabel` | `simpletitlelabel` | Title label with built-in creators. |
| `nameValueLabel` | `namevaluelabel` | Name/value display row. |
| `badgeLabel` | `badgelabel` | Label with badge indicator. |
| `buttons` | `buttons` | Button group. |
| `gridButtons` | `gridbuttons` | Button grid. |
| `fixWidthButtons` | `fixwidthbuttons` | Wrapped button group. |
| `tabs` | `tabs` | Tab row/column control. |
| `slider` | `slider` | Value slider. |
| `knob` | `knob` | Rotary value control. |
| `numberBar` | `numberbar` | Numeric value bar. |
| `checkbox` | `checkbox` | Checkbox shape/control. |
| `toggleSwitch` | `toggleswitch` | Toggle switch shape/control. |
| `fullscreenButton` | `fullscreenbutton` | Fullscreen control. |

## Dialogs, Menus, And Popups

| Factory | Folder | Common use |
|---|---|---|
| `dialog` | `dialog` | General dialog layout. |
| `confirmDialog` | `confirmdialog` | Confirmation dialog. |
| `confirmActionButton` | `confirmactionbutton` | Button with confirm action flow. |
| `nameInputDialog` | `nameinputdialog` | Dialog for name/text entry. |
| `menu` | `menu` | Menu panel. |
| `dropDownList` | `dropdownlist` | Dropdown list with custom list panel. |
| `simpleDropDownList` | `simpledropdownlist` | Simplified dropdown list. |
| `toast` | `toast` | Single toast notification. |
| `toastQueue` | `toastqueue` | Queued toast notifications. |

## Scrollable And Data Views

| Factory | Folder | Common use |
|---|---|---|
| `scrollablePanel` | `scrollablepanel` | Scrollable container. |
| `scrollBar` | `scrollbar` | Scrollbar control. |
| `gridTable` | `gridtable` | Large or virtualized grid/list. |
| `trees` | `trees` | Tree view. |
| `folder` | `folder` | Foldable/collapsible section. |
| `textArea` | `textarea` | Scrollable text area widget. |
| `textAreaInput` | `textareainput` | Text area with input support. |

## Text And Input

| Factory | Folder | Common use |
|---|---|---|
| `BBCodeText` | `bbcodetext` | BBCode rich text. |
| `tagText` | `tagtext` | Tag-based rich text. |
| `dynamicText` | `dynamictext` | Dynamic text layout. |
| `textBox` | `textbox` | Text box display. |
| `simpleTextBox` | `simpletextbox` | Simplified text box. |
| `textPlayer` | `textplayer` | Text playback. |
| `textTyping` | `texttyping` | Typing effect. |
| `textPage` | `textpage` | Text pagination helper. |
| `textEdit` | `textedit` | Edit an existing text object. |
| `hiddenEdit` | `hiddenedit` | Hidden edit bridge. |
| `inputText` | `inputtext` | Input text component. |
| `canvasInput` | `canvasinput` | Canvas-rendered input. |
| `fileChooser` | `filechooser` | File chooser object. |
| `fileDropZone` | `filedropzone` | File drop zone. |
| `fileSelectorButton` | `fileselectorbutton` | Button-backed file selection. |
| `imageInputLabel` | `imageinputlabel` | Image input wrapped as label. |
| `colorInput` | `colorinput/colorinput` | Color input widget. |
| `colorInputLite` | `colorinput/colorinputbase` | Lightweight color input. |
| `colorPicker` | `colorinput/colorpicker` | Color picker. |
| `colorComponents` | `colorinput/colorcomponents` | Color component controls. |

## Shapes, Skins, Images, And Progress

| Factory | Folder | Common use |
|---|---|---|
| `roundRectangle` | `roundrectangle` | Common rounded rectangle background. |
| `roundRectangleCanvas` | `roundrectanglecanvas` | Canvas-backed rounded rectangle. |
| `ninePatch` | `ninepatch` | Scalable nine-patch image. |
| `ninePatch2` | `ninepatch2` | Alternate nine-patch implementation. |
| `quadShape` | `quadshape` | Quadrilateral shape. See gotchas. |
| `triangle` | `triangle` | Triangle shape. |
| `customShapes` | `customshapes` | Custom vector shapes. |
| `canvas` | `canvas` | Canvas game object. |
| `imageBox` | `imagebox` | Image container/box. |
| `lazyLoadImageBox` | `lazyloadimagebox` | Lazy-loading image box. |
| `circleMaskImage` | `circlemaskimage` | Image with circular mask. |
| `alphaMaskImage` | `alphamaskimage` | Image with alpha mask. |
| `statesImage` | `statesimage` | State-aware image. |
| `statesText` | `statestext` | State-aware text. |
| `statesBitmapText` | `statesbitmaptext` | State-aware bitmap text. |
| `statesRoundRectangle` | `statesroundrectangle` | State-aware rounded rectangle. |
| `statesNinePatch` | `statesninepatch` | State-aware nine-patch. |
| `statesNineSlice` | `statesnineslice` | State-aware nine-slice. |
| `statesBarRectangle` | `statesbarrectangle` | State-aware bar rectangle. |
| `circularProgress` | `circularprogress` | Circular progress display. |
| `circularProgressCanvas` | `circularprogresscanvas` | Canvas circular progress display. |
| `lineProgress` | `lineprogress` | Linear progress display. |
| `lineProgressCanvas` | `lineprogresscanvas` | Canvas linear progress display. |
| `roundRectangleProgress` | `roundrectangleprogress` | Rounded rectangle progress. See gotchas. |
| `customProgress` | `customprogress` | Custom progress display. |
| `aioSpinner` | `aiospinner` | Loading spinner. |
| `chart` | `chart` | Chart wrapper. |
| `cover` | `cover` | Full-screen cover object. |
| `fullWindowRectangle` | `fullwindowrectangle` | Full-window rectangle. |
| `fullWindowZone` | `fullwindowzone` | Full-window input zone. |

## Behaviors And Effects

| Factory | Folder | Common use |
|---|---|---|
| `click` | `click` | Click behavior for a game object. |
| `clickOutside` | `clickoutside` | Detect outside clicks. |
| `inTouching` | `intouching` | Continuous touching behavior. |
| `tap` | `tap` | Tap gesture. |
| `press` | `press` | Press gesture. |
| `swipe` | `swipe` | Swipe gesture. |
| `pan` | `pan` | Pan gesture. |
| `drag` | `drag` | Drag behavior. |
| `pinch` | `pinch` | Pinch gesture. |
| `rotate` | `rotate` | Rotate gesture. |
| `flip` | `flip` | Flip transition/effect. |
| `shake` | `shake` | Shake effect. |
| `skew` | `skew` | Skew effect. |
| `perspective` | `perspective` | Perspective transform helper. |
| `perspectiveCard` | `perspectivecard` | Perspective card widget. |
| `anchor` | `anchor` | Anchor positioning behavior. |
| `touchEventStop` | `toucheventstop` | Stop touch propagation. |
| `layerManager` | `layermanager` | Layer management helper. |
| `tweaker` | `tweaker` | Property tweaking UI. |

## Factory Name Gotchas

Check source before generating code for these:

- `transitionImage` and `transitionImagePack` are present in folders but commented out in `ui-plugin.js` and `ui-plugin.d.ts`.

When in doubt, inspect both `ui-plugin.d.ts` and the component `Factory.js`.
