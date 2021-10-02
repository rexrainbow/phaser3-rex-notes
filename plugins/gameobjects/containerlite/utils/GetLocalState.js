var GetLocalState = function (gameObject) {
    if (!gameObject.hasOwnProperty('rexContainer')) {
        var rexContainer = {};
        Object.defineProperty(rexContainer, 'displayWidth', {
            get: function () {
                return gameObject.width * this.scaleX;
            },
            set: function (width) {
                this.scaleX = width / gameObject.width;
            }
        });
        Object.defineProperty(rexContainer, 'displayHeight', {
            get: function () {
                return gameObject.height * this.scaleY;
            },
            set: function (height) {
                this.scaleY = height / gameObject.height;
            }
        });
        gameObject.rexContainer = rexContainer;
    }
    return gameObject.rexContainer;
}

export default GetLocalState;