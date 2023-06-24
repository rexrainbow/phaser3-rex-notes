const MaxTestCount = 65535;

var FontSizeFit = function (textObject, width, height) {
    if (width == null) {
        // Do nothing if invalid width input
        return textObject;
    }
    if (width === 0) {
        SetTextWidth(textObject, 0, height);
        return textObject;
    }

    var textLength = textObject.text.length;
    if (textLength === 0) {
        SetTextWidth(textObject, width, height);
        return textObject;
    }

    var fontSize = Math.floor(width * 1.5 / textLength);
    if (height !== undefined) {
        if (fontSize > height) {
            fontSize = Math.floor(height);
        }
    }

    var sizeData = {};
    var testResult = TestFontSize(textObject, fontSize, width, height, sizeData);
    for (var i = 0; i <= MaxTestCount; i++) {
        if (testResult === 0) {
            break;
        } else {
            fontSize += testResult;
            if (fontSize < 0) {
                fontSize = 0;
                break;
            }
        }
        testResult = TestFontSize(textObject, fontSize, width, height, sizeData);
        // console.log(fontSize, testResult)
    }

    if (i === MaxTestCount) {
        console.warn(`FontSizeFit: Test count exceeds ${MaxTestCount}`);
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
    var textSize = GetTextSize(textObject, fontSize, sizeData);
    var textSize1 = GetTextSize(textObject, fontSize + 1, sizeData);

    var deltaHeight;
    if (height !== undefined) {
        // Clamp by height
        if ((textSize.height <= height) && (textSize1.height > height)) {
            deltaHeight = 0;

        } else if (textSize.height > height) { // Reduce font size
            return -1;

        } else {
            // Increase font size
            deltaHeight = Math.floor(height - textSize.height);
        }
    }

    // Clamp by width
    var deltaWidth;
    if ((textSize.width <= width) && (textSize1.width > width)) {
        return 0;

    } else if (textSize.width > width) {  // Reduce font size
        return -1;

    } else {
        // Increase font size
        var deltaWidth = Math.floor(width - textSize.width);
        if (deltaHeight === undefined) {
            return deltaWidth;
        } else {
            return Math.min(deltaWidth, deltaHeight);
        }
    }
}

var SetTextWidth = function (textObject, width, height) {
    var style = textObject.style;

    if (!style) {
        // BitmapText game object does not have style property
        return;
    }

    style.fixedWidth = width;
    style.parent.width = width;

    if (height !== undefined) {
        style.fixedHeight = height;
        style.parent.height = height;
    }

    style.update(false);
}

export default FontSizeFit;