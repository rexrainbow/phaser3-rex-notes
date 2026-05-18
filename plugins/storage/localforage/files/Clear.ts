import ClearObj from '../../../utils/object/Clear';

var Clear = function() {
    ClearObj(this.cacheHeaders);
    return this.store.clear();
}

export default Clear;