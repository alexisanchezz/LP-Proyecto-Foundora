import { Component, OnInit } from '@angular/core';
import { Recompensa } from '../../model/Recompensa.model';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-recompensas',
  standalone: false,
  templateUrl: './recompensas.component.html',
  styleUrls: ['./recompensas.component.css'],
  providers: [ApiService]
})
export class RecompensasComponent implements OnInit {
  recompensas: Recompensa[];

  constructor(private recompensaService: ApiService) {}

  ngOnInit(): void {
    this.cargarRecompensas();
  }

  private cargarRecompensas(): void {
    this.recompensaService.getRecompensas().subscribe({
      next: (data: Recompensa[]) => {
        this.recompensas = data;
      },
      error: (err: any) => {
        console.error('Error al cargar recompensas:', err);
      }
    });
  }
}
 