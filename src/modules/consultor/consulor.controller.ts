import { Body, Controller, HttpException, Inject, Post } from "@nestjs/common";
import { ConsultorRequestDto } from "#/modules/consultor/consultor";
import { ConsultorService } from "#/modules/consultor/consultor.service";
import { ZodValidator } from "#/pipes/zod-validator.pipe";

@Controller("consultor")
export class ConsultorController {
  @Inject(ConsultorService) private readonly service: ConsultorService;

  constructor(service: ConsultorService) {
    this.service = service;
  }

  @Post("/")
  async create(@Body(new ZodValidator(ConsultorRequestDto)) input: ConsultorRequestDto) {
    const result = await this.service.create(input);
    if (result.error) {
      throw new HttpException(result.error.name, result.error.statusCode, { cause: result.error });
    }

    return result.value;
  }
}
