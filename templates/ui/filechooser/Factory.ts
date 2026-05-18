import { FileChooser } from './FileChooser';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('fileChooser', function(config?: any) {
    var gameObject = new FileChooser(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.FileChooser', FileChooser);

export default FileChooser;