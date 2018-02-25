// Modified from Phaser.Input.Keyboard.Key
class Key {
    constructor(config) {
        this.enabled = true;  // Can this Key be processed?
        this.isDown = false;  // The "down" state of the key. This will remain `true` for as long as the keyboard thinks this key is held down.
        this.isUp = true;     // The "up" state of the key. This will remain `true` for as long as the keyboard thinks this key is up.
        this.altKey = false;
        this.ctrlKey = false;
        this.shiftKey = false;
        this.location = 0;
        this.timeDown = 0;    // The unix-timestamp when the key was last pressed down.
        /**
         * The number of milliseconds this key has been held down for.
         * If the key is down this value holds the duration of that key press and is constantly updated.
         * If the key is up it holds the duration of the previous down session.
         */        
        this.duration = 0;
        this.timeUp = 0;      // The unix-timestamp when the key was last released.
        this.repeats = 0;     // If a key is held down this holds down the number of times the key has 'repeated'.
        this._justDown = false;  // see justDown getter
        this._justUp = false;    // see justUp getter
    }
}

export default Key;
