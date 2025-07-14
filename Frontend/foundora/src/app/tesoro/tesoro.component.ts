import { Component } from '@angular/core';

@Component({
  selector: 'app-tesoro',
  standalone: false,
  templateUrl: './tesoro.component.html',
  styleUrl: './tesoro.component.css'
})
export class TesoroComponent {
  fechaEvento = '12-08-2025';
  lugar = 'Universidad de Huánuco - La Esperanza';

  jugar() {
    const audio = new Audio('assets/audios/clik-juego.mp3');
    audio.play();
    
  // Espera un breve momento para que el sonido se reproduzca antes de redirigir
  setTimeout(() => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScaNeorQeWAtUQpK9OilGG3Zec6emDBmn2RHmQ9g8eQUHtPbQ/viewform?usp=header', '_blank');
  }, 500); // 500 ms de retardo
  }
}
