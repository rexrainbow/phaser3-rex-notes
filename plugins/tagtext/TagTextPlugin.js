import Text from './../utils/text/Text.js';
import ParserKlass from './Parser.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const GetValue = Phaser.Utils.Objects.GetValue;

class TagText extends Text {
    constructor(scene, x, y, text, style) {
        var tags = GetValue(style, 'tags', undefined);
        var parser = new ParserKlass(tags);
        super(scene, x, y, text, style, 'TagText', parser);
        this.parser = parser;
    }

    addTag(name, prop) {
        this.parser.addTag(name, prop);
        return this.updateText(true);
    }

    addTags(tags) {
        for(var name in tags){
            this.parser.addTag(name, tags[name]);
        }
        return this.updateText(true);
    }

    preDestroy() {
        super.preDestroy();
        this.parser.destroy();
        this.parser = undefined;
    }
}

Phaser.GameObjects.GameObjectFactory.register('rexTagText', function (x, y, text, style) {
    return this.displayList.add(new TagText(this.scene, x, y, text, style));
});
Phaser.GameObjects.GameObjectCreator.register('rexTagText', function (config) {
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

    var text = new TagText(this.scene, 0, 0, content, style);
    BuildGameObject(this.scene, text, config);

    //  Text specific config options:

    text.autoRound = GetAdvancedValue(config, 'autoRound', true);
    text.resolution = GetAdvancedValue(config, 'resolution', 1);

    return text;
});
export default TagText;