import phaser from 'phaser/src/phaser.js';
import InTouchingPlugin from '../../plugins/intouching-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var btn0 = CreateBtn(this, {
            x: 400,
            y: 300,
            color: 0x00cccc,
            name: 'btn0'
        });
        var btn1 = CreateBtn(this, {
            x: 390,
            y: 360,
            color: 0xcc00cc,
            name: 'btn1'
        });
        var btn2 = CreateBtn(this, {
            x: 480,
            y: 280,
            color: 0xcccc00,
            name: 'btn2'
        });

        var btns = [btn0, btn1, btn2];


        var print = this.add.text(0, 0, '');
        this.input.on('pointerdown', function () {
            var s = ''
            btns.forEach(function (btn) {
                if (btn.inTouching.isInTouched) {
                    s += `Click ${btn.name}\n`;
                }
            })
            print.text = s;
        })
    }

    update() { }
}


const GetValue = Phaser.Utils.Objects.GetValue;
var CreateBtn = function (scene, config) {
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var color = GetValue(config, 'color', 0xffffff);
    var name = GetValue(config, 'name', '');

    var btn = scene.add.rectangle(x, y, 120, 120, color).setName(name);
    scene.add.text(x, y, name, {
        fontSize: '20pt'
    })
        .setOrigin(0.5, 0.5)

    btn.inTouching = scene.plugins.get('rexInTouching').add(btn);

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
            key: 'rexInTouching',
            plugin: InTouchingPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);