import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
})
export class PorPaisComponent implements OnInit {
  public termino: string = '';
  public hayError: boolean = true;
  public paises: Country[] = [];
  public paisesSugerencias: Country[] = [];


  constructor(
    private paisService: PaisService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.hayError = false;
    this.paises = [];
  }

  buscar( termino: string ) {
    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => {
        this.hayError = false;
        this.paises = paises;
        this.ref.detectChanges();
      },
      error: (err) => {
        this.hayError = true;
        this.paises = [];
        this.ref.detectChanges();
      },
    });
    this.paisesSugerencias = [];
  }

  sugerencias( termino: string ){
    this.paisService.buscarPais(termino).subscribe({
      next: (paises) => {
        this.paisesSugerencias = paises.splice(0,3);
      },
      error: (err) => {
        this.paisesSugerencias = [];
      },
    });
  }
}
