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
        var img = this.add.image(300, 300, 'arrow');
        img.drag = this.plugins.get('rexDrag').add(img);

        img.on('pointerdown', img.drag.dragend, img.drag);
        img.on('dragend', function(){console.log('dragend')});
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