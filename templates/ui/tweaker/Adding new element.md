# Adding a new element to Tweaker

This guide covers 2 extension paths:

1. **New input element** (selected by `view` string, used by `addInput`).
2. **New structural element** (selected by `$type` string, used by `addRows`).

---

## A) Add a new input element (example: `"view": "myInput"`)

1. **Create an input handler file**
   - Add `templates/ui/tweaker/inputhandlers/MyInputHandler.js`.
   - Export handler object with at least:
     - `name`
     - `accept(config)` (map string, for example `config.view === 'myInput'`)
     - `build(gameObject, style)`
   - Optional callbacks: `setup`, `filterValue`, `displayValue`, `onBindTarget`.

2. **Create internal UI parts used by the handler**
   - If needed, add helper builders in:
     - `templates/ui/tweaker/inputhandlers/utils/`
     - or shared builders/gameobjects folders.

3. **Register the handler**
   - Update `templates/ui/tweaker/methods/RegisterDefaultInputHandlers.js`:
     - add import for `MyInputHandler`
     - add `.registerInputHandler(MyInputHandler)`
   - Note: `registerInputHandler()` uses `unshift`, so later registration has higher priority.

4. **Add style typing (TypeScript)**
   - Update `templates/ui/tweaker/Tweaker.d.ts`:
     - add style fields in `IInputRowStyle` if your handler needs new style config keys
     - document the new `view` string in `IAddInputConfig` comments.

5. **Verify config-to-UI mapping**
   - `addInput` prepares `config.value` from `bindingTarget[bindingKey]`.
   - `CreateInputField` chooses the first handler where `accept(config)` is `true`.
   - Ensure your `accept()` condition is specific enough to avoid conflicts.

---

## B) Add a new structural element (example: `"$type": "myContainer"`)

1. **Create the gameobject class**
   - Add class files under `templates/ui/tweaker/gameobjects/<myContainer>/`.
   - Implement methods like `setTitle`, `setBindingTarget` forwarding (if needed), and title width handling (if needed).

2. **Create a builder**
   - Add `templates/ui/tweaker/builders/CreateMyContainer.js`.
   - Compose title/background/child tweaker(s) and return the container instance.

3. **Create a Tweaker method**
   - Add `templates/ui/tweaker/methods/AddMyContainer.js`.
   - Build element with styles from `this.styles`.
   - Add element into current tweaker via `this.add(...)`.
   - Return child tweaker(s) or `this` depending on behavior.

4. **Expose method on Tweaker shell**
   - Update `templates/ui/tweaker/methods/Methods.js`:
     - import `AddMyContainer`
     - add `addMyContainer: AddMyContainer`.

5. **Map `$type` string to method**
   - Update `templates/ui/tweaker/methods/AddRows.js`:
     - add `case 'myContainer':`
     - call `tweaker.addMyContainer(property)`
     - recursively process `$properties` when the new element contains children.

6. **Add TypeScript declarations**
   - Update `templates/ui/tweaker/Tweaker.d.ts`:
     - add `IAddMyContainerConfig`
     - add `IAddMyContainerRowProperty` with `$type: 'myContainer'`
     - include it in `RowsPropertyType`
     - add `addMyContainer(...)` method signature on class `Tweaker`.

---

## Quick checklist

- New file(s) created in the correct folder.
- String mapping added (`view` in input handler, or `$type` in `AddRows`).
- Method exported via `Methods.js` (for structural element).
- `Tweaker.d.ts` updated for public API/types.
- Example config added/tested to confirm input data creates the expected UI object.
