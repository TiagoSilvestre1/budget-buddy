import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var EventMarkersDirective = vueDefineComponent({
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
            return 'e-event-markers';
        }
    }
});
export var EventMarkersPlugin = {
    name: 'e-event-markers',
    install: function (Vue) {
        Vue.component(EventMarkersPlugin.name, EventMarkersDirective);
    }
};
/**
 * `e-event-markers` directive represent a event marker collection in Gantt
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```vue
 * <ejs-gantt :dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-event-markers>
 *     <e-event-marker day='02/10/2018' label='Project Starts'/>
 *   </e-event-markers>
 * </ejs-gantt>
 * ```
 */
export var EventMarkerDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-event-marker';
        }
    }
});
export var EventMarkerPlugin = {
    name: 'e-event-marker',
    install: function (Vue) {
        Vue.component(EventMarkerPlugin.name, EventMarkerDirective);
    }
};
