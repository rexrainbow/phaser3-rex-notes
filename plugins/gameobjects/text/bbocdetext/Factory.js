import BBCodeText from './BBCodeText.js';

export default function (x, y, text, style) {
    var gameObject = new BBCodeText(this.scene, x, y, text, style);
    this.displayList.add(gameObject);
    return gameObject;
};