import Render from './render/Render.js';

const GameObject = Phaser.GameObjects.GameObject;

class TextBase extends GameObject {
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(TextBase,
    [
        Components.Alpha,
        Components.BlendMode,
        Components.ComputedSize,
        Components.Crop,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Mask,
        Components.Origin,
        Components.Pipeline,
        Components.ScrollFactor,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        Render
    ]
);
export default TextBase;