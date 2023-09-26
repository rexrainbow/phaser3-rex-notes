import Label from '../label/Label.js';
import CreateImageBox from './methods/CreateImageBox.js';
import Click from '../click/Click.js';
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
}

Object.assign(
    ImageInputLabel.prototype,
    methods,
)

export default ImageInputLabel;