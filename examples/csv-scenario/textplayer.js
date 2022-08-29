import phaser from 'phaser/src/phaser.js';
import CSVScenarioPlugin from '../../plugins/csvscenario-plugin.js';
import TextPlayerPlugin from '../../plugins/textplayer-plugin.js';

var csvString = `\
#IF,this.coin > 100,AA
#IF,this.coin > 10,BB
#IF,,CC
#LABEL,AA,
-,play,"I can eat anything[wait=click]
[r]Ha[wait=1000]
[r]doneAA"
#EXIT,,
#LABEL,BB,
-,play,"I have a cup of tea[wait=click]
[r]Bla bla bla[wait=1000]
[r]doneBB"
#EXIT,,
#LABEL,CC,
-,play,"Game over[wait=click]
[r]Ouch[wait=1000]
[r]doneCC"
#EXIT,,`;

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var text = this.add.rexTextPlayer(
            {
                x: 400, y: 300,
                width: 400, height: 200,  // Fixed width and height

                background: {
                    stroke: 'white',
                    cornerRadius: 20
                },

                padding: 20,

                style: {
                    fontSize: '16px',
                    stroke: 'green',
                    strokeThickness: 3,

                    shadowColor: 'red',
                    shadowOffsetX: 5,
                    shadowOffsetY: 5,
                    shadowBlur: 3
                },

                wrap: {
                    maxLines: 5,
                    padding: { bottom: 10 },
                },

                typing: {
                    speed: 100,  // 0: no-typing
                    skipSpace: true,
                },

                clickTarget: this,
                nextPageInput: 'click|2000'
            }
        )
        text.coin = 50;

        var scenario = this.plugins.get('rexCSVScenario').add(this)
            .on('log', function (msg) {
                console.log(msg)
            })
            .on('complete', function () {
                console.log('scenario complete')
            })
            .load(csvString, text, {
                timeUnit: 'sec'
            })
            .start();
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
        global: [
            {
                key: 'rexCSVScenario',
                plugin: CSVScenarioPlugin,
                start: true
            },
            {
                key: 'rexTextPlayer',
                plugin: TextPlayerPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);