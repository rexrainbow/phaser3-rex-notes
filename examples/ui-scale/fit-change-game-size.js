import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        this.add.image(0, 0, 'classroom').setAlpha(0.5).setOrigin(0);

        var rect = this.add.rectangle(0, 0, 0, 0).setOrigin(0).setStrokeStyle(5, 0xff0000);

        var ui = CreateLabels(this);
        this.events.on('run-layout', function (viewport) {
            ui.setPosition(viewport.centerX, viewport.centerY + 100).layout()
        })

        this.scale.on('resize', function (gameSize, baseSize, displaySize, previousWidth, previousHeight) {
            var parentSize = this.scale.parentSize;
            if ((parentSize.width > parentSize.height) != (gameSize.width > gameSize.height)) {
                this.scale.setGameSize(gameSize.height, gameSize.width);
                // Will fire this event again

            } else {
                var viewport = this.scale.getViewPort();
                rect
                    .setPosition(viewport.x, viewport.y)
                    .setSize(viewport.width, viewport.height)

                this.events.emit('run-layout', viewport);
            }

        }, this);

        this.scale.refresh();
    }

    update() { }
}

var CreateLabels = function (scene) {
    return scene.rexUI.add.sizer({
        width: 300, height: 200,
        orientation: 'y',
        space: { item: 10 }
    })
        .add(
            scene.rexUI.add.label({
                background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10, 0xCCCCCC),
            }),
            { proportion: 1, expand: true }
        )
        .add(
            scene.rexUI.add.label({
                background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xCCCCCC),
            }),
            { proportion: 1, expand: true }
        )
        .add(
            scene.rexUI.add.label({
                background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10, 0xCCCCCC),
            }),
            { proportion: 1, expand: true }
        )
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);