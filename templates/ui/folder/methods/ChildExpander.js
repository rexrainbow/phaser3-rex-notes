import OpenCloseTransition from '../../../../plugins/behaviors/openclosetransition/OpenCloseTransition.js';

class Expander extends OpenCloseTransition {
    constructor(gameObject, config) {
        if (config === undefined) {
            config = {};
        }
        config.destroy = false;
        config.opened = true;

        super(gameObject, config);
    }

    onOpen() {
        this.emit('open', this.parent, this);
        super.onOpen();
    }

    onClose() {
        this.emit('close', this.parent, this);
        super.onClose();
    }

}

export default Expander;