import { validate } from "cpf-check";
import { z } from "zod";
import type { Consultor } from "#/modules/consultor/consultor";

const telRegex = /[0-9]{10,11}/;

export type Cliente = {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  consultor: Consultor;
};

export const ClienteRequestDto = z.strictObject({
  nome: z.string().min(3).max(80),
  cpf: z.string().refine((data) => validate(data)),
  telefone: z.string().regex(telRegex),
  email: z.email(),
  idConsultor: z.string().nonempty(),
});
export type ClienteRequestDto = z.infer<typeof ClienteRequestDto>;
