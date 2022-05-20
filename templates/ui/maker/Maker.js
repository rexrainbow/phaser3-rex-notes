import yaml from 'js-yaml';
import Make from './Make.js';

class Maker {
    constructor(scene, styles, customBuilders) {
        this.setScene(scene);
        this.setStyles(styles);
        this.setCustomBuilders(customBuilders);
    }

    setScene(scene) {
        this.scene = scene;
        return this;
    }

    setStyles(styles) {
        this.styles = ParseYAML(styles);
        return this;
    }

    addStyle(key, style) {
        if (this.styles === undefined) {
            this.styles = {};
        }
        this.styles[key] = ParseYAML(style);
        return this;
    }

    clearStyles() {
        this.setStyles();
        return this;
    }

    setCustomBuilders(customBuilders) {
        this.customBuilders = customBuilders;
        return this;
    }

    addCustomBuilder(type, customBuilder) {
        if (this.customBuilders === undefined) {
            this.customBuilders = {};
        }
        this.customBuilders[type] = customBuilder;
        return this;
    }

    clearCustomBuilder() {
        this.setCustomBuilders();
        return this;
    }

    make(config) {
        config = ParseYAML(config);
        // Parsing result of YAML config might be an array, 
        // Only last item will be used to create game object, others are references
        if (Array.isArray(config)) {
            config = config[config.length - 1];
        }

        return Make(this.scene, config, this.styles, this.customBuilders);
    }

}

var ParseYAML = function (s) {
    if (typeof (s) === 'string') {
        try {
            return yaml.load(s);
        } catch (e) {
            console.log(e);
            return undefined;
        }
    }
    return s;
}

export default Maker;