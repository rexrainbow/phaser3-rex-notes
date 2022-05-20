import ParseYAML from './utils/ParseYAML.js';
import YAMLMake from './YAMLMake.js';

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

    addCustomBuilder(key, customBuilder) {
        if (this.customBuilders === undefined) {
            this.customBuilders = {};
        }
        this.customBuilders[key] = customBuilder;
        return this;
    }

    clearCustomBuilder() {
        this.setCustomBuilders();
        return this;
    }

    make(data, view) {
        return YAMLMake(this.scene, data, view, this.styles, this.customBuilders);
    }

}

export default Maker;