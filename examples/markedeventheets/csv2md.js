import CSV2Markdown from "../../plugins/logic/eventsheets/csv2markdown/CSV2Markdown.js";

var csv = `\
#,Title
##,[Condition]
,coin > 5
##,Script
print,text=I have {{coin}} coin\
`

var md = CSV2Markdown(csv);

console.log(md);

/*
# Title
## [Condition]

coin > 5

## Script

print
text=I have {{coin}} coin
*/