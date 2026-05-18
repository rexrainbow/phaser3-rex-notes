import ParseWaitTag from './wait/OnParseWaitTag';
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
import ParseContent from './content/OnParseContent';
import ParseCustomTag from './custom/OnParseCustomTag';

const ParseCallbacks = [

    ParseWaitTag,

    ParsePlaySoundEffectTag, ParseFadeInSoundEffectTag, ParseFadeOutSoundEffectTag,
    ParseSetSoundEffectVolumeTag, ParseSetSoundEffectMuteTag,
    ParsePlayBackgroundMusicTag, ParseFadeInBackgroundMusicTag, ParseFadeOutBackgroundMusicTag, ParseCrossFadeBackgroundMusicTag, ParsePauseBackgroundMusicTag,
    ParseSetBackgroundMusicVolumeTag, ParseSetBackgroundMusicMuteTag,

    ParseFadeInCameraTag, ParseFadeOutCameraTag, ParseShakeCameraTag, ParseFlashCameraTag, ParseZoomCameraTag, ParseRotateCameraTag, ParseScrollCameraTag,

    ParseContent,

    ParseCustomTag,
];

var AddParseCallbacks = function(tagPlayer?: any, parser?: any, config?: any) {
    for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
        ParseCallbacks[i](tagPlayer, parser, config);
    }

    parser
        .on('start', function() {
            tagPlayer.emit('start', parser);
        })
        .on('complete', function() {
            tagPlayer.emit('complete', parser);
        })

}

export default AddParseCallbacks;