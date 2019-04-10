var InjectProperties = function(textBlock) {
    Object.defineProperty(textBlock, 'childOY', {
        configurable: true,
        get: function () {
            return textBlock.textOY;
        },
        set: function (value) {
            textBlock.textOY = value;
        }
    });
    Object.defineProperty(textBlock, 'topChildOY', {
        get: function () {
            return textBlock.topTextOY;
        }
    });
    Object.defineProperty(textBlock, 'bottomChildOY', {
        get: function () {
            return textBlock.bottomTextOY;
        }
    });
};
export default InjectProperties;