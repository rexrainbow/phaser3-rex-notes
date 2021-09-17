import GetAnother from './GetAnother';

class Drawer {
    constructor(postFXPipeline, shader) {
        this.postFXPipeline = postFXPipeline;
        this.shader = shader;
    }

    getAnotherFrame(frame) {
        var self = this.postFXPipeline;
        return GetAnother(frame, self.fullFrame1, self.fullFrame2);
    }

    // Override
    draw(startFrame, returnLastFrame) {
        //var self = this.postFXPipeline;
        //var currentShader = this.shader;

        // var sourceFrame = startFrame;
        // var targetFrame = this.getAnotherFrame(sourceFrame);
        // var returnFrame;
    }


}

export default Drawer;