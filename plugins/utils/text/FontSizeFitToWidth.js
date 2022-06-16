var FontSizeFitToWidth = function (textObject, width) {
    var fontSize = Math.floor(width * 1.5 / textObject.text.length);

    var widthData = {};
    var testResult = TestFontSize(textObject, fontSize, width, widthData);
    while (testResult !== 0) {
        fontSize += testResult;
        testResult = TestFontSize(textObject, fontSize, width, widthData);
    }

    textObject.setFontSize(fontSize);
    var style = textObject.style;
    style.fixedWidth = width;
    style.parent.width = width;
    style.update(false);

    return textObject;
}

var GetTextWidth = function (textObject, fontSize, widthData) {
    if (widthData[fontSize] === undefined) {
        widthData[fontSize] = textObject.setFontSize(fontSize).width;
    }

    return widthData[fontSize]
}

var TestFontSize = function (textObject, fontSize, width, widthData) {
    // console.log(fontSize);
    var textWidth = GetTextWidth(textObject, fontSize, widthData);
    var textWidth1 = GetTextWidth(textObject, fontSize + 1, widthData);
    if ((textWidth <= width) && (textWidth1 > width)) {
        return 0;
    } else if (textWidth1 <= width) {
        return 1;
    } else {
        return -1;
    }
}

export default FontSizeFitToWidth;