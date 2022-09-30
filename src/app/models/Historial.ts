import { HistorialDetalle } from './HistorialDetalle';

export class Historial {
  constructor(
    public id: string = '',
    public usuario_soporte: string = '',
    public comentario: string = '',
    public fecha_atencion: string = '',
    public tickets_id: string = '',
    public historial_detalles: HistorialDetalle[] = [],
    public created_at: string = '',
    public updated_at: string = ''
  ) {}
}
