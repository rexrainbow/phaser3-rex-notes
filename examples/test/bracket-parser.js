import BracketParser from '../../plugins/utils/string/BracketParser.js';

var parser = new BracketParser({
    onContentCallback: function (content) {
        console.log('content:',content);
    },
    onTagOnCallback: function (tag) {
        console.log('tag-on:',tag);
    },
    onTagOffCallback: function (tag) {
        console.log('tag-off:',tag);
    },
});
parser.parse('[aa]bb[/aa]');