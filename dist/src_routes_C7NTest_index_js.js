"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkxyqz_utils"] = self["webpackChunkxyqz_utils"] || []).push([["src_routes_C7NTest_index_js"],{

/***/ "./src/routes/C7NTest/index.js":
/*!*************************************!*\
  !*** ./src/routes/C7NTest/index.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var choerodon_ui_pro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! choerodon-ui/pro */ \"./node_modules/choerodon-ui/pro/index.js\");\n/* harmony import */ var choerodon_ui_pro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(choerodon_ui_pro__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar ds = function ds() {\n  return {\n    transport: {\n      read: function read(config) {\n        return {\n          url: \"http://gateway.clmp-dev.csleasing.com.cn/cloa-invoice-folder/v1/3/invoice/image/197400\",\n          method: 'POST'\n        };\n      }\n    },\n    fields: [{\n      name: 'name',\n      label: '姓名',\n      type: 'string'\n    }, {\n      name: 'age',\n      label: '年龄',\n      type: 'number'\n    }, {\n      name: 'gender',\n      label: '性别',\n      type: 'string'\n    }],\n    queryFields: [{\n      name: 'name',\n      label: '姓名',\n      type: 'string'\n    }, {\n      name: 'age',\n      label: '年龄',\n      type: 'number'\n    }, {\n      name: 'gender',\n      label: '性别',\n      type: 'string'\n    }],\n    events: {}\n  };\n};\n\n// const data = [\n//   {\n//     name: \"何欣宇\",\n//     age: 20,\n//     gender: \"男\",\n//   },\n//   {\n//     name: \"XXX\",\n//     age: 21,\n//     gender: \"女\",\n//   },\n//   {\n//     name: \"QQQ\",\n//     age: 22,\n//     gender: \"男\",\n//   },\n// ];\n\nfunction C7NTest() {\n  var tableDs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {\n    return new choerodon_ui_pro__WEBPACK_IMPORTED_MODULE_1__.DataSet(ds());\n  }, []);\n  var column = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {\n    return [{\n      name: 'name'\n    }, {\n      name: 'age'\n    }, {\n      name: 'gender'\n    }];\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(choerodon_ui_pro__WEBPACK_IMPORTED_MODULE_1__.Table, {\n    dataSet: tableDs,\n    columns: column\n  }));\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (C7NTest);\n\n//# sourceURL=webpack://xyqz-utils/./src/routes/C7NTest/index.js?");

/***/ })

}]);