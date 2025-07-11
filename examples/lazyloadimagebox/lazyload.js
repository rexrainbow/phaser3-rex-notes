import phaser from '../../../phaser/src/phaser.js';
import LazyLoadImageBoxPlugin from '../../templates/lazyloadimagebox/lazyloadimagebox-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var imageBox = this.add.rexLazyLoadImageBox({
            x: 400, y: 300,
            width: 300, height: 300,
            background: { color: 0x333333 },
        })
        this.add.existing(imageBox);

        imageBox.setTexture('classroom', undefined, 'https://rapi.pixai.art/img/media/607988575045652990/orig');

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
            key: 'rexLazyLoadImageBox',
            plugin: LazyLoadImageBoxPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);