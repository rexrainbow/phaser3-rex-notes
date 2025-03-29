import phaser from '../../../phaser/src/phaser.js';
import InstallP3Fx from '../../plugins/p3fx.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        InstallP3Fx(this);
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var gameObject = this.add.image(400, 300, 'classroom').setScale(0.8)
        gameObject.enableFilters()
            .filters.internal.addP3Shine(0.002);
    }

    update() {
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
};

var game = new Phaser.Game(config);