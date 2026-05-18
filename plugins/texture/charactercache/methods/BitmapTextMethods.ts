import CreateBitmapTextClass from './CreateBitmapTextClass';

import { GameObjects as PhaserGameObjects } from 'phaser';
const BitmapTextClass = CreateBitmapTextClass(PhaserGameObjects.BitmapText);
const DynamicBitmapTextClass = CreateBitmapTextClass(PhaserGameObjects.DynamicBitmapText);

export default {
    overrideBitmapText(bitmapText?: any) {
        var self = this;
        var setTextSave = bitmapText.setText;
        bitmapText.setText = function(text?: any, lock?: any) {
            self.load(text, lock);
            setTextSave.call(bitmapText, text);
            return bitmapText;
        }
        return bitmapText;
    },

    addBitmapText(scene?: any, x?: any, y?: any, text?: any, size?: any, align?: any) {
        var gameObject = new BitmapTextClass(scene, x, y, this, text, size, align);
        scene.add.existing(gameObject);
        return gameObject;
    },

    addDynamicBitmapText(scene?: any, x?: any, y?: any, text?: any, size?: any, align?: any) {
        var gameObject = new DynamicBitmapTextClass(scene, x, y, this, text, size, align);
        scene.add.existing(gameObject);
        return gameObject;
    },
}