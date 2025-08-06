import { type AsyncResult, R } from "@mkvlrn/result";
import { Inject, Injectable } from "@nestjs/common";
import { AppError } from "#/core/app-error";
import { PrismaService } from "#/modules/__shared/prisma.service";
import type { Consultor, ConsultorRequestDto } from "#/modules/consultor/consultor";

@Injectable()
export class ConsultorService {
  @Inject(PrismaService) private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(input: ConsultorRequestDto): AsyncResult<Consultor, AppError> {
    try {
      const exists = await this.prisma.consultor.findUnique({
        where: {
          cpf: input.cpf,
          email: input.email,
        },
      });

      if (exists) {
        return R.error(
          new AppError(
            "ValidationError",
            `consultor com email ${input.email} e cpf ${input.cpf} já existe`,
            409,
          ),
        );
      }

      const consultor = await this.prisma.consultor.create({ data: { ...input } });
      return R.ok(consultor);
    } catch (err) {
      return R.error(new AppError("InternalError", (err as Error).message, 502));
    }
  }
}
