import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var EditDialogFieldsDirective = vueDefineComponent({
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
            return 'e-edit-dialog-fields';
        }
    }
});
export var EditDialogFieldsPlugin = {
    name: 'e-edit-dialog-fields',
    install: function (Vue) {
        Vue.component(EditDialogFieldsPlugin.name, EditDialogFieldsDirective);
    }
};
/**
 * `e-edit-dialog-fields` directive represent a add dialog fields in VueJS Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```vue
 * <ejs-gantt :dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-edit-dialog-fields>
 *     <e-edit-dialog-field type='General' headerText='General'/>
 *     <e-edit-dialog-field type='Dependency' headerText='Dependency'/>
 *   </e-edit-dialog-fields>
 * </ejs-gantt>
 * ```
 */
export var EditDialogFieldDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-edit-dialog-field';
        }
    }
});
export var EditDialogFieldPlugin = {
    name: 'e-edit-dialog-field',
    install: function (Vue) {
        Vue.component(EditDialogFieldPlugin.name, EditDialogFieldDirective);
    }
};
