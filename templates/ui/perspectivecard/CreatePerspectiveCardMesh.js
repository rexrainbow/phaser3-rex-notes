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
    card.setVisible(false);
    scene.add.existing(card);
    parent.pin(card);

    card.flip
        .on('start', function () {
            // Before flipping
            // Set card's visible to true
            parent.setChildVisible(card, true);
            // Snapshot front and back children to card's faces
            var frontFace = parent.childrenMap.front;
            var backFace = parent.childrenMap.back;
            SnapshotFace(card.frontFace, frontFace);
            SnapshotFace(card.backFace, backFace);
            // Set front and back children's visible to false
            parent.setChildVisible(frontFace, false);
            parent.setChildVisible(backFace, false);
            // Reset size of card
            card.setSize(
                Math.max(frontFace.width, backFace.width),
                Math.max(frontFace.height, backFace.height)
            );
        })
        .on('complete', function () {
            // After flipping
            // Set card's visible to false
            parent.setChildVisible(card, false);
            // Set front or back children's visible to true, according to card's face            
            var frontFace = parent.childrenMap.front;
            var backFace = parent.childrenMap.back;
            var isFrontFace = (card.face === 0);
            parent.setChildVisible(frontFace, isFrontFace);
            parent.setChildVisible(backFace, !isFrontFace);
        })

    return card;
}

var SnapshotFace = function (rt, face) {
    rt.rt.clear();

    face.visible = true;
    if (face.isRexContainerLite) {
        rt.snapshot(face.getAllVisibleChildren());
    } else {
        rt.snapshot(face);
    }
}

export default CreatePerspectiveCardMesh;