import OverlapSizer from '../overlapsizer/OverlapSizer.js';
import CreatePerspectiveCardMesh from './CreatePerspectiveCardMesh.js';
import PerspectiveModeMethods from './PerspectiveModeMethods.js';

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

        // Add PerspectiveCardMesh
        this.perspectiveCard = CreatePerspectiveCardMesh(this, config);
        this.pin(this.perspectiveCard);

        this.exitPerspectiveMode(false);
    }

    get flip() {
        return this.perspectiveCard.flip;
    }

    get face() {
        return this.perspectiveCard.face;
    }

    set face(index) {
        // Can't set face during flipping
        if (this.flip.isRunning) {
            return;
        }
        this.perspectiveCard.face = index;

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

    get isInPerspectiveMode() {
        return this.perspectiveCard.visible;
    }

    get rotationX() {
        return this.perspectiveCard.rotationX;
    }

    set rotationX(value) {
        this.enterPerspectiveMode();
        this.perspectiveCard.rotationX = value;
    }

    get rotationY() {
        return this.perspectiveCard.rotationY;
    }

    set rotationY(value) {
        this.enterPerspectiveMode();
        this.perspectiveCard.rotationY = value;
    }

    get rotationZ() {
        return this.perspectiveCard.rotationZ;
    }

    set rotationZ(value) {
        this.enterPerspectiveMode();
        this.perspectiveCard.rotationZ = value;
    }

}

Object.assign(
    PerspectiveCard.prototype,
    PerspectiveModeMethods
)

export default PerspectiveCard;