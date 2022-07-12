import OverlapSizer from '../overlapsizer/OverlapSizer.js';
import CreatePerspectiveCardMesh from './CreatePerspectiveCardMesh.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class PerspectiveCard extends OverlapSizer {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexPerspectiveCard';

        // Layout faces
        var backFace = config.back;
        var backFaceExpand = GetValue(config, 'expand.back', true);
        this.add(
            backFace,
            { key: 'back', expand: backFaceExpand }
        );

        var frontFace = config.front;
        var frontFaceExpand = GetValue(config, 'expand.front', true);
        this.add(
            frontFace,
            { key: 'front', expand: frontFaceExpand }
        );

        this.layout();

        // Add PerspectiveCardMesh
        this.cardMesh = CreatePerspectiveCardMesh(this, config);

        var isFrontFace = (this.face === 0);
        this.setChildVisible(frontFace, isFrontFace);
        this.setChildVisible(backFace, !isFrontFace);
    }

    get flip() {
        return this.cardMesh.flip;
    }

    get face() {
        return this.cardMesh.face;
    }

    set face(index) {
        // Can't set face during flipping
        if (this.flip.isRunning) {
            return;
        }
        this.cardMesh.face = index;

        var isFrontFace = (index === 0);
        var frontFace = this.childrenMap.front;
        var backFace = this.childrenMap.back;
        this.setChildVisible(frontFace, isFrontFace);
        this.setChildVisible(backFace, !isFrontFace);
    }

    setFace(face) {
        this.face = face;
        return this;
    }

    toggleFace() {
        var newFace = (this.face === 0) ? 1 : 0;
        this.setFace(newFace);
        return this;
    }
}

export default PerspectiveCard;