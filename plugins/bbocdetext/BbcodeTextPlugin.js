import CanvasTextKlass from './../utils/text/CanvasText.js';

class BBCodeText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style);
        this.canvasText = new CanvasTextKlass();
    }

    getRawText(text) {
        return this.canvasText.getRawText(text);
    }
    getSubText(start, end, text) {
        return this.canvasText.getSubText(start, end, text);
    }
    copyPensManager(PensManager) {
        return this.canvasText.copyPensManager(PensManager);
    }
}

export default BBCodeText;