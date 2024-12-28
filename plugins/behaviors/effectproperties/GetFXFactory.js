var GetfilterList = function (gameObject) {
    if (gameObject.preFX) {
        return gameObject.preFX;
    }
    if (gameObject.postFX) {
        return gameObject.postFX;
    }
    return null;
}

export default GetfilterList;