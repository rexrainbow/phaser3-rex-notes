import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var sizer = this.rexUI.add.sizer({ name: 'level0' })
            .add(
                this.rexUI.add.sizer({ name: 'level1' })
                    .add(
                        this.rexUI.add.sizer({ name: 'level2' })
                            .add(
                                this.rexUI.add.sizer({ name: 'level3' }),
                                { key: 'L3' }
                            ),
                        { key: 'L2' }
                    ),
                { key: 'L1' }
            )

        console.log(sizer.getElement('L3', true).name);
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);