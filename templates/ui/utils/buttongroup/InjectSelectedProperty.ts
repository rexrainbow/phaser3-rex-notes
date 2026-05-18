import OnButtonStateChange from './OnButtonStateChange';

var InjectSelectedProperty = function(gameObject?: any) {
    var self = this;

    gameObject._selected = undefined;
    Object.defineProperty(gameObject, 'selected', {
        get: function() {
            return gameObject._selected;
        },
        set: function(newValue?: any) {
            if (gameObject._selected === newValue) {
                return;
            }
            var previousValue = gameObject._selected;
            gameObject._selected = newValue;

            OnButtonStateChange.call(self, gameObject, newValue, previousValue);
        },
        enumerable: true,
        configurable: true
    });

    gameObject.selected = false;
}

export default InjectSelectedProperty;