import Container from '../../plugins/gameobjects/containerlite/ContainerLite.js';
import TextZone from '../../plugins/geom/textzone/TextZone.js';
import CreateParticles from './CreateParticles.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class FizzyText extends Container {
    constructor(scene, x, y, text, config) {
        super(scene, x, y);

        this.textObject = scene.add.text(x, y, text, GetValue(config, 'textStyle'))
            .setOrigin(0.5)
            .setVisible(false)
        this.textObject.textZone = new TextZone(this.textObject);

        var particlesConfig = GetValue(config, 'particles');
        particlesConfig.source = this.textObject.textZone;
        this.particles = CreateParticles(this, particlesConfig).setPosition(x, y);

        this.add(this.textObject);
        this.add(this.particles);
    }

    get text() {
        return this.textObject.text;
    }

    set text(value) {
        this.textObject.setText(value);
        this.textObject.textZone.setTextObject(this.textObject);
    }

    setText(value) {
        this.text = value;
        return this;
    }

    showText(color, strokeColor, strokThickness) {
        if (arguments.length === 0) {
            this.setChildVisible(this.textObject, false);
        } else {
            this.textObject.setFill(color);
            this.textObject.setStroke(strokeColor, strokThickness);
            this.setChildVisible(this.textObject, true);
        }
        return this;
    }

    hideText() {
        this.showText();
        return this;
    }
}

export default FizzyText;