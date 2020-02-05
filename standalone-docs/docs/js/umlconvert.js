(function (document) {
    var GetCharts = function (className) {
        var charts = document.querySelectorAll("pre." + className + ',div.' + className);
        var arr = [];
        for (var i = 0, cnt = charts.length; i < cnt; i++) {
            arr.push(charts[i]);
        }
        return arr;
    };

    var GetCodeNode = function (elem) {
        // <pre><code>
        for (var i = 0, cnt = elem.childNodes.length; i < cnt; i++) {
            var childElem = elem.childNodes[i];
            if (childElem.nodeName.toLowerCase() === 'code') {
                return childElem;
            }
        }
    };
    var GetContent = function (elem) {
        if (elem.tagName.toLowerCase() === 'pre') {
            // <pre><code>
            var codeNode = GetCodeNode(elem);
            if (!codeNode) {
                return;
            }

            var whitespace = /^\s*$/;
            for (var i = 0, cnt = codeNode.childNodes.length; i < cnt; i++) {
                var curNode = codeNode.childNodes[i];
                if (curNode.nodeName === "#text" && !(whitespace.test(curNode.nodeValue))) {
                    return curNode.nodeValue;
                }
            }
        } else {
            // <div>
            var content = elem.textContent || elem.innerText;

            // clear text
            if (elem.innerText) {
                elem.innerText = '';
            } else {
                elem.textContent = '';
            }
            return content;
        }

        return null;
    };

    var ChangeElemType = function (elem, newType) {        
        if (elem.tagName.toLowerCase() !== newType) {
            var newElem = document.createElement(newType);
            newElem.className = elem.className;
            var parentNode = elem.parentNode;
            parentNode.insertBefore(newElem, elem);
            parentNode.removeChild(elem);
            return newElem;
        }
        return elem;
    };

    var convertMemarid = function () {
        var settings = {
            startOnLoad: true
        };

        var className = 'mermaid';
        var arr = GetCharts(className);
        for (var i = 0, cnt = arr.length; i < cnt; i++) {
            var elem = arr[i];
            var content = GetContent(elem);
            var divElem = ChangeElemType(elem, 'div');
            divElem.innerHTML = content;
        }

        mermaid.initialize(settings);
    };

    var onReady = function (fn) {
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            document.attachEvent('onreadystatechange', function () {
                if (document.readyState === 'interactive')
                    fn();
            });
        }
    };

    onReady(function () {
        convertMemarid();
    });
})(document);