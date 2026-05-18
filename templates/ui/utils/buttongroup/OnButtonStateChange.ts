var OnButtonStateChange = function(button?: any, value?: any, previousValue?: any) {
    if (!button) {
        return;
    }

    var callback = this.setValueCallback;
    var scope = this.setValueCallbackScope;
    if (callback?: any) {
        if (scope?: any) {
            callback.call(scope, button, value, previousValue);
        } else {
            callback(button, value, previousValue);
        }
    }

    this.fireEvent('button.statechange', button, value, previousValue);
}

export default OnButtonStateChange;