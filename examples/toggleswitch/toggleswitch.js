import phaser from 'phaser/src/phaser.js';
import ToggleSwitchPlugin from '../../plugins/toggleswitch-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var toggleSwitch = this.add.rexToggleSwitch(400, 300, 100, 100, 0x039be5);

        this.input.on('pointerup', function () {
            toggleSwitch.toggleValue();
        })

        var graphics = this.add.graphics({
            lineStyle: {
                width: 2, color: 0xff0000, alpha: 1
            }
        })
            .strokeRectShape(toggleSwitch.getBounds())
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
            key: 'ToggleSwitchPlugin',
            plugin: ToggleSwitchPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);