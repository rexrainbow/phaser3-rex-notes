import StatesRoundRectangle from './StatesRoundRectangle.js';

export default function (config) {
    var gameObject = new StatesRoundRectangle(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};