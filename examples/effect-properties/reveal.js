import phaser from 'phaser/src/phaser.js';
import EffectPropertiesPlugin from '../../plugins/effectproperties-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('logo', 'assets/images/logo.png');
    }

    create() {
        var image = this.add.image(400, 300, 'logo');
        this.plugins.get('rexEffectProperties').add(image);

        var tweenTask;
        var direction = 0;
        this.input.on('pointerdown', function () {
            if (tweenTask) {
                tweenTask.stop();
                tweenTask = undefined;
            }

            switch (direction) {
                case 1:
                    image.revealDown = 0;
                    tweenTask = this.tweens.add({
                        targets: image,
                        revealDown: 1
                    })
                    break;

                case 2:
                    image.revealRight = 0;
                    tweenTask = this.tweens.add({
                        targets: image,
                        revealRight: 1
                    })
                    break;

                case 3:
                    image.revealUp = 0;
                    tweenTask = this.tweens.add({
                        targets: image,
                        revealUp: 1
                    })
                    break;

                default:
                    image.revealLeft = 0;
                    tweenTask = this.tweens.add({
                        targets: image,
                        revealLeft: 1
                    })
                    break;

            }

            direction = (direction + 1) % 4;
        }, this)


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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexEffectProperties',
            plugin: EffectPropertiesPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);