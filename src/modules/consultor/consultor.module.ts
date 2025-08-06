import { Module } from "@nestjs/common";
import { ConsultorController } from "#/modules/consultor/consulor.controller";
import { ConsultorService } from "#/modules/consultor/consultor.service";

@Module({
  imports: [],
  controllers: [ConsultorController],
  providers: [ConsultorService],
})
export class ConsultorModule {}
