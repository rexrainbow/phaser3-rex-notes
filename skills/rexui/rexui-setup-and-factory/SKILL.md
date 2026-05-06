---
name: rexui-setup-and-factory
description: "Use this skill when working with RexUI setup, the RexUI UIPlugin, scene plugin registration, mapping: 'rexUI', this.rexUI, this.rexUI.add.* factories, or RexUI factory discovery. Triggers on: RexUI setup, rexUI plugin, UIPlugin, this.rexUI, mapping rexUI, RexUI factory, this.rexUI.add."
---

# RexUI Setup And Factory

Use this skill to establish the RexUI entry point before using component-specific RexUI skills.

## Use This First

Check how the caller wants to access RexUI:

- Scene plugin mode: use `UIPlugin` and `this.rexUI.add.*`.
- Direct import mode: import component classes or factories directly from `templates/ui`.

Prefer scene plugin mode for Phaser examples and application code that already follows Rex plugin patterns.

## Primary Sources

- `templates/ui/ui-plugin.js`: scene plugin implementation and helper methods.
- `templates/ui/ui-plugin.d.ts`: public factory and helper API.
- `templates/ui/ObjectFactory.js`: factory registration mechanism.
- `templates/ui/<component>/Factory.js`: exact `this.rexUI.add.*` signatures.

Use package import paths in generated user code. The local `templates/ui/...` paths above are source-map paths for reading this repository.

## References

Read these only when needed:

- `references/plugin-setup.md`: minimal scene plugin setup and usage pattern.
- `references/factory-map.md`: factory categories and source folders.
- `references/entrypoint-differences.md`: scene plugin mode vs direct import mode.

## Core Rules

- `this.rexUI` exists only after `UIPlugin` is installed as a scene plugin with `mapping: 'rexUI'`.
- Factories live on `this.rexUI.add`, not directly on `this.rexUI`.
- `UIPlugin` is a `Phaser.Plugins.ScenePlugin`; it creates `this.add = new ObjectFactory(scene)`.
- Factories are registered by each component's `Factory.js` via `ObjectFactory.register(type, callback)`.
- Most UI components created through factories are added to the scene or returned as helper behavior objects depending on the component.
- For TypeScript-facing public names, prefer `ui-plugin.d.ts`; when it disagrees with `Factory.js`, inspect the source before generating code.

## Minimal Pattern

```js
import Phaser from 'phaser';
import UIPlugin from 'phaser4-rex-plugins/templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    create() {
        const label = this.rexUI.add.label({
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 12, 0x222222),
            text: this.add.text(0, 0, 'RexUI')
        });

        label.setPosition(400, 300).layout();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

new Phaser.Game(config);
```

Derived from RexUI examples and reduced for setup reference.

## Gotchas

- Do not use `this.rexUI.add.*` in a scene unless the plugin mapping is configured.
- Do not assume every factory has `(config)` as its only signature; many shape/text factories use positional arguments.
- Do not load `examples/` at skill usage time. Use the copied reduced recipes in references instead.
- Component-specific config details belong in the relevant RexUI skill, not in this setup skill.
