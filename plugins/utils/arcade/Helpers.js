var Proxy = {
    cascadeMode: false,
    setParent: function(gameObject) {
        this.gameObject = gameObject;
        this.scene = gameObject.scene;
        return this;
    },
    setCascadeMode: function (m) {
        this.cascadeMode = m;
        return this;
    },

    // internal
    bodySetVelocity(newVx, newVy) {
        var body = this.gameObject.body;
        var oldVx = body.velocity.x;
        var oldVy = body.velocity.y;
        if (this.cascaseMode) {
            newVx += oldVx;
            newVy += oldVy;
        }
        if ((newVx !== oldVx) || (newVy !== oldVy)) {
            body.setVelocity(newVx, newVy);
        }
    },
    bodySetAcceleration(newAx, newAy) {
        var body = this.gameObject.body;
        var oldAx = body.acceleration.x;
        var oldAy = body.acceleration.y;
        if (this.cascaseMode) {
            newAx += oldAx;
            newAy += oldAy;
        }
        if ((newAx !== oldAx) || (newAy !== oldAy)) {
            body.setAcceleration(newAx, newAy);
        }
    },
    bodySetGravity(newGx, newGy) {
        var body = this.gameObject.body;
        var oldGx = body.gravity.x;
        var oldGy = body.gravity.y;
        if (this.cascaseMode) {
            newGx += oldGx;
            newGy += oldGy;
        }
        if ((newGx !== oldGx) || (newGy !== oldGy)) {
            body.setAcceleration(newGx, newGy);
        }
    },
    bodySetAngularVelocity(newAV) {
        var body = this.gameObject.body;
        var oldAV = body.angularVelocity;
        if (this.cascaseMode) {
            newAV += oldAV;
        }
        if (newAV !== oldAV) {
            body.setAngularVelocity(newAV);
        }
    },
    bodySetAngularAcceleration(newAA) {
        var body = this.gameObject.body;
        var oldAA = body.angularAcceleration;
        if (this.cascaseMode) {
            newAA += oldAA;
        }
        if (newAA !== oldAA) {
            body.setAngularAcceleration(newAA);
        }
    },
};

export default Proxy;