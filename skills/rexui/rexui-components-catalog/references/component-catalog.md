# RexUI Component Catalog

Use this table to choose a RexUI component and the next skill to load. It is intentionally compact. Use `.d.ts` files and specialized skills for full config details.

## Setup And Discovery

| Need | Use | Factory/helper | Source folder/file | Related skill |
|---|---|---|---|---|
| Install RexUI scene plugin | `UIPlugin` | `mapping: 'rexUI'` | `templates/ui/ui-plugin.js` | `rexui-setup-and-factory` |
| Create components from a scene | `this.rexUI.add` | `this.rexUI.add.*` | `templates/ui/ObjectFactory.js` | `rexui-setup-and-factory` |
| Check available factories | factory map | n/a | `templates/ui/ui-plugin.d.ts` | `rexui-setup-and-factory` |
| Use package imports | npm package path | `phaser4-rex-plugins/templates/ui/...` | package export path | `rexui-setup-and-factory` |

## Layout

| Need | Use | Factory | Source folder | Related skill |
|---|---|---|---|---|
| Row or column layout | `Sizer` | `sizer` | `sizer` | `rexui-layout-sizers` |
| Fixed rows and columns | `GridSizer` | `gridSizer` | `gridsizer` | `rexui-layout-sizers` |
| Wrapping flow layout | `FixWidthSizer` | `fixWidthSizer` | `fixwidthsizer` | `rexui-layout-sizers` |
| Overlay or stacked layers | `OverlapSizer` | `overlapSizer` | `overlapsizer` | `rexui-layout-sizers` |
| Spacer inside layout | `Space` | `space` | `space` | `rexui-layout-sizers` |
| Header/footer/sidebar/content | `HolyGrail` | `holyGrail` | `holygrail` | `rexui-layout-sizers` |
| Split panels | `SplitPanels` | `splitPanels` | `splitpanels` | `rexui-layout-sizers` |
| Region-based side layout | `Sides` | `sides` | `sides` | `rexui-layout-sizers` |
| Page switching container | `Pages` | `pages` | `pages` | `rexui-scroll-lists-and-tables` |
| Tab-controlled pages | `TabPages` | `tabPages` | `tabpages` | `rexui-scroll-lists-and-tables` |

## Basic Widgets

| Need | Use | Factory | Source folder | Related skill |
|---|---|---|---|---|
| Compound text/icon button-like unit | `Label` | `label` | `label` | `rexui-basic-widgets` |
| Label with built-in creators | `SimpleLabel` | `simpleLabel` | `simplelabel` | `rexui-basic-widgets` |
| Title plus content label | `TitleLabel` | `titleLabel` | `titlelabel` | `rexui-basic-widgets` |
| Simple title/content label | `SimpleTitleLabel` | `simpleTitleLabel` | `simpletitlelabel` | `rexui-basic-widgets` |
| Name/value row | `NameValueLabel` | `nameValueLabel` | `namevaluelabel` | `rexui-basic-widgets` |
| Badge indicator on label | `BadgeLabel` | `badgeLabel` | `badgelabel` | `rexui-basic-widgets` |
| Button group | `Buttons` | `buttons` | `buttons` | `rexui-basic-widgets` |
| Button grid | `GridButtons` | `gridButtons` | `gridbuttons` | `rexui-basic-widgets` |
| Wrapped buttons | `FixWidthButtons` | `fixWidthButtons` | `fixwidthbuttons` | `rexui-basic-widgets` |
| Tabs | `Tabs` | `tabs` | `tabs` | `rexui-basic-widgets` |
| Slider | `Slider` | `slider` | `slider` | `rexui-basic-widgets` |
| Rotary control | `Knob` | `knob` | `knob` | `rexui-basic-widgets` |
| Number bar | `NumberBar` | `numberBar` | `numberbar` | `rexui-basic-widgets` |
| Checkbox | `Checkbox` | `checkbox` | `checkbox` | `rexui-basic-widgets` |
| Toggle switch | `ToggleSwitch` | `toggleSwitch` | `toggleswitch` | `rexui-basic-widgets` |
| Fullscreen button | `FullscreenButton` | `fullscreenButton` | `fullscreenbutton` | `rexui-basic-widgets` |

