import DragPlugin from '../../plugins/drag-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('arrow', 'assets/images/arrow.png');
    }

    create() {
        this.input.on('pointerdown', this.createImg, this);
    }

    createImg(pointer) {
        var img = this.add.image(pointer.x, pointer.y, 'arrow');
        img.drag = this.plugins.get('rexDrag').add(img);
        img.drag.drag();

        img.on('dragend', img.destroy, img);
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
            key: 'rexDrag',
            plugin: DragPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);