import BasePostFxPipelineController from '../../utils/renderer/postfxpipeline/BasePostFxPipelineController.js';
import WarpPostFxPipeline from './WarpPostFxPipeline.js';

class WarpPostFxPipelineController extends BasePostFxPipelineController {
    createPipeline(game) {
        return new WarpPostFxPipeline(game);
    }
}

export default WarpPostFxPipelineController;