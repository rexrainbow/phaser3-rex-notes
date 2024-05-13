import mustache from 'mustache';

var mainTemplate = `\
<<prelude>>
Hello, I am {{name}}
<< postlude >>
`;

var postTemplate = mustache.render(mainTemplate, {
    prelude: '(A fixed string)',
    postlude: function(){
        return '(A string from function)'
    },
}, {}, ['<<', '>>'])

var result = mustache.render(postTemplate, { name: 'rex' })
console.log(result);