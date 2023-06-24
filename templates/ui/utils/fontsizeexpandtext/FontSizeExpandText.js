import FontSizeFit from '../../../../plugins/utils/text/fontsizefit/FontSizeFit.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var FontSizeExpandText = function (textObject, config) {
    if (typeof (config) === 'number') {
        config = {
            minWidth: config
        }
    }

    var minWidth = GetValue(config, 'minWidth', 0);
    var minHeight = GetValue(config, 'minHeight', 0);
    var fitHeight = GetValue(config, 'fitHeight', false);

    textObject._minWidth = minWidth;
    textObject._minHeight = minHeight;

    if (!fitHeight) {
        // Set font size to fit width only
        textObject.runWidthWrap = function (width) {
            if (textObject.setFixedSize) {
                textObject.setFixedSize(0, 0);
            }
            FontSizeFit(textObject, width, undefined);
            return textObject;
        }
        textObject.resize = function (width, height) {
            if ((textObject.width === width) && (textObject.height === height)) {
                return textObject;
            }

            // Font size is set under runWidthWrap/FontSizeFit
            textObject.setFixedSize(width, height);
            return textObject;
        }

    } else {
        // Set font size to fit width and height
        textObject.runWidthWrap = function (width) {
            // Minimun text size
            if (textObject.setFixedSize) {
                textObject.setFixedSize(0, 0);
            }

            textObject.setFontSize(1);
            return textObject;
        }
        textObject.resize = function (width, height) {
            FontSizeFit(textObject, width, height);
            return textObject;
        }
    }

    return textObject;
}

export default FontSizeExpandText;