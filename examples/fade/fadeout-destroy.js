import FadePlugin from '../../plugins/fade-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        this.txt = this.add.text(0, 0, '????');
        this.group = this.add.group();
    }

    update() {
        var pointer = this.input.activePointer;
        var dot = this.add.circle(pointer.x, pointer.y, 5, 0xffffff);
        this.plugins.get('rexFade').fadeOutDestroy(dot, 2000);

        this.group.add(dot);
        this.txt.setText(this.group.getLength().toString());
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
    plugins: {
        global: [{
            key: 'rexFade',
            plugin: FadePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);