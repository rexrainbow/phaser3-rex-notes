import phaser from 'phaser/src/phaser.js';
import { OggOpusDecoder, OggOpusDecoderWebWorker } from '../../../plugins/utils/audio/ogg-opus-decoder/ogg-opus-decoder.js';

var Decode = async function (buffer, context) {
    const decoder = new OggOpusDecoderWebWorker();
    await decoder.ready;

    const { channelData, samplesDecoded, sampleRate } = await decoder.decodeFile(buffer);

    let audioBuffer = context.createBuffer(channelData.length, samplesDecoded, sampleRate);

    channelData.map((channel, index) => {
        audioBuffer.copyToChannel(channel, index);
    });

    decoder.free();

    return audioBuffer;
}

class SceneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneA'
        })
    }

    preload() {


        var scene = this;
        for (var i = 0; i < 10; i++) {
            let key = `audio-${i}`;
            scene.load
                .binary(key, 'assets/audio/oedipus_wizball_highscore.opus', Uint8Array)
                .on(`filecomplete-binary-${key}`, async function (key, type, data) {
                    let buffer = scene.cache.binary.get(key);
                    scene.cache.binary.remove(key);

                    let audioBuffer = await Decode(buffer, scene.game.sound.context);

                    buffer = null;
                    scene.cache.audio.add(key, audioBuffer);
                })
        }
    }

    create() {
        this.add.text(0, 0, 'SceneA')
        this.input.once('pointerdown', function () {
            for (var i = 0; i < 10; i++) {
                this.cache.audio.remove(`audio-${i}`)
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
    scene: [SceneA, SceneB]
};

window.onload = function () {
    var game = new Phaser.Game(config);
}