import phaser from '../../../phaser/src/phaser.js';
import OutlineFilterPlugin from '../../plugins/outlinefilter-plugin.js';

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
        for (var i = 0; i < 20; i++) {
            // let gameObject = this.add.container(0, 0, [
            //     this.add.image(0, 0, 'mushroom')
            // ])
            //     .setSize(64, 64)
            //     .setRandomPosition(100, 100, 600, 400)

            let gameObject = this.add.image(0, 0, 'mushroom')
                .setRandomPosition(100, 100, 600, 400)

            gameObject
                .setInteractive()
                .on('pointerover', function () {
                    /*
                    // Add outline filter
                    this.plugins.get('rexOutlineFilter').add(gameObject, {
                        thickness: 3,
                        outlineColor: 0xff8a50
                    });

                    // Cascade 2nd outline
                    this.plugins.get('rexOutlineFilter').add(gameObject, {
                        thickness: 3,
                        outlineColor: 0xc41c00
                    });
                    */
                    var controller0 = gameObject
                        .enableFilters()
                        .filters.internal.addRexOutline({
                            thickness: 3,
                            outlineColor: 0xff8a50
                        })
                        .setPaddingOverride(null)

                    var controller1 = gameObject
                        .enableFilters()
                        .filters.internal.addRexOutline({
                            thickness: 3,
                            outlineColor: 0xc41c00
                        })
                        .setPaddingOverride(null)

                    gameObject.setData('controller0', controller0);
                    gameObject.setData('controller1', controller1);
                }, this)
                .on('pointerout', function () {
                    /*
                    // Remove all outline filter
                    this.plugins.get('rexOutlineFilter').remove(gameObject);
                    */

                    gameObject
                        .enableFilters()
                        .filters.internal
                        .remove(gameObject.getData('controller0'))
                        .remove(gameObject.getData('controller1'))

                    gameObject.setData('controller0', null);
                    gameObject.setData('controller1', null);
                }, this)

        }
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
    backgroundColor: 0x555555,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexOutlineFilter',
            plugin: OutlineFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);