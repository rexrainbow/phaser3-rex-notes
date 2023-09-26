import Label from '../label/Label.js';
import CreateImageBox from './CreateImageBox.js';
import Click from '../click/Click.js';
import { OpenFileChooser } from '../filechooser/FileChooser.js';

const GetValue = Phaser.Utils.Objects.GetValue;

/*
Label :
    - icon : imageBox
        - image: canvas
*/

class ImageInputLabel extends Label {
    constructor(scene, config) {
        var icon = CreateImageBox(scene, config);
        config.icon = icon;

        super(scene, config);
        this.type = 'rexImageFileInputLabel';

        // Set initial size of icon(imageBox)
        var iconWidth = this.iconWidth,
            iconHeight = this.iconWidth;
        if ((iconWidth !== undefined) && (iconHeight !== undefined)) {
            icon.resize(iconWidth, iconHeight);
        }

        // Click behavior
        var clickBehavior;
        var clickConfig = GetValue(config, 'click', true);
        if (clickConfig) {
            var clickTarget = GetValue(clickConfig, 'target', this);
            if (typeof (clickTarget) === 'string') {
                clickTarget = this.getElement(clickTarget);
            }

            if (clickTarget) {
                clickBehavior = new Click(clickTarget, clickConfig);

                clickBehavior.on('click', this.open, this);
            }
        }
        this.clickBehavior = clickBehavior;

    }

    async openPromise() {
        var self = this;
        var imageBox = this.childrenMap.icon;
        var canvas = imageBox.image;

        return OpenFileChooser(this.scene.game, {
            accept: 'image/*',
            multiple: false,
        })
            .then(function (result) {
                var files = result.files;
                if (files.length === 0) {
                    return;
                }

                var selectedFile = files[0];
                return canvas.loadFromFilePromise(selectedFile)
                    .then(function () {
                        imageBox.scaleImage();

                        self.emit('select', selectedFile, self);
                    })
            })
    }

    open() {
        this.openPromise();
        return this;
    }
}

export default ImageInputLabel;