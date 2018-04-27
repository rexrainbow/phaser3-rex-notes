import Text from './../utils/text/Text.js';
import Parser from './Parser.js';

class BBCodeText extends Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style, 'BBCodeText', Parser);
    }
}

Phaser.GameObjects.GameObjectFactory.register('rexBBCodeText', function (x, y, text, style) {
    return this.displayList.add(new BBCodeText(this.scene, x, y, text, style));
});
Phaser.GameObjects.GameObjectCreator.register('rexBBCodeText', function (config) {
    var text = GetValue(config, 'text', '');
    var style = GetValue(config, 'style', undefined);
    var bbcodeText = new BBCodeText(this.scene, 0, 0, text, style);
    BuildGameObject(this.scene, bbcodeText, config);
    return bbcodeText;
});
export default BBCodeText;