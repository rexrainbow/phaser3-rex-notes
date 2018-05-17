'use strict'

import TagText from './TagText.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

class TagTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexTagText', this.addTagText, this.makeTagText);
    }

    addTagText(x, y, text, style) {
        return this.displayList.add(new TagText(this.scene, x, y, text, style));
    }

    makeTagText(config) {
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

        var content = GetValue(config, 'text', '');
        var style = GetValue(config, 'style', null);

        //  Padding
        //      { padding: 2 }
        //      { padding: { x: , y: }}
        //      { padding: { left: , top: }}
        //      { padding: { left: , right: , top: , bottom: }}  

        var padding = GetValue(config, 'padding', null);

        if (padding !== null) {
            style.padding = padding;
        }

        var text = new TagText(this.scene, 0, 0, content, style);
        BuildGameObject(this.scene, text, config);

        //  Text specific config options:

        text.autoRound = GetValue(config, 'autoRound', true);
        text.resolution = GetValue(config, 'resolution', 1);

        return text;
    }

}

export default TagTextPlugin;