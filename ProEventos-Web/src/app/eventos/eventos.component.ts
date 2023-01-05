import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados : any = [];

  widtImg:number = 150;
  marginImg:number = 2;
  showImg: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value:string){
    this._filtroLista = value
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos
  }

  filtrarEventos(filtrarPor: string) : any{
    filtrarPor = filtrarPor.toLocaleUpperCase();
    return this.eventos.filter(
      ( evento: { tema: string; local: string;}) =>
      evento.tema.toLocaleUpperCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleUpperCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  updateImg(){
    this.showImg = !this.showImg;
  }

  public getEventos(): void {

    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response =>
      {
        this.eventos = response,
        this.eventosFiltrados = this.eventos
      },
      error => console.log(error),
    );
  }

}
