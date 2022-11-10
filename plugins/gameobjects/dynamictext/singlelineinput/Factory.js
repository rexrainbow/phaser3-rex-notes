import SingleLineInput from './SingleLineInput.js'

export default function (x, y, width, height, config) {
    var gameObject = new SingleLineInput(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};