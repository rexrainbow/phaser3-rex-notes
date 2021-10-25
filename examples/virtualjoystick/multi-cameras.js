import '../../../phaser/src/phaser.js';
import VirtualJoyStickPlugin from '../../plugins/virtualjoystick-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        // Build joyStick
        var base = this.add.circle(0, 0, 100).setStrokeStyle(3, 0x0000ff);
        var thumb = this.add.circle(0, 0, 60).setStrokeStyle(3, 0x00ff00);
        var joyStick = this.plugins.get('rexVirtualJoyStick').add(this, {
            radius: 100,
            x: 400,
            y: 300,
            base: base,
            thumb: thumb
        });

        // Don't show in main-camera
        this.cameras.main.ignore(base);
        this.cameras.main.ignore(thumb);
        this.cameras.main.setZoom(1.5);

        // Show at camera2
        var camera2 = this.cameras.add();
    }

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
            key: 'rexVirtualJoyStick',
            plugin: VirtualJoyStickPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);