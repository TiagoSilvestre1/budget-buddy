import { ColumnFreezeContentRenderer, ColumnFreezeHeaderRenderer, FreezeRender, parentsUntil, RenderType } from '@syncfusion/ej2-grids';
import { Grid, Freeze as FreezeColumn } from '@syncfusion/ej2-grids';
import { addClass, getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ColumnVirtualTreeFreezeRenderer, VirtualTreeFreezeRenderer, VirtualTreeFreezeHdrRenderer } from '../renderer/virtual-tree-freeze-render';
/**
 * TreeGrid Freeze module
 *
 * @hidden
 */
var Freeze = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function Freeze(parent) {
        Grid.Inject(FreezeColumn);
        this.parent = parent;
        this.addEventListener();
    }
    Freeze.prototype.addEventListener = function () {
        this.parent.on('rowExpandCollapse', this.rowExpandCollapse, this);
        this.parent.on('dataBoundArg', this.dataBoundArg, this);
        this.parent.grid.on('dblclick', this.dblClickHandler, this);
        this.parent.grid.on('initial-load', this.instantiateRenderer, this);
    };
    Freeze.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('rowExpandCollapse', this.rowExpandCollapse);
        this.parent.off('dataBoundArg', this.dataBoundArg);
        this.parent.grid.off('dblclick', this.dblClickHandler);
        this.parent.grid.off('initial-load', this.instantiateRenderer);
    };
    Freeze.prototype.instantiateRenderer = function () {
        var renderer = getValue('serviceLocator', this.parent.grid).getService('rendererFactory');
        if (this.parent.getFrozenColumns()) {
            if (this.parent.enableColumnVirtualization) {
                getValue('addRenderer', renderer)
                    .apply(renderer, [RenderType.Header, new VirtualTreeFreezeHdrRenderer(getValue('grid', this.parent), getValue('serviceLocator', this.parent.grid))]);
            }
            else {
                getValue('addRenderer', renderer)
                    .apply(renderer, [RenderType.Header, new FreezeRender(getValue('grid', this.parent), getValue('serviceLocator', this.parent.grid))]);
            }
            if (this.parent.enableVirtualization) {
                getValue('addRenderer', renderer)
                    .apply(renderer, [RenderType.Content, new VirtualTreeFreezeRenderer(getValue('grid', this.parent), getValue('serviceLocator', this.parent.grid))]);
            }
        }
        if (this.parent.getFrozenLeftColumnsCount() || this.parent.getFrozenRightColumnsCount()) {
            getValue('addRenderer', renderer)
                .apply(renderer, [RenderType.Header, new ColumnFreezeHeaderRenderer(getValue('grid', this.parent), getValue('serviceLocator', this.parent.grid))]);
            if (this.parent.enableVirtualization) {
                getValue('addRenderer', renderer)
                    .apply(renderer, [RenderType.Content, new ColumnVirtualTreeFreezeRenderer(getValue('grid', this.parent), getValue('serviceLocator', this.parent.grid))]);
            }
            else {
                getValue('addRenderer', renderer)
                    .apply(renderer, [RenderType.Content, new ColumnFreezeContentRenderer(getValue('grid', this.parent), getValue('serviceLocator', this.parent.grid))]);
            }
        }
    };
    Freeze.prototype.rowExpandCollapse = function (args) {
        var movableRows = this.parent.getMovableDataRows();
        var frozenrows = this.parent.getRows();
        var rows;
        var frozenRightRows;
        var freeze = (this.parent.getFrozenLeftColumnsCount() > 0 ||
            this.parent.getFrozenRightColumnsCount() > 0) ? true : false;
        if (freeze) {
            frozenRightRows = this.parent.getFrozenRightRows().filter(function (e) {
                return e.querySelector('.e-gridrowindex' + args.record.index + 'level' + (args.record.level + 1));
            });
        }
        if (!args.detailrows.length) {
            rows = movableRows.filter(function (e) {
                return e.querySelector('.e-gridrowindex' + args.record.index + 'level' + (args.record.level + 1));
            });
        }
        else {
            rows = args.detailrows;
        }
        for (var i = 0; i < rows.length; i++) {
            var row = rows[parseInt(i.toString(), 10)];
            var rData = this.parent.grid.getRowObjectFromUID(row.getAttribute('data-Uid')).data;
            if (!isNullOrUndefined(movableRows) && row.parentElement.firstElementChild.clientHeight > 0) {
                row.style.height = row.parentElement.firstElementChild.clientHeight + 'px';
            }
            row.style.display = args.action;
            if (freeze && frozenRightRows.length) {
                frozenRightRows[parseInt(i.toString(), 10)].style.display = args.action;
            }
            var queryselector = args.action === 'none' ? '.e-treecolumn-container .e-treegridcollapse'
                : '.e-treecolumn-container .e-treegridexpand';
            if (frozenrows[row.rowIndex].querySelector(queryselector)) {
                var cRow = [];
                for (var i_1 = 0; i_1 < movableRows.length; i_1++) {
                    if (movableRows[parseInt(i_1.toString(), 10)].querySelector('.e-gridrowindex' + rData.index + 'level' + (rData.level + 1))) {
                        cRow.push(movableRows[parseInt(i_1.toString(), 10)]);
                    }
                }
                if (cRow.length) {
                    var data = this.parent.getCurrentViewRecords()[cRow[0].rowIndex];
                    this.rowExpandCollapse({ detailrows: cRow, action: args.action, record: data });
                }
            }
        }
    };
    Freeze.prototype.dblClickHandler = function (e) {
        if (parentsUntil(e.target, 'e-rowcell') &&
            this.parent.grid.editSettings.allowEditOnDblClick && this.parent.editSettings.mode !== 'Cell' && (!e.target['classList'].contains('e-treegridcollapse') && !e.target['classList'].contains('e-treegridexpand'))) {
            this.parent.grid.editModule.startEdit(parentsUntil(e.target, 'e-row'));
        }
    };
    Freeze.prototype.dataBoundArg = function () {
        var checkboxColumn = this.parent.getColumns().filter(function (e) {
            return e.showCheckbox;
        });
        if (checkboxColumn.length && this.parent.freezeModule && this.parent.initialRender) {
            addClass([this.parent.element.getElementsByClassName('e-grid')[0]], 'e-checkselection');
        }
    };
    Freeze.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns Freeze module name
     */
    Freeze.prototype.getModuleName = function () {
        return 'freeze';
    };
    return Freeze;
}());
export { Freeze };
