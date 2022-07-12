var SetCardMeshVisible = function (visible) {
    if (visible === undefined) {
        visible = true;
    }

    var cardMesh = this.cardMesh;
    if (visible) {
        // Set card's visible to true
        this.setChildVisible(cardMesh, true);
        // Snapshot front and back children to card's faces
        var frontFace = this.childrenMap.front;
        var backFace = this.childrenMap.back;
        SnapshotFace(cardMesh.frontFace, frontFace);
        SnapshotFace(cardMesh.backFace, backFace);
        // Set front and back children's visible to false
        this.setChildVisible(frontFace, false);
        this.setChildVisible(backFace, false);
        // Reset size of card
        this.cardMesh.setSize(
            Math.max(frontFace.width, backFace.width),
            Math.max(frontFace.height, backFace.height)
        );
    } else {
        // Set card's visible to false
        this.setChildVisible(cardMesh, false);
        // Set front or back children's visible to true, according to card's face            
        var frontFace = this.childrenMap.front;
        var backFace = this.childrenMap.back;
        var isFrontFace = (cardMesh.face === 0);
        this.setChildVisible(frontFace, isFrontFace);
        this.setChildVisible(backFace, !isFrontFace);
    }

    return this;
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

export default SetCardMeshVisible;