import phaser from 'phaser/src/phaser.js';
import HorrifiPipelinePlugin from '../../plugins/horrifipipeline-plugin.js'
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var postFxPlugin = this.plugins.get('rexHorrifiPipelinePlugin');
        var gameObject = this.add.image(400, 300, 'classroom')//.setScale(0.75);
        var postFxPipeline = postFxPlugin.add(this.cameras.main, {
            enable: true,

            // Bloom
            bloomRadius: 25,
            bloomIntensity: 0.5,
            bloomThreshold: 0.75,
            bloomTexelWidth: 0.5,

            // Chromatic abberation
            chabIntensity: 0.6,

            // Vignette
            vignetteStrength: 0.8,
            vignetteIntensity: 0.85,

            // Noise
            noiseStrength: 0.5,
            // seed: 0.5,

            // VHS
            vhsStrength: 0.5,

            //CRT
            crtWidth: 2,
        });

        var gui = new Dat.GUI();

        // Bloom
        var bloom = gui.addFolder('Bloom');
        bloom.add(postFxPipeline, 'bloomEnable');
        bloom.add(postFxPipeline, 'bloomRadius', 0, 1);
        bloom.add(postFxPipeline, 'bloomIntensity', 0, 1);
        bloom.add(postFxPipeline, 'bloomThreshold', 0, 1);
        bloom.add(postFxPipeline, 'bloomTexelWidth', 0, 1);
        bloom.add(postFxPipeline, 'bloomTexelHeight', 0, 1);

        // Chromatic abberation
        var chromatic = gui.addFolder('Chromatic abberation');
        chromatic.add(postFxPipeline, 'chromaticEnable');
        chromatic.add(postFxPipeline, 'chabIntensity', 0, 1);

        // Vignette
        var vignette = gui.addFolder('Vignette');
        vignette.add(postFxPipeline, 'vignetteEnable');
        vignette.add(postFxPipeline, 'vignetteStrength', 0, 1);
        vignette.add(postFxPipeline, 'vignetteIntensity', 0, 1);

        // Noise
        var noise = gui.addFolder('Noise');
        noise.add(postFxPipeline, 'noiseEnable');
        noise.add(postFxPipeline, 'noiseStrength', 0, 1);
        noise.add(postFxPipeline, 'seed', 0, 1);

        // VHS
        var VHS = gui.addFolder('VHS');
        VHS.add(postFxPipeline, 'VHSEnable');
        VHS.add(postFxPipeline, 'vhsStrength', 0, 1);

        // Scanlines
        var scanlines = gui.addFolder('Scanlines');
        scanlines.add(postFxPipeline, 'scanlinesEnable');
        scanlines.add(postFxPipeline, 'scanStrength', 0, 1);

        // CRT 
        var CRT = gui.addFolder('CRT');
        CRT.add(postFxPipeline, 'CRTEnable');
        CRT.add(postFxPipeline, 'crtWidth', 0, 5);
        CRT.add(postFxPipeline, 'crtHeight', 0, 5);

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
            key: 'rexHorrifiPipelinePlugin',
            plugin: HorrifiPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);