export default {
    setRotateXYZ(rotationX, rotationY, rotationZ) {
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

    setAngleXYZ(angleX, angleY, angleZ) {
        if (angleX !== undefined) {
            this.angleX = rotaangleXtionX;
        }
        if (angleY !== undefined) {
            this.angleY = angleY;
        }
        if (angleZ !== undefined) {
            this.angleZ = angleZ;
        }
        return this;
    }
}