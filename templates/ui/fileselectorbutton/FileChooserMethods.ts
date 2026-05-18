export default {
    setAccept(accept?: any) {
        this.childrenMap.fileChooser.setAccept(accept);
        return this;
    },

    setMultiple(enabled?: any) {
        this.childrenMap.fileChooser.setMultiple(enabled);
        return this;
    },

    loadFile(file?: any, loaderType?: any, key?: any, cacheType?: any, onComplete?: any) {
        this.childrenMap.fileChooser.loadFile(file, loaderType, key, cacheType, onComplete);
        return this;
    },

    loadFilePromise(file?: any, loaderType?: any, key?: any, cacheType?: any) {
        return this.childrenMap.fileChooser.loadFilePromise(file, loaderType, key, cacheType);
    }

}