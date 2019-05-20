import ButtonPlugin from '../../plugins/button-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.print = this.add.text(0, 0, '');

        createBtn(this, {
            x: 400,
            y: 300,
            color: 0x00cccc,
            name: 'btn0'
        });
        createBtn(this, {
            x: 390,
            y: 360,
            color: 0xcc00cc,
            name: 'btn1'
        });
        createBtn(this, {
            x: 480,
            y: 280,
            color: 0xcccc00,
            name: 'btn2'
        });
    }
}

const GetValue = Phaser.Utils.Objects.GetValue;
var createBtn = function (scene, config) {
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var color = GetValue(config, 'color', 0xffffff);
    var name = GetValue(config, 'name', '');

    var btn = scene.add.rectangle(x, y, 120, 120, color)
        .setName(name);
    scene.add.text(x, y, name, {
        fontSize: '20pt'
    })
        .setOrigin(0.5, 0.5)
    btn.button = scene.plugins.get('rexButton').add(btn, {
        // clickInterval: 1000  // ms
    });
    btn.button.on('click', function (button) {
        scene.print.text += 'click ' + button.gameObject.name + '\n';
    });
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
            key: 'rexButton',
            plugin: ButtonPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);