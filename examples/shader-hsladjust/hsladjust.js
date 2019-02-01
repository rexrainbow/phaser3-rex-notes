import HslAdjustPipelinePlugin from '../../plugins/hsladjustpipeline-plugin.js'
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        drawSomething(this);

        var customPipeline = this.plugins.get('rexHslAdjustPipeline').add(this, 'HslAdjust');
        this.cameras.main.setRenderToTexture(customPipeline);

        var gui = new Dat.GUI();
        gui.add(customPipeline, 'hueRotate', 0, 1);
        gui.add(customPipeline, 'satAdjust', 0);
        gui.add(customPipeline, 'lumAdjust', 0, 1);
    }

    update() {}
}

const DegToRad = Phaser.Math.DegToRad;

var drawSomething = function (scene) {
    var colors = Phaser.Display.Color.HSVColorWheel(1, 1);

    var graphics = scene.add.graphics();
    var r = 100;
    colors.forEach(function (item, i) {
        var a = DegToRad(i);
        graphics
            .lineStyle(2, item.color)
            .lineBetween(
                400,
                300,
                400 + (r * Math.cos(a)),
                300 + (r * Math.sin(a))
            )
    })
    var rt = scene.add.renderTexture(0, 0, 800, 600);
    rt.draw(graphics, 0, 0);
    graphics.destroy();
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
            key: 'rexHslAdjustPipeline',
            plugin: HslAdjustPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);