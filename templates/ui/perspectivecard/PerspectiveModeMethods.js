var SnapshotFace = function (rt, face) {
    rt.rt.clear();

    face.visible = true;
    if (face.isRexContainerLite) {
        rt.snapshot(face.getAllVisibleChildren());
    } else {
        rt.snapshot(face);
    }
}

export default {
    enterPerspectiveMode() {
        if (this.isInPerspectiveMode) {
            return this;
        }

        var perspectiveCard = this.perspectiveCard;
        // Set card's visible to true
        this.setChildVisible(perspectiveCard, true);
        // Snapshot front and back children to card's faces
        var frontFace = this.childrenMap.front;
        var backFace = this.childrenMap.back;
        SnapshotFace(perspectiveCard.frontFace, frontFace);
        SnapshotFace(perspectiveCard.backFace, backFace);
        // Set front and back children's visible to false
        this.setChildVisible(frontFace, false);
        this.setChildVisible(backFace, false);
        // Reset size of card
        this.perspectiveCard.setSize(
            Math.max(frontFace.width, backFace.width),
            Math.max(frontFace.height, backFace.height)
        );

        return this;
    },

    exitPerspectiveMode() {
        if (!this.isInPerspectiveMode) {
            return this;
        }

        var perspectiveCard = this.perspectiveCard;
        // Set card's visible to false
        this.setChildVisible(perspectiveCard, false);
        // Set front or back children's visible to true, according to card's face            
        var frontFace = this.childrenMap.front;
        var backFace = this.childrenMap.back;
        var isFrontFace = (perspectiveCard.face === 0);
        this.setChildVisible(frontFace, isFrontFace);
        this.setChildVisible(backFace, !isFrontFace);

        return this;
    }

}