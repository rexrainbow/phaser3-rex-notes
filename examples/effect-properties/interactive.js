import phaser from 'phaser/src/phaser.js';
import EffectPropertiesPlugin from '../../plugins/effectproperties-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var AddEffectProperties = this.plugins.get('rexEffectProperties').add;
        for (var i = 0; i < 20; i++) {
            let image = this.add.image(
                100 + Math.random() * 600,
                100 + Math.random() * 400,
                'mushroom'
            )
                .setData('enable', true)
                .setData('selected', false)

            AddEffectProperties(image);

            if (Math.random() > 0.7) {
                image.setData('enable', false);
                image.blackWhite = 1;
            }

            image
                .setInteractive()
                .on('pointerover', function () {
                    if (!image.getData('enable')) {
                        return
                    }

                    image.glowColor = 0xff0000;
                })
                .on('pointerout', function () {
                    if (!image.getData('enable')) {
                        return
                    }

                    image.glowColor = null;
                })
                .on('pointerdown', function () {
                    if (!image.getData('enable')) {
                        return
                    }

                    image.toggleData('selected');
                    image.contrast = (image.getData('selected')) ? 1 : null;
                })

        }
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