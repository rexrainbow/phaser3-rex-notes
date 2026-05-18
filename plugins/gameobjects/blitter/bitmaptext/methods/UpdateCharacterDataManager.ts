var UpdateCharacterDataManager = function(text?: any, wrapMode?: any, wrapWidth?: any, lineHeight?: any, characterDataManager?: any) {
    if (characterDataManager === undefined) {
        characterDataManager = this.characterDataManager;
    }
    characterDataManager.clear();
    if (text === "") {
        return characterDataManager;
    }


}

export default UpdateCharacterDataManager;