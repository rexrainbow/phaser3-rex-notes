import ContainerLite from '../containerlite/ContainerLite.js';
const Container = ContainerLite;

class RepeatedList extends Container {
    constructor(scene, x, y, width, height, config) {
        if (config === undefined) {
            config = {};
        }
        super(scene, x, y, width, height);
        this.type = 'rexRepeatedList';
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        super.destroy(fromScene);
    }

    setScrollMode(mode) {
        if (typeof (mode) === 'string') {
            mode = SCROLLMODE[mode.toLowerCase()];
        }
        this.scrollMode = mode;
        return this;
    }
}

const SCROLLMODE = {
    v: 0,
    vertical: 0,
    h: 1,
    horizontal: 1
};

export default RepeatedList;