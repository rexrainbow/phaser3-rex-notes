---
name: rexboard-setup-and-factory
description: "Use this skill when working with RexBoard setup, the RexBoard BoardPlugin, scene plugin registration, mapping: 'rexBoard', this.rexBoard, this.rexBoard.add.* factories, board-plugin.js, board-components.js, or RexBoard factory discovery. Triggers on: RexBoard setup, rexBoard plugin, BoardPlugin, this.rexBoard, mapping rexBoard, RexBoard factory, this.rexBoard.add, board-components."
---

# RexBoard Setup And Factory

Use this skill to establish the RexBoard entry point before using component-specific RexBoard skills.

## Use This First

Check how the caller wants to access RexBoard:

- Scene plugin mode: use `BoardPlugin` and `this.rexBoard.add.*`.
- Direct import mode: import classes and helpers from `plugins/board-components.js`.

Prefer scene plugin mode for Phaser examples and application code that already follows Rex plugin patterns.

## Primary Sources

- `plugins/board-plugin.js`: scene plugin implementation, helper methods, and factory imports.
- `plugins/board-plugin.d.ts`: public factory and helper API.
- `plugins/board-components.js`: direct barrel export list.
- `plugins/board-components.d.ts`: TypeScript-facing direct exports.
- `plugins/board/ObjectFactory.js`: factory registration mechanism.
- `plugins/board/<component>/Factory.js`: exact `this.rexBoard.add.*` signatures.

Use package import paths in generated user code. The local `plugins/board/...` paths above are source-map paths for reading this repository.

## References

Read these only when needed:

- `references/plugin-setup.md`: minimal scene plugin setup and direct import setup.
- `references/factory-map.md`: factory/helper categories and source folders.
- `references/entrypoint-differences.md`: scene plugin mode vs direct import mode.

## Core Rules

- `this.rexBoard` exists only after `BoardPlugin` is installed as a scene plugin with `mapping: 'rexBoard'`.
- Factories live on `this.rexBoard.add`, not directly on `this.rexBoard`.
- `BoardPlugin` is a `Phaser.Plugins.ScenePlugin`; it creates `this.add = new ObjectFactory(scene)`.
- Helpers `hexagonMap`, `createTileTexture`, and `createBoardFromTilemap` live directly on `this.rexBoard`.
- `board-components.js` exports classes/helpers directly and does not install scene plugin access.
- For TypeScript-facing public names, prefer `board-plugin.d.ts` and `board-components.d.ts`; when they disagree with `Factory.js`, inspect the source before generating code.

## Minimal Pattern

```js
import Phaser from 'phaser';
import BoardPlugin from 'phaser4-rex-plugins/plugins/board-plugin.js';

class Demo extends Phaser.Scene {
    create() {
        const grid = this.rexBoard.add.quadGrid({
            x: 80,
            y: 80,
            cellWidth: 64,
            cellHeight: 64,
            type: 'orthogonal',
            dir: '4dir'
        });

        const board = this.rexBoard.add.board({
            grid,
            width: 8,
            height: 8
        });

        const chess = this.add.circle(0, 0, 18, 0x66ccff);
        board.addChess(chess, 3, 3, 0, true);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        }]
    }
};

new Phaser.Game(config);
```

Derived from RexBoard examples and reduced for setup reference.

## Gotchas

- Do not use `this.rexBoard.add.*` in a scene unless the plugin mapping is configured.
- Do not assume every factory has `(config)` as its only signature; rendered chess and MiniBoard factories use positional arguments.
- Do not call helper APIs through `this.rexBoard.add`; `createTileTexture`, `createBoardFromTilemap`, and `hexagonMap` are helpers on `this.rexBoard`.
- Do not load `examples/` at skill usage time. Use the copied reduced recipes in references instead.
- Component-specific config details belong in the relevant RexBoard skill, not in this setup skill.
