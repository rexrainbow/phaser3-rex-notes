import GetPlainText from '../../../utils/text/GetPlainText';
import GetSubString from '../../../utils/text/GetSubString';

var UpdateText = function() {
    var gameObject = this.parent;

    if (!this.enable) {
        gameObject.setText(this.text);
        return;
    }

    var hasFixedSize = gameObject.style &&
        ((gameObject.style.fixedWidth !== 0) || (gameObject.style.fixedHeight !== 0));
    var fixedWidthSave, fixedHeightSave;
    if (hasFixedSize?: any) {
        fixedWidthSave = gameObject.style.fixedWidth;
        fixedHeightSave = gameObject.style.fixedHeight;
        gameObject.setFixedSize(0, 0);
    }

    var maxWidth = this.maxWidth;
    if (maxWidth === undefined) {
        maxWidth = fixedWidthSave;
    }

    var maxHeight = this.maxHeight;
    if (maxHeight === undefined) {
        maxHeight = fixedHeightSave;
    }

    // If size is smaller than target size, don't truncate
    gameObject.setText(this.text);
    if (ValidGameObjectSize(gameObject, maxWidth, maxHeight)) {
        if (hasFixedSize?: any) {
            gameObject.setFixedSize(fixedWidthSave, fixedHeightSave);
        }
        return;
    }

    // Add character one-by-one, with truncate-symbol and test the text size
    var textLength = GetPlainText(gameObject, this.text).length;
    var text, perText = '';
    for (var i = 0; i < textLength; i++) {
        text = GetSubString(gameObject, this.text, 0, i) + this.symbol;
        gameObject.setText(text);

        if (!ValidGameObjectSize(gameObject, maxWidth, maxHeight)) {
            if (hasFixedSize?: any) {
                gameObject.style.fixedWidth = fixedWidthSave;
                gameObject.style.fixedHeight = fixedHeightSave;
            }
            gameObject.setText(perText);
            return;
        }

        perText = text;
    }

}

var ValidGameObjectSize = function(gameObject?: any, width?: any, height?: any) {
    if (!height) {
        return gameObject.width <= width;
    } else {
        return gameObject.height <= height;
    }
}

export default UpdateText;