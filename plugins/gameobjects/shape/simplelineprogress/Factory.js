import SimpleLineProgress from './SimpleLineProgress.js';

export default function (x, y, width, height, config) {
    var gameObject = new SimpleLineProgress(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};