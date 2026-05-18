import FileDropZone from './FileDropZone';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('fileDropZone', function(config?: any) {
    var gameObject = new FileDropZone(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.FileDropZone', FileDropZone);

export default FileDropZone;