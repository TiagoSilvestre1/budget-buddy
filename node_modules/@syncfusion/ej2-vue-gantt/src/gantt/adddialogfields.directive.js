import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var AddDialogFieldsDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-add-dialog-fields';
        }
    }
});
export var AddDialogFieldsPlugin = {
    name: 'e-add-dialog-fields',
    install: function (Vue) {
        Vue.component(AddDialogFieldsPlugin.name, AddDialogFieldsDirective);
    }
};
/**
 * `e-add-dialog-fields` directive represent a add dialog fields in VueJS Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```vue
 * <ejs-gantt :dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-add-dialog-fields>
 *     <e-add-dialog-field type='General' headerText='General'/>
 *     <e-add-dialog-field type='Dependency' headerText='Dependency'/>
 *   </e-add-dialog-fields>
 * </ejs-gantt>
 * ```
 */
export var AddDialogFieldDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-add-dialog-field';
        }
    }
});
export var AddDialogFieldPlugin = {
    name: 'e-add-dialog-field',
    install: function (Vue) {
        Vue.component(AddDialogFieldPlugin.name, AddDialogFieldDirective);
    }
};
