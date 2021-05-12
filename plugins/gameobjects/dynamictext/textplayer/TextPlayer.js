import DynamicText from '../dynamictext/DynamicText.js';
import GetParser from './parser/GetParser.js';
import TypeWriter from './typewriter/TypeWriter.js';
import Methods from './methods/Methods.js';
import IsSceneObject from '../../../utils/system/IsSceneObject.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class TextPlayer extends DynamicText {
    constructor(scene, x, y, fixedWidth, fixedHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
        } else if (IsPlainObject(fixedWidth)) {
            config = fixedWidth;
        }
        if (config === undefined) {
            config = {};
        }

        // Don't set text in DynamicText's constructor
        var content = config.text;
        delete config.text;

        super(scene, x, y, fixedWidth, fixedHeight, config);
        this.type = 'rexBBCodeDynamicText'
        this.parser = GetParser(this, config);
        this.typeWriter = new TypeWriter(this, GetValue(config, 'typing', undefined));
        this.setClickTarget(GetValue(config, 'clickTarget', this));
        this.isPlaying = false;

        if (content) {
            this.play(content);
        }
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        this.parser.destroy();
        this.parser = undefined;

        this.typeWriter.destroy();
        this.typeWriter = undefined;

        this.clickEE = undefined;

        super.destroy(fromScene);
    }

    setClickTarget(target) {
        if (IsSceneObject(target)) {
            this.clickEE = target.input;
        } else {  // Assume that target is a game object
            this.clickEE = target.setInteractive();
        }
        return this;
    }
}

Object.assign(
    TextPlayer.prototype,
    Methods
);

export default TextPlayer;