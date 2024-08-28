import Label from '../label/Label.js';
import CreateImageBox from './methods/CreateImageBox.js';
import GetClickTarget from './methods/GetClickTarget.js';
import CreateClickBehavior from './methods/CreateClickBehavior.js';
import CreateFileChooser from './methods/CreateFileChooser.js';
import methods from './methods/Methods.js';


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

        this.clickTarget = GetClickTarget(this, config);
        if (this.clickTarget) {
            if (!GetValue(config, 'domButton', true)) {
                this.clickBehavior = CreateClickBehavior(this, config);
            } else {
                this.fileChooser = CreateFileChooser(this, config);
            }
        }
        
        this.addChildrenMap('canvas', icon.image);
        this.addChildrenMap('iconBackground', icon.background);
        this.addChildrenMap('fileChooser', this.fileChooser);

    }

    postLayout(parent, newWidth, newHeight) {
        if (this.fileChooser) {
            this.fileChooser.syncTo(this.clickTarget);
            this.resetChildState(this.fileChooser);
        }
        super.postLayout(parent, newWidth, newHeight);
    }

}

Object.assign(
    ImageInputLabel.prototype,
    methods,
)

export default ImageInputLabel;