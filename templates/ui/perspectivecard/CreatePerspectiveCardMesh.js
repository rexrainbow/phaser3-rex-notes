import { PerspectiveCard } from '../../../plugins/perspectiveimage.js';
import Clone from '../../../plugins/utils/object/Clone.js';

var CreatePerspectiveCardMesh = function (parent, config) {
    var scene = parent.scene;

    config = Clone(config);
    // Remove size config
    delete config.width;
    delete config.height;
    // Initial size of render-texture is 1x1
    config.front = { width: 1, height: 1 };
    config.back = { width: 1, height: 1 };
    // Create PerspectiveCard as card-behavior
    var card = new PerspectiveCard(scene, config);
    scene.add.existing(card);

    card.flip
        .on('start', function () {
            // Before flipping
            parent.setCardMeshVisible(true);
        })
        .on('complete', function () {
            // After flipping
            parent.setCardMeshVisible(false);
        })

    return card;
}

export default CreatePerspectiveCardMesh;