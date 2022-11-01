import Label from './Label.js';

class Title extends Label {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.Title';
    }

    setTitle(config) {
        if (config === undefined) {
            config = {};
        }

        config.text = config.text || config.title || '';
        
        this.resetFromJSON(config)

        return this;
    }
}

export default Title;