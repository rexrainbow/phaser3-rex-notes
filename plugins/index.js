// game objects
import BBCodeText from './bbcodetext.js';
import Canvas from './canvas.js';
import ContainerLite from './containerlite.js';
import GridTable from './gridtable.js';
import TagText from './tagtext.js';

// custom file loader      
import WebfontLoader from './webfontloader.js'

// functions
import XOR from './xor.js';
import LZString from './lzstring.js';
import CSVToArray from './csvtoarray.js';
import Sequence from './sequence.js';

// input
import Drag from './drag.js';
import Slider from './slider.js';
import TouchCursor from './touchcursor.js';
import TouchState from './touchstate.js';
import VirtualJoyStick from './virtualjoystick.js';

// member of game object
import Fade from './fade.js';
import FadeOutDestroy from './fade-out-destroy.js';

// member of text
import TextTyping from './texttyping.js';
import TextPage from './textpage.js';

// member of scene 
// audio
import SoundFade from './soundfade.js';
// control
import FSM from './fsm.js';
import TCRP from './tcrp.js';
import CSVScenario from './csvscenario.js';
// time
import Clock from './clock.js';
// data structure
import CSVToHashTable from './csvtohashtable.js';
// math
import Gashapon from './gashapon.js';

export default {
    // game objects
    'BBCodeText': BBCodeText,
    'Canvas': Canvas,
    'ContainerLite': ContainerLite,
    'GridTable': GridTable,
    'TagText': TagText,

    // functions
    'XOR': XOR,
    'LZString': LZString,
    'CSVToArray': CSVToArray,
    'Sequence': Sequence,

    // input
    'Drag': Drag,
    'Slider': Slider,
    'TouchCursor': TouchCursor,
    'TouchState': TouchState,
    'VirtualJoyStick': VirtualJoyStick,

    // member of game object
    'Fade': Fade,
    'FadeOutDestroy': FadeOutDestroy,

    // member of text
    'TextTyping': TextTyping,
    'TextPage': TextPage,

    // member of scene 
    // sound
    'SoundFade': SoundFade,

    // control
    'FSM': FSM,
    'TCRP': TCRP,
    'CSVScenario': CSVScenario,

    // time
    'Clock': Clock,

    // data structure
    'CSVToHashTable': CSVToHashTable,

    // math
    'Gashapon': Gashapon
};