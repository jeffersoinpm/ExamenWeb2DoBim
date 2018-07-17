import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {

  @Input() imagen: string;
  @Input() texto: string;
  @Output() selecciono: EventEmitter<string> = new EventEmitter();
  constructor(private _router: Router,) { }

  ngOnInit() {
  }

  seleccionoMed() {
    console.log('Selecciono', this.texto);
    this.selecciono.emit(this.texto);
  }

}
