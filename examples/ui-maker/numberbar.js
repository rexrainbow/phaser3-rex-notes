import phaser from 'phaser/src/phaser.js';
import Maker from '../../templates/ui/maker/Maker.js';
import Handlebars from 'handlebars';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const content = `
$type: NumberBar
width: 300

background:
    $type: RoundRectangle
    color: {{COLOR_DARK}}
    radius: 10
icon:
    $type: RoundRectangle
    color: {{COLOR_LIGHT}}
    radius: 10
slider:
    track:
        $type: RoundRectangle
        color: {{COLOR_PRIMARY}}
        radius: 10
    indicator:
        $type: RoundRectangle
        color: {{COLOR_LIGHT}}
        radius: 10
    input: click
text:
    $type: Text
    fixedWidth: 35

space:
    left: 10
    right: 10
    top: 20
    bottom: 20
    icon: 10
    slider: 10
`

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('person', 'assets/images/person.png');
        this.load.image('volume', 'assets/images/volume.png');
    }

    create() {
        var maker = new Maker(this);
        var data = Handlebars.compile(content)({
            COLOR_PRIMARY: COLOR_PRIMARY,
            COLOR_LIGHT: COLOR_LIGHT,
            COLOR_DARK: COLOR_DARK,
        });
        var numberBar = maker.make(data)
            .on('valuechange', function (newValue, oldValue, numberBar) {
                numberBar.text = Math.round(Phaser.Math.Linear(0, 100, newValue));
            })
            .on('inputstart', function () {
                console.log('inputstart')
            })
            .on('inputend', function () {
                console.log('inputend')
            })
            .setPosition(400, 300)
            .layout()
            .setValue(75, 0, 100)

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