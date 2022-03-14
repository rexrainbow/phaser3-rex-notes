import phaser from 'phaser/src/phaser.js';
import TouchHelperPlugin from '../../plugins/touchhelper-plugin';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.print = this.add.text(0, 0, '');
        this.input.topOnly = false;

        CreateBtn(this, {
            x: 400,
            y: 300,
            color: 0x00cccc,
            name: 'btn0'
        });
        CreateBtn(this, {
            x: 390,
            y: 360,
            color: 0xcc00cc,
            name: 'btn1'
        });
        CreateBtn(this, {
            x: 480,
            y: 280,
            color: 0xcccc00,
            name: 'btn2'
        });
    }
}

const GetValue = Phaser.Utils.Objects.GetValue;
var CreateBtn = function (scene, config) {
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var color = GetValue(config, 'color', 0xffffff);
    var name = GetValue(config, 'name', '');
    var touchHelper = scene.plugins.get('rexTouchHelper');

    var btn = scene.add.rectangle(x, y, 120, 120, color)
        .setName(name);
    scene.add.text(x, y, name, {
        fontSize: '20pt'
    })
        .setOrigin(0.5, 0.5)

    btn
        .setInteractive()
        .on('pointerdown', function (pointer, localX, localY, event) {
            if (touchHelper.isAtTop('btn')) {
                scene.print.text += `click ${btn.name}\n`;
                event.stopPropagation();
            }
        })


    return btn;
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
            key: 'rexTouchHelper',
            plugin: TouchHelperPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);