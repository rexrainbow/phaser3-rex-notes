class ObjectFactory {
    constructor() {
    }

    initializeApp(config?: any) {
        firebase.initializeApp(config);
        return this;
    }

    static register(type?: any, callback?: any) {
        ObjectFactory.prototype[type] = callback;
    }
};

export default ObjectFactory;