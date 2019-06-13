import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewContainerRef} from '@angular/core';
import {TableGridOptions} from '../../interfaces/table-grid-options';
import {TableGridDetailsComponent} from '../table-grid-details/table-grid-details.component';
import {TableGridCustomCell} from '../../interfaces/table-grid-custom-cell';

@Component({
    selector: 'lib-table-grid-cell',
    templateUrl: './table-grid-cell.component.html',
    styleUrls: ['./table-grid-cell.component.css']
})
export class TableGridCellComponent implements OnInit {
    @Input() gridOptions: TableGridOptions;
    @Input() gridRow: any;
    @Input() gridColumn: any;
    @Input() gridCell: any;
    @Input() isFirst: boolean;
    @Input() detailRow;
    @Input() selectable: boolean;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef) {
    }

    toggleDetails(event: any) {
        event.stopPropagation();
        this.gridRow.showDetails = !this.gridRow.showDetails;
    }

    ngOnInit() {
        if (this.detailRow) {
            setTimeout(() => {
                const component = (typeof this.gridOptions.detailComponent !== 'undefined')
                    ? this.gridOptions.detailComponent : TableGridDetailsComponent;
                const factory = this.componentFactoryResolver.resolveComponentFactory(component);
                const ref = this.viewContainerRef.createComponent(factory);
                ref.instance.gridOptions = this.gridOptions;
                ref.instance.gridRow = this.gridRow;
                ref.instance.detailsInit(this.gridCell);
                ref.changeDetectorRef.detectChanges();
            }, 0);
        } else if (this.gridColumn.component) {
            console.log(this.gridColumn);
            setTimeout(() => {
                const component: Type<TableGridCustomCell> = this.gridColumn.component;
                const factory = this.componentFactoryResolver.resolveComponentFactory(component);
                const ref = this.viewContainerRef.createComponent(factory);
                ref.instance.detailsInit(this.gridCell);
                ref.changeDetectorRef.detectChanges();
            }, 0);
        }
    }
}
