import phaser from 'phaser/src/phaser.js';
import DropDownPlugin from '../../plugins/dropdown-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, 'Click rectangle\n');
        var button = this.add.rectangle(400, 300, 100, 40).setStrokeStyle(4, 0xffffff)
            .setInteractive()
            .on('pointerdown', function () {
                if (button.dropDownPanel) {
                    return;
                }

                var dropDownPanel = this.add.text(0, 0, 'AAAAA\nAAAAA\nAAAAA\nAAAAA', {
                    backgroundColor: 'gray',
                    fontSize: 24,
                    padding: {
                        left: 10, right: 10, top: 10, bottom: 10
                    }
                })
                    .on('destroy', function () {
                        button.dropDownPanel = undefined;
                        print.text += 'Destroy drop down game object\n'
                    })

                var dropDownBehavior = this.plugins.get('rexDropDown').add(dropDownPanel, {
                    touchOutsideClose: true,

                    alignTarget: button,
                    //alignOffsetX: 20,
                    //alignOffsetY: -10,

                    duration: {
                        in: 1000,
                        out: 1000
                    }
                })

                print.text += 'Click outside of drop down game object\n'

                button.dropDownPanel = dropDownPanel;
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
            key: 'rexDropDown',
            plugin: DropDownPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);