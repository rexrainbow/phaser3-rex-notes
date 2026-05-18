import FullWindow from '../../../behaviors/fullwindow/FullWindow';

import { GameObjects as PhaserGameObjects } from 'phaser';
const Rectangle = PhaserGameObjects.Rectangle;

class FullWindowRectangle extends Rectangle {
    fillAlpha: any;
    fillColor: any;
    fullWindow: any;
    setAlpha: any;
    setFillStyle: any;

    constructor(scene?: any, color?: any, alpha?: any) {
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