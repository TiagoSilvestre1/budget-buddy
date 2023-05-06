import { Column, IGrid, NotifyArgs, Row, ServiceLocator } from '@syncfusion/ej2-grids';
import { ColumnVirtualFreezeRenderer, VirtualFreezeHdrRenderer, VirtualFreezeRenderer } from '@syncfusion/ej2-grids';
/**
 * VirtualTreeFreezeRenderer is used to render the virtual table within the frozen and movable content table
 *
 * @hidden
 */
export declare class VirtualTreeFreezeRenderer extends VirtualFreezeRenderer {
    protected serviceLoc: ServiceLocator;
    constructor(parent: IGrid, locator?: ServiceLocator);
    /**
     * @returns {void}
     * @hidden
     */
    renderTable(): void;
    /**
     * @param {HTMLElement} target - specifies the target
     * @param {DocumentFragment} newChild - specifies the newChild
     * @param {NotifyArgs} e - specifies the notifyargs
     * @returns {void}
     * @hidden
     */
    appendContent(target: HTMLElement, newChild: DocumentFragment, e: NotifyArgs): void;
    /**
     * @param {Object[]} data - specifies the data
     * @param {NotifyArgs} e - specifies the notifyargs
     * @returns {Row<Column>[]} returns the row
     * @hidden
     */
    generateRows(data: Object[], e?: NotifyArgs): Row<Column>[];
}
/**
 * ColumnVirtualTreeFreezeRenderer is used to render the virtual table within the frozen and movable content table
 *
 * @hidden
 */
export declare class ColumnVirtualTreeFreezeRenderer extends ColumnVirtualFreezeRenderer {
    protected serviceLoc: ServiceLocator;
    constructor(parent?: IGrid, locator?: ServiceLocator);
    /**
     * @returns {void}
     * @hidden
     */
    renderTable(): void;
    appendContent(target: HTMLElement, newChild: DocumentFragment, e: NotifyArgs): void;
}
/**
 * VirtualTreeFreezeHdrRenderer is used to render the virtual table within the frozen and movable header table
 *
 * @hidden
 */
export declare class VirtualTreeFreezeHdrRenderer extends VirtualFreezeHdrRenderer {
    /**
     * @returns {void}
     * @hidden
     */
    renderTable(): void;
    protected rfshMovable(): void;
}
