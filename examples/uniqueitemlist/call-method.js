import 'phaser';
import UniqueItemListPlugin from '../../plugins/uniqueitemlist-plugin.js';


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var listA = this.plugins.get('rexUniqueItemList').add();
        for (var i = 0; i < 8; i++) {
            listA.add(
                this.add.circle((50 + (i * 100)), 300, 20, 0x888888)
            )
        }
        listA.call('setFillStyle', 0xff0000, 0.5);
    }

    update() {
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
            key: 'rexUniqueItemList',
            plugin: UniqueItemListPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);