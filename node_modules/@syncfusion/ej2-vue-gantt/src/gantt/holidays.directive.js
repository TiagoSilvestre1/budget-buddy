import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var HolidaysDirective = vueDefineComponent({
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
            return 'e-holidays';
        }
    }
});
export var HolidaysPlugin = {
    name: 'e-holidays',
    install: function (Vue) {
        Vue.component(HolidaysPlugin.name, HolidaysDirective);
    }
};
/**
 * `e-holidays` directive represent a holidays collection in Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```vue
 * <ejs-gantt :dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-holidays>
 *     <e-holiday from='02/20/2018' label='Holiday 1'/>
 *     <e-holiday from='05/15/2018' label='Holiday 2'/>
 *   </e-holidays>
 * </ejs-gantt>
 * ```
 */
export var HolidayDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-holidays';
        }
    }
});
export var HolidayPlugin = {
    name: 'e-holidays',
    install: function (Vue) {
        Vue.component(HolidayPlugin.name, HolidayDirective);
    }
};
