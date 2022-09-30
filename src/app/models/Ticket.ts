import { Historial } from './Historial';

export class Ticket {
  constructor(
    public id: string = '',
    public persona_solicitante: string = '',
    public fecha_ingreso: string = '',
    public asunto: string = '',
    public descripcion: string = '',
    public tipo: string = '',
    public historial_incidencia: Historial = new Historial(),

    public status: string = '',

    public date_delete: string = '',
    public created_at: string = '',
    public updated_at: string = ''
  ) {}
}
