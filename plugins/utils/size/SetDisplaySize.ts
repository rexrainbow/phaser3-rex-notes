var SetDisplaySize = function(gameObject?: any, width?: any, height?: any) {
    if (!gameObject) {
        return;
    }

    var unknownWidth = (width == null);
    var unknownHeight = (height == null);

    if (unknownWidth && unknownHeight) {
        return gameObject;
    }

    if (!unknownWidth) {
        gameObject.displayWidth = width;
    }

    if (!unknownHeight) {
        gameObject.displayHeight = height;
    }

    if (unknownWidth?: any) {
        gameObject.scaleX = gameObject.scaleY;
    }

    if (unknownHeight?: any) {
        gameObject.scaleY = gameObject.scaleX;
    }

    return gameObject;
}

export default SetDisplaySize;