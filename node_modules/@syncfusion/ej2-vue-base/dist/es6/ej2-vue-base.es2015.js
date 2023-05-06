import * as Vue from 'vue';
import { createElement, detach, extend, getTemplateEngine, getUniqueID, getValue, isNullOrUndefined, setTemplateEngine } from '@syncfusion/ej2-base';

/**
 * Vue Component Base
 */
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) {
    return obj;
}
else {
    let newObj = {};
    if (obj != null) {
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
                newObj[`${key}`] = obj[`${key}`];
        }
    }
    newObj.default = obj;
    return newObj;
} }
const curVue = _interopRequireWildcard(Vue);
const isExecute = (parseInt(curVue['version']) > 2) ? false : true;
const aVue = !isExecute ? curVue : (curVue['default']['default'] ? curVue['default']['default'] : curVue['default']);
const gh = curVue['h'];
let vueDefineComponent = (options) => { return !isExecute ? aVue['defineComponent'](options) : aVue['extend'](options); };
let ComponentBase = vueDefineComponent({
    name: 'ComponentBase',
    data() {
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
    created() {
        if (this.ej2Instance) {
            this.ej2Instances = this.isVue3 ? aVue.toRaw(this.ej2Instance) : this.ej2Instance;
        }
        if (!this.propKeys) {
            return;
        }
        for (let prop of this.propKeys) {
            this.ej2Instances.addEventListener(prop, (args) => {
                this.$emit(prop, args);
            });
        }
        let injectables = getValue('$root.$options.provide', this);
        let vueInjectables = getValue('$parent.$options.provide', this);
        vueInjectables = !isNullOrUndefined(vueInjectables) ? vueInjectables : getValue('$.parent.provides', this);
        if (this.hasInjectedModules && !isExecute) {
            let prevModule = [];
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
            let curModule = this.ej2Instances.getInjectedModules() || [];
            for (let mod of curModule) {
                if (prevModule.indexOf(mod) === -1) {
                    prevModule.push(mod);
                }
            }
            this.ej2Instances.injectedModules = prevModule;
        }
    },
    mounted() {
        let cusEle = this.$el ? this.$el.querySelectorAll("div.e-directive") : null;
        if (!isExecute && cusEle) {
            for (let i = 0; i < cusEle.length; i++) {
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
    updated() {
        if (this.isVue3) {
            this.setModelValue();
        }
        if (this.hasChildDirective) {
            let childKey = {};
            this.fetchChildPropValues(childKey);
            let curChildDir = JSON.stringify(childKey);
            if (this.childDirObjects !== curChildDir) {
                this.childDirObjects = curChildDir;
                this.assignValueToWrapper(childKey, false);
            }
        }
    },
    beforeDestroy() {
        this.destroyComponent();
    },
    beforeUnmount() {
        this.destroyComponent();
    },
    methods: {
        setModelValue() {
            if (!isNullOrUndefined(this.modelValue) || !isNullOrUndefined(this.$attrs.modelValue)) {
                const key = this.models.toString().match(/checked|value/) || [];
                const propKey = key[0];
                if (!isNullOrUndefined(propKey)) {
                    this.ej2Instances[`${propKey}`] = !isNullOrUndefined(this.modelValue) ? this.modelValue : this.$attrs.modelValue;
                }
            }
        },
        updated() {
            if (this.isVue3) {
                this.setModelValue();
            }
            if (this.hasChildDirective) {
                let childKey = {};
                this.fetchChildPropValues(childKey);
                let curChildDir = JSON.stringify(childKey);
                if (this.childDirObjects !== curChildDir) {
                    this.childDirObjects = curChildDir;
                    this.assignValueToWrapper(childKey, false);
                }
            }
        },
        getInjectedServices() {
            let ret = [];
            let provide;
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
                let injectables = provide;
                if (typeof provide === 'function') {
                    if (provide.managed) {
                        let provideKey = provide.managed;
                        let provideValue = Object.keys(provideKey);
                        let key;
                        if (this.$root && this.isDecorator) {
                            key = Object.keys(this.$root);
                        }
                        else if (this.$vnode) {
                            key = Object.keys(this.$vnode.context);
                        }
                        else if (this.$parent) {
                            key = Object.keys(this.$parent);
                        }
                        for (let i = 0; i < provideValue.length; i++) {
                            for (let j = 0; j < key.length; j++) {
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
        destroyComponent() {
            let tempBeforeDestroyThis = this;
            tempBeforeDestroyThis.ej2Instances.destroy();
            tempBeforeDestroyThis.$el.style.visibility = 'hidden';
            tempBeforeDestroyThis = null;
        },
        bindProperties() {
            let options = {};
            for (let prop of this.propKeys) {
                if (!isNullOrUndefined(this[`${prop}`])) {
                    options[`${prop}`] = this[`${prop}`];
                }
                else if (this[0] && !isNullOrUndefined(this[0][0]) && !isNullOrUndefined(this[0][0][`${prop}`])) {
                    options[`${prop}`] = this[0][0][`${prop}`];
                }
            }
            if (this.hasChildDirective) {
                this.fetchChildPropValues(options);
            }
            if (this.hasInjectedModules) {
                let prevModule = this.getInjectedServices() || [];
                let curModule = this.ej2Instances.getInjectedModules() || [];
                for (let mod of curModule) {
                    if (prevModule.indexOf(mod) === -1) {
                        prevModule.push(mod);
                    }
                }
                this.ej2Instances.injectedModules = prevModule;
            }
            this.assignValueToWrapper(options);
        },
        assignValueToWrapper(option, silent) {
            this.ej2Instances.setProperties(extend({}, {}, option, true), isNullOrUndefined(silent) ? true : silent);
        },
        fetchChildPropValues(childOption) {
            let dirProps = {};
            if (!this.isVue3) {
                dirProps = this.getDirectiveValues(this.$slots.default, this.tagMapper || {}, this.tagNameMapper || {});
            }
            else {
                let propRef;
                if (this[0] && this[0][1].slots.default) {
                    propRef = this[0][1].slots.default();
                }
                else if (this && this.$ && this.$.slots && this.$.slots.default) {
                    propRef = this.$.slots.default();
                }
                if (propRef) {
                    for (let i = 0; i < propRef.length; i++) {
                        if (propRef[parseInt(i.toString(), 10)].type.methods || propRef[parseInt(i.toString(), 10)].type === 'e-seriescollection') {
                            let key = propRef[parseInt(i.toString(), 10)].type === 'e-seriescollection' ? 'series-collection' :
                                propRef[parseInt(i.toString(), 10)].type.methods.getTag().replace("e-", "");
                            let ref = this.resolveArrayDirectives(propRef[parseInt(i.toString(), 10)].children, key);
                            let splitKeys = key.split('-');
                            let controlName = this.ej2Instances.getModuleName().toLowerCase();
                            let keyRef = (splitKeys.length > 1 && controlName.indexOf(splitKeys[0]) > -1) ? splitKeys[1] : splitKeys[0];
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
                            dirProps[`${keyRef}`] = ref[`${key}`];
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
            for (let dirProp of Object.keys(dirProps)) {
                childOption[`${dirProp}`] = dirProps[`${dirProp}`];
            }
        },
        resolveArrayDirectives(slots, tagName) {
            let slot = [];
            let innerDirValues;
            slot = slots.default ? slots.default() : slots;
            let items = {};
            items[`${tagName}`] = [];
            for (const childSlot of slot) {
                let tempObj = {};
                let tagRef = childSlot.type.methods ? childSlot.type.methods.getTag() : tagName;
                if (childSlot.children) {
                    let key;
                    innerDirValues = this.resolveComplexDirs(childSlot.children, this.tagMapper["e-" + tagName], tagRef);
                    if (innerDirValues.length) {
                        tempObj = innerDirValues;
                    }
                    else {
                        for (var i = 0; i < Object.keys(innerDirValues).length; i++) {
                            key = Object.keys(innerDirValues)[parseInt(i.toString(), 10)];
                            tempObj[`${key}`] = innerDirValues[`${key}`];
                        }
                    }
                }
                if (childSlot.props) {
                    Object.keys(childSlot.props).forEach((key) => {
                        let propName = key.replace(/-[a-z]/g, (e) => { return e[1].toUpperCase(); });
                        if (propName) {
                            tempObj[`${propName}`] = childSlot.props[`${key}`];
                        }
                    });
                }
                if (((/[s]\b/).test(tagRef) && innerDirValues) && (!(/[s]\b/).test(tagName) || innerDirValues.length)) {
                    Array.isArray(tempObj) ? tempObj.forEach((item) => { items[`${tagName}`].push(item); }) : items[`${tagName}`].push(tempObj);
                }
                else if (tempObj && Object.keys(tempObj).length !== 0) {
                    items[`${tagName}`].push(tempObj);
                }
            }
            return items;
        },
        resolveComplexDirs(slots, tagObject, tagName) {
            let slot = [];
            let innerDirValues;
            slot = slots.default ? slots.default() : slots;
            let items = {};
            for (const childSlot of slot) {
                let tagRef;
                let tag;
                if (tagObject[`${tagName}`]) {
                    tagRef = Object.keys(tagObject[`${tagName}`]);
                    tag = tagRef.find((key) => tagObject[`${tagName}`][`${key}`] ===
                        childSlot.type.methods.getTag().replace(/[s]\b/, ""));
                    const moduleName = this.ej2Instances.getModuleName().toLowerCase();
                    tag = tag
                        ? tag.replace("e-", "")
                        : childSlot.type.methods.getTag().replace(moduleName === "ribbon" ? "e-ribbon-" : "e-", "");
                    if (this.ej2Instances.getModuleName().toLowerCase() == "diagram" && tag.indexOf('annotations') != -1) {
                        tag = 'annotations';
                    }
                }
                if (childSlot.children) {
                    innerDirValues = this.resolveComplexInnerDirs(childSlot.children, tagObject[`${tagName}`], childSlot.type.methods.getTag());
                    if (!items[`${tag}`]) {
                        items[`${tag}`] = [];
                    }
                    if (innerDirValues.length > 1) {
                        items[`${tag}`] = innerDirValues;
                    }
                    else {
                        items[`${tag}`].push(innerDirValues);
                    }
                }
                if (childSlot.props) {
                    childSlot.props = this.getCamelCaseProps(childSlot.props);
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
            }
            return items;
        },
        resolveComplexInnerDirs(slots, tagObject, tagName) {
            let slot = [];
            let innerDirValues;
            slot = slots.default ? slots.default() : slots;
            let items = slot.length > 1 ? [] : {};
            for (const childSlot of slot) {
                let isRibbon = (this.ej2Instances.getModuleName().toLowerCase() == "ribbon");
                let tag = childSlot.type.methods.getTag().replace(isRibbon ? "e-ribbon-" : "e-", "");
                if (childSlot.children) {
                    innerDirValues = this.resolveMultilevelComplexInnerDirs(childSlot.children, tagObject[`${tagName}`], childSlot.type.methods.getTag());
                    if ((/[s]\b/).test(tag) || slot.length > 1) {
                        if ((/[s]\b/).test(tag)) {
                            items[`${tag}`] = !items[`${tag}`] ? [] : items[`${tag}`];
                            if (innerDirValues.length) {
                                items[`${tag}`] = innerDirValues;
                            }
                            else {
                                items[`${tag}`].push(innerDirValues);
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
        resolveMultilevelComplexInnerDirs(slots, tagObject, tagName) {
            let slot = [];
            let innerDirValues;
            slot = slots.default ? slots.default() : slots;
            let items = slot.length > 1 ? [] : {};
            for (const childSlot of slot) {
                const moduleName = this.ej2Instances.getModuleName().toLowerCase();
                let tag = childSlot.type.methods.getTag().replace(moduleName === "ribbon" ? "e-ribbon-" : "e-", "");
                if (childSlot.children) {
                    innerDirValues = this.resolveComplexInnerDirs(childSlot.children, tagObject[`${tagName}`], childSlot.type.methods.getTag());
                }
                if (childSlot.props) {
                    childSlot.props = this.getCamelCaseProps(childSlot.props);
                }
                if ((/[s]\b/).test(tag)) {
                    items[`${tag}`] = !items[`${tag}`] ? [] : items[`${tag}`];
                    if (innerDirValues.length) {
                        items[`${tag}`] = innerDirValues;
                    }
                    else {
                        items[`${tag}`].push(innerDirValues);
                    }
                    if (childSlot.props) {
                        items[`${tag}`].push(childSlot.props);
                    }
                }
                else {
                    items = innerDirValues;
                    items = childSlot.props ? Object.assign(items, childSlot.props) : items;
                }
            }
            return items;
        },
        getDirectiveValues(tagDirectives, tagMapper, tagNameMapper) {
            let keyTags = Object.keys(tagMapper);
            let dir = {};
            if (tagDirectives) {
                for (let tagDirective of tagDirectives) {
                    if (tagDirective.componentOptions && tagDirective.componentOptions.children && tagDirective.componentOptions.tag ||
                        (tagDirective.tag === 'e-seriescollection' && tagDirective.children)) {
                        let dirTag = tagDirective.componentOptions ? tagDirective.componentOptions.tag : tagDirective.tag;
                        dirTag = (dirTag === 'e-seriescollection') ? 'e-seriesCollection' : dirTag;
                        if (keyTags.indexOf(dirTag) !== -1) {
                            let tagName = tagNameMapper[`${dirTag}`] ? tagNameMapper[`${dirTag}`] : dirTag;
                            dir[tagName.replace('e-', '')] = [];
                            let children = tagDirective.componentOptions ? tagDirective.componentOptions.children : tagDirective.children;
                            for (let tagDirChild of children) {
                                let retObj = this.getVNodeValue(tagDirChild, tagMapper[`${dirTag}`], tagNameMapper);
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
        getMultiLevelDirValue(tagDirectories, tagKey, tagNameMapper) {
            let mulObj = {};
            for (let tagDir of tagDirectories) {
                let key;
                let children;
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
                    let tagName = tagNameMapper[`${key}`] ? tagNameMapper[`${key}`] : key;
                    mulObj[tagName.replace('e-', '')] = [];
                    if (children) {
                        for (let tagDirChild of children) {
                            let mulLevObj = this.getVNodeValue(tagDirChild, tagKey[`${key}`], tagNameMapper);
                            if (Object.keys(mulLevObj).length !== 0) {
                                mulObj[tagName.replace('e-', '')].push(mulLevObj);
                            }
                        }
                    }
                }
            }
            return mulObj;
        },
        getVNodeValue(tagDirective, tagKey, tagNameMapper) {
            let ret = {};
            if (tagDirective.componentOptions || ((tagDirective.tag === 'e-markersettings' || tagDirective.tag === 'e-markersetting') && tagDirective.context)) {
                let dirTag;
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
                        ret = this.getMultiLevelDirValue(tagDirective.componentOptions.children, tagKey[`${dirTag}`], tagNameMapper);
                    }
                    else if (tagDirective.children && (Object.keys(tagKey).indexOf(dirTag) !== -1) && (dirTag === 'e-markersettings' || dirTag === 'e-markersetting')) {
                        ret = this.getMultiLevelDirValue(tagDirective.children, tagKey[`${dirTag}`], tagNameMapper);
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
        getCamelCaseProps(props) {
            let retProps = {};
            for (let prop of Object.keys(props)) {
                retProps[prop.replace(/-[a-z]/g, (e) => { return e[1].toUpperCase(); })] = props[`${prop}`];
            }
            return retProps;
        },
        dataBind() {
            this.ej2Instances.dataBind();
        },
        setProperties(arg, muteOnChange) {
            return this.ej2Instances.setProperties(arg, muteOnChange);
        },
    }
});
function getProps(options = {}) {
    if (options.props) {
        for (let prop of options.props) {
            (options.newprops || (options.newprops = {}))[`${prop}`] = {};
            (options.watch || (options.watch = {}))[`${prop}`] = function (newVal) {
                this.ej2Instances[`${prop}`] = newVal;
                if (this.dataBind && (options.name !== 'DateRangePickerComponent')) {
                    this.dataBind();
                }
            };
        }
    }
    return [options.newprops, options.watch];
}

// tslint:disable:no-any
let stringCompiler = getTemplateEngine();
function compile(templateElement, helper) {
    let that = this;
    return (data, context, propName, element, root) => {
        let returnEle;
        if (context) {
            let plugins = context.vueInstance ? context.vueInstance.plugins : null;
            let pid = getUniqueID("templateParentDiv");
            let id = getUniqueID("templateDiv");
            let ele = createElement("div", {
                id: pid,
                innerHTML: '<div id="' + id + '"></div>',
            });
            document.body.appendChild(ele);
            if (!isExecute && typeof templateElement === "string") {
                let vueSlot = getCurrentVueSlot(context.vueInstance, templateElement, root);
                if (vueSlot) {
                    // Compilation for Vue 3 slot template
                    let app = aVue.createApp({
                        render() {
                            return vueSlot[`${templateElement}`]({ data: data });
                        }
                    });
                    if (plugins) {
                        for (let i = 0; i < plugins.length; i++) {
                            app.use(plugins[parseInt(i.toString(), 10)]);
                        }
                    }
                    // Get values for Vue 3 slot template
                    getValues(app, context.vueInstance, root);
                    app.mount("#" + pid);
                    returnEle = ele.childNodes;
                    detach(ele);
                }
                else {
                    // Compilation for Vue 3 string template
                    detach(ele);
                    return stringCompiler(templateElement, helper)(data);
                }
            }
            else if (!isExecute) {
                // Compilation for Vue 3 functional template
                let tempObj = templateElement.call(that, {});
                let object = tempObj;
                let propsData = getValue("template.propsData", tempObj);
                let dataObj = {
                    data: { data: extend(tempObj.data || {}, data) },
                    parent: context.vueInstance,
                };
                if (!object.template) {
                    object.template = object[Object.keys(object)[0]];
                }
                let templateCompRef;
                if (object.template.extends) {
                    templateCompRef = object.template.extends._context.components.template;
                }
                else {
                    templateCompRef = object.template._context.components[templateElement.name];
                    if (!templateCompRef) {
                        let key = Object.keys(object.template._context.components)[0];
                        templateCompRef = object.template._context.components[`${key}`];
                    }
                }
                let tempRef;
                if (propsData) {
                    tempRef = Object.assign(templateCompRef.data(), propsData);
                }
                else {
                    tempRef = Object.assign(templateCompRef.data(), dataObj.data);
                    if (templateCompRef.components) {
                        let objkeys = Object.keys(templateCompRef.components) || [];
                        for (let objstring of objkeys) {
                            let intComponent = templateCompRef.components[`${objstring}`];
                            if (intComponent && intComponent.data) {
                                if (!intComponent.__data)
                                    intComponent.__data = intComponent.data;
                                intComponent.data = function (proxy) { return Object.assign(intComponent.__data.call(proxy), dataObj.data); };
                            }
                        }
                    }
                }
                templateCompRef.data = function () { return tempRef; };
                let app = aVue.createApp(templateCompRef);
                if (plugins) {
                    for (let i = 0; i < plugins.length; i++) {
                        app.use(plugins[parseInt(i.toString(), 10)]);
                    }
                }
                // Get values for Vue 3 functional template
                getValues(app, context.vueInstance, root);
                app.mount("#" + pid);
                returnEle = ele.childNodes;
                detach(ele);
            }
            else if (typeof templateElement === "string") {
                let vueSlot = getVueSlot(context.vueInstance, templateElement, root);
                if (vueSlot) {
                    // Get provide values for Vue 2 slot template
                    let provided = {};
                    let getProvideValues = (vueinstance) => {
                        if (vueinstance['$parent'])
                            getProvideValues(vueinstance.$parent);
                        if (vueinstance['_provided'] && Object.keys(vueinstance['_provided']).length > 0) {
                            provided = Object.assign({}, provided, vueinstance._provided);
                        }
                    };
                    let vueInstance = context.vueInstance ? context.vueInstance : ((root && root.vueInstance) ? root.vueInstance : null);
                    if (vueInstance) {
                        getProvideValues(vueInstance);
                    }
                    // Compilation for Vue 2 slot template
                    let vueTemplate = new aVue({
                        provide: Object.assign({}, provided),
                        render() {
                            return vueSlot[`${templateElement}`]({ data: data });
                        }
                    });
                    vueTemplate.$mount("#" + id);
                    returnEle = ele.childNodes;
                    detach(ele);
                }
                else {
                    // Compilation for Vue 2 string template
                    detach(ele);
                    return stringCompiler(templateElement, helper)(data);
                }
            }
            else {
                // Compilation for Vue 2 functional template
                let tempObj = templateElement.call(that, {});
                let templateFunction = tempObj.template;
                let propsData = getValue("template.propsData", tempObj);
                let dataObj = {
                    data: { data: extend(tempObj.data || {}, data) },
                    parent: context.vueInstance,
                };
                if (propsData) {
                    templateFunction = tempObj.template.extends;
                    dataObj.propsData = propsData;
                }
                if (typeof templateFunction !== "function") {
                    templateFunction = aVue.extend(templateFunction);
                }
                let templateVue = new templateFunction(dataObj);
                // let templateVue = new Vue(tempObj.template);
                // templateVue.$data.data = extend(tempObj.data, data);
                templateVue.$mount("#" + id);
                returnEle = ele.childNodes;
                if (context.vueInstance) {
                    let templateInstance = context.vueInstance.templateCollection;
                    if (!templateInstance) {
                        context.vueInstance.templateCollection = {};
                        templateInstance = context.vueInstance.templateCollection;
                    }
                    if (propName) {
                        if (!templateInstance[`${propName}`]) {
                            templateInstance[`${propName}`] = [];
                        }
                        templateInstance[`${propName}`].push(returnEle[0]);
                    }
                }
                detach(ele);
            }
        }
        return returnEle || [];
    };
}
setTemplateEngine({ compile: compile });
function getValues(app, cInstance, root) {
    let vueInstance = cInstance ? cInstance : ((root && root.vueInstance) ? root.vueInstance : null);
    if (!vueInstance) {
        return;
    }
    // Get globally defined variables.
    let globalVariables = ['components', 'mixins', 'provides'];
    for (let i = 0; i < globalVariables.length; i++) {
        let gVariable = globalVariables[i];
        if (app['_context'][gVariable] && vueInstance['$']['appContext'][gVariable]) {
            app['_context'][gVariable] = vueInstance['$']['appContext'][gVariable];
        }
    }
    // Get provide value from child component.
    let provided = {};
    let getProvideValue = (vueinstance) => {
        if (vueinstance['$'] && vueinstance['$']['parent'])
            getProvideValue(vueinstance.$.parent);
        if (vueinstance['provides'] && Object.keys(vueinstance['provides']).length > 0) {
            provided = Object.assign({}, provided, vueinstance.provides);
        }
    };
    getProvideValue(vueInstance);
    if (app['_context']['provides']) {
        app._context.provides = Object.assign({}, app._context.provides, provided);
    }
    // Get globally defined properties.
    if (app['_context']['config']['globalProperties'] && vueInstance['$']['appContext']['config']['globalProperties']) {
        app['_context']['config']['globalProperties'] = vueInstance['$']['appContext']['config']['globalProperties'];
    }
}
// Get the Vue2 slot template from the root or current Vue component.
function getVueSlot(vueInstance, templateElement, root) {
    if (!vueInstance && !(root && root.vueInstance)) {
        return undefined;
    }
    let instance = (root && root.vueInstance) ? root.vueInstance : vueInstance;
    return getVueChildSlot(instance, templateElement);
}
function getVueChildSlot(vueInstance, templateElement) {
    if (!vueInstance) {
        return undefined;
    }
    let slots = vueInstance.$slots;
    let scopedSlots = vueInstance.$scopedSlots;
    let vSlots = vueInstance.scopedSlots;
    let children = vueInstance.children;
    if (scopedSlots && scopedSlots[`${templateElement}`]) {
        return scopedSlots;
    }
    else if (slots && slots.default) {
        let childSlots = slots.default;
        for (let i = 0; i < childSlots.length; i++) {
            let slot = getVueChildSlot(getSlot(childSlots[parseInt(i.toString(), 10)]), templateElement);
            if (slot) {
                return slot;
            }
        }
    }
    else if (vSlots && vSlots[`${templateElement}`]) {
        return vSlots;
    }
    else if (children) {
        for (let i = 0; i < children.length; i++) {
            let slot = getVueChildSlot(getSlot(children[parseInt(i.toString(), 10)]), templateElement);
            if (slot) {
                return slot;
            }
        }
    }
    return undefined;
}
function getSlot(vnode) {
    let slot = (vnode.componentOptions && vnode.componentOptions.children) ? vnode.componentOptions :
        (!vnode.data && (vnode.tag === 'e-markersettings' || vnode.tag === 'e-markersetting')) ? vnode : vnode.data;
    return vnode.componentInstance ? vnode.componentInstance : slot;
}
// Get the Vue3 slot template from the root or current Vue component.
function getCurrentVueSlot(vueInstance, templateElement, root) {
    if (!vueInstance && !(root && root.vueInstance)) {
        return undefined;
    }
    let slots = (root && root.vueInstance) ? root.vueInstance.$slots : vueInstance.$slots;
    return getChildVueSlot(slots, templateElement);
}
function getChildVueSlot(slots, templateElement) {
    if (slots && slots[`${templateElement}`]) {
        return slots;
    }
    else if (slots && slots.default) {
        let childSlots = slots.default();
        for (let i = 0; i < childSlots.length; i++) {
            let slot = getChildVueSlot(childSlots[parseInt(i.toString(), 10)].children, templateElement);
            if (slot) {
                return slot;
            }
        }
    }
    return undefined;
}

/**
 * index for component base
 */

export { isExecute, aVue, gh, vueDefineComponent, ComponentBase, getProps, compile };
//# sourceMappingURL=ej2-vue-base.es2015.js.map
