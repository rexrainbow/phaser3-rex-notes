import CreateBitmapTextClass from './CreateBitmapTextClass.js';

import { GameObjects as PhaserGameObjects } from 'phaser';
const BitmapTextClass = CreateBitmapTextClass(PhaserGameObjects.BitmapText);
const DynamicBitmapTextClass = CreateBitmapTextClass(PhaserGameObjects.DynamicBitmapText);

export default {
    overrideBitmapText(bitmapText) {
        var self = this;
        var setTextSave = bitmapText.setText;
        bitmapText.setText = function (text, lock) {
            self.load(text, lock);
            setTextSave.call(bitmapText, text);
            return bitmapText;
        }
        return bitmapText;
    },

    addBitmapText(scene, x, y, text, size, align) {
        var gameObject = new BitmapTextClass(scene, x, y, this, text, size, align);
        scene.add.existing(gameObject);
        return gameObject;
    },

    addDynamicBitmapText(scene, x, y, text, size, align) {
        var gameObject = new DynamicBitmapTextClass(scene, x, y, this, text, size, align);
        scene.add.existing(gameObject);
        return gameObject;
    },
}