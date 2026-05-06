---
name: rexui-text-and-input
description: "Use this skill when building RexUI text, rich text, BBCodeText, tagText, dynamicText, textBox, simpleTextBox, textArea, textAreaInput, inputText, canvasInput, hiddenEdit, textEdit, textTyping, textPage, textPlayer, nameInputDialog, fileChooser, fileDropZone, fileSelectorButton, imageInputLabel, colorInput, colorPicker, or colorComponents. Triggers on: RexUI text, RexUI input, BBCodeText, tagText, textBox, textAreaInput, inputText, canvasInput, textTyping, textPlayer, colorPicker, fileChooser."
---

# RexUI Text And Input

Use this skill for RexUI text rendering, rich text, dialogue text boxes, editable fields, text typing/page behavior, file selection, and color input.

## Use This First

Choose the component:

| Need | Use |
|---|---|
| Rich text with inline BBCode tags | `BBCodeText` |
| Rich text with tag parser behavior | `tagText` |
| Low-level dynamic text layout | `dynamicText` |
| Dialogue box with paging and typing | `textBox` or `simpleTextBox` |
| Scrollable read-only text | `textArea` |
| Scrollable editable multiline text | `textAreaInput` |
| DOM-backed text input | `inputText` |
| Canvas-rendered editable input | `canvasInput` |
| Edit an existing text object | `textEdit` or `hiddenEdit` |
| Standalone typing behavior | `textTyping` |
| Standalone page/line splitting behavior | `textPage` |
| Rich scripted text playback | `textPlayer` |
| First/last name modal prompt | `nameInputDialog` |
| Browser file selection | `fileChooser`, `openFileChooser`, `fileSelectorButton` |
| Drag/drop file target | `fileDropZone` |
| Image file picker with preview | `imageInputLabel` |
| Editable color field or picker | `colorInput`, `colorInputLite`, `colorPicker`, `colorComponents` |

For modal flow around `nameInputDialog`, use `rexui-dialogs-and-popups`. For scroll-only list/panel behavior, use `rexui-scroll-lists-and-tables`.

## Required Setup

This skill assumes RexUI is available as `this.rexUI`. If not, use `rexui-setup-and-factory`.

Enable Phaser DOM support when using `inputText`, `fileChooser`, `fileSelectorButton`, `fileDropZone`, or other DOM-backed file/input helpers:

```js
const config = {
  dom: { createContainer: true }
};
```

## References

Read these only when needed:

- `references/text-catalog.md`: component chooser, factory signatures, source files, and gotchas.
- `references/rich-text-recipes.md`: rich text, text box typing, text area scrolling, and text behavior recipes.
- `references/input-recipes.md`: `inputText`, `canvasInput`, `textAreaInput`, `textEdit`, and form patterns.
- `references/file-and-color-recipes.md`: file selector, image input, color input, color picker, and color events.

## Core Rules

- Call `.layout()` after creating or mutating RexUI layout components such as `textBox`, `simpleTextBox`, `textArea`, `textAreaInput`, `nameInputDialog`, `colorInput`, `colorPicker`, and `colorComponents`.
- Use `BBCodeText` with a capital factory name: `this.rexUI.add.BBCodeText(...)`.
- Use `inputText` for native DOM input behavior; ensure `dom.createContainer: true`.
- Use `canvasInput` when the input must render inside the game canvas and integrate with RexUI layout.
- `canvasInput` factory accepts a config object in current source even though `Factory.d.ts` also shows positional parameters.
- Use `textAreaInput` for editable multiline content with scrolling; use `textArea` for read-only scrollable text.
- Use `textBox` for dialogue text with `start()`, `typeNextPage()`, `pageend`, and `complete`.
- Store passwords or hidden values in `canvasInput.rawText` when displaying masked text.
- File chooser APIs depend on browser user interaction; trigger them from a click/tap flow.
- Use package imports only in full setup examples; local `templates/ui/...` paths are source-map paths.

## Source File Map

- `templates/ui/bbcodetext/BBCodeText.d.ts`
- `templates/ui/tagtext/TagText.d.ts`
- `templates/ui/dynamictext/DynamicText.d.ts`
- `templates/ui/textbox/TextBox.d.ts`
- `templates/ui/simpletextbox/SimpleTextBox.d.ts`
- `templates/ui/textarea/TextArea.d.ts`
- `templates/ui/textareainput/TextAreaInput.d.ts`
- `templates/ui/inputtext/InputText.d.ts`
- `templates/ui/canvasinput/CanvasInput.d.ts`
- `templates/ui/hiddenedit/HiddenEdit.d.ts`
- `templates/ui/textedit/TextEdit.d.ts`
- `templates/ui/texttyping/TextTyping.d.ts`
- `templates/ui/textpage/TextPage.d.ts`
- `templates/ui/textplayer/TextPlayer.d.ts`
- `templates/ui/nameinputdialog/NameInputDialog.d.ts`
- `templates/ui/filechooser/FileChooser.d.ts`
- `templates/ui/filedropzone/FileDropZone.d.ts`
- `templates/ui/fileselectorbutton/FileSelectorButton.d.ts`
- `templates/ui/imageinputlabel/ImageInputLabel.d.ts`
- `templates/ui/colorinput/colorinput/ColorInput.d.ts`
- `templates/ui/colorinput/colorinputbase/ColorInputBase.d.ts`
- `templates/ui/colorinput/colorpicker/ColorPicker.d.ts`
- `templates/ui/colorinput/colorcomponents/ColorComponents.d.ts`

## Related Skills

- `rexui-setup-and-factory`: plugin setup and factory discovery.
- `rexui-components-catalog`: choose the correct component family.
- `rexui-layout-sizers`: form and dialogue layout.
- `rexui-basic-widgets`: labels and buttons around text inputs.
- `rexui-dialogs-and-popups`: modal prompts and dialog lifecycle.
- `rexui-scroll-lists-and-tables`: scrollable text areas and scroll controls.
