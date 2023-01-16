import phaser from 'phaser/src/phaser.js';
import ScriptTagLoaderPlugin from '../../../plugins/scripttagloader-plugin.js';

var audioContext;
try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
} catch (e) {
    console.error(e);
}

class SceneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneA'
        })
    }

    preload() {
        this.load.rexScriptTag('../../../plugins/utils/audio/ogg-decoder/vorbisdecoder.js');

        var scene = this;
        for (var i = 0; i < 1; i++) {
            let key = `audio-${i}`;
            scene.load
                .binary(key, 'assets/audio/oedipus_wizball_highscore.ogg', null)
                .on(`filecomplete-binary-${key}`, function (key, type, data) {
                    let buffer = scene.cache.binary.get(key);
                    scene.cache.binary.remove(key);

                    var decoder = new VorbisDecoder(
                        audioContext,
                        function (audioBuffer) {
                            debugger
                        },
                        function () {
                            debugger;
                        }
                    );
                    decoder.send(buffer, true);
                    /*
                    audioContext.decodeAudioData(buffer,
                        function (audioBuffer) {
                            scene.cache.audio.add(key, audioBuffer);
                        },
                        function (e) {
                            debugger;
                        }
                    )
                    */
                })
        }
    }

    create() {
        this.add.text(0, 0, 'SceneA')
        this.input.once('pointerdown', function () {
            for (var i = 0; i < 10; i++) {
                this.cache.audio.remove(`music-${i}`)
            }
            this.scene.start('SceneB')
        }, this)
    }

    update() { }
}


class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneB'
        })
    }

    preload() {
    }

    create() {
        this.add.text(0, 0, 'SceneB')
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
    scene: [SceneA, SceneB],    
    plugins: {
        global: [{
            key: 'rexScriptTagLoader',
            plugin: ScriptTagLoaderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);