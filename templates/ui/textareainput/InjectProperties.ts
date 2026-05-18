var InjectProperties = function(inputText?: any) {
    Object.defineProperty(inputText, 'childOY', {
        configurable: true,
        get: function() {
            return inputText.textOY;
        },
        set: function(value?: any) {
            inputText.textOY = value;
        }
    });
    Object.defineProperty(inputText, 'topChildOY', {
        get: function() {
            return inputText.topTextOY;
        }
    });
    Object.defineProperty(inputText, 'bottomChildOY', {
        get: function() {
            return inputText.bottomTextOY;
        }
    });
    Object.defineProperty(inputText, 'childVisibleHeight', {
        get: function() {
            return inputText.textVisibleHeight;
        }
    });
    Object.defineProperty(inputText, 'childHeight', {
        get: function() {
            return inputText.contentHeight;
        }
    });
};
export default InjectProperties;