import BBCodeText from './BBCodeText';

export default function(x?: any, y?: any, text?: any, style?: any) {
    var gameObject = new BBCodeText(this.scene, x, y, text, style);
    this.scene.add.existing(gameObject);
    return gameObject;
};