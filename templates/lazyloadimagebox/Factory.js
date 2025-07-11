import LazyLoadImageBox from './LazyLoadImageBox.js';

export default function (config) {
    var gameObject = new LazyLoadImageBox(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};