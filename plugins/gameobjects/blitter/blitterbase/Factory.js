import Blitter from './Blitter.js';

export default function (x, y, key, frame) {
    var gameObject = new Blitter(this.scene, x, y, key, frame);
    this.displayList.add(gameObject);
    return gameObject;
};