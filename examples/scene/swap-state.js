import FSMPlugin from '../../plugins/fsm-plugin.js';

class SceneController extends Phaser.Scene {
    constructor() {
        super({
            key: 'Controller'
        })
    }
    create() {
        var scene = this,
            btn0, btn1;
        var stateConfig = {
            states: {
                '0': {
                    enter: function () {
                        scene.scene.launch('0');
                        btn0.setBackgroundColor('#6d4c41');
                    },

                    exit: function () {
                        scene.scene.stop('0');
                        btn0.setBackgroundColor('#40241a');
                    }
                },
                '1': {
                    enter: function () {
                        scene.scene.launch('1');
                        btn1.setBackgroundColor('#6d4c41');
                    },

                    exit: function () {
                        scene.scene.stop('1');
                        btn1.setBackgroundColor('#40241a');
                    }
                },
            }
        };
        var state = this.plugins.get('rexFSM').add(stateConfig)


        var textConfig = {
            backgroundColor: '#40241a'
        }
        btn0 = this.add.text(0, 0, 'Scene-0', textConfig)
            .setInteractive()
            .on('pointerdown', function () {
                state.goto('0');
            })
        btn1 = this.add.text(120, 0, 'Scene-1', textConfig)
            .setInteractive()
            .on('pointerdown', function () {
                state.goto('1');
            })
    }
}

class Scene0 extends Phaser.Scene {
    constructor() {
        super({
            key: '0'
        })
    }

    preload() {
        console.log('scene-0: preload');
    }

    create() {
        console.log('scene-0: create');
    }
}


class Scene1 extends Phaser.Scene {
    constructor() {
        super({
            key: '1'
        })
    }

    preload() {
        console.log('scene-1: preload');
    }

    create() {
        console.log('scene-1: create');
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
    scene: [SceneController, Scene0, Scene1],
    plugins: {
        global: [{
            key: 'rexFSM',
            plugin: FSMPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);