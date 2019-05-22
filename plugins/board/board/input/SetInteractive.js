import Input from './Input.js';

var SetInteractive = function (enable) {
    if (enable === undefined) {
        enable = true;
    }

    // Input
    if (!this.input) {
        this.input = new Input(this);
    }
    this.input.setEnable(enable);

    return this;
};

export default SetInteractive;