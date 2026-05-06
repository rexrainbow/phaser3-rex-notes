# RexUI Modal Patterns

Use this for modal lifecycle and close-result handling.

## Layout Before Modal

Always compute layout before opening modal behavior:

```js
dialog
    .layout()
    .modalPromise()
    .then((data) => {});
```

This gives modal cover, input hit areas, and transitions correct bounds.

## Promise-Based Confirm Dialog

Use `modalPromise()` when caller needs a result.

```js
this.rexUI.add.confirmDialog(style)
    .setPosition(400, 300)
    .resetDisplayContent({
        title: 'Delete',
        content: 'Delete this save file?',
        buttonA: 'Delete',
        buttonB: 'Cancel'
    })
    .layout()
    .modalPromise()
    .then((data) => {
        if (data.index === 0) {
            // confirmed
        }
    });
```

Result fields commonly include:

- `index`
- `text`
- `button`
- `dialog`
- `value`

## Callback-Based Modal

Use callback modal when code does not need a promise.

```js
dialog
    .layout()
    .modal({
        cover: { color: 0x000000, alpha: 0.5 },
        anyTouchClose: false
    });
```

Exact modal config comes from `plugins/modal` via `templates/ui/modal/Modal.d.ts`.

## Existing Object As Modal

Many RexUI objects can be made modal directly:

```js
panel.layout();
panel.modal({
    cover: { color: 0x000000, alpha: 0.5 }
});
```

Use this for scrollable panels, text areas, or custom panels when `dialog` is unnecessary.

## Closing

Use modal close helpers when the object has modal behavior:

```js
this.rexUI.modalClose(panel);
```

or object-specific modal close if available.

## Gotchas

- Do not call modal behavior before `.layout()` on sizer-based objects.
- If clicks pass through to objects behind the modal, check cover config and input setup.
- Use `confirmDialog` for common yes/no flows; use `dialog` only when custom sections are needed.
- Avoid mixing several active modals unless the flow explicitly supports stacked dialogs.
