import CharacterCache from '../../../charactercache.js';
import GetCharacterCache from '../../../texture/charactercache/methods/GetCharacterCache';

var CreateBitmapTextClass = function (BaseClass) {
    class BitmapTextClass extends BaseClass {
        constructor(scene, x, y, key, text, size, align, style) {
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

        setText(text, lock) {
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