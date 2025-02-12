const GameObject = Phaser.GameObjects.GameObject;

class Image extends GameObject {
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Image,
    [
        Components.AlphaSingle,
        Components.BlendMode,
        Components.Depth,
        Components.Flip,
        Components.Mask,
        Components.Origin,
        Components.RenderNodes,
        Components.Size,
        Components.Texture,
        Components.Transform,
        Components.Visible,
        Components.ScrollFactor,
    ]
);

export default Image;