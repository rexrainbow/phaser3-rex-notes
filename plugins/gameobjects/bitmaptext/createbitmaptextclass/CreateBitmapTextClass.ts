import CharacterCache from '../../../charactercache';
import GetCharacterCache from '../../../texture/charactercache/methods/GetCharacterCache';

var CreateBitmapTextClass = function(BaseClass?: any) {
    class BitmapTextClass extends BaseClass {
    characterCache: any;

        constructor(scene?: any, x?: any, y?: any, key?: any, text?: any, size?: any, align?: any, style?: any) {
            var characterCache = GetCharacterCache(scene, key);
            if (!characterCache) {
                if (style === undefined) {
                    style = {};
                }
                if (style.fontSize === undefined) {
                    style.fontSize = `${size}px`;
                }
                if (style.align === undefined) {
                    style.align = 'center';
                }

                characterCache = new CharacterCache(scene, {
                    key: key,
                    cellWidth: size,
                    cellHeight: size,
                    maxCharacterCount: 4096,
                    style: style,
                });
            }

            super(scene, x, y, key, '', size, align);

            this.characterCache = characterCache;
            this.setText(text);
        }

        setText(text?: any, lock?: any) {
            if (!this.characterCache) {
                return this;
            }

            this.characterCache.load(text, lock);
            super.setText(text);
            return this;
        }
    }

    return BitmapTextClass;
}

export default CreateBitmapTextClass;