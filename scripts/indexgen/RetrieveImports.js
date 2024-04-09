const fs = require('fs');
const path = require('path');

const RetrieveImports = function (folderPath) {
    // console.log(folderPath)
    let result = [];
    let namePathMap = {}

    try {
        fs.readdirSync(folderPath).forEach(function (file) {
            if (
                (!file.endsWith('.js')) ||
                (file.indexOf('-plugin') !== -1)
            ) {
                return;
            }
            // console.log(file);
            const filePath = path.join(folderPath, file);
            const data = fs.readFileSync(filePath, 'utf8');
            const lines = data.split('\n');
            GetImportStatement(lines).forEach(function (importStatement) {
                GetImportNames(importStatement).forEach(function (item) {
                    if (item.name in namePathMap) {
                        if (item.path === namePathMap[item.name]) {
                            return;
                        } else {
                            console.log(`Duplicate ${item.name}`)
                            console.log('    ', namePathMap[item.name])
                            console.log('    ', item.path)
                        }
                    }

                    result.push(item);
                    namePathMap[item.name] = item.path;
                })
            })

        });
    } catch (err) {
        console.error(err);
    }

    return result;
}

const GetImportStatement = function (lines) {
    const importStatements = [];
    const tmpLines = [];
    lines.forEach(function (line) {
        if (line.indexOf('import') !== -1) {
            if (line.indexOf('from') !== -1) { // Single line statement
                importStatements.push(line);
            } else { // Multiple line statement
                tmpLines.push(line);
            }
        } else if (line.indexOf('from') !== -1) { // Multiple line statement
            tmpLines.push(line);
            importStatements.push(tmpLines.join(''));
            tmpLines.length = 0;
        } else if (tmpLines.length > 0) { // Multiple line statement
            tmpLines.push(line);
        }
    })

    return importStatements;
}

const GetImportNames = function (importStatement) {
    importStatement = importStatement
        .replace('import', '')
        .replace(/["';]/g, '');

    const importNames = [];
    let [name, importPath] = importStatement.split('from');
    name = name.trim();
    importPath = importPath.trim();
    if (name.indexOf('{') === -1) {
        importNames.push({
            name: name,
            path: importPath,
            mode: 'default'
        })
    } else {
        name.replace(/[\{\}]/g, '').split(',').forEach(function (name) {
            name = name.trim();
            importNames.push({
                name: name,
                path: importPath,
                mode: 'named'
            })
        });


    }

    return importNames;
}

module.exports = RetrieveImports;