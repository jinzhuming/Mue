/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parser__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__observer__ = __webpack_require__(4);


class Mue {
    constructor(args) {
        this.$el = null;
        const that = this;
        Object.keys(args).map((key) => {
            that[`${key}`] = args[key];
        });
        this.$el = document.querySelectorAll(args.el)[0];
        if (!this.$el) {
            throw Error('Did not find the element');
        }
        if (this.$el.nodeType !== 1) {
            throw Error('Not a legal element');
        }
        Object.keys(this).map((key) => {
            if (key !== '$el') {
                new __WEBPACK_IMPORTED_MODULE_1__observer__["a" /* default */](this, key);
            }
        });
        const parser = new __WEBPACK_IMPORTED_MODULE_0__parser__["a" /* default */](this, this.$el);
        this.$el.appendChild(parser.parseFragment);
    }
}
const text = new Mue({
    el: '#app',
    test: 1
});
setTimeout(() => {
    text.test += 1;
}, 2000);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__watcher__ = __webpack_require__(5);

class Parser {
    constructor(mue, domNode) {
        this.mue = null;
        this.reg = /\{\{(.*)\}\}/;
        this.parseFragment = document.createDocumentFragment();
        this.mue = mue;
        const fragment = document.createDocumentFragment();
        Array.apply(null, domNode.childNodes).map((childNode) => fragment.appendChild(childNode));
        this.parseFragment = this.parse(fragment);
    }
    setText(node, nodeValue, key) {
        new __WEBPACK_IMPORTED_MODULE_0__watcher__["a" /* default */](node, this.mue, key, node.nodeValue || '');
    }
    setArrt(node, attributeValue, key, attribute) {
        new __WEBPACK_IMPORTED_MODULE_0__watcher__["a" /* default */](node, this.mue, key, attributeValue, attribute);
    }
    parse(fragmentNode) {
        const reg = this.reg;
        const mue = this.mue;
        Array.apply(null, fragmentNode.childNodes).map((childNode) => {
            const nodeValue = childNode.nodeValue || '';
            if (childNode.nodeType == 3 && reg.test(nodeValue)) {
                const key = RegExp.$1 || '';
                if (mue[key]) {
                    this.setText(childNode, nodeValue, key);
                }
                return;
            }
            if (childNode.nodeType === 1 && childNode.attributes.length) {
                Array.apply(null, childNode.attributes).map((attribute) => {
                    console.log(attribute.value);
                    const attributeValue = attribute.value || '';
                    if (reg.test(attributeValue)) {
                        const key = RegExp.$1;
                        if (mue[key]) {
                            this.setArrt(childNode, attributeValue, key, attribute);
                        }
                    }
                });
            }
            if (childNode.childNodes.length) {
                const childFragment = this.parse(childNode);
            }
        });
        return fragmentNode;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Parser;



/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.map((sub) => {
            sub.update();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Dep;

Dep.target = null;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dep__ = __webpack_require__(3);

class observer {
    constructor(mueData, key) {
        const dep = new __WEBPACK_IMPORTED_MODULE_0__dep__["a" /* default */]();
        const property = Object.getOwnPropertyDescriptor(mueData, key);
        const getter = property && property.get;
        let value = getter ? getter() : property.value;
        Object.defineProperty(mueData, key, {
            enumerable: true,
            configurable: true,
            get() {
                if (__WEBPACK_IMPORTED_MODULE_0__dep__["a" /* default */].target) {
                    dep.addSub(__WEBPACK_IMPORTED_MODULE_0__dep__["a" /* default */].target);
                }
                return value;
            },
            set(newVal) {
                if (value === newVal)
                    return;
                value = newVal;
                dep.notify();
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = observer;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dep__ = __webpack_require__(3);

class Watcher {
    constructor(node, mue, key, sourceValue, attribute) {
        this.reg = /\{\{(.*)\}\}/;
        this.node = null;
        this.sourceValue = '';
        this.key = '';
        this.mue = {};
        this.attribute = null;
        __WEBPACK_IMPORTED_MODULE_0__dep__["a" /* default */].target = this;
        this.node = node;
        this.sourceValue = sourceValue;
        this.key = key;
        this.mue = mue;
        this.attribute = attribute || null;
        this.update();
        __WEBPACK_IMPORTED_MODULE_0__dep__["a" /* default */].target = null;
    }
    update() {
        if (this.node) {
            this.node.nodeValue = this.sourceValue.replace(this.reg, this.mue[this.key]);
        }
        if (this.attribute) {
            this.attribute.value = this.sourceValue.replace(this.reg, this.mue[this.key]);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Watcher;



/***/ })
/******/ ]);