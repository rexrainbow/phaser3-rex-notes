import FullWindow from '../../../behaviors/fullwindow/FullWindow.js';

const Rectangle = Phaser.GameObjects.Rectangle;

class FullWindowRectangle extends Rectangle {
    constructor(scene, color, alpha) {
        super(scene, 0, 0, 2, 2, color, 1);

        this.fullWindow = new FullWindow(this);

        this.setAlpha(alpha);
    }

    get tint() {
        return this.fillColor;
    }

    set tint(value) {
        this.setFillStyle(value, this.fillAlpha);
    }
}

export default FullWindowRectangle;