import GetLines from './GetLines';
import SetContentMethods from './SetContentMethods';
import GetPageMethods from './GetPageMethods';
import ShowMethods from './ShowMethods';

var Methods = {   
    getLines: GetLines,
}

Object.assign(
    Methods,
    SetContentMethods,
    GetPageMethods,
    ShowMethods
);

export default Methods;