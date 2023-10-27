import phaser from 'phaser/src/phaser.js';
import Maker from '../../templates/ui/maker/Maker.js';
import Handlebars from 'handlebars';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const content = `
$type: Knob
width: 200
height: 200
input: click

trackColor: {{COLOR_DARK}}
barColor: {{COLOR_LIGHT}}

background:
    $type: RoundRectangle
    color: {{COLOR_MAIN}}
    radius: 20
    strokeColor: {{COLOR_LIGHT}}
    strokeWidth: 1
text:
    $type: Label
    text:
        $type: Text
        fontSize: 30
    icon:
        $type: Image
        key: volume
    space: { icon:10 }
space:
    left: 20
    right: 20
    top: 20
    bottom: 20
easeValue:
    duration: 250
`

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('volume', './assets/images/volume.png');
    }

    create() {
        var maker = new Maker(this);
        var data = Handlebars.compile(content)({
            COLOR_MAIN: COLOR_MAIN,
            COLOR_LIGHT: COLOR_LIGHT,
            COLOR_DARK: COLOR_DARK,
        });
        var knob = maker.make(data)
            .setPosition(400, 300)
            .layout();

        var print = this.add.text(0, 0, '');
        knob
            .setTextFormatCallback(function (value) {
                return Math.floor(value * 100).toString();
            })
            .on('valuechange', function (value) { print.text = value; })
            .setValue(0.5);
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
    scene: Demo
};

var game = new Phaser.Game(config);