var GetGLtexture = function (gameObject) {
    if (gameObject.frame) {
        return gameObject.frame.glTexture;
    } else {
        return gameObject.glTexture;
    }
}

export default GetGLtexture;