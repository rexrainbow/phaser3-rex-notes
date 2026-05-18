import Input from './Input';

var SetInteractive = function(config?: any) {
    // Input
    if (!this.input) {
        this.input = new Input(this, config);
    } else {
        var enable = (config === false) ? false : true;
        this.input.setEnable(enable);
    }

    return this;
};

export default SetInteractive;