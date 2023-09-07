import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Output() searchKeywordEvt:EventEmitter<string>=new EventEmitter();
  @Input() placeholder?:string;

  getKeyword(event:Event){
    let keyword = (event.target as HTMLInputElement).value;
    this.searchKeywordEvt.emit(keyword);
  }
}
