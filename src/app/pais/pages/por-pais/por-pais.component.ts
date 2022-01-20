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

  constructor(
    private paisService: PaisService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.hayError = false;
    this.paises = [];
  }

  buscar( termino: string ) {
    this.termino = termino;
    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => {
        this.hayError = false;
        console.log(paises);
        this.paises = paises;
        this.ref.detectChanges();
      },
      error: (err) => {
        this.hayError = true;
        this.paises = [];
        console.log(err);
        this.ref.detectChanges();
      },
    });
  }

  sugerencias( termino: string ){
    this.hayError = false;
  }
}
