import NOOP from '../../../../plugins/utils/object/NOOP.js';

export default {
    showMessage(message) {
        // Remember first scaleX, scaleY as initial scale
        if (this.scaleX0 === undefined) {
            this.scaleX0 = this.scaleX;
        }
        if (this.scaleY0 === undefined) {
            this.scaleY0 = this.scaleY;
        }

        if (message === undefined) {
            // Try pop up a pendding message
            if (this.messages.length === 0) {
                return this;
            }
            message = this.messages.shift();
        }

        if (this.player.isPlaying) {
            // Pend message
            this.messages.push(message);
            return this;
        }

        // Recover to initial state
        this
            .setScale(this.scaleX0, this.scaleY0)
            .setVisible(true);
        if (typeof (message) === 'string') {
            this.setText(message);
        } else {
            message(this);
        }
        this.layout();

        var commands = [
            [ // Transit-in
                0, // time
                [this.transitInCallback, this, this.transitInTime] // [callback, param, ...]
            ],
            [  // Transit-in event
                0, // time
                [this.emit, 'transitin', this, this.transitInTime] // [callback, param, ...]
            ],
            [ // Hold
                this.transitInTime,
                [NOOP]
            ],
            [ // Transit-out
                this.displayTime,
                [this.transitOutCallback, this, this.transitOutTime]
            ], // Transit-out event
            [
                0, // time
                [this.emit, 'transitout', this, this.transitOutTime] // [callback, param, ...]
            ],
            [ // End
                this.transitOutTime,
                [this.setVisible, false]
            ],
            [ // Complete - show next message
                30, // Add a small delay before complete
                [NOOP]
            ]
        ];

        this.player
            .load(commands, this)
            .once('complete', function () {
                this.showMessage();
            }, this)
            .start();

        return this;
    },

    removeAllMessages() {
        this.messages.length = 0;
        return this;
    }
}