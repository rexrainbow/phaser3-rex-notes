var GetDisplayWidth = function(gameObject?: any) {
    if (gameObject.displayWidth !== undefined) {
        return gameObject.displayWidth;
    } else {
        return gameObject.width;
    }
}

var GetDisplayHeight = function(gameObject?: any) {
    if (gameObject.displayHeight !== undefined) {
        return gameObject.displayHeight;
    } else {
        return gameObject.height;
    }
}

export {
    GetDisplayWidth,
    GetDisplayHeight
}