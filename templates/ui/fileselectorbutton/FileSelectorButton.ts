import Label from '../label/Label';
import { FileChooser } from '../filechooser/FileChooser';
import FileChooserMethods from './FileChooserMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class FileSelectorButton extends Label {
    addBackground: any;
    addChildrenMap: any;
    childrenMap: any;
    emit: any;
    setAccept: any;
    setMultiple: any;
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexFileSelectorButton';

        var fileChooser = new FileChooser(scene);
        scene.add.existing(fileChooser);
        this.addBackground(fileChooser);

        this.addChildrenMap('fileChooser', fileChooser);

        this.setAccept(GetValue(config, 'accept', ''));
        this.setMultiple(GetValue(config, 'multiple', false));

        fileChooser
            .on('change', function(gameObject?: any) {
                var files = gameObject.files;
                if (files.length === 0) {
                    return;
                }

                files = Array.from(files);
                this.emit('select', files, this);
            }, this)

    }

    get files() {
        return this.childrenMap.fileChooser.files;
    }

}

Object.assign(
    FileSelectorButton.prototype,
    FileChooserMethods,
)

export default FileSelectorButton;