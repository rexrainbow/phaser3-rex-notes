import BuffDataPlugin from '../../plugins/buffdata-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        this.plugins.get('rexBuffData').extend(this.data);

        this.data.setBaseValue('attack', 50);
        console.log(this.data.get('attack'));

        this.data.setBuff('attack', 'a', '50%');
        this.data.setBuff('attack', 'b', -3);
        console.log(this.data.get('attack')); // 50 + (50*0.5) + (-3) = 72

        this.data.setBounds('attack', 0, 100);
        console.log(this.data.get('attack'));

        this.data.setBuff('attack', 'c', 100);
        console.log(this.data.get('attack'));
    }

    update() {}
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
            key: 'rexBuffData',
            plugin: BuffDataPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);