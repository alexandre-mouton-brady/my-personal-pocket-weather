module.exports = { contents: "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.debounce = debounce;\nfunction debounce(func, wait, immediate) {\n  var timeout;\n  return function () {\n    var context = this,\n        args = arguments;\n    var later = function later() {\n      timeout = null;\n      if (!immediate) func.apply(context, args);\n    };\n    var callNow = immediate && !timeout;\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n    if (callNow) func.apply(context, args);\n  };\n}",
dependencies: [],
sourceMap: {},
headerContent: undefined,
mtime: 1500026098240,
devLibsRequired : undefined
};