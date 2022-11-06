import phaser from 'phaser/src/phaser.js';
import CheckboxPlugin from '../../plugins/checkbox-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var checkbox = this.add.rexCheckbox(400, 300, 40, 40, {
            color: 0x005cb2,
            checked: true,
            // animationDuration: 2000
        });

        checkbox
            .setInteractive()
            .on('pointerdown', checkbox.toggleChecked, checkbox)

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
        global: [{
            key: 'CheckboxPlugin',
            plugin: CheckboxPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);