// copy from Phaser.GameObjects.Text

import Phaser from 'phaser';
import GameObject from './../utils/system/GameObject.js';  // TODO:

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