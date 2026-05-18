import GridButtons from './GridButtons';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('gridButtons', function(config?: any) {
    var gameObject = new GridButtons(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.GridButtons', GridButtons);

export default GridButtons;