import CursorKeys from '../../utils/input/CursorKeys.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const KeyNames = ['A', 'Y', 'X', 'B', 'L1', 'L2', 'R1', 'R2'];

class GamepadKeys extends CursorKeys {
    constructor(scene) {
        super(scene);
        // this.scene = scene;

        if (!this.gamepadManager) {
            console.warn(`Gamepad feature is not activated`);
        }

        this.addKeys(KeyNames);
        this.pad = null;
        this.autoCapture = GetValue(config, 'autoCapture', true);

        this.boot();
    }

    boot() {
        if (this.gamepadManager) {
            this.gamepadManager.on('down', this.onUpdateKeysState, this);
            this.gamepadManager.on('disconnected', this.onDisconnect, this);

            if (this.autoCapture) {
                this.captureGamepad();
            }
        }
    }

    shutdown(fromScene) {
        if (this.gamepadManager) {
            this.gamepadManager.off('down', this.onUpdateKeysState, this);
            this.gamepadManager.off('disconnected', this.onDisconnect, this);
        }

        super.shutdown(fromScene);
    }

    onUpdateKeysState(gamepad) {
        if (!this.isMyPad(gamepad)) {
            return;
        }

        for (var keyName in this.keys) {
            this.setKeyState(keyName, gamepad[keyName]);
        }
    }

    onDisconnect(gamepad, event) {
        if (!this.isMyPad(gamepad)) {
            return;
        }

        this.setGamepad(null);

        if (this.autoCapture) {
            this.captureGamepad();
        }
    }

    setGamepad(pad) {
        this.pad = pad;

        if (pad) {
            this.onUpdateKeysState(pad);
        } else {
            this.clearAllKeysState();
        }

        return this;
    }

    isMyPad(pad) {
        return (!!this.pad) && (this.pad === pad);
    }

    captureGamepad(callback) {
        if (this.gamepadManager) {
            this.gamepadManager.once('down', function (gamepad, button, value) {
                this.setGamepad(gamepad);
                if (callback) {
                    callback(gamepad);
                }
            }, this)

        } else {
            if (callback) {
                callback();
            }

        }
        return this;
    }

    captureGamepadPromise() {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.captureGamepad(resolve);
        });
    }

    get gamepadManager() {
        this.scene.input.gamepad;
    }

    get AKeyDown() {
        return this.keys.A.isDown;
    }

    get YKeyDown() {
        return this.keys.Y.isDown;
    }

    get XKeyDown() {
        return this.keys.X.isDown;
    }

    get BKeyDown() {
        return this.keys.B.isDown;
    }

    get L1KeyDown() {
        return this.keys.L1.isDown;
    }

    get L2KeyDown() {
        return this.keys.L2.isDown;
    }

    get R1KeyDown() {
        return this.keys.R1.isDown;
    }

    get R2KeyDown() {
        return this.keys.R2.isDown;
    }

}

export default GamepadKeys;