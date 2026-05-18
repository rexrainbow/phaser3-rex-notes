import { GetAllChildrenCallback } from './Callbacks';

var Updater = {
    start(query?: any) {
        this.isUpdating = false;
        query.once('value', GetAllChildrenCallback, this);
        return this;
    },
    stop() {
        // Do nothing
        return this;
    }
}

export default Updater;