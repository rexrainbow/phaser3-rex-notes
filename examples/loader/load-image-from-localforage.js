import phaser from 'phaser/src/phaser.js';
import localforage from 'localforage';
import AwaitLoaderPlugin from '../../plugins/awaitloader-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var self = this;
        var key = 'photo';
        this.load.rexAwait(function (successCallback, failureCallback) {
            localforage.getItem(key).then(function (image) {
                if (!image) {
                    // failureCallback();

                    // Load from server
                    self.load.binary('photo', 'assets/images/mushroom.png', Uint8Array);

                    self.load.once(`filecomplete-binary-${key}`, function () {                        
                        var buffer = self.cache.binary.get(key);
                        localforage.setItem('photo', buffer);

                        console.log('Prepare local image file, see you next time');
                        failureCallback();
                    });
                }

                var blob = new Blob([image]);
                var url = window.URL.createObjectURL(blob);
                self.load.image(key, url);

                console.log('Get local image file success');
                successCallback();
            })
        });
    }

    create() {
        this.add.image(400, 300, 'photo');
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
            key: 'rexAwaitLoader',
            plugin: AwaitLoaderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);