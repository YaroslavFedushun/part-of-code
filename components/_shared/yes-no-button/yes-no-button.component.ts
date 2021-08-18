import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-yes-no-button',
    templateUrl: './yes-no-button.component.html',
    styleUrls: ['./yes-no-button.component.scss']
})
export class YesNowButtonComponent implements OnInit {
    @Output() toggleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() toggle: boolean;

    public clicked: boolean = false;

    changeValue(data) {
        this.clicked = true;
        this.toggle = data;
        this.toggleChange.emit(this.toggle);
    }

    constructor() { }
    ngOnInit() { }

}
