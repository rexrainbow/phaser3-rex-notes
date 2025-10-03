import ELKLayout from '../../layout/elkjs/Layout.js';
import DagreLayout from '../../layout/dagre/Layout.js';

export default {
    elkLayout(config) {
        this.graphOffsetX = 0;
        this.graphOffsetY = 0;
        ELKLayout(this, config);
        return this;
    },

    async elkLayoutPromise(config) {
        this.graphOffsetX = 0;
        this.graphOffsetY = 0;
        return ELKLayout(this, config);
    },

    dagreLayout(config) {
        this.graphOffsetX = 0;
        this.graphOffsetY = 0;
        DagreLayout(this, config);
        return this;
    }
}