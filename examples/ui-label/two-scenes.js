import UIPlugin from '../../templates/ui/ui-plugin.js';

class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Main'
        })
    }

    preload() {
        // It won't work!
        // this.load.scenePlugin({
        //     key: 'rexuiplugin',
        //     url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexuiplugin.min.js',
        //     sceneKey: 'rexUI'
        // })
    }

    create() {
        console.log('MainScene: create');
        this.rexUI.add.label({
                x: 100,
                y: 100,
                text: this.add.text(0, 0, 'Main')
            })
            .layout();

        this.scene.launch('Sub');
    }
}

class SubScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Sub'
        })
    }

    create() {
        console.log('SubScene: create');
        this.rexUI.add.label({
                x: 200,
                y: 200,
                text: this.add.text(0, 0, 'Sub')
            })
            .layout();
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
    scene: [MainScene, SubScene],
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);