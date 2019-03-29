import ScrollableBlock from './ScrollableBlock.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('scrollableBlock', function (config) {
    return new ScrollableBlock(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.ScrollableBlock', ScrollableBlock);

export default ScrollableBlock;