## Dialogs And Popups

| Need | Use | Factory/helper | Source folder | Related skill |
|---|---|---|---|---|
| Custom dialog layout | `Dialog` | `dialog` | `dialog` | `rexui-dialogs-and-popups` |
| Confirmation dialog | `ConfirmDialog` | `confirmDialog` | `confirmdialog` | `rexui-dialogs-and-popups` |
| Confirm an action from a button | `ConfirmActionButton` | `confirmActionButton` | `confirmactionbutton` | `rexui-dialogs-and-popups` |
| Name/text entry dialog | `NameInputDialog` | `nameInputDialog` | `nameinputdialog` | `rexui-dialogs-and-popups` |
| Menu | `Menu` | `menu` | `menu` | `rexui-dialogs-and-popups` |
| Custom dropdown list | `DropDownList` | `dropDownList` | `dropdownlist` | `rexui-dialogs-and-popups` |
| Simple dropdown list | `SimpleDropDownList` | `simpleDropDownList` | `simpledropdownlist` | `rexui-dialogs-and-popups` |
| Toast notification | `Toast` | `toast` | `toast` | `rexui-dialogs-and-popups` |
| Queued notifications | `ToastQueue` | `toastQueue` | `toastqueue` | `rexui-dialogs-and-popups` |
| Modal behavior on an existing object | modal helper | `modal`, `modalPromise`, `modalClose` | `modal` | `rexui-dialogs-and-popups` |

## Scrollable Lists And Tables

| Need | Use | Factory | Source folder | Related skill |
|---|---|---|---|---|
| Scrollable composed panel | `ScrollablePanel` | `scrollablePanel` | `scrollablepanel` | `rexui-scroll-lists-and-tables` |
| Standalone scrollbar | `ScrollBar` | `scrollBar` | `scrollbar` | `rexui-scroll-lists-and-tables` |
| Large repeated item grid/list | `GridTable` | `gridTable` | `gridtable` | `rexui-scroll-lists-and-tables` |
| Tree view | `Trees` | `trees` | `trees` | `rexui-scroll-lists-and-tables` |
| Foldable section | `Folder` | `folder` | `folder` | `rexui-scroll-lists-and-tables` |
| Multi-page UI | `Pages` | `pages` | `pages` | `rexui-scroll-lists-and-tables` |
| Tabs with pages | `TabPages` | `tabPages` | `tabpages` | `rexui-scroll-lists-and-tables` |

## Text And Input

| Need | Use | Factory/helper | Source folder | Related skill |
|---|---|---|---|---|
| BBCode rich text | `BBCodeText` | `BBCodeText` | `bbcodetext` | `rexui-text-and-input` |
| Tag-based rich text | `TagText` | `tagText` | `tagtext` | `rexui-text-and-input` |
| Dynamic text layout | `DynamicText` | `dynamicText` | `dynamictext` | `rexui-text-and-input` |
| Text box display | `TextBox` | `textBox` | `textbox` | `rexui-text-and-input` |
| Simple text box | `SimpleTextBox` | `simpleTextBox` | `simpletextbox` | `rexui-text-and-input` |
| Scrollable text area | `TextArea` | `textArea` | `textarea` | `rexui-text-and-input` |
| Text area with input | `TextAreaInput` | `textAreaInput` | `textareainput` | `rexui-text-and-input` |
| DOM-style input text | `InputText` | `inputText` | `inputtext` | `rexui-text-and-input` |
| Canvas-rendered input | `CanvasInput` | `canvasInput` | `canvasinput` | `rexui-text-and-input` |
| Edit an existing text object | `TextEdit` | `textEdit`, `edit` | `textedit` | `rexui-text-and-input` |
| Hidden edit bridge | `HiddenEdit` | `hiddenEdit` | `hiddenedit` | `rexui-text-and-input` |
| Typing effect | `TextTyping` | `textTyping` | `texttyping` | `rexui-text-and-input` |
| Text pagination | `TextPage` | `textPage` | `textpage` | `rexui-text-and-input` |
| Text playback | `TextPlayer` | `textPlayer` | `textplayer` | `rexui-text-and-input` |
| File chooser | `FileChooser` | `fileChooser`, `openFileChooser` | `filechooser` | `rexui-text-and-input` |
| File drop zone | `FileDropZone` | `fileDropZone` | `filedropzone` | `rexui-text-and-input` |
| File selector button | `FileSelectorButton` | `fileSelectorButton` | `fileselectorbutton` | `rexui-text-and-input` |
| Image input label | `ImageInputLabel` | `imageInputLabel` | `imageinputlabel` | `rexui-text-and-input` |
| Color input | `ColorInput` | `colorInput` | `colorinput/colorinput` | `rexui-text-and-input` |
| Lightweight color input | `ColorInputBase` | `colorInputLite` | `colorinput/colorinputbase` | `rexui-text-and-input` |
| Color picker | `ColorPicker` | `colorPicker` | `colorinput/colorpicker` | `rexui-text-and-input` |
| Color components | `ColorComponents` | `colorComponents` | `colorinput/colorcomponents` | `rexui-text-and-input` |

## Shapes, Skins, Images, And Progress

| Need | Use | Factory | Source folder | Related skill |
|---|---|---|---|---|
| Common background shape | `RoundRectangle` | `roundRectangle` | `roundrectangle` | `rexui-shapes-and-states` |
| Canvas rounded rectangle | `RoundRectangleCanvas` | `roundRectangleCanvas` | `roundrectanglecanvas` | `rexui-shapes-and-states` |
| Scalable nine-patch image | `NinePatch` | `ninePatch` | `ninepatch` | `rexui-shapes-and-states` |
| Alternate nine-patch | `NinePatch2` | `ninePatch2` | `ninepatch2` | `rexui-shapes-and-states` |
| Quadrilateral shape | `QuadShape` | `quadShape` or `QuadShape` | `quadshape` | `rexui-shapes-and-states` |
| Triangle shape | `Triangle` | `triangle` | `triangle` | `rexui-shapes-and-states` |
| Custom vector shape | `CustomShapes` | `customShapes` | `customshapes` | `rexui-shapes-and-states` |
| Canvas game object | `Canvas` | `canvas` | `canvas` | `rexui-shapes-and-states` |
| Image box | `ImageBox` | `imageBox` | `imagebox` | `rexui-shapes-and-states` |
| Lazy-loading image box | `LazyLoadImageBox` | `lazyLoadImageBox` | `lazyloadimagebox` | `rexui-shapes-and-states` |
| Circular image mask | `CircleMaskImage` | `circleMaskImage` | `circlemaskimage` | `rexui-shapes-and-states` |
| Alpha-masked image | `AlphaMaskImage` | `alphaMaskImage` | `alphamaskimage` | `rexui-shapes-and-states` |
| State-aware image | `StatesImage` | `statesImage` | `statesimage` | `rexui-shapes-and-states` |
| State-aware text | `StatesText` | `statesText` | `statestext` | `rexui-shapes-and-states` |
| State-aware bitmap text | `StatesBitmapText` | `statesBitmapText` | `statesbitmaptext` | `rexui-shapes-and-states` |
| State-aware rounded rectangle | `StatesRoundRectangle` | `statesRoundRectangle` | `statesroundrectangle` | `rexui-shapes-and-states` |
| State-aware nine-patch | `StatesNinePatch` | `statesNinePatch` | `statesninepatch` | `rexui-shapes-and-states` |
| State-aware nine-slice | `StatesNineSlice` | `statesNineSlice` | `statesnineslice` | `rexui-shapes-and-states` |
| State-aware bar rectangle | `StatesBarRectangle` | `statesBarRectangle` | `statesbarrectangle` | `rexui-shapes-and-states` |
| Circular progress | `CircularProgress` | `circularProgress` | `circularprogress` | `rexui-shapes-and-states` |
| Canvas circular progress | `CircularProgressCanvas` | `circularProgressCanvas` | `circularprogresscanvas` | `rexui-shapes-and-states` |
| Linear progress | `LineProgress` | `lineProgress` | `lineprogress` | `rexui-shapes-and-states` |
| Canvas linear progress | `LineProgressCanvas` | `lineProgressCanvas` | `lineprogresscanvas` | `rexui-shapes-and-states` |
| Rounded rectangle progress | `RoundRectangleProgress` | `roundRectangleProgress` | `roundrectangleprogress` | `rexui-shapes-and-states` |
| Custom progress display | `CustomProgress` | `customProgress` | `customprogress` | `rexui-shapes-and-states` |
| Loading spinner | `AIOSpinner` | `aioSpinner` | `aiospinner` | `rexui-shapes-and-states` |
| Chart wrapper | `Chart` | `chart` | `chart` | `rexui-shapes-and-states` |
| Full-screen cover | `Cover` | `cover` | `cover` | `rexui-shapes-and-states` |
| Full-window rectangle | `FullWindowRectangle` | `fullWindowRectangle` | `fullwindowrectangle` | `rexui-shapes-and-states` |
| Full-window input zone | `FullWindowZone` | `fullWindowZone` | `fullwindowzone` | `rexui-shapes-and-states` |

## Interactions And Effects

| Need | Use | Factory/helper | Source folder | Related skill |
|---|---|---|---|---|
| Click behavior | `Click` | `click` | `click` | `rexui-interactions-and-effects` |
| Outside click behavior | `ClickOutside` | `clickOutside` | `clickoutside` | `rexui-interactions-and-effects` |
| Continuous touch behavior | `InTouching` | `inTouching` | `intouching` | `rexui-interactions-and-effects` |
| Tap gesture | `Tap` | `tap` | `tap` | `rexui-interactions-and-effects` |
| Press gesture | `Press` | `press` | `press` | `rexui-interactions-and-effects` |
| Swipe gesture | `Swipe` | `swipe` | `swipe` | `rexui-interactions-and-effects` |
| Pan gesture | `Pan` | `pan` | `pan` | `rexui-interactions-and-effects` |
| Drag behavior | `Drag` | `drag` | `drag` | `rexui-interactions-and-effects` |
| Pinch gesture | `Pinch` | `pinch` | `pinch` | `rexui-interactions-and-effects` |
| Rotate gesture | `Rotate` | `rotate` | `rotate` | `rexui-interactions-and-effects` |
| Flip effect | `Flip` | `flip` | `flip` | `rexui-interactions-and-effects` |
| Shake effect | `Shake` | `shake` | `shake` | `rexui-interactions-and-effects` |
| Skew effect | `Skew` | `skew` | `skew` | `rexui-interactions-and-effects` |
| Perspective helper | `Perspective` | `perspective` | `perspective` | `rexui-interactions-and-effects` |
| Perspective card | `PerspectiveCard` | `perspectiveCard` | `perspectivecard` | `rexui-interactions-and-effects` |
| Anchor positioning | `Anchor` | `anchor` | `anchor` | `rexui-interactions-and-effects` |
| Stop touch propagation | `TouchEventStop` | `touchEventStop` | `toucheventstop` | `rexui-interactions-and-effects` |
| Layer manager | `LayerManager` | `layerManager` | `layermanager` | `rexui-interactions-and-effects` |
| Property tweaking UI | `Tweaker` | `tweaker` | `tweaker` | `rexui-interactions-and-effects` |
| Fade in/out | fade helpers | `fadeIn`, `fadeOutDestroy` | `fade` | `rexui-interactions-and-effects` |
| Ease move | ease move helpers | `easeMoveTo`, `easeMoveFrom` | `easemove` | `rexui-interactions-and-effects` |
| Drag request | drag helper | `requestDrag` | `utils/input` | `rexui-interactions-and-effects` |

## Factory Name Gotchas

Verify these against source before generating code:

- `transitionImage` and `transitionImagePack` folders exist, but they are commented out in `ui-plugin.js` and `ui-plugin.d.ts`.

## Package Import Reminder

For npm-installed projects, use package paths such as:

```js
import UIPlugin from 'phaser4-rex-plugins/templates/ui/ui-plugin.js';
```

The local source paths in this catalog, such as `templates/ui/label/Label.js`, are for reading this repository.
