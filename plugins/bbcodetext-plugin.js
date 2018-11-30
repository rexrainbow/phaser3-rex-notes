import BBCodeText from './gameobjects/bbocdetext/BbcodeText.js';
import SetValue from './utils/object/SetValue.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

class BBCodeTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexBBCodeText', this.addBBCodeText, this.makeBBCodeText);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    addBBCodeText(x, y, text, style) {
        var text = new BBCodeText(this.scene, x, y, text, style);
        this.displayList.add(text);
        return text;
    }

    makeBBCodeText(config, addToScene) {
        // style Object = {
        //     font: [ 'font', '16px Courier' ],
        //     backgroundColor: [ 'backgroundColor', null ],
        //     fill: [ 'fill', '#fff' ],
        //     stroke: [ 'stroke', '#fff' ],
        //     strokeThickness: [ 'strokeThickness', 0 ],
        //     shadowOffsetX: [ 'shadow.offsetX', 0 ],
        //     shadowOffsetY: [ 'shadow.offsetY', 0 ],
        //     shadowColor: [ 'shadow.color', '#000' ],
        //     shadowBlur: [ 'shadow.blur', 0 ],
        //     shadowStroke: [ 'shadow.stroke', false ],
        //     shadowFill: [ 'shadow.fill', false ],
        //     align: [ 'align', 'left' ],
        //     maxLines: [ 'maxLines', 0 ],
        //     fixedWidth: [ 'fixedWidth', false ],
        //     fixedHeight: [ 'fixedHeight', false ]
        // }

        var content = GetAdvancedValue(config, 'text', '');
        var style = GetAdvancedValue(config, 'style', null);

        //  Padding
        //      { padding: 2 }
        //      { padding: { x: , y: }}
        //      { padding: { left: , top: }}
        //      { padding: { left: , right: , top: , bottom: }}  

        var padding = GetAdvancedValue(config, 'padding', null);

        if (padding !== null) {
            style.padding = padding;
        }

        if (addToScene !== undefined) {
            config.add = addToScene;
        }

        var text = new BBCodeText(this.scene, 0, 0, content, style);
        BuildGameObject(this.scene, text, config);

        //  Text specific config options:

        text.autoRound = GetAdvancedValue(config, 'autoRound', true);
        text.resolution = GetAdvancedValue(config, 'resolution', 1);

        return text;
    }
}

SetValue(window, 'RexPlugins.GameObjects.BBCodeText', BBCodeText);

export default BBCodeTextPlugin;