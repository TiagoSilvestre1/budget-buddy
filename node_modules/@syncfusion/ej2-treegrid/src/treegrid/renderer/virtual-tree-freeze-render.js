var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ColumnFreezeContentRenderer, FreezeContentRender, FreezeRowModelGenerator, RenderType } from '@syncfusion/ej2-grids';
import * as literals from '../base/constant';
import { ColumnVirtualFreezeRenderer, setDebounce, VirtualFreezeHdrRenderer, VirtualFreezeRenderer } from '@syncfusion/ej2-grids';
import { TreeInterSectionObserver, VirtualTreeContentRenderer } from './virtual-tree-content-render';
import { getValue } from '@syncfusion/ej2-base';
/**
 * VirtualTreeFreezeRenderer is used to render the virtual table within the frozen and movable content table
 *
 * @hidden
 */
var VirtualTreeFreezeRenderer = /** @class */ (function (_super) {
    __extends(VirtualTreeFreezeRenderer, _super);
    function VirtualTreeFreezeRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.addEventListener();
        return _this;
    }
    /**
     * @returns {void}
     * @hidden
     */
    VirtualTreeFreezeRenderer.prototype.renderTable = function () {
        this.freezeRowGenerator = new FreezeRowModelGenerator(this.parent);
        this.virtualRenderer = new VirtualTreeContentRenderer(this.parent, this.serviceLoc);
        this.virtualRenderer.header = this.serviceLoc.getService('rendererFactory')
            .getRenderer(RenderType.Header).virtualHdrRenderer;
        FreezeContentRender.prototype.renderTable.call(this);
        this.virtualRenderer.setPanel(this.parent.getContent());
        this.scrollbar = this.parent.getContent().querySelector('.e-movablescrollbar');
        var movableCont = this.getMovableContent();
        var minHeight = this.parent.height;
        this.virtualRenderer.virtualEle.content = this.virtualRenderer.content = this.getPanel().querySelector('.' + literals.content);
        this.virtualRenderer.virtualEle.content.style.overflowX = 'hidden';
        this.virtualRenderer.virtualEle.renderFrozenWrapper(minHeight);
        this.virtualRenderer.virtualEle.renderFrozenPlaceHolder();
        if (this.parent.enableColumnVirtualization) {
            this.virtualRenderer.virtualEle.movableContent = this.virtualRenderer.movableContent
                = this.getPanel().querySelector('.' + literals.movableContent);
            this.virtualRenderer.virtualEle.renderMovableWrapper(minHeight);
            this.virtualRenderer.virtualEle.renderMovablePlaceHolder();
            var tbl = movableCont.querySelector('table');
            this.virtualRenderer.virtualEle.movableTable = tbl;
            this.virtualRenderer.virtualEle.movableWrapper.appendChild(tbl);
            movableCont.appendChild(this.virtualRenderer.virtualEle.movableWrapper);
            movableCont.appendChild(this.virtualRenderer.virtualEle.movablePlaceholder);
        }
        this.virtualRenderer.virtualEle.wrapper.appendChild(this.getFrozenContent());
        this.virtualRenderer.virtualEle.wrapper.appendChild(movableCont);
        this.virtualRenderer.virtualEle.table = this.getTable();
        setDebounce(this.parent, this.virtualRenderer, this.scrollbar, this.getMovableContent());
    };
    /**
     * @param {HTMLElement} target - specifies the target
     * @param {DocumentFragment} newChild - specifies the newChild
     * @param {NotifyArgs} e - specifies the notifyargs
     * @returns {void}
     * @hidden
     */
    VirtualTreeFreezeRenderer.prototype.appendContent = function (target, newChild, e) {
        getValue('observer', this.virtualRenderer).options.debounceEvent = false;
        this.virtualRenderer['observers'] = new TreeInterSectionObserver(getValue('observer', this.virtualRenderer).element, getValue('observer', this.virtualRenderer).options, getValue('observer', this.virtualRenderer).movableEle);
        this.virtualRenderer['contents'] = this.getPanel().firstChild;
        _super.prototype.appendContent.call(this, target, newChild, e);
    };
    /**
     * @param {Object[]} data - specifies the data
     * @param {NotifyArgs} e - specifies the notifyargs
     * @returns {Row<Column>[]} returns the row
     * @hidden
     */
    VirtualTreeFreezeRenderer.prototype.generateRows = function (data, e) {
        return _super.prototype.generateRows.call(this, data, e);
    };
    return VirtualTreeFreezeRenderer;
}(VirtualFreezeRenderer));
export { VirtualTreeFreezeRenderer };
/**
 * ColumnVirtualTreeFreezeRenderer is used to render the virtual table within the frozen and movable content table
 *
 * @hidden
 */
