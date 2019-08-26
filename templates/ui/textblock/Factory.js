import TextBlock from './TextBlock.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('textBlock', function (x, y, minWidth, minHeight, textGameObject, config) {
    var gameObject = new TextBlock(this.scene, x, y, minWidth, minHeight, textGameObject, config);
    this.scene.add.existing(gameObject); // It won't be added to display list, neither update list
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TextBlock', TextBlock);

export default TextBlock;