export class ObjetoEncontrado {
  id?: number;
  nombre: string = '';
  descripcion: string = '';
  categoria: string = '';
  lugar: string = '';
  fecha: string = '';
  imagen?: string;
  estado: string = 'encontrado';
  usuario?: number;

  constructor(init?: Partial<ObjetoEncontrado>) {
    Object.assign(this, init);
  }
}