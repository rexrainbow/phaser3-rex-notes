# RexUI Plugin Setup

This reference is self-contained. It is derived from RexUI examples but does not require reading the `examples/` directory.

## Scene Plugin Setup

Use this when application code expects `this.rexUI`.

```js
import Phaser from 'phaser';
import UIPlugin from 'phaser4-rex-plugins/templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    create() {
        const panel = this.rexUI.add.sizer({
            x: 400,
            y: 300,
            width: 240,
            height: 80,
            orientation: 0
        });

        panel
            .add(this.add.text(0, 0, 'Ready'), { proportion: 1, expand: true })
            .layout();
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
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

In this repository, the same source file is `templates/ui/ui-plugin.js`. Use the package path above for normal npm-installed projects.

## What The Mapping Does

The scene plugin config:

```js
{
    key: 'rexUI',
    plugin: UIPlugin,
    mapping: 'rexUI'
}
```

adds a `rexUI` property to each scene using the plugin. The common factory path is then:

```js
this.rexUI.add.label(...)
this.rexUI.add.sizer(...)
this.rexUI.add.dialog(...)
```

## Minimal Visual Smoke Test

Use a simple factory and avoid component-specific complexity:

```js
create() {
    const bg = this.rexUI.add.roundRectangle(0, 0, 160, 48, 12, 0x2d2d2d);
    const text = this.add.text(0, 0, 'RexUI', { color: '#ffffff' });

    this.rexUI.add.label({
        x: 400,
        y: 300,
        background: bg,
        text,
        space: { left: 16, right: 16, top: 10, bottom: 10 }
    }).layout();
}
```

## Helper Methods On UIPlugin

`ui-plugin.js` assigns helper methods directly to `UIPlugin.prototype`.

Common helpers include:

- `getParentSizer(gameObject)`
- `getTopmostSizer(gameObject)`
- `removeFromParent(gameObject)`
- `hide(gameObject)`, `show(gameObject)`, `isShown(gameObject)`
- `confirmAction(...)`, `confirmActionPromise(...)`
- `edit(...)`
- `wrapExpandText(...)`
- `fontSizeExpandText(...)`
- `setFontSizeToFitWidth(...)`
- `waitEvent(...)`, `waitComplete(...)`
- `delayPromise(...)`
- `setChildrenInteractive(...)`
- `fadeIn(...)`, `fadeOutDestroy(...)`
- `easeMoveTo(...)`, `easeMoveFrom(...)`
- `modal(...)`, `modalPromise(...)`, `modalClose(...)`
- `requestDrag(...)`
- `openFileChooser(...)`
- `isInTouching(gameObject, pointer, preTest, postTest)`
- `viewport` getter

Use component-specific skills for detailed behavior.
