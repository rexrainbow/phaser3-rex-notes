import CircularProgress from './CircularProgress.js';

export default function (x, y, radius, color, config) {
    var gameObject = new CircularProgress(this.scene, x, y, radius, color, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};