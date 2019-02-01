import DragPlugin from '../../plugins/drag-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

        this.img;
        this.text;
    }

    preload() {
        this.load.image('arrow', 'assets/images/arrow.png');
    }

    create() {
        this.img = this.add.image(400, 300, 'arrow');
        this.img.drag = this.plugins.get('rexDrag').add(this.img, {
            inputConfig : {
                pixelPerfect: true
            },
            //enable: true,
            axis: 1,
            rotation: Phaser.Math.DegToRad(45)
        });

        this.text = this.add.text(100, 100, '');
    }

    update() {
        this.text.setText(this.img.drag.isDragging? 'Dragging':'--');
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