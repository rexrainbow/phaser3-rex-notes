import ParseColorTag from './textstyle/OnParseColorTag.js';
import ParseStrokeColorTag from './textstyle/OnParseStrokeColorTag.js';
import ParseBoldTag from './textstyle/OnParseBoldTag.js';
import ParseItalicTag from './textstyle/OnParseItalicTag.js';
import ParseFontSizeTag from './textstyle/OnParseFontSizeTag.js';
import ParseOffsetYTag from './textstyle/OnParseOffsetYTag.js';
import ParseShadowColorTag from './textstyle/OnParseShadowColorTag.js';
import ParseImageTag from './image/OnParseImageTag.js';
import ParseTypingSpeedTag from './typing/OnParseTypingSpeedTag.js';
import ParsePlaySoundEffectTag from './soundeffect/OnParsePlaySoundEffectTag.js';
import ParseFadeInSoundEffectTag from './soundeffect/OnParseFadeInSoundEffectTag.js';
import ParseFadeOutSoundEffectTag from './soundeffect/OnParseFadeOutSoundEffectTag.js';
import ParseSetSoundEffectVolumeTag from './soundeffect/OnParseSetSoundEffectVolumeTag.js';
import ParsePlayBackgroundMusicTag from './backgroundmusic/OnParsePlayBackgroundMusicTag.js';
import ParseFadeInBackgroundMusicTag from './backgroundmusic/OnParseFadeInBackgroundMusicTag.js';
import ParseFadeOutBackgroundMusicTag from './backgroundmusic/OnParseFadeOutBackgroundMusicTag.js';
import ParseCrossFadeBackgroundMusicTag from './backgroundmusic/OnParseCrossFadeBackgroundMusicTag.js';
import ParsePauseBackgroundMusicTag from './backgroundmusic/OnParsePauseBackgroundMusicTag.js';
import ParseFadeInCameraTag from './camera/OnParseFadeInCameraTag.js';
import ParseFadeOutCameraTag from './camera/OnParseFadeOutCameraTag.js';
import ParseShakeCameraTag from './camera/OnParseShakeCameraTag.js';
import ParseFlashCameraTag from './camera/OnParseFlashCameraTag.js';
import ParseZoomCameraTag from './camera/OnParseZoomCameraTag.js';
import ParseRotateCameraTag from './camera/OnParseRotateCameraTag.js';
import ParseScrollCameraTag from './camera/OnParseScrollCameraTag.js';
import ParseWaitTag from './wait/OnParseWaitTag.js';
import ParseAddSpriteTag from './sprites/OnParseAddSpriteTag.js';
import ParseRemoveAllSpriteTag from './sprites/OnParseRemoveAllSpritesTag.js';
import ParseSetTextureTag from './sprites/OnParseSetTextureTag.js';
import ParsePlayAnimationTag from './sprites/OnParsePlayAnimationTag.js';
import ParseChainAnimationTag from './sprites/OnParseChainAnimationTag.js';
import ParsePauseAnimationTag from './sprites/OnParsePauseAnimationTag.js';
import ParseSetSpritePropertyTag from './sprites/OnParseSetSpritePropertyTag.js';
import ParseEaseSpritePropertyTag from './sprites/OnParseEaseSpritePropertyTag.js';
import ParseCustomTag from './custom/OnParseCustomTag.js';
import ParseNewLineTag from './content/OnParseNewLineTag.js';
import ParseContent from './content/OnParseContent.js';

const ParseCallbacks = [
    ParseColorTag, ParseStrokeColorTag,
    ParseBoldTag, ParseItalicTag,
    ParseFontSizeTag, ParseOffsetYTag, ParseShadowColorTag, ParseImageTag,
    ParseTypingSpeedTag,
    ParsePlaySoundEffectTag, ParseFadeInSoundEffectTag, ParseFadeOutSoundEffectTag, ParseSetSoundEffectVolumeTag,
    ParsePlayBackgroundMusicTag, ParseFadeInBackgroundMusicTag, ParseFadeOutBackgroundMusicTag, ParseCrossFadeBackgroundMusicTag, ParsePauseBackgroundMusicTag,
    ParseFadeInCameraTag, ParseFadeOutCameraTag, ParseShakeCameraTag, ParseFlashCameraTag, ParseZoomCameraTag, ParseRotateCameraTag, ParseScrollCameraTag,
    ParseWaitTag,
    ParseAddSpriteTag, ParseRemoveAllSpriteTag,
    ParseSetTextureTag, ParsePlayAnimationTag, ParseChainAnimationTag, ParsePauseAnimationTag,
    ParseSetSpritePropertyTag, ParseEaseSpritePropertyTag, // Add ParseSetSpritePropertyTag later    
    ParseCustomTag,
    ParseNewLineTag, ParseContent
];

var AddParseCallbacks = function (textPlayer, parser, config) {
    for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
        ParseCallbacks[i](textPlayer, parser, config);
    }
}

export default AddParseCallbacks;