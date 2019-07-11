import Label from '../label/Label.js';
import Const from './Const.js';
import PopUpCallback from './PopUpCallback.js';
import ScaleDownCallback from './ScaleDownCallback.js';
import FadeInCallback from './FadeInCallback.js';
import FadeOutCallback from './FadeOutCallback.js';
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

        this.setDisplayTime(GetValue(config, 'displayTime', 1000));
        this.setTransitInTime(GetValue(config, 'transitInTime', 250));
        this.setTransitOutTime(GetValue(config, 'transitOutTime', 250));
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
                callback = PopUpCallback;
                break;
            case Const.fadeIn:
                callback = FadeInCallback;
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
                callback = ScaleDownCallback;
                break;
            case Const.fadeOut:
                callback = FadeOutCallback;
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
            .setScale(1)
            .setVisible(true);
        if (typeof (callback) === 'string') {
            this.setText(callback);
        } else {
            callback(this);
        }
        this.layout();

        var commands = [
            [
                0, // time
                [this.transitInCallback, this, this.transitInTime] // [callback, param, ...]
            ],
            [
                this.transitInTime + this.displayTime,
                [this.transitOutCallback, this, this.transitOutTime]
            ],
            [
                this.transitOutTime,
                [this.setVisible, false]
            ],
            [
                10, // Add a small delay before complete
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