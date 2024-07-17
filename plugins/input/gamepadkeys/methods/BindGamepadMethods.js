export default {

    bindGamepad(callback) {
        if (this.gamepadManager) {
            if (this.waitBinding) {
                return this;
            }
            this.waitBinding = true;

            this.setBindingPostCallback((function () {
                this.gamepadManager
                    .off('connected', this.onBindGamepad, this)
                    .off('off', this.onBindGamepad, this)

                this.waitBinding = false;
                if (callback) {
                    callback()
                }
            }).bind(this))

            this.gamepadManager
                .once('connected', this.onBindGamepad, this)
                .once('down', this.onBindGamepad, this)

        } else {
            if (callback) {
                callback();
            }

        }
        return this;
    },

    bindGamepadPromise() {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.bindGamepad(resolve);
        });
    },

    unBindGamepad() {
        this.setGamepad(null);
        return this;
    },

    reBindGamepad(callback) {
        this.unBindGamepad().bindGamepad(callback);
        return this;
    },

    // Internal method
    setBindingPostCallback(callback) {
        this.bindingPostCallback = callback;
        return this;
    },

    // Internal method
    onBindGamepad(gamepad) {
        this.setGamepad(gamepad);
        if (this.bindingPostCallback) {
            this.bindingPostCallback();
        }
    }
}