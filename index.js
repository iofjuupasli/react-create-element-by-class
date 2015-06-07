(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.h = factory();
    }
}(this, function () {
    function isString(str) {
        return typeof str === 'string' ||
            (!!str && typeof str === 'object' &&
                Object.prototype.toString.call(str) === '[object String]');
    }

    function clone(obj) {
        var target = {};
        for (var i in obj) {
            target[i] = obj[i];
        }
        return target;
    }

    return function (orig) {
        return function (elem, options) {
            if (isString(elem)) {
                if (elem && elem.indexOf('.') === -1) {
                    return orig.apply(null, arguments);
                }
                var classNames = elem.split('.');
                var resultElem = classNames.shift() || 'div';
                var className = classNames.length ?
                    classNames.join(' ') :
                    undefined;
                var resultOptions;
                if (options) {
                    resultOptions = clone(options);
                    if (options.className) {
                        resultOptions.className += ' ' + className;
                    } else {
                        resultOptions.className = className;
                    }
                } else {
                    resultOptions = {
                        className: className
                    };
                }
                if (arguments.length > 2) {
                    var l = arguments.length - 2;
                    var rest = new Array(l);
                    while (l--) rest[l] = arguments[l + 2];
                    return orig.apply(
                        null, [resultElem, resultOptions].concat(rest));
                } else {
                    return orig(resultElem, resultOptions);
                }
            } else {
                return orig.apply(null, arguments);
            }
        };
    };
}));
