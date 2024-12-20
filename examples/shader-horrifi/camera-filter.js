import phaser from '../../../phaser/src/phaser.js';
import { HorrifiFilter, HorrifiController } from '../../plugins/horrififilter.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');

        if (!this.renderer.renderNodes.hasNode(HorrifiFilter.FilterName)) {
            this.renderer.renderNodes.addNodeConstructor(HorrifiFilter.FilterName, HorrifiFilter);
        }
    }

    create() {
        var gameObject = this.add.image(400, 300, 'classroom')//.setScale(0.75);

        var filterList = this.cameras.main.filters.internal;
        var controller = filterList.add(
            new HorrifiController(filterList.camera, {
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
                // noiseSeed: 0.5,

                // VHS
                vhsStrength: 0.5,

                // Scanlines
                scanStrength: 0.5,

                //CRT
                crtWidth: 2,
            })
        )

        var gui = new Dat.GUI();

        // Bloom
        var bloom = gui.addFolder('Bloom');
        bloom.add(controller, 'bloomEnable');
        bloom.add(controller, 'bloomRadius', 0, 1);
        bloom.add(controller, 'bloomIntensity', 0, 1);
        bloom.add(controller, 'bloomThreshold', 0, 1);
        bloom.add(controller, 'bloomTexelWidth', 0, 1);
        bloom.add(controller, 'bloomTexelHeight', 0, 1);

        // Chromatic abberation
        var chromatic = gui.addFolder('Chromatic abberation');
        chromatic.add(controller, 'chromaticEnable');
        chromatic.add(controller, 'chabIntensity', 0, 1);

        // Vignette
        var vignette = gui.addFolder('Vignette');
        vignette.add(controller, 'vignetteEnable');
        vignette.add(controller, 'vignetteStrength', 0, 1);
        vignette.add(controller, 'vignetteIntensity', 0, 1);

        // Noise
        var noise = gui.addFolder('Noise');
        noise.add(controller, 'noiseEnable');
        noise.add(controller, 'noiseStrength', 0, 1);
        noise.add(controller, 'noiseSeed', 0, 1);

        // VHS
        var VHS = gui.addFolder('VHS');
        VHS.add(controller, 'vhsEnable');
        VHS.add(controller, 'vhsStrength', 0, 1);

        // Scanlines
        var scanlines = gui.addFolder('Scanlines');
        scanlines.add(controller, 'scanlinesEnable');
        scanlines.add(controller, 'scanStrength', 0, 1);

        // CRT 
        var CRT = gui.addFolder('CRT');
        CRT.add(controller, 'crtEnable');
        CRT.add(controller, 'crtWidth', 0, 5);
        CRT.add(controller, 'crtHeight', 0, 5);

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
};

var game = new Phaser.Game(config);