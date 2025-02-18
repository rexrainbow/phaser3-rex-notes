export default {
    /*
    this.rotationX, this.rotationY, this.rotationZ,
    this.angleX, this.angleY, this.angleZ
    */ 
    setRotationXYZ(rotationX, rotationY, rotationZ) {
        if (rotationX !== undefined) {
            this.rotationX = rotationX;
        }
        if (rotationY !== undefined) {
            this.rotationY = rotationY;
        }
        if (rotationZ !== undefined) {
            this.rotationZ = rotationZ;
        }
        return this;
    },

    setRotationX(rotationX) {
        this.rotationX = rotationX;
        return this;
    },

    setRotationY(rotationY) {
        this.rotationY = rotationY;
        return this;
    },

    setRotationZ(rotationZ) {
        this.rotationZ = rotationZ;
        return this;
    },

    setAngleXYZ(angleX, angleY, angleZ) {
        if (angleX !== undefined) {
            this.angleX = angleX;
        }
        if (angleY !== undefined) {
            this.angleY = angleY;
        }
        if (angleZ !== undefined) {
            this.angleZ = angleZ;
        }
        return this;
    },

    setAngleX(angleX) {
        this.angleX = angleX;
        return this;
    },

    setAngleXY(angleY) {
        this.angleY = angleY;
        return this;
    },

    setAngleXZ(angleZ) {
        this.angleZ = angleZ;
        return this;
    },
}