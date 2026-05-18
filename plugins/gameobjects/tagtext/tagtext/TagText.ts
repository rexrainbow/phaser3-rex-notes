import Text from '../textbase/Text';
import ParserClass from './Parser';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class TagText extends Text {
    parser: any;
    updateText: any;

    constructor(scene?: any, x?: any, y?: any, text?: any, style?: any) {
        var tags = GetValue(style, 'tags', undefined);
        var parser = new ParserClass(tags);
        super(scene, x, y, text, style, 'rexTagText', parser);
    }

    addTag(name?: any, prop?: any) {
        this.parser.addTag(name, prop);
        return this.updateText(true);
    }

    addTags(tags?: any) {
        for (var name in tags) {
            this.parser.addTag(name, tags[name]);
        }
        return this.updateText(true);
    }

    getTag(name?: any) {
        return this.parser.getTag(name);
    }

    preDestroy() {
        super.preDestroy();
        this.parser.destroy();
        this.parser = undefined;
    }
}

export default TagText;