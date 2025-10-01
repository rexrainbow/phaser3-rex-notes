import ELKLayout from '../../layout/elkjs/Layout.js';
import DagreLayout from '../../layout/dagre/Layout.js';

export default {
    elkLayout(config) {
        ELKLayout(this, config);
        return this;
    },

    async elkLayoutPromise(config) {
        return ELKLayout(this, config);
    },

    dagreLayout(config) {
        DagreLayout(this, config);
        return this;
    }
}