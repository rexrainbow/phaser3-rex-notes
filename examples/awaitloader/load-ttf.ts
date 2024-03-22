import 'phaser';
import AwaitLoader from '../../plugins/awaitloader';

class Demo extends Phaser.Scene {


    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        const FontName = 'SEASRN';
        const FontURL = 'assets/fonts/SeasideResortNF/SEASRN.ttf';
        AwaitLoader.call(this.load, async function (successCallback: Function, failureCallback: Function) {
            const newFontFace = new FontFace(FontName, `url(${FontURL})`);
            document.fonts.add(newFontFace);

            newFontFace
                .load()
                .then(function () {
                    successCallback();
                })
                .catch(function (error) {
                    console.error(`Failed to load ${FontName}`, error);
                    failureCallback();
                });
        })
    }

    create() {
        this.add.text(400, 300, 'Hello world', { fontFamily: 'SEASRN' })
    }

    update() {
    }
}

var Delay = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, time);
    });
};

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);