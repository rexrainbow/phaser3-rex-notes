# RexUI Entrypoint Differences

## Scene Plugin Mode

Use scene plugin mode when the code should use `this.rexUI`.

```js
import UIPlugin from 'phaser4-rex-plugins/templates/ui/ui-plugin.js';

const config = {
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};
```

Then in a scene:

```js
const label = this.rexUI.add.label({
    text: this.add.text(0, 0, 'OK')
});
```

This is the common pattern in RexUI examples.

## Direct Import Mode

Use direct imports when code wants a specific RexUI class or when no scene plugin mapping is desired.

Examples:

```js
import UIPlugin from 'phaser4-rex-plugins/templates/ui/ui-plugin.js';
```

or component-specific imports from the source tree:

```js
import Label from 'phaser4-rex-plugins/templates/ui/label/Label.js';
import Sizer from 'phaser4-rex-plugins/templates/ui/sizer/Sizer.js';
```

Direct import mode requires reading the target component constructor and config expectations. Prefer the component `.d.ts` file before reading implementation code.

When working inside this repository, the same files live under `templates/ui/...`. Use `phaser4-rex-plugins/templates/ui/...` for npm-installed projects.

## Choosing A Mode

Use scene plugin mode when:

- The code follows Rex examples.
- Many RexUI components are needed in the same scene.
- You want `this.rexUI.add.*` factories and helper methods.

Use direct import mode when:

- A build wants explicit imports for a small subset of classes.
- The code already constructs components manually.
- You are writing library code that should not require a scene plugin mapping.

## Source Relationship

`ui-plugin.js` imports every factory module for side effects. Each factory module registers a method:

```js
ObjectFactory.register('label', function (config) {
    ...
});
```

`UIPlugin` creates the factory holder:

```js
this.add = new ObjectFactory(scene);
```

That is why scene code calls:

```js
this.rexUI.add.label(...)
```

not:

```js
this.rexUI.label(...)
```

## TypeScript Surface

Use `templates/ui/ui-plugin.d.ts` for the public `Factories` list and helper method list. If a factory name differs between `.d.ts` and `Factory.js`, check the JS source before writing generated code.
