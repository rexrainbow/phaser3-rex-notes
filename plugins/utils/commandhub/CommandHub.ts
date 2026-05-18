import ComponentBase from '../componentbase/ComponentBase';

class CommandHub extends ComponentBase {
    hasOwnProperty: any;

    addCommand(name?: any, callback?: any, scope?: any) {
        if (this.hasOwnProperty(name)) {
            console.warn(`Command '${name}' has been added`);
        }
        this[name] = callback.bind(scope);
        return this;
    }

    runCommand(name?: any, ...args) {
        if (!this.hasOwnProperty(name)) {
            return;
        }
        return this[name].apply(null, args);
    }

    addProperty(name?: any, value?: any) {
        if (this.hasOwnProperty(name)) {
            console.warn(`Property '${name}' has been added`);
        }
        this[name] = value;
        return this;
    }

    getProperty(name?: any, defaultValue?: any) {
        if (!this.hasOwnProperty(name)) {
            return defaultValue;
        }
        return this[name];
    }

}

export default CommandHub;