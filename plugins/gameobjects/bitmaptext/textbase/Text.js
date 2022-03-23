import Render from './render/Render.js';
import Methods from './methods/Methods.js';

const GameObject = Phaser.GameObjects.GameObject;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class Text extends GameObject {
    constructor(scene, x, y, font, text, config, type, parser) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            font = GetValue(config, 'font', '');
            text = GetValue(config, 'text', '');
        }

        super(scene, type);

        this.setFont(font);

        this._fontSize = this.fontData.size;

        this._letterSpacing = 0;

        this._bounds = GetBitmapTextSize();

        this._dirty = true;

        this._maxWidth = 0;

        this.wordWrapCharCode = 32;

        this._text = '';

        this.setTexture(entry.texture, entry.frame);
        this.setPosition(x, y);
        this.setOrigin(0, 0);
        this.initPipeline();

        this.setText(text);
    }
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Text,
    [
        Components.Alpha,
        Components.BlendMode,
        Components.Depth,
        Components.Mask,
        Components.Origin,
        Components.Pipeline,
        Components.ScrollFactor,
        Components.Texture,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        Render,

        Methods
    ]
);


export default Text;