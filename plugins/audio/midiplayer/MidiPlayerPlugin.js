import midiParser from 'rexPlugins/utils/midi-parser/midi-parser.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class MidiPlayerPlugin {
    constructor(scene, config) {
        this.scene = scene;

        this.resetFromJSON(config);
        this.boot();
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.midi = GetValue(o, 'midi', null);
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {

        };
    }

    boot() {
        this.scene.on('destroy', this.destroy, this);
    }

    shutdown() {
        this.stop();
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }
        
}

export default MidiPlayerPlugin;