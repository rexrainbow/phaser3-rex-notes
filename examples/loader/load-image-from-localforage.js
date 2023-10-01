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
        LoadImageFromLocalForage(this, 'classroom', 'assets/images/backgrounds/classroom.png')
    }

    create() {
        this.add.image(400, 300, 'classroom');
    }

    update() {

    }
}

var LoadImageFromLocalForage = function (scene, key, sourceURL) {
    scene.load.rexAwait(function (successCallback, failureCallback) {
        localforage.getItem(key).then(function (data) {
            if (!data) {
                // Load from server
                scene.load.binary(key, sourceURL, Uint8Array);

                scene.load.once(`filecomplete-binary-${key}`, function () {                    
                    var buffer = scene.cache.binary.get(key);
                    scene.cache.binary.remove(key);

                    LoadImageFromUint8Array(scene, key, buffer);
                    localforage.setItem(key, buffer).then(successCallback);
                });

            } else {
                LoadImageFromUint8Array(scene, key, data, successCallback);
            }
        })
    });
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