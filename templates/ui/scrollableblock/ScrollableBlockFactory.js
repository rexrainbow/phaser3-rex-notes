import ScrollableBlock from './ScrollableBlock.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('scrollableBlock', function (config) {
    var gameObject = new ScrollableBlock(this.scene, config);
    this.scene.add.existing(gameObject); // It won't be added to display list, neither update list
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ScrollableBlock', ScrollableBlock);

export default ScrollableBlock;