import phaser from 'phaser/src/phaser.js';
import JSZip from 'jszip';
import AwaitLoaderPlugin from '../../plugins/awaitloader-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var scene = this;
        var key = 'classroom';

        scene.load.rexAwait(function (successCallback, failureCallback) {
            scene.load.binary(key, 'assets/zip/classroom.zip', Uint8Array);
            scene.load.once(`filecomplete-binary-${key}`, function () {
                var buffer = scene.cache.binary.get(key);

                var zip = new JSZip();
                zip.loadAsync(buffer).then(function (contents) {
                    // filename is equal to key
                    zip.file(key).async('arraybuffer').then(function (data) {
                        LoadImageFromUint8Array(scene, key, data, successCallback);
                    })
                })
            });
        })



    }

    create() {
        this.add.image(400, 300, 'classroom');
    }

    update() {

    }
}

var LoadImageFromUint8Array = function (scene, key, data, onLoad) {
    var blob = new Blob([data]);
    var blobURL = window.URL.createObjectURL(blob);

    // Solution 1
    scene.load.image(key, blobURL);
    scene.load.once(`filecomplete-image-${key}`, function () {
        window.URL.revokeObjectURL(blobURL);
        if (onLoad) {
            onLoad();
        }
    });

    // Solution 2
    /*
    var img = new Image();
    img.onload = function () {
        window.URL.revokeObjectURL(blobURL);
        scene.sys.textures.addImage(key, img);
        if (onLoad) {
            onLoad();
        }
    }
    img.src = blobURL;
    */
}

var config = {
    type: Phaser.AUTO,
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