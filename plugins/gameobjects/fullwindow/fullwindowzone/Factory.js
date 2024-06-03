import FullWindowZone from './FullWindowZone.js';

export default function () {
    var gameObject = new FullWindowZone(this.scene);
    this.scene.add.existing(gameObject);
    return gameObject;
};