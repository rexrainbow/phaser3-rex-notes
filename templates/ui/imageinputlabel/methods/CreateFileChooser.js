import GetClickTarget from './GetClickTarget.js';
import { FileChooser } from '../../filechooser/FileChooser.js';
import FileChooserConfig from './FileChooserConfig.js';
import OnSelectFile from './OnSelectFile.js';

var CreateFileChooser = function (parent, config) {
    var scene = parent.scene;
    var fileChooser = new FileChooser(scene, FileChooserConfig);
    scene.add.existing(fileChooser);

    parent.pin(fileChooser);

    fileChooser
        .on('change', function () {
            OnSelectFile(parent, fileChooser.files)
        })

    return fileChooser;
}

export default CreateFileChooser;