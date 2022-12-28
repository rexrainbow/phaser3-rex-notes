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
        var toggleSwitch0 = this.add.rexToggleSwitch(200, 300, 100, 100, 0x039be5);

        var toggleSwitch1 = this.add.rexToggleSwitch(300, 300, 100, 100, 0x039be5, {
            trackConerRadius: 0.1,
            thumbConerRadius: 0.1
        });

        var toggleSwitch2 = this.add.rexToggleSwitch(400, 300, 100, 100, 0x039be5, {
            trackHeight: 0.3,
            thumbHeight: 0.5,
        });

        var toggleSwitch3 = this.add.rexToggleSwitch(500, 300, 100, 100, 0x006db3, {
            trackHeight: 0.2,
            thumbHeight: 0.4,
            thumbLeft: 0.25,
            thumbColor: 0x63ccff,
            rtl: true,
        });

        var graphics = this.add.graphics({
            lineStyle: {
                width: 2, color: 0xff0000, alpha: 1
            }
        })
            .strokeRectShape(toggleSwitch0.getBounds())
            .strokeRectShape(toggleSwitch1.getBounds())
            .strokeRectShape(toggleSwitch2.getBounds())
            .strokeRectShape(toggleSwitch3.getBounds())
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