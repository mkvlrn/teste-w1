import { Module } from "@nestjs/common";
import { SharedModule } from "#/modules/__shared/shared.module";
import { ConsultorModule } from "#/modules/consultor/consultor.module";

@Module({
  imports: [SharedModule, ConsultorModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
