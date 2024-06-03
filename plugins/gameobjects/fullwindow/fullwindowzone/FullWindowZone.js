import FullWindow from '../../../behaviors/fullwindow/FullWindow.js';

const Zone = Phaser.GameObjects.Zone;

class FullWindowRectangle extends Zone {
    constructor(scene) {
        super(scene, 0, 0, 2, 2);

        this.fullWindow = new FullWindow(this);
    }
}

export default FullWindowRectangle;