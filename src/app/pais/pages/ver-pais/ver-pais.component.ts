import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit, OnDestroy {
  private suscription: Subscription = new Subscription();
  public pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    this.suscription.add(
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.paisService.buscarPaisPorAlpha(id)),
          tap(console.log)
        )
        .subscribe((pais) => {
          this.pais = pais[0];
        })
    );
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
