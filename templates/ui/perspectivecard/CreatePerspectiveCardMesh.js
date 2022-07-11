import { PerspectiveCard } from '../../../plugins/perspectiveimage.js';
import Clone from '../../../plugins/utils/object/Clone.js';

var CreatePerspectiveCardMesh = function (parent, config) {
    var scene = parent.scene;

    config = Clone(config);
    var front = config.front;
    config.front = { width: front.width, height: front.height };
    var back = config.back;
    config.back = { width: back.width, height: back.height };
    delete config.width;
    delete config.height;

    var card = new PerspectiveCard(scene, config);
    card.setVisible(false);
    scene.add.existing(card);
    parent.pin(card);

    card.flip
        .on('start', function () {
            parent.setChildVisible(card, true);

            var frontFace = parent.childrenMap.front;
            var backFace = parent.childrenMap.back;
            SnapshotFace(card.frontFace, frontFace);
            SnapshotFace(card.backFace, backFace);
            parent.setChildVisible(frontFace, false);
            parent.setChildVisible(backFace, false);
        })
        .on('complete', function () {
            parent.setChildVisible(card, false);

            var isFrontFace = (card.face === 0);
            var frontFace = parent.childrenMap.front;
            var backFace = parent.childrenMap.back;
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