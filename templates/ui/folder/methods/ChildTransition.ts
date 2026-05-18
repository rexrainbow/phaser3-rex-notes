import OpenCloseTransition from '../../../../plugins/behaviors/openclosetransition/OpenCloseTransition';

class Transition extends OpenCloseTransition {
    emit: any;
    parent: any;

    constructor(gameObject?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        config.destroy = false;
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

export default Transition;