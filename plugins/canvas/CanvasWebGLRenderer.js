// copy from Phaser.GameObjects.Text

import Phaser from 'phaser';
const GameObject = Phaser.GameObjects.GameObject;

var WebGLRenderer = function (renderer, src, interpolationPercentage, camera)
{
    if (GameObject.RENDER_MASK !== src.renderFlags || (src.cameraFilter > 0 && (src.cameraFilter & camera._id)))
    {
        return;
    }
    
    if (src.dirty)
    {
        src.canvasTexture = renderer.canvasToTexture(src.canvas, src.canvasTexture, true, src.scaleMode);
        src.dirty = false;
    }

    this.pipeline.batchText(this, camera);
};

export default WebGLRenderer;