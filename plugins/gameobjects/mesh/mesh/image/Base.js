import { Class as PhaserClass, GameObjects as PhaserGameObjects } from 'phaser';
const GameObject = PhaserGameObjects.GameObject;

class Image extends GameObject {
}

const Components = PhaserGameObjects.Components;
PhaserClass.mixin(Image,
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