import Container from '../../plugins/gameobjects/containerlite/ContainerLite.js';
import GetBitmapList from './GetBitmapList.js';
import CreateParticles from './CreateParticles.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class FizzyText extends Container {
    constructor(scene, x, y, text, config) {
        super(scene, x, y);

        this.textObject = scene.add.text(x, y, text, GetValue(config, 'style'))
            .setOrigin(0.5)
            .setVisible(false);
        this.textBitmapList = GetBitmapList(this.textObject);
        this.particles = CreateParticles(this, config).setPosition(x, y);

        this.add(this.textObject);
        this.add(this.particles);
    }

    get text() {
        return this.textObject.text;
    }

    set text(value) {
        this.textObject.setText(text);
        this.textBitmapList.length = 0;
        GetBitmapList(this.textObject, this.textBitmapList);
    }

    setText(text) {
        this.text = text;
        return this;
    }

    showText(color, strokeColor, strokThickness) {
        this.textObject.setFill(color);
        this.textObject.setStroke(strokeColor, strokThickness);
        this.setChildVisible(this.textObject, true);
        return this;
    }

    hideText() {
        this.setChildVisible(this.textObject, false);
        return this;
    }
}

export default FizzyText;