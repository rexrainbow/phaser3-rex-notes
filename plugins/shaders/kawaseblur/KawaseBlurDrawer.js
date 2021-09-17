import Drawer from '../utils/Drawer.js';

class KawaseBlurDrawer extends Drawer {
    draw(startFrame, returnLastFrame) {
        var self = this.postFXPipeline;
        var currentShader = this.shader;

        var sourceFrame = startFrame;
        var targetFrame = this.getAnotherFrame(sourceFrame);
        var returnFrame;

        var uvX = self.pixelWidth / self.renderer.width;
        var uvY = self.pixelHeight / self.renderer.height;
        var offset, uOffsetX, uOffsetY;
        for (var i = 0, last = self._quality - 1; i <= last; i++) {
            // Set uniforms
            offset = self._kernels[i] + 0.5;
            uOffsetX = offset * uvX;
            uOffsetY = offset * uvY;
            self.set2f('uOffset', uOffsetX, uOffsetY, currentShader);
            // Bind and draw
            if (i < last) {
                self.bindAndDraw(sourceFrame, targetFrame, true, true, currentShader);
                sourceFrame = targetFrame;
                targetFrame = this.getAnotherFrame(sourceFrame);
            } else { // Last step
                if (returnLastFrame) {
                    self.bindAndDraw(sourceFrame, targetFrame, true, true, currentShader);
                    returnFrame = targetFrame;
                } else {
                    self.bindAndDraw(sourceFrame, null, true, true, currentShader);
                }
            }
        }

        return returnFrame;
    }
}

export default KawaseBlurDrawer;