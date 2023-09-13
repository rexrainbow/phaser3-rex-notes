import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../../templates/ui/ui-plugin.js';
import CreateScrollablePanel from './lib/CreateScrollablePanel.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var itemCountArray = [20, 5, 10, 0, 10];
        var topPanel = CreateScrollablePanel(this, itemCountArray)
            .setPosition(400, 300)
            .layout()
        // .drawBounds(this.add.graphics(), 0xff0000)
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