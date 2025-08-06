import { z } from "zod";
import type { Cliente } from "#/modules/cliente/cliente";
import type { Consultor } from "#/modules/consultor/consultor";

export type Compromisso = {
  id: string;
  consultor: Consultor;
  cliente?: Cliente;
  assunto: string;
  dataHoraInicio: number;
  dataHoraFim: number;
};

export const CompromissoRequestDto = z.strictObject({
  idConsultor: z.string().nonempty(),
  idCliente: z.string().nonempty().optional(),
  assunto: z.string().min(5).max(80),
  dataHoraInicio: z.number().nonnegative(),
  dataHoraFim: z.number().nonnegative(),
});
export type CompromissoRequestDto = z.infer<typeof CompromissoRequestDto>;
