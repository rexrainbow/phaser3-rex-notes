import EE from 'eventemitter3';

class EventEmitter extends EE {
    removeAllListeners: any;

    shutdown() {
        this.removeAllListeners();
    }
    destroy() {
        this.removeAllListeners();
    }
}
export default EventEmitter;