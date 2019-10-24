class SceneController extends Phaser.Scene {
    constructor() {
        super({
            key: 'Controller'
        })
    }
    create() {
        var textConfig = {
            backgroundColor: '#40241a'
        }

        var scene = this;
        var btn0 = this.add.text(0, 0, 'Scene-0', textConfig)
            .setInteractive()
            .on('pointerup', function () {
                scene.scene.launch('0')
                scene.scene.stop('1')
            })
        var btn1 = this.add.text(120, 0, 'Scene-1', textConfig)
            .setInteractive()
            .on('pointerup', function () {
                scene.scene.stop('0')
                scene.scene.launch('1')
            })


        this.scene.get('0').events
            .on('start', function () {
                btn0.setBackgroundColor('#6d4c41')
            })
            .on('shutdown', function () {
                btn0.setBackgroundColor('#40241a')
            })
        this.scene.get('1').events
            .on('start', function () {
                btn1.setBackgroundColor('#6d4c41')
            })
            .on('shutdown', function () {
                btn1.setBackgroundColor('#40241a')
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
    scene: [SceneController, Scene0, Scene1]
};

var game = new Phaser.Game(config);