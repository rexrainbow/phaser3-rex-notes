import FileSelectorButton from './FileSelectorButton';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('fileSelectorButton', function(config?: any) {
    var gameObject = new FileSelectorButton(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.FileSelectorButton', FileSelectorButton);

export default FileSelectorButton;