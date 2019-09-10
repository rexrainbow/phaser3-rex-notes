import Label from '../label/Label.js';
import Const from './Const.js';
import DefaultTransitCallbacks from './DefaultTransitCallbacks.js';
import Player from '../../../plugins/logic/runcommands/tcrp/Player.js';
import NOOP from '../../../plugins/utils/object/NOOP.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Toast extends Label {
    constructor(scene, config) {
        if (config === undefined) {
            config = {
                text: createDefaultTextObject(scene)
            }
        }

        super(scene, config);
        this.type = 'rexToast';

        this.setTransitInTime(GetValue(config, 'duration.in', 200));
        this.setDisplayTime(GetValue(config, 'duration.hold', 1200));
        this.setTransitOutTime(GetValue(config, 'duration.out', 200));
        this.setTransitInCallback(GetValue(config, 'transitIn', Const.popUp));
        this.setTransitOutCallback(GetValue(config, 'transitOut', Const.scaleDown));

        this.player = new Player(this, { dtMode: 1 });
        this.messages = [];

        this.setVisible(false);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        this.player.destroy();
        this.player = undefined;
        this.messages = undefined;
        super.destroy(fromScene);
    }

    setDisplayTime(time) {
        this.displayTime = time;
        return this;
    }

    setTransitOutTime(time) {
        this.transitOutTime = time;
        return this;
    }

    setTransitInTime(time) {
        this.transitInTime = time;
        return this;
    }

    setTransitInCallback(callback) {
        if (typeof (callback) === 'string') {
            callback = Const[callback];
        }

        switch (callback) {
            case Const.popUp:
                callback = DefaultTransitCallbacks.popUp;
                break;
            case Const.fadeIn:
                callback = DefaultTransitCallbacks.fadeIn;
                break;
        }

        this.transitInCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    }

    setTransitOutCallback(callback) {
        if (typeof (callback) === 'string') {
            callback = Const[callback];
        }

        switch (callback) {
            case Const.scaleDown:
                callback = DefaultTransitCallbacks.scaleDown;
                break;
            case Const.fadeOut:
                callback = DefaultTransitCallbacks.fadeOut;
                break;
        }

        this.transitOutCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    }

    show(callback) {
        if (callback === undefined) {
            // Try pop up a pendding message
            if (this.messages.length === 0) {
                return this;
            }
            callback = this.messages.shift();
        }

        if (this.player.isPlaying) {
            // Pend message
            this.messages.push(callback);
            return this;
        }

        // Recover to initial state
        this
            .setScale(1, 1)
            .setVisible(true);
        if (typeof (callback) === 'string') {
            this.setText(callback);
        } else {
            callback(this);
        }
        this.layout();

        var commands = [
            [ // Transit-in
                0, // time
                [this.transitInCallback, this, this.transitInTime] // [callback, param, ...]
            ],
            [ // Hold
                this.transitInTime,
                [NOOP]
            ],
            [ // Transit-out
                this.displayTime,
                [this.transitOutCallback, this, this.transitOutTime]
            ],
            [ // End
                this.transitOutTime,
                [this.setVisible, false]
            ],
            [ // Complete - show next message
                30, // Add a small delay before complete
                [NOOP]
            ]
        ]
        this.player
            .load(commands, this)
            .once('complete', function () {
                this.show();
            }, this)
            .start();

        return this;
    }
}

export default Toast;