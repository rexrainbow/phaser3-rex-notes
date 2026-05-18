import { GetAllChildrenCallback } from './Callbacks';

var Updater = {
    start(query?: any) {
        query.on('value', GetAllChildrenCallback, this);
        return this;
    },
    stop() {
        this.query.off('value', GetAllChildrenCallback, this);
        return this;
    }
}

export default Updater;