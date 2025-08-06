-- CreateTable
CREATE TABLE "public"."consultores" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "consultores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "consultorId" TEXT NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."compromissos" (
    "id" TEXT NOT NULL,
    "assunto" TEXT NOT NULL,
    "dataHoraInicio" BIGINT NOT NULL,
    "dataHoraFim" BIGINT NOT NULL,
    "consultorId" TEXT NOT NULL,
    "clienteId" TEXT,

    CONSTRAINT "compromissos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "consultores_cpf_key" ON "public"."consultores"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "consultores_email_key" ON "public"."consultores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpf_key" ON "public"."clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "public"."clientes"("email");

-- AddForeignKey
ALTER TABLE "public"."clientes" ADD CONSTRAINT "clientes_consultorId_fkey" FOREIGN KEY ("consultorId") REFERENCES "public"."consultores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."compromissos" ADD CONSTRAINT "compromissos_consultorId_fkey" FOREIGN KEY ("consultorId") REFERENCES "public"."consultores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."compromissos" ADD CONSTRAINT "compromissos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
