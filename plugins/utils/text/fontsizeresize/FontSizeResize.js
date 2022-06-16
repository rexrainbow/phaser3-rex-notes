var FontSizeFitToWidth = function (textObject, width, height) {
    var textLength = textObject.text.length;
    if (textLength === 0) {
        SetTextWidth(textObject, width, height);
        return textObject;
    }

    var fontSize = Math.floor(width * 1.5 / textLength);

    var sizeData = {};
    var testResult = TestFontSize(textObject, fontSize, width, height, sizeData);
    while (testResult !== 0) {
        fontSize += testResult;
        if (fontSize < 0) {
            fontSize = 0;
            break;
        }
        testResult = TestFontSize(textObject, fontSize, width, height, sizeData);
    }

    textObject.setFontSize(fontSize);
    SetTextWidth(textObject, width, height);

    return textObject;
}

var GetTextSize = function (textObject, fontSize, sizeData) {
    if (sizeData[fontSize] === undefined) {
        textObject.setFontSize(fontSize)
        sizeData[fontSize] = {
            width: textObject.width,
            height: textObject.height
        }
    }

    return sizeData[fontSize]
}

var TestFontSize = function (textObject, fontSize, width, height, sizeData) {
    // console.log(fontSize);
    var textSize = GetTextSize(textObject, fontSize, sizeData);
    var textSize1 = GetTextSize(textObject, fontSize + 1, sizeData);

    if (height !== undefined) {
        // Clamp by height
        if ((textSize.height <= height) && (textSize1.height > height)) {
            return 0;

        } else if (textSize1.height > height) { // Reduce text size
            return -1;
        }
    }

    // Clamp by width
    if ((textSize.width <= width) && (textSize1.width > width)) {
        return 0;

    } else if (textSize.width > width) {  // Reduce text size
        return -1;

    } else {  // Increase text size
        return 1;
    }
}

var SetTextWidth = function (textObject, width, height) {
    var style = textObject.style;

    style.fixedWidth = width;
    style.parent.width = width;

    if (height !== undefined) {
        style.fixedHeight = height;
        style.parent.height = height;
    }

    style.update(false);
}

export default FontSizeFitToWidth;