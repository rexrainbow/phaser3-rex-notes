# Contributing Guidelines

This document defines the required conventions when modifying this repository.

---

## General Rules

- All in-repository content (source code, comments, doc comments, TODOs) must use ASCII English only.
- Do not execute, run, or test code unless explicitly requested by a human.
- Prefer small, focused, and reviewable changes.
- Do not mix unrelated changes in a single modification.

---

## Editing TypeScript Declaration Files (.d.ts)

The goal of `.d.ts` edits is to improve API readability and correctness for users
consuming the declarations.

### Documentation Comments

- Add JSDoc/TSDoc comments for all public:
  - classes
  - interfaces
  - functions
  - methods
  - parameters
- Comments must describe observable behavior and API intent, not implementation details.

### Parameter Formatting

- When a signature has multiple parameters and per-parameter documentation is required:
  - Place **one parameter per line**.
  - Align parameters for readability.
- Single-parameter signatures may remain on one line.

Example:

```ts
declare function example(
  context: Phaser.Scene,
  options: ExampleOptions,
  callback: ExampleCallback
): void;
````

### Callback Types

* For callback or function-type parameters:

  * Add a documentation comment for the callback itself.
  * Add documentation for each callback parameter.
* Prefer named callback types over inline function types when possible.

Example:

```ts
/**
 * Called when the operation completes.
 */
type CompleteCallback = (
  /**
   * The result object.
   */
  result: Result,
  /**
   * Indicates whether the operation succeeded.
   */
  success: boolean
) => void;
```

---

## Writing or Modifying JavaScript Code

### Language and Encoding

* JavaScript source files must use **half-width ASCII characters only**.
* This requirement applies to:

  * identifiers
  * string literals
  * comments
  * documentation comments

Do not use full-width characters or non-ASCII text in JavaScript files.

### Style and Clarity

* Follow the existing coding style of the file being modified.
* Prefer clear, descriptive variable and function names.
* Avoid unnecessary abbreviations.
* Add comments only when behavior is non-obvious.

### Scope of Changes

* Do not introduce new dependencies without prior approval.
* Avoid combining refactoring and behavioral changes in the same edit.
* Ensure changes do not alter runtime behavior unless explicitly intended.

---

## Precedence

If multiple documents define rules:

1. `AGENTS.md` (hard operational rules)
2. This document (`CONTRIBUTING.md`)
3. Inline comments or file-level notes
