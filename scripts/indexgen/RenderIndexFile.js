const RenderIndexFile = function (result) {
    const lines = [];
    const names = [];
    result.forEach(function (item) {
        if (item.mode === 'default') {
            lines.push(`import ${item.name} from '${item.path}'`);
        } else {
            lines.push(`import {${item.name}} from '${item.path}'`);
        }

        names.push(item.name);
    })

    lines.push('export {');

    names.forEach(function (name) {
        lines.push(`    ${name},`)
    })

    lines.push('}');

    return lines.join('\n');
}

module.exports = RenderIndexFile;