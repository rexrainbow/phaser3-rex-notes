import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var dialog = this.rexUI.add
            .dialog({
                x: 400,
                y: 300,
                content: this.rexUI.add
                    .sizer({
                        width: 300,
                        height: 350,
                        orientation: 'y',
                    })
                    .add(
                        this.rexUI.add
                            .canvasInput(0, 0, 100, 20, {
                                background: {
                                    stroke: '#fff'
                                },
                                padding: 5,
                                style: {
                                    fontSize: 12
                                },
                                maxLength: 5,
                                minLength: 1,
                                onCursorOut(child) {
                                    child.modifyStyle({
                                        color: 'white',
                                        backgroundColor: null
                                    })
                                },
                                onCursorIn(child) {
                                    child.modifyStyle({
                                        color: 'black',
                                        backgroundColor: 'white'
                                    })
                                },

                                clickOutSideTarget: true
                            })
                            .setNumberInput()
                    )
            })
            .layout()

        dialog
            .modalPromise({
                cover: { color: 0x880000, alpha: 0.5 },
                touchOutsideClose: false
            })
            .then(function () {
                dialog.destroy()
            })
    }

    update() { }
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