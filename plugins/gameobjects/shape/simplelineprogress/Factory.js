import SimpleLineProgress from './SimpleLineProgress.js';

export default function (x, y, width, height, barColor, value, config) {
    var gameObject = new SimpleLineProgress(this.scene, x, y, width, height, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};