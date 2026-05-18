export default {
    /*
    this.rotationX, this.rotationY, this.rotationZ,
    this.angleX, this.angleY, this.angleZ
    */ 
    setRotationXYZ(rotationX?: any, rotationY?: any, rotationZ?: any) {
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

    setRotationX(rotationX?: any) {
        this.rotationX = rotationX;
        return this;
    },

    setRotationY(rotationY?: any) {
        this.rotationY = rotationY;
        return this;
    },

    setRotationZ(rotationZ?: any) {
        this.rotationZ = rotationZ;
        return this;
    },

    setAngleXYZ(angleX?: any, angleY?: any, angleZ?: any) {
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

    setAngleX(angleX?: any) {
        this.angleX = angleX;
        return this;
    },

    setAngleXY(angleY?: any) {
        this.angleY = angleY;
        return this;
    },

    setAngleXZ(angleZ?: any) {
        this.angleZ = angleZ;
        return this;
    },
}