import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {

  // @Input() titulo : string;
  @Input() titulo = {} as string;

  constructor() { }

  ngOnInit(): void {
  }

}
