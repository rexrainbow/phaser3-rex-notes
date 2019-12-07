import firebase from 'firebase/app';

class ObjectFactory {
    constructor() {
        this.app = undefined;
    }

    initializeApp(config) {
        if (this.app === undefined) {
            this.app = firebase.initializeApp(config);
        }
        return this;
    }

    static register(type, callback) {
        ObjectFactory.prototype[type] = callback;
    }
};

export default ObjectFactory;