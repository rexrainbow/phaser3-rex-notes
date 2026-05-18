import OverlapSizer from '../overlapsizer/OverlapSizer';
import CreatePerspectiveCardMesh from './CreatePerspectiveCardMesh';
import PerspectiveMethods from './PerspectiveMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class PerspectiveCard extends OverlapSizer {
    add: any;
    childrenMap: any;
    enterPerspectiveMode: any;
    exitPerspectiveMode: any;
    perspectiveCard: any;
    pin: any;
    setChildVisible: any;
    type: any;

    constructor(scene?: any, config?: any) {
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
        this.perspectiveCard = CreatePerspectiveCardMesh.call(this, config);
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
        if (this.flip && this.flip.isRunning) {
            return;
        }
        this.perspectiveCard.face = index;

        var isFrontFace = (index === 0);
        var frontFace = this.childrenMap.front;
        var backFace = this.childrenMap.back;
        this.setChildVisible(frontFace, isFrontFace);
        this.setChildVisible(backFace, !isFrontFace);
    }

    setFace(face?: any) {
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

    get angleX() {
        return this.perspectiveCard.angleX;
    }

    set angleX(value) {
        this.enterPerspectiveMode();
        this.perspectiveCard.angleX = value;
    }

    get rotationY() {
        return this.perspectiveCard.rotationY;
    }

    set rotationY(value) {
        this.enterPerspectiveMode();
        this.perspectiveCard.rotationY = value;
    }

    get angleY() {
        return this.perspectiveCard.angleY;
    }

    set angleY(value) {
        this.enterPerspectiveMode();
        this.perspectiveCard.angleY = value;
    }

    get rotationZ() {
        return this.perspectiveCard.rotationZ;
    }

    set rotationZ(value) {
        this.enterPerspectiveMode();
        this.perspectiveCard.rotationZ = value;
    }

    get angleZ() {
        return this.perspectiveCard.angleZ;
    }

    set angleZ(value) {
        this.enterPerspectiveMode();
        this.perspectiveCard.angleZ = value;
    }

    panX(v?: any) {
        this.enterPerspectiveMode();
        this.perspectiveCard.panX(v);
        return this;
    }

    panY(v?: any) {
        this.enterPerspectiveMode();
        this.perspectiveCard.panY(v);
        return this;
    }

    panZ(v?: any) {
        this.enterPerspectiveMode();
        this.perspectiveCard.panZ(v);
        return this;
    }

    transformVerts(x?: any, y?: any, z?: any, rotateX?: any, rotateY?: any, rotateZ?: any) {
        this.enterPerspectiveMode();
        this.perspectiveCard.transformVerts(x, y, z, rotateX, rotateY, rotateZ);
        return this;
    }

    forEachFace(callback?: any, scope?: any, ignoreInvalid?: any) {
        this.enterPerspectiveMode();
        this.perspectiveCard.forEachFace(callback, scope, ignoreInvalid);
        return this;
    }
}

Object.assign(
    PerspectiveCard.prototype,
    PerspectiveMethods
)

export default PerspectiveCard;