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

        this.data.set('attack', 50);
        console.log(this.data.getBuffResult('attack'));

        this.data.addBuff('attack', 'a', '50%');
        this.data.addBuff('attack', 'b', -3);
        console.log(this.data.getBuffResult('attack')); // 50 + (50*0.5) + (-3) = 72

        this.data.setBounds('attack', 0, 100);
        console.log(this.data.getBuffResult('attack'));

        this.data.addBuff('attack', 'c', 100);
        console.log(this.data.getBuffResult('attack'));
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
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