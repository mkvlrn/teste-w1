import { Global, Module } from "@nestjs/common";
import { PrismaService } from "#/modules/__shared/prisma.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}
