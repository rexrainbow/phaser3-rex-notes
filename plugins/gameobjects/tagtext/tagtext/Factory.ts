import TagText from './TagText';

export default function(x?: any, y?: any, text?: any, style?: any) {
    var gameObject = new TagText(this.scene, x, y, text, style);
    this.scene.add.existing(gameObject);
    return gameObject;
}