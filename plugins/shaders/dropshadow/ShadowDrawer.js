import Drawer from '../utils/Drawer';

class ShadowDrawer extends Drawer {
    draw(startFrame, returnLastFrame) {
        var self = this.postFXPipeline;
        var currentShader = this.shader;

        var sourceFrame = startFrame;
        var targetFrame = this.getAnotherFrame(sourceFrame);
        var returnFrame;

        // Set uniforms
        var offsetX = (self.distance / self.renderer.width) * Math.cos(self.rotation);
        var offsetY = (self.distance / self.renderer.height) * Math.sin(self.rotation)
        self.set2f('offset', offsetX, offsetY, currentShader);
        self.set3f('color', self._shadowColor.redGL, self._shadowColor.greenGL, self._shadowColor.blueGL, currentShader);
        self.set1f('alpha', self.alpha, currentShader);
        // Bind and draw
        if (returnLastFrame) {
            self.bindAndDraw(sourceFrame, targetFrame, true, true, currentShader);
            returnFrame = targetFrame;
        } else {
            self.bindAndDraw(sourceFrame, null, true, true, currentShader);
        }

        return returnFrame;
    }
}

export default ShadowDrawer;