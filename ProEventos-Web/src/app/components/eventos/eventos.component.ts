import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/Evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  modalRef = {} as BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados : Evento[] = [];

  public widtImg: number = 150;
  public marginImg: number = 2;
  public showImg: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value:string){
    this._filtroLista = value
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos
  }

  public filtrarEventos(filtrarPor: string) : Evento[]{
    filtrarPor = filtrarPor.toLocaleUpperCase();
    return this.eventos.filter(
      ( evento: { tema: string; local: string;}) =>
      evento.tema.toLocaleUpperCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleUpperCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ){ }

  public ngOnInit(): void {
    this.showSpinner();
    this.getEventos();

  }

  showSpinner() {
    this.spinner.show();
  }

  public updateImg() : void{
    this.showImg = !this.showImg;
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe(
      {
        next: (eventos : Evento[]) =>
              {
                this.eventos = eventos
                this.eventosFiltrados = this.eventos
              },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar os eventos', 'Error!');

        },
        complete: () => this.spinner.hide()
      }
    );
  }

  openModal(template: TemplateRef<any>) : void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('O evento foi deletado com sucesso', 'Deletado!');
  }

  decline(): void {
    this.modalRef.hide();
  }

}
