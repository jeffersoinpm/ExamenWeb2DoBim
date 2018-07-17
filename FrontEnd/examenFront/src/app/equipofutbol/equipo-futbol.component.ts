import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-equipofutbol',
  templateUrl: './equipo_futbol.component.html',
  styleUrls: ['./equipo_futbol.component.css']
})
export class EquipoFutbolComponent implements OnInit {

  @Input() imagen: string;
  @Input() texto: string;
  @Output() selecciono: EventEmitter<string> = new EventEmitter();
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  seleccionoPaciente() {
    console.log('Selecciono', this.texto);
    this.selecciono.emit(this.texto);
    this._router.navigate(['/peticion']);
  }

}
