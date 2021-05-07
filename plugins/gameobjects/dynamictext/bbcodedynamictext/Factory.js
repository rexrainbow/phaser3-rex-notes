import BBCodeDynamicText from './BBCodeDynamicText.js'

export default function (x, y, width, height, config) {
    var gameObject = new BBCodeDynamicText(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};