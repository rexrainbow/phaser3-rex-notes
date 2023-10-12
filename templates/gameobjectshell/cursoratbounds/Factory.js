import CursorAtBounds from './CursorAtBounds.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('cursorAtBounds', function (config) {
    var cursorAtBounds = new CursorAtBounds(this.scene, config);
    // cursorAtBounds is not a gameObject
    return cursorAtBounds;
});

SetValue(window, 'RexPlugins.GameObjectShell.CursorAtBounds', CursorAtBounds);

export default CursorAtBounds;