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
        var listA = this.plugins.get('rexUniqueItemList').add({
            items: [1, 2, 3, 4, 5, 6],
            destroyCallback: false
        });
        var listB = this.plugins.get('rexUniqueItemList').add({
            items: [4, 5, 6, 7, 8, 9],
            destroyCallback: false
        });

        console.log('listA', listA.clone().getItems());
        console.log('listB', listB.clone().getItems());
        console.log('union', listA.union(listB).getItems());
        console.log('intersect', listA.intersect(listB).getItems());
        console.log('difference', listA.difference(listB).getItems());
        console.log('slice[1:4]', listA.slice(1, 4).getItems());
        console.log('shuffle', listA.shuffle().getItems());
        console.log('popRandom', listA.popRandom(), listA.getItems());
        console.log('pop', listA.pop(), listA.getItems());
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