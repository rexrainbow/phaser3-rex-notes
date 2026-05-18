import ParseColorTag from './textstyle/OnParseColorTag';
import ParseStrokeColorTag from './textstyle/OnParseStrokeColorTag';
import ParseBoldTag from './textstyle/OnParseBoldTag';
import ParseItalicTag from './textstyle/OnParseItalicTag';
import ParseFontSizeTag from './textstyle/OnParseFontSizeTag';
import ParseOffsetYTag from './textstyle/OnParseOffsetYTag';
import ParseOffsetXTag from './textstyle/OnParseOffsetXTag';
import ParseLeftSpaceTag from './textstyle/OnParseLeftSpaceTag';
import ParseRightSpaceTag from './textstyle/OnParseRightSpaceTag';
import ParseShadowColorTag from './textstyle/OnParseShadowColorTag';
import ParseAlignTag from './textstyle/OnParseAlignTag'
import ParseImageTag from './image/OnParseImageTag';
import ParseSpaceTag from './space/OnParseSpaceTag';
import ParseTypingSpeedTag from './typing/OnParseTypingSpeedTag';
import ParsePlaySoundEffectTag from './soundeffect/OnParsePlaySoundEffectTag';
import ParseFadeInSoundEffectTag from './soundeffect/OnParseFadeInSoundEffectTag';
import ParseFadeOutSoundEffectTag from './soundeffect/OnParseFadeOutSoundEffectTag';
import ParseSetSoundEffectVolumeTag from './soundeffect/OnParseSetSoundEffectVolumeTag';
import ParseSetSoundEffectMuteTag from './soundeffect/OnParseSetSoundEffectMuteTag';
import ParsePlayBackgroundMusicTag from './backgroundmusic/OnParsePlayBackgroundMusicTag';
import ParseFadeInBackgroundMusicTag from './backgroundmusic/OnParseFadeInBackgroundMusicTag';
import ParseFadeOutBackgroundMusicTag from './backgroundmusic/OnParseFadeOutBackgroundMusicTag';
import ParseCrossFadeBackgroundMusicTag from './backgroundmusic/OnParseCrossFadeBackgroundMusicTag';
import ParsePauseBackgroundMusicTag from './backgroundmusic/OnParsePauseBackgroundMusicTag';
import ParseSetBackgroundMusicVolumeTag from './backgroundmusic/OnParseSetBackgroundMusicVolumeTag';
import ParseSetBackgroundMusicMuteTag from './backgroundmusic/OnParseSetBackgroundMusicMuteTag';
import ParseFadeInCameraTag from './camera/OnParseFadeInCameraTag';
import ParseFadeOutCameraTag from './camera/OnParseFadeOutCameraTag';
import ParseShakeCameraTag from './camera/OnParseShakeCameraTag';
import ParseFlashCameraTag from './camera/OnParseFlashCameraTag';
import ParseZoomCameraTag from './camera/OnParseZoomCameraTag';
import ParseRotateCameraTag from './camera/OnParseRotateCameraTag';
import ParseScrollCameraTag from './camera/OnParseScrollCameraTag';
import ParseWaitTag from './wait/OnParseWaitTag';
import ParseNewLineTag from './content/OnParseNewLineTag';
import ParsePageBreakTag from './content/OnParsePageBreakTag';
import ParseContentOff from './content/OnParseContentOff';
import ParseContentOn from './content/OnParseContentOn';
import ParseContent from './content/OnParseContent';
import ParseCustomTag from './custom/OnParseCustomTag';

const ParseCallbacks = [
    ParseColorTag, ParseStrokeColorTag,
    ParseBoldTag, ParseItalicTag,
    ParseFontSizeTag, ParseShadowColorTag, ParseAlignTag,
    ParseOffsetYTag, ParseOffsetXTag, ParseLeftSpaceTag, ParseRightSpaceTag,
    ParseImageTag,
    ParseSpaceTag,

    ParseTypingSpeedTag,

    ParsePlaySoundEffectTag, ParseFadeInSoundEffectTag, ParseFadeOutSoundEffectTag,
    ParseSetSoundEffectVolumeTag, ParseSetSoundEffectMuteTag,
    ParsePlayBackgroundMusicTag, ParseFadeInBackgroundMusicTag, ParseFadeOutBackgroundMusicTag, ParseCrossFadeBackgroundMusicTag, ParsePauseBackgroundMusicTag,
    ParseSetBackgroundMusicVolumeTag, ParseSetBackgroundMusicMuteTag,

    ParseFadeInCameraTag, ParseFadeOutCameraTag, ParseShakeCameraTag, ParseFlashCameraTag, ParseZoomCameraTag, ParseRotateCameraTag, ParseScrollCameraTag,

    ParseWaitTag,

    ParseNewLineTag, ParsePageBreakTag,
    ParseContentOff, ParseContentOn,
    ParseContent,

    ParseCustomTag,
];

var AddParseCallbacks = function(textPlayer?: any, parser?: any, config?: any) {
    for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
        ParseCallbacks[i](textPlayer, parser, config);
    }
}

export default AddParseCallbacks;