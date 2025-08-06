import cpfcheck from "cpf-check";
import { z } from "zod";

const telRegex = /[0-9]{10,11}/;

export type Consultor = {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
};

export const ConsultorRequestDto = z.strictObject({
  nome: z.string().min(3).max(80),
  cpf: z.string().refine((data) => cpfcheck.validate(data), { error: "cpf invalido" }),
  telefone: z.string().regex(telRegex),
  email: z.email(),
});
export type ConsultorRequestDto = z.infer<typeof ConsultorRequestDto>;
