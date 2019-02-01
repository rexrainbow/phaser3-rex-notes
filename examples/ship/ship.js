import ShipPlugin from '../../plugins/ship-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {}

    create() {
        var obj = this.add.line(400, 300, 30, 0, 0, 0, 0x00cccc).setLineWidth(4, 15);
        obj.ship = this.plugins.get('rexShip').add(obj, {});
        obj.body
            .setSize(30, 30);

        this.ship = obj;

        this.print = this.add.text(0, 0, '');
    }

    update() {
        this.print.setText('Speed = ' + this.ship.body.speed);
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
    backgroundColor: 0x333333,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    plugins: {
        global: [{
            key: 'rexShip',
            plugin: ShipPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);