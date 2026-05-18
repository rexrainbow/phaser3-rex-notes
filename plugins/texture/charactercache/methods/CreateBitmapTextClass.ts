import GetCharacterCache from './GetCharacterCache';

var CreateBitmapTextClass = function(BaseClass?: any) {
    class BitmapTextClass extends BaseClass {
    characterCache: any;

        constructor(scene?: any, x?: any, y?: any, key?: any, text?: any, size?: any, align?: any) {
            var characterCache;
            if (typeof (key) === 'string') {
                characterCache = GetCharacterCache(scene, key);
            } else {
                characterCache = key;
                key = characterCache.key;
            }

            if (!characterCache) {
                console.error(`Character cache : '${key}' is not available`)
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