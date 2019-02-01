import firebase from 'firebase/app';
import 'firebase/storage';
import firebaseConfig from './firebaseConfig.js';
import {
    canvasToBlob
} from '../../plugins/utils/blob-util/blob-util.js';

const CanvasPool = Phaser.Display.Canvas.Pool;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('arrow', 'assets/images/arrow.png');
    }

    create() {
        var firebaseApp = firebase.initializeApp(firebaseConfig);

        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = firebaseApp.storage();

        // Create a storage reference from our storage service
        var storageRef = storage.ref();

        var uploadTask;
        var metadata = {
            contentType: 'image/jpeg',
        };

        // get canvas object
        var img = this.textures.get('arrow').getSourceImage();
        var mycanvas = CanvasPool.create(this, img.width, img.height);
        var myctx = mycanvas.getContext('2d');
        myctx.drawImage(img, 0, 0, mycanvas.width, mycanvas.height);

        // conver canvas to blob
        canvasToBlob(mycanvas).then(function (blob) {
                // free canvas object
                CanvasPool.remove(mycanvas);

                // update blob                
                uploadTask = storageRef.child('images/arrow.jpg').put(blob, metadata);
                return uploadTask;
            })
            .then(function (snapshot) {
                console.log('Uploaded a blob or file!');
            })
            .catch(function (err) {
                // image failed to load
            });
    }

    update() {}
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
    scene: Demo
};

var game = new Phaser.Game(config);