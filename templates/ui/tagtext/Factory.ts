import TagText from './TagText';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('tagText', function(x?: any, y?: any, text?: any, style?: any) {
    var gameObject = new TagText(this.scene, x, y, text, style);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TagText', TagText);

export default TagText;