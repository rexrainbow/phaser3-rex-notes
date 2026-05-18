import mustache from 'mustache';

var mainTemplate = `\
<<prelude>>
Hello, I am {{name}}
<<{postlude}>>
`;

var postTemplate = mustache.render(mainTemplate, {
    prelude: '(A fixed string)',
    postlude: `
TITLE
  id=Title
  vpx=-0.5
  vpy=0
  alpha=0
  alignLeft=true
  text0=1949年，2月25日，台北市大稻埕
  
Title.to
  vpx=0
  alpha=1
  ease=Cubic
  duration=2000
`,
}, {}, ['<<', '>>'])

var result = mustache.render(postTemplate, { name: 'rex' })
console.log(result);