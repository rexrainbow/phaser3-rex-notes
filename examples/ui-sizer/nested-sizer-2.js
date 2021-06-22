import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var x = 400, y = 300,
            width = 200, height = 250;
        var topSizer = this.rexUI.add.sizer({
            x: x, y: y,
            width: width, height: height,
            orientation: 'y'
        })
            .add( 
                // child :
                // Replace this text to an image
                this.add.text(0, 0, 'Star image', {
                    fontSize: 24
                })
            )
            .add(
                // child : Text at center, with a background
                this.rexUI.add.sizer({
                    orientation: 'x'
                })
                    .addBackground(
                        this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x0000ff)
                    )
                    .addSpace() // To centerize text
                    .add(
                        this.add.text(0, 0, '1'), //  child
                    )
                    .addSpace() // To centerize text
                ,

                1, // proportion
                'center', // align
                0, // padding
                true // expand
            )
            .layout()
            //.drawBounds(this.add.graphics(), 0xff0000)
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