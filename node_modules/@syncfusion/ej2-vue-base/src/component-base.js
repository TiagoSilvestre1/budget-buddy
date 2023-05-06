/**
 * Vue Component Base
 */
import * as Vue from 'vue';
import { isNullOrUndefined, extend, getValue } from '@syncfusion/ej2-base';
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) {
    return obj;
}
else {
    var newObj = {};
    if (obj != null) {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
                newObj["" + key] = obj["" + key];
        }
    }
    newObj.default = obj;
    return newObj;
} }
var curVue = _interopRequireWildcard(Vue);
export var isExecute = (parseInt(curVue['version']) > 2) ? false : true, aVue = !isExecute ? curVue : (curVue['default']['default'] ? curVue['default']['default'] : curVue['default']), gh = curVue['h'];
export var vueDefineComponent = function (options) { return !isExecute ? aVue['defineComponent'](options) : aVue['extend'](options); };
export var ComponentBase = vueDefineComponent({
    name: 'ComponentBase',
    data: function () {
        return {
            tagMapper: {},
            tagNameMapper: {},
            hasInjectedModules: false,
            hasChildDirective: false,
            childDirObjects: '',
            propKeys: {},
            isDecorator: false
        };
    },
    created: function () {
        var _this = this;
        if (this.ej2Instance) {
            this.ej2Instances = this.isVue3 ? aVue.toRaw(this.ej2Instance) : this.ej2Instance;
        }
        if (!this.propKeys) {
            return;
        }
        var _loop_1 = function (prop) {
            this_1.ej2Instances.addEventListener(prop, function (args) {
                _this.$emit(prop, args);
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.propKeys; _i < _a.length; _i++) {
            var prop = _a[_i];
            _loop_1(prop);
        }
        var injectables = getValue('$root.$options.provide', this);
        var vueInjectables = getValue('$parent.$options.provide', this);
        vueInjectables = !isNullOrUndefined(vueInjectables) ? vueInjectables : getValue('$.parent.provides', this);
        if (this.hasInjectedModules && !isExecute) {
            var prevModule = [];
            if (injectables && injectables.managed) {
                this.isDecorator = true;
                prevModule = this.getInjectedServices() || [];
            }
            else if (injectables) {
                prevModule = injectables[this.ej2Instances.getModuleName()] || [];
            }
            else if (vueInjectables) {
                prevModule = this.getInjectedServices() || [];
            }
            var curModule = this.ej2Instances.getInjectedModules() || [];
            for (var _b = 0, curModule_1 = curModule; _b < curModule_1.length; _b++) {
                var mod = curModule_1[_b];
                if (prevModule.indexOf(mod) === -1) {
                    prevModule.push(mod);
                }
            }
            this.ej2Instances.injectedModules = prevModule;
        }
    },
    mounted: function () {
        var cusEle = this.$el ? this.$el.querySelectorAll("div.e-directive") : null;
        if (!isExecute && cusEle) {
            for (var i = 0; i < cusEle.length; i++) {
                cusEle[parseInt(i.toString(), 10)].parentElement && cusEle[parseInt(i.toString(), 10)].parentElement.removeChild(cusEle[parseInt(i.toString(), 10)]);
            }
        }
        this.ej2Instances.isVue = true;
        this.ej2Instances.isVue3 = this.isVue3;
        this.ej2Instances.vueInstance = this;
        if (this.isVue3) {
            this.ej2Instances.ej2Instances = this.ej2Instances;
            this.ej2Instances.referModels = this.models;
            this.setModelValue();
        }
        this.ej2Instances.appendTo(this.$el);
    },
    updated: function () {
        if (this.isVue3) {
            this.setModelValue();
        }
        if (this.hasChildDirective) {
            var childKey = {};
            this.fetchChildPropValues(childKey);
            var curChildDir = JSON.stringify(childKey);
            if (this.childDirObjects !== curChildDir) {
                this.childDirObjects = curChildDir;
                this.assignValueToWrapper(childKey, false);
            }
        }
    },
    beforeDestroy: function () {
        this.destroyComponent();
    },
    beforeUnmount: function () {
        this.destroyComponent();
    },
    methods: {
        setModelValue: function () {
            if (!isNullOrUndefined(this.modelValue) || !isNullOrUndefined(this.$attrs.modelValue)) {
                var key = this.models.toString().match(/checked|value/) || [];
                var propKey = key[0];
                if (!isNullOrUndefined(propKey)) {
                    this.ej2Instances["" + propKey] = !isNullOrUndefined(this.modelValue) ? this.modelValue : this.$attrs.modelValue;
                }
            }
        },
        updated: function () {
            if (this.isVue3) {
                this.setModelValue();
            }
            if (this.hasChildDirective) {
                var childKey = {};
                this.fetchChildPropValues(childKey);
                var curChildDir = JSON.stringify(childKey);
                if (this.childDirObjects !== curChildDir) {
                    this.childDirObjects = curChildDir;
                    this.assignValueToWrapper(childKey, false);
                }
            }
        },
        getInjectedServices: function () {
            var ret = [];
            var provide;
            if (this.$root && this.isDecorator) {
                provide = getValue('$root.$options.provide', this);
            }
            else if (this.$vnode) {
                provide = getValue('$vnode.context.$options.provide', this);
            }
            else if (this.$parent) {
                provide = getValue('$parent.$options.provide', this);
            }
            if (isNullOrUndefined(provide) && !isNullOrUndefined(this.$)) {
                provide = getValue('$.parent.provides', this);
            }
            if (provide) {
                // tslint:disable:no-any
                var injectables = provide;
                if (typeof provide === 'function') {
                    if (provide.managed) {
                        var provideKey = provide.managed;
                        var provideValue = Object.keys(provideKey);
                        var key = void 0;
                        if (this.$root && this.isDecorator) {
                            key = Object.keys(this.$root);
                        }
                        else if (this.$vnode) {
                            key = Object.keys(this.$vnode.context);
                        }
                        else if (this.$parent) {
                            key = Object.keys(this.$parent);
                        }
                        for (var i = 0; i < provideValue.length; i++) {
                            for (var j = 0; j < key.length; j++) {
                                if ((key[parseInt(j.toString(), 10)].indexOf(provideValue[parseInt(i.toString(), 10)])) !== -1) {
                                    if (this.$root && this.isDecorator) {
                                        provideKey[provideValue[parseInt(j.toString(), 10)]] = this.$root[key[parseInt(i.toString(), 10)]];
                                    }
                                    else if (this.$vnode) {
                                        provideKey[provideValue[parseInt(i.toString(), 10)]] = this.$vnode.context[key[parseInt(j.toString(), 10)]];
                                    }
                                    else if (this.$parent) {
                                        provideKey[provideValue[parseInt(i.toString(), 10)]] = this.$parent[key[parseInt(j.toString(), 10)]];
                                    }
                                    injectables = provideKey;
                                }
                            }
                        }
                    }
                    // tslint:disable:no-any
                    else if (this.$vnode) {
                        injectables = this.$vnode.context.$options.provide();
                    }
                    else if (this.$parent) {
                        injectables = this.$parent.$options.provide();
                    }
                }
                ret = injectables[this.ej2Instances.getModuleName()] || [];
            }
            this.isDecorator = false;
            return ret;
        },
        destroyComponent: function () {
            var tempBeforeDestroyThis = this;
            tempBeforeDestroyThis.ej2Instances.destroy();
            tempBeforeDestroyThis.$el.style.visibility = 'hidden';
            tempBeforeDestroyThis = null;
        },
        bindProperties: function () {
            var options = {};
            for (var _i = 0, _a = this.propKeys; _i < _a.length; _i++) {
                var prop = _a[_i];
                if (!isNullOrUndefined(this["" + prop])) {
                    options["" + prop] = this["" + prop];
                }
                else if (this[0] && !isNullOrUndefined(this[0][0]) && !isNullOrUndefined(this[0][0]["" + prop])) {
                    options["" + prop] = this[0][0]["" + prop];
                }
            }
            if (this.hasChildDirective) {
                this.fetchChildPropValues(options);
            }
            if (this.hasInjectedModules) {
                var prevModule = this.getInjectedServices() || [];
                var curModule = this.ej2Instances.getInjectedModules() || [];
                for (var _b = 0, curModule_2 = curModule; _b < curModule_2.length; _b++) {
                    var mod = curModule_2[_b];
                    if (prevModule.indexOf(mod) === -1) {
                        prevModule.push(mod);
                    }
                }
                this.ej2Instances.injectedModules = prevModule;
            }
            this.assignValueToWrapper(options);
        },
        assignValueToWrapper: function (option, silent) {
            this.ej2Instances.setProperties(extend({}, {}, option, true), isNullOrUndefined(silent) ? true : silent);
        },
        fetchChildPropValues: function (childOption) {
            var dirProps = {};
            if (!this.isVue3) {
                dirProps = this.getDirectiveValues(this.$slots.default, this.tagMapper || {}, this.tagNameMapper || {});
            }
            else {
                var propRef = void 0;
                if (this[0] && this[0][1].slots.default) {
                    propRef = this[0][1].slots.default();
                }
                else if (this && this.$ && this.$.slots && this.$.slots.default) {
                    propRef = this.$.slots.default();
                }
                if (propRef) {
                    for (var i = 0; i < propRef.length; i++) {
                        if (propRef[parseInt(i.toString(), 10)].type.methods || propRef[parseInt(i.toString(), 10)].type === 'e-seriescollection') {
                            var key = propRef[parseInt(i.toString(), 10)].type === 'e-seriescollection' ? 'series-collection' :
                                propRef[parseInt(i.toString(), 10)].type.methods.getTag().replace("e-", "");
                            var ref = this.resolveArrayDirectives(propRef[parseInt(i.toString(), 10)].children, key);
                            var splitKeys = key.split('-');
                            var controlName = this.ej2Instances.getModuleName().toLowerCase();
                            var keyRef = (splitKeys.length > 1 && controlName.indexOf(splitKeys[0]) > -1) ? splitKeys[1] : splitKeys[0];
                            keyRef = keyRef.replace(controlName, '');
                            if (controlName == "splitter" && keyRef == "panes") {
                                keyRef = "paneSettings";
                            }
                            else if (controlName == "bulletchart" && keyRef == "range") {
                                keyRef = "ranges";
                            }
                            else if (controlName == "schedule" && keyRef == "header") {
                                keyRef = "headerRows";
                            }
                            dirProps["" + keyRef] = ref["" + key];
                        }
                    }
                }
                else {
                    return;
                }
            }
            if (!this.childDirObjects) {
                this.childDirObjects = JSON.stringify(dirProps);
            }
            for (var _i = 0, _a = Object.keys(dirProps); _i < _a.length; _i++) {
                var dirProp = _a[_i];
                childOption["" + dirProp] = dirProps["" + dirProp];
            }
        },
        resolveArrayDirectives: function (slots, tagName) {
            var slot = [];
            var innerDirValues;
            slot = slots.default ? slots.default() : slots;
            var items = {};
            items["" + tagName] = [];
            var _loop_2 = function (childSlot) {
                var tempObj = {};
                var tagRef = childSlot.type.methods ? childSlot.type.methods.getTag() : tagName;
                if (childSlot.children) {
                    var key = void 0;
                    innerDirValues = this_2.resolveComplexDirs(childSlot.children, this_2.tagMapper["e-" + tagName], tagRef);
                    if (innerDirValues.length) {
                        tempObj = innerDirValues;
                    }
                    else {
                        for (var i = 0; i < Object.keys(innerDirValues).length; i++) {
                            key = Object.keys(innerDirValues)[parseInt(i.toString(), 10)];
                            tempObj["" + key] = innerDirValues["" + key];
                        }
                    }
                }
                if (childSlot.props) {
                    Object.keys(childSlot.props).forEach(function (key) {
                        var propName = key.replace(/-[a-z]/g, function (e) { return e[1].toUpperCase(); });
                        if (propName) {
                            tempObj["" + propName] = childSlot.props["" + key];
                        }
                    });
                }
                if (((/[s]\b/).test(tagRef) && innerDirValues) && (!(/[s]\b/).test(tagName) || innerDirValues.length)) {
                    Array.isArray(tempObj) ? tempObj.forEach(function (item) { items["" + tagName].push(item); }) : items["" + tagName].push(tempObj);
                }
                else if (tempObj && Object.keys(tempObj).length !== 0) {
                    items["" + tagName].push(tempObj);
                }
            };
            var this_2 = this;
            for (var _i = 0, slot_1 = slot; _i < slot_1.length; _i++) {
                var childSlot = slot_1[_i];
                _loop_2(childSlot);
            }
            return items;
        },
        resolveComplexDirs: function (slots, tagObject, tagName) {
            var slot = [];
            var innerDirValues;
            slot = slots.default ? slots.default() : slots;
            var items = {};
            var _loop_3 = function (childSlot) {
                var tagRef = void 0;
                var tag = void 0;
                if (tagObject["" + tagName]) {
                    tagRef = Object.keys(tagObject["" + tagName]);
                    tag = tagRef.find(function (key) {
                        return tagObject["" + tagName]["" + key] ===
                            childSlot.type.methods.getTag().replace(/[s]\b/, "");
                    });
                    var moduleName = this_3.ej2Instances.getModuleName().toLowerCase();
                    tag = tag
                        ? tag.replace("e-", "")
                        : childSlot.type.methods.getTag().replace(moduleName === "ribbon" ? "e-ribbon-" : "e-", "");
                    if (this_3.ej2Instances.getModuleName().toLowerCase() == "diagram" && tag.indexOf('annotations') != -1) {
                        tag = 'annotations';
                    }
                }
                if (childSlot.children) {
                    innerDirValues = this_3.resolveComplexInnerDirs(childSlot.children, tagObject["" + tagName], childSlot.type.methods.getTag());
                    if (!items["" + tag]) {
                        items["" + tag] = [];
                    }
                    if (innerDirValues.length > 1) {
                        items["" + tag] = innerDirValues;
                    }
                    else {
                        items["" + tag].push(innerDirValues);
                    }
                }
                if (childSlot.props) {
                    childSlot.props = this_3.getCamelCaseProps(childSlot.props);
                }
                if (slot.length > 1) {
                    items = Object.keys(items).length == 0 && !items.length ? [] : items;
                    if (childSlot.props) {
                        items.push(childSlot.props);
                    }
                }
                else {
                    items = childSlot.props ? Object.assign(items, childSlot.props) : items;
                }
            };
            var this_3 = this;
            for (var _i = 0, slot_2 = slot; _i < slot_2.length; _i++) {
                var childSlot = slot_2[_i];
                _loop_3(childSlot);
            }
            return items;
        },
        resolveComplexInnerDirs: function (slots, tagObject, tagName) {
            var slot = [];
            var innerDirValues;
            slot = slots.default ? slots.default() : slots;
            var items = slot.length > 1 ? [] : {};
            for (var _i = 0, slot_3 = slot; _i < slot_3.length; _i++) {
                var childSlot = slot_3[_i];
                var isRibbon = (this.ej2Instances.getModuleName().toLowerCase() == "ribbon");
                var tag = childSlot.type.methods.getTag().replace(isRibbon ? "e-ribbon-" : "e-", "");
                if (childSlot.children) {
                    innerDirValues = this.resolveMultilevelComplexInnerDirs(childSlot.children, tagObject["" + tagName], childSlot.type.methods.getTag());
                    if ((/[s]\b/).test(tag) || slot.length > 1) {
                        if ((/[s]\b/).test(tag)) {
                            items["" + tag] = !items["" + tag] ? [] : items["" + tag];
                            if (innerDirValues.length) {
                                items["" + tag] = innerDirValues;
                            }
                            else {
                                items["" + tag].push(innerDirValues);
                            }
                        }
                        else if (innerDirValues && !(isRibbon && innerDirValues.hasOwnProperty('collections'))) {
                            items.push(innerDirValues);
                        }
                    }
                    else {
                        items = innerDirValues ? innerDirValues : items;
                    }
                }
                if (childSlot.props) {
                    childSlot.props = this.getCamelCaseProps(childSlot.props);
                }
                if (slot.length > 1 && childSlot.props) {
                    if (isRibbon && innerDirValues && innerDirValues.hasOwnProperty('collections')) {
                        innerDirValues = childSlot.props ? Object.assign(innerDirValues, childSlot.props) : innerDirValues;
                        items.push(innerDirValues);
                    }
                    else if (items.length >= 0) {
                        items.push(childSlot.props);
                    }
                    else {
                        items = childSlot.props ? Object.assign(items, childSlot.props) : items;
                    }
                }
                else {
                    items = childSlot.props ? Object.assign(items, childSlot.props) : items;
                }
            }
            return items;
        },
        resolveMultilevelComplexInnerDirs: function (slots, tagObject, tagName) {
            var slot = [];
            var innerDirValues;
            slot = slots.default ? slots.default() : slots;
            var items = slot.length > 1 ? [] : {};
            for (var _i = 0, slot_4 = slot; _i < slot_4.length; _i++) {
                var childSlot = slot_4[_i];
                var moduleName = this.ej2Instances.getModuleName().toLowerCase();
                var tag = childSlot.type.methods.getTag().replace(moduleName === "ribbon" ? "e-ribbon-" : "e-", "");
                if (childSlot.children) {
                    innerDirValues = this.resolveComplexInnerDirs(childSlot.children, tagObject["" + tagName], childSlot.type.methods.getTag());
                }
                if (childSlot.props) {
                    childSlot.props = this.getCamelCaseProps(childSlot.props);
                }
                if ((/[s]\b/).test(tag)) {
                    items["" + tag] = !items["" + tag] ? [] : items["" + tag];
                    if (innerDirValues.length) {
                        items["" + tag] = innerDirValues;
                    }
                    else {
                        items["" + tag].push(innerDirValues);
                    }
                    if (childSlot.props) {
                        items["" + tag].push(childSlot.props);
                    }
                }
                else {
                    items = innerDirValues;
                    items = childSlot.props ? Object.assign(items, childSlot.props) : items;
                }
            }
            return items;
        },
        getDirectiveValues: function (tagDirectives, tagMapper, tagNameMapper) {
            var keyTags = Object.keys(tagMapper);
            var dir = {};
            if (tagDirectives) {
                for (var _i = 0, tagDirectives_1 = tagDirectives; _i < tagDirectives_1.length; _i++) {
                    var tagDirective = tagDirectives_1[_i];
                    if (tagDirective.componentOptions && tagDirective.componentOptions.children && tagDirective.componentOptions.tag ||
                        (tagDirective.tag === 'e-seriescollection' && tagDirective.children)) {
                        var dirTag = tagDirective.componentOptions ? tagDirective.componentOptions.tag : tagDirective.tag;
                        dirTag = (dirTag === 'e-seriescollection') ? 'e-seriesCollection' : dirTag;
                        if (keyTags.indexOf(dirTag) !== -1) {
                            var tagName = tagNameMapper["" + dirTag] ? tagNameMapper["" + dirTag] : dirTag;
                            dir[tagName.replace('e-', '')] = [];
                            var children = tagDirective.componentOptions ? tagDirective.componentOptions.children : tagDirective.children;
                            for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
                                var tagDirChild = children_1[_a];
                                var retObj = this.getVNodeValue(tagDirChild, tagMapper["" + dirTag], tagNameMapper);
                                if (Object.keys(retObj).length !== 0) {
                                    dir[tagName.replace('e-', '')].push(retObj);
                                }
                            }
                        }
                    }
                }
            }
            return dir;
        },
        getMultiLevelDirValue: function (tagDirectories, tagKey, tagNameMapper) {
            var mulObj = {};
            for (var _i = 0, tagDirectories_1 = tagDirectories; _i < tagDirectories_1.length; _i++) {
                var tagDir = tagDirectories_1[_i];
                var key = void 0;
                var children = void 0;
                if (tagDir.componentOptions) {
                    key = tagDir.componentOptions.tag;
                    if (tagDir.componentOptions.children) {
                        children = tagDir.componentOptions.children;
                    }
                }
                else if ((tagDir.tag === 'e-markersettings' || tagDir.tag === 'e-markersetting') && tagDir.children) {
                    key = (tagDir.tag === 'e-markersettings') ? 'e-markerSettings' : 'e-markerSetting';
                    children = tagDir.children;
                }
                if (key) {
                    var tagName = tagNameMapper["" + key] ? tagNameMapper["" + key] : key;
                    mulObj[tagName.replace('e-', '')] = [];
                    if (children) {
                        for (var _a = 0, children_2 = children; _a < children_2.length; _a++) {
                            var tagDirChild = children_2[_a];
                            var mulLevObj = this.getVNodeValue(tagDirChild, tagKey["" + key], tagNameMapper);
                            if (Object.keys(mulLevObj).length !== 0) {
                                mulObj[tagName.replace('e-', '')].push(mulLevObj);
                            }
                        }
                    }
                }
            }
            return mulObj;
        },
        getVNodeValue: function (tagDirective, tagKey, tagNameMapper) {
            var ret = {};
            if (tagDirective.componentOptions || ((tagDirective.tag === 'e-markersettings' || tagDirective.tag === 'e-markersetting') && tagDirective.context)) {
                var dirTag = void 0;
                if (tagDirective.componentOptions) {
                    dirTag = tagDirective.componentOptions.tag;
                }
                else {
                    dirTag = (tagDirective.tag === 'e-markersettings') ? 'e-markerSettings' : 'e-markerSetting';
                }
                if (typeof tagKey === 'string' && dirTag === tagKey && tagDirective.data) {
                    ret = tagDirective.data.attrs ? this.getCamelCaseProps(tagDirective.data.attrs) : this.getCamelCaseProps(tagDirective.data);
                }
                else if (typeof tagKey === 'object') {
                    if (tagDirective.componentOptions.children && (Object.keys(tagKey).indexOf(dirTag) !== -1)) {
                        ret = this.getMultiLevelDirValue(tagDirective.componentOptions.children, tagKey["" + dirTag], tagNameMapper);
                    }
                    else if (tagDirective.children && (Object.keys(tagKey).indexOf(dirTag) !== -1) && (dirTag === 'e-markersettings' || dirTag === 'e-markersetting')) {
                        ret = this.getMultiLevelDirValue(tagDirective.children, tagKey["" + dirTag], tagNameMapper);
                    }
                    if (tagDirective.data && tagDirective.data.attrs) {
                        ret = extend(ret, this.getCamelCaseProps(tagDirective.data.attrs));
                    }
                }
            }
            return ret;
        },
        /**
         * convert kebab case directive props to camel case
         */
        getCamelCaseProps: function (props) {
            var retProps = {};
            for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
                var prop = _a[_i];
                retProps[prop.replace(/-[a-z]/g, function (e) { return e[1].toUpperCase(); })] = props["" + prop];
            }
            return retProps;
        },
        dataBind: function () {
            this.ej2Instances.dataBind();
        },
        setProperties: function (arg, muteOnChange) {
            return this.ej2Instances.setProperties(arg, muteOnChange);
        },
    }
});
export function getProps(options) {
    if (options === void 0) { options = {}; }
    if (options.props) {
        var _loop_4 = function (prop) {
            (options.newprops || (options.newprops = {}))["" + prop] = {};
            (options.watch || (options.watch = {}))["" + prop] = function (newVal) {
                this.ej2Instances["" + prop] = newVal;
                if (this.dataBind && (options.name !== 'DateRangePickerComponent')) {
                    this.dataBind();
                }
            };
        };
        for (var _i = 0, _a = options.props; _i < _a.length; _i++) {
            var prop = _a[_i];
            _loop_4(prop);
        }
    }
    return [options.newprops, options.watch];
}