var ColumnVirtualTreeFreezeRenderer = /** @class */ (function (_super) {
    __extends(ColumnVirtualTreeFreezeRenderer, _super);
    function ColumnVirtualTreeFreezeRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.serviceLoc = locator;
        _this.eventListener('on');
        return _this;
    }
    /**
     * @returns {void}
     * @hidden
     */
    ColumnVirtualTreeFreezeRenderer.prototype.renderTable = function () {
        this.virtualRenderer = new VirtualTreeContentRenderer(this.parent, this.serviceLoc);
        this.virtualRenderer.header = this.serviceLoc.getService('rendererFactory')
            .getRenderer(RenderType.Header).virtualHdrRenderer;
        this.freezeRowGenerator = new FreezeRowModelGenerator(this.parent);
        ColumnFreezeContentRenderer.prototype.renderTable.call(this);
        this.virtualRenderer.setPanel(this.parent.getContent());
        this.scrollbar = this.parent.getContent().querySelector('.e-movablescrollbar');
        var frozenRightCont = this.getFrozenRightContent();
        var frzCont = this.getFrozenContent();
        var movableCont = this.getMovableContent();
        if (this.parent.getFrozenMode() === 'Right') {
            frzCont = frozenRightCont;
        }
        this.virtualRenderer.virtualEle.content = this.virtualRenderer.content = this.getPanel().querySelector('.' + literals.content);
        this.virtualRenderer.virtualEle.content.style.overflowX = 'hidden';
        var minHeight = this.parent.height;
        this.virtualRenderer.virtualEle.renderFrozenWrapper(minHeight);
        this.virtualRenderer.virtualEle.renderFrozenPlaceHolder();
        _super.prototype['renderVirtualFrozenLeft'].call(this, frzCont, movableCont);
        _super.prototype['renderVirtualFrozenRight'].call(this, frzCont, movableCont);
        _super.prototype['renderVirtualFrozenLeftRight'].call(this, frzCont, movableCont, frozenRightCont);
        this.virtualRenderer.virtualEle.table = this.getTable();
        setDebounce(this.parent, this.virtualRenderer, this.scrollbar, this.getMovableContent());
    };
    ColumnVirtualTreeFreezeRenderer.prototype.appendContent = function (target, newChild, e) {
        getValue('observer', this.virtualRenderer).options.debounceEvent = false;
        this.virtualRenderer['observers'] = new TreeInterSectionObserver(getValue('observer', this.virtualRenderer).element, getValue('observer', this.virtualRenderer).options, getValue('observer', this.virtualRenderer).movableEle);
        this.virtualRenderer['contents'] = this.getPanel().firstChild;
        _super.prototype.appendContent.call(this, target, newChild, e);
    };
    return ColumnVirtualTreeFreezeRenderer;
}(ColumnVirtualFreezeRenderer));
export { ColumnVirtualTreeFreezeRenderer };
/**
 * VirtualTreeFreezeHdrRenderer is used to render the virtual table within the frozen and movable header table
 *
 * @hidden
 */
var VirtualTreeFreezeHdrRenderer = /** @class */ (function (_super) {
    __extends(VirtualTreeFreezeHdrRenderer, _super);
    function VirtualTreeFreezeHdrRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @returns {void}
     * @hidden
     */
    VirtualTreeFreezeHdrRenderer.prototype.renderTable = function () {
        _super.prototype.renderTable.call(this);
    };
    VirtualTreeFreezeHdrRenderer.prototype.rfshMovable = function () {
        _super.prototype.rfshMovable.call(this);
    };
    return VirtualTreeFreezeHdrRenderer;
}(VirtualFreezeHdrRenderer));
export { VirtualTreeFreezeHdrRenderer };
