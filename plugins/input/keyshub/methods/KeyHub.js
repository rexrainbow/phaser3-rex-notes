import KeyMap from '../../../utils/input/KeyMap.js';

const Key = Phaser.Input.Keyboard.Key;
const AddItem = Phaser.Utils.Array.Add;
const RemoveItem = Phaser.Utils.Array.Remove;

class KeyHub extends Key {
    constructor(parent, keyCode) {
        super(parent, keyCode);

        this.ports = [];
    }

    destroy() {
        this.unplugAllKeyObject();
        this.ports = undefined;
        super.destroy();
    }

    plugKeyObject(keyObject) {
        if (keyObject.refKeyHub) {
            keyObject.refKeyHub.unplugKeyObject(keyObject);
        }

        AddItem(this.ports, keyObject, 0, function (keyObject) {
            keyObject
                .on('down', this.update, this)
                .on('up', this.update, this)

            keyObject.refKeyHub = this;

            this.update(FakeEvent);

            this.plugin.emit('plug', this.key, keyObject);
        }, this);

        return this;
    }

    unplugKeyObject(keyObject) {
        if (keyObject.refKeyHub !== this) {
            return this;
        }

        RemoveItem(this.ports, keyObject, function (keyObject) {
            keyObject
                .off('down', this.update, this)
                .off('up', this.update, this)

            keyObject.refKeyHub = undefined;

            this.update(FakeEvent);

            this.plugin.emit('unplug', this.key, keyObject);
        }, this);

        return this;
    }

    unplugAllKeyObject() {
        for (var i = 0, cnt = this.ports; i < cnt; i++) {
            var keyObject = this.ports[i];
            keyObject
                .off('down', this.update, this)
                .off('up', this.update, this)

            keyObject.refKeyHub = undefined;
        }

        this.ports.length = 0;

        this.update(FakeEvent);

        return this;
    }

    getKeyObjects() {
        return this.ports;
    }

    update(event) {
        //  Override the default functions (it's too late for the browser to use them anyway, so we may as well)
        if (event.cancelled === undefined) {
            //  Event allowed to flow across all handlers in this Scene, and any other Scene in the Scene list
            event.cancelled = 0;

            //  Won't reach any more local (Scene level) handlers
            event.stopImmediatePropagation = function () {
                event.cancelled = 1;
            };

            //  Won't reach any more handlers in any Scene further down the Scene list
            event.stopPropagation = function () {
                event.cancelled = -1;
            };
        }

        if (event.cancelled === -1) {
            //  This event has been stopped from broadcasting to any other Scene, so abort.
            event.cancelled = 0;
            return;
        }

        var isDown = false;
        for (var i = 0, cnt = this.ports.length; i < cnt; i++) {
            if (this.ports[i].isDown) {
                isDown = true;
                break;
            }
        }

        if (this.isDown !== isDown) {
            event = FakeEvent;
            event.timeStamp = Date.now();
            event.keyCode = this.keyCode;

            if (isDown) {
                this.onDown(event);
            } else {
                this.onUp(event);
            }

            if (!event.cancelled) {
                var eventName = ((isDown) ? 'keydown-' : 'keyup-') + KeyMap[this.keyCode];
                this.plugin.emit(eventName, event);
            }

            if (!event.cancelled) {
                var eventName = (isDown) ? 'keydown' : 'keyup';
                this.plugin.emit(eventName, event);
            }
        }

        event.cancelled = 0;
    }
}

var FakeEvent = {
    timeStamp: 0,
    keyCode: 0,
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    metaKey: false,
    location: 0,
};

export default KeyHub;