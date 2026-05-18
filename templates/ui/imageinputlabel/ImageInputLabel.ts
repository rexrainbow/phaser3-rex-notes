import Label from '../label/Label';
import CreateImageBox from './methods/CreateImageBox';
import GetClickTarget from './methods/GetClickTarget';
import CreateClickBehavior from './methods/CreateClickBehavior';
import CreateFileChooser from './methods/CreateFileChooser';
import methods from './methods/Methods';


import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

/*
Label :
    - icon : imageBox
        - image: canvas
*/

class ImageInputLabel extends Label {
    addChildrenMap: any;
    clickBehavior: any;
    clickTarget: any;
    fileChooser: any;
    iconWidth: any;
    resetChildState: any;
    type: any;

    constructor(scene?: any, config?: any) {
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

    postLayout(parent?: any, newWidth?: any, newHeight?: any) {
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