import phaser from 'phaser/src/phaser.js';
import ScrollableXYPanel from '../../templates/ui/scrollablexypanel/ScrollableXYPanel.js';
// import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var panel = new ScrollableXYPanel(this, {
            x: 400, y: 300,
            width: 400, height: 400,

            sliderX: {
                track: { width: 20, radius: 10, color: COLOR_DARK },
                thumb: { radius: 13, color: COLOR_LIGHT }
            },

            sliderY: {
                track: { width: 20, radius: 10, color: COLOR_DARK },
                thumb: { radius: 13, color: COLOR_LIGHT }
            },
        })

        this.add.existing(panel)

        panel
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);

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
    //plugins: {
    //    scene: [{
    //        key: 'rexUI',
    //        plugin: UIPlugin,
    //        mapping: 'rexUI'
    //    }]
    //}
};

var game = new Phaser.Game(config);