# Text Catalog

Use this file to choose a RexUI text or input component and verify factory names.

## Text Display

| Need | Factory | Notes |
|---|---|---|
| BBCode rich text | `BBCodeText(x, y, content, style)` | Capital factory name. Supports tags such as `[color=red]...[/color]`. |
| Tag-based rich text | `tagText(x, y, content, style)` | Similar rich text path with tag parser behavior. |
| Dynamic text layout | `dynamicText(config)` | Lower-level object used by canvas input and text player. |
| Dialogue text box | `textBox(config)` | `TitleLabel`-based component with typing and paging. |
| Simplified dialogue text box | `simpleTextBox(config)` | Same role as `textBox`, with simplified creators. |
| Scrollable read-only text | `textArea(config)` | Scrollable wrapper around text object. |
| Scripted rich playback | `textPlayer(config)` | DynamicText-based parser/player for rich narrative playback. |

## Editable Text

| Need | Factory | Notes |
|---|---|---|
| DOM input | `inputText(config)` | Requires `dom.createContainer: true`. Native HTML input behavior. |
| Canvas input | `canvasInput(config)` | Renders inside canvas. Current source accepts config object. |
| Multiline canvas input | `textAreaInput(config)` | Scrollable editable text area built on `CanvasInput`. |
| Edit existing text object | `textEdit(gameObject, config)` | Helper behavior for editing an existing object. |
| Hidden edit bridge | `hiddenEdit(textObject, config)` | Hidden DOM input bridge for a text object. |
| First/last name prompt | `nameInputDialog(config)` | Modal-capable dialog; use dialog skill for lifecycle. |

## Text Behaviors

| Need | Factory | Notes |
|---|---|---|
| Typewriter behavior | `textTyping(gameObject, config)` | Standalone behavior that types into a text object. |
| Page splitting behavior | `textPage(gameObject, config)` | Standalone behavior for page/line navigation. |

## Files And Colors

| Need | Factory/helper | Notes |
|---|---|---|
| Browser file chooser object | `fileChooser(config)` | DOM-backed. |
| One-shot file chooser | `this.rexUI.openFileChooser(this, config)` | Helper on `UIPlugin`, not on `this.rexUI.add`. Resolves to `{ files }`. |
| Drop target | `fileDropZone(config)` | DOM-backed file drop zone. |
| Label button for files | `fileSelectorButton(config)` | Emits `select(files, button)`. |
| Image picker with preview | `imageInputLabel(config)` | Emits `select(file, label)` and can `saveTexture(key)`. |
| Editable swatch + color picker | `colorInput(config)` | Popup color picker and components. |
| Lightweight swatch + input | `colorInputLite(config)` | `ColorInputBase`. |
| Standalone picker | `colorPicker(config)` | Emits `valuechange(value, oldValue, picker)`. |
| RGB/HSV fields | `colorComponents(config)` | `setColorFormat('RGB' \| 'HSV')`. |

## Factory Gotchas

- `BBCodeText` is capitalized; `tagText` and `dynamicText` are lower camel case.
- `canvasInput/Factory.d.ts` lists positional arguments, but `CanvasInput.js` accepts a config object when the first argument is a plain object. Existing UI examples use `this.rexUI.add.canvasInput({ ... })`.
- `inputText`, `fileChooser`, `fileDropZone`, and `fileSelectorButton` need Phaser DOM support.
- `openFileChooser` is a method on `this.rexUI`, not an object factory under `this.rexUI.add`; pass the scene or game object as the first argument.
- `textArea` belongs to both scrolling and text domains. Use `rexui-scroll-lists-and-tables` for scroll mechanics and this skill for content/input behavior.
- `nameInputDialog` belongs to both dialog and input domains. Use this skill for field config and `rexui-dialogs-and-popups` for modal result handling.

## Common Events

| Component | Events |
|---|---|
| `textBox` | `start`, `type`, `typechar`, `pageend`, `complete`, `pause`, `resume` |
| `textTyping` | `type`, `typechar`, `complete` |
| `textAreaInput` | `textchange(text, textAreaInput)`, `close(text, textAreaInput)` |
| `canvasInput` | `textchange(newText, input)`, `open`, `close` |
| `fileSelectorButton` | `select(files, fileSelectorButton)` |
| `imageInputLabel` | `select(file, imageInputLabel)` |
| `colorInput`, `colorPicker`, `colorComponents` | `valuechange(value, oldValue, component)` |

## Source Notes

Public UI source lives under `templates/ui/<component>`. Several text components re-export lower-level plugins under `plugins/`, such as `plugins/inputtext.d.ts`, `plugins/canvasinput.d.ts`, `plugins/texttyping.d.ts`, `plugins/textpage.d.ts`, and `plugins/textplayer.d.ts`.
