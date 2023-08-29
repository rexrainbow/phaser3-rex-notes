import phaser from 'phaser/src/phaser.js';
import DynamicTextPlugin from '../../plugins/dynamictext-plugin.js';
import GetNearestChild from '../../plugins/gameobjects/dynamictext/dynamictext/methods/GetNearestChild.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var text = this.add.rexDynamicText(
            {
                x: 400, y: 300,
                padding: 20,
                background: {
                    stroke: 'white',
                    cornerRadius: 20
                },
                style: {
                    color: 'white',
                    backgroundColor: null,
                    fontSize: '60px',
                },

                childrenInteractive: true
            }
        )

        text.appendText('Phaser');

        var drawBounds = function (bob) {
            var text = bob.text;
            if ((text === ' ') || (text === '\n')) {
                return;
            }

            var context = bob.context;

            var savedLineCap = context.lineCap;
            context.lineCap = 'butt';

            context.strokeStyle = 'red';
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(bob.drawTLX, bob.drawTLY);
            context.lineTo(bob.drawBLX, bob.drawBLY);
            context.lineTo(bob.drawBRX, bob.drawBRY);
            context.lineTo(bob.drawTRX, bob.drawTRY);
            context.closePath();
            context.stroke();

            context.lineCap = savedLineCap;
        }
        var children = text.getChildren();
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            children[i]
                .setAngle((Math.random() - 0.5) * 30)
                .modifyStyle({ fontSize: Phaser.Math.Between(30, 60) })
                .setDrawAboveCallback(drawBounds)
        }

        text.runWordWrap({
            lineHeight: 60,
            maxLines: 0,       // Set maxLines to 0
            letterSpacing: 10,
            padding: { bottom: 10 },
        });

        text
            .setInteractive()
            .on('child.pointerover', function (child) {
                child.modifyStyle({
                    color: 'black',
                    backgroundColor: 'white'
                })
            })
            .on('child.pointerout', function (child) {
                child.modifyStyle({
                    color: 'white',
                    backgroundColor: null
                })
            })
            .on('pointerdown', function (pointer, localX, localY, event) {
                var child = text.getNearestChild(localX, localY);
                console.log(child.text)
            })

        // text.setTextOY(-40).updateTexture();
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
            key: 'rexDynamicText',
            plugin: DynamicTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);