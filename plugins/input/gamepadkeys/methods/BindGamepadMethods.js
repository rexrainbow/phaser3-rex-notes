export default {
    setGamepad(gamepad) {
        this.gamepad = gamepad;
        return this;
    },

    bindGamepad(callback) {
        var gamepadManager = this.gamepadManager;
        if (!gamepadManager) {
            return this;
        }

        if (this.waitBinding) {
            return this;
        }
        this.waitBinding = true;

        this.setBindingPostCallback((function () {
            gamepadManager
                .off('connected', this.onBindGamepad, this)
                .off('down', this.onBindGamepad, this)

            this.waitBinding = false;
            if (callback) {
                callback()
            }
        }).bind(this))

        gamepadManager
            .once('connected', this.onBindGamepad, this)
            .once('down', this.onBindGamepad, this)


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