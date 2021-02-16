import DissolvePipelinePlugin from '../../plugins/dissolvepipeline-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('road', 'assets/images/backgrounds/road.png');
    }

    create() {
        const Between = Phaser.Math.Between;
        var postFxPlugin = this.plugins.get('rexDissolvePipelinePlugin');
        var gameObject = this.add.image(400, 300, 'classroom');
        var postFxPipeline = postFxPlugin.add(gameObject, {
            toTexture: 'road',
        });
        var tween = this.tweens.add({
            targets: postFxPipeline,
            progress: 1,
            ease: 'Quad',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 3000,
            repeat: 0,            // -1: infinity
            yoyo: false
        });
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
    plugins: {
        global: [{
            key: 'rexDissolvePipelinePlugin',
            plugin: DissolvePipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);