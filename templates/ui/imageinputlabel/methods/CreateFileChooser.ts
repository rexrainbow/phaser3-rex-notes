import GetClickTarget from './GetClickTarget';
import { FileChooser } from '../../filechooser/FileChooser';
import FileChooserConfig from './FileChooserConfig';
import OnSelectFile from './OnSelectFile';

var CreateFileChooser = function(parent?: any, config?: any) {
    var scene = parent.scene;
    var fileChooser = new FileChooser(scene, FileChooserConfig);
    scene.add.existing(fileChooser);

    parent.pin(fileChooser);

    fileChooser
        .on('change', function() {
            OnSelectFile(parent, fileChooser.files)
        })

    return fileChooser;
}

export default CreateFileChooser;