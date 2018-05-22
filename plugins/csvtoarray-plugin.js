import CSVToArray from './csvtoarray.js'

class CSVToArrayPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    convert(strData, strDelimiter) {
        return CSVToArray(strData, strDelimiter);
    }
}

export default CSVToArrayPlugin;