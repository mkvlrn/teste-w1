import { assert, beforeEach, describe, test } from "vitest";
import { mockDeep } from "vitest-mock-extended";
import { AppError } from "#/core/app-error";
import type { PrismaService } from "#/modules/__shared/prisma.service";
import type { ConsultorRequestDto } from "#/modules/consultor/consultor";
import { ConsultorService } from "#/modules/consultor/consultor.service";

const prismaMock = mockDeep<PrismaService>();
const input: ConsultorRequestDto = {
  nome: "teste",
  cpf: "65748439018",
  telefone: "1234567890",
  email: "teste@teste.com",
};
let service: ConsultorService;

beforeEach(() => {
  service = new ConsultorService(prismaMock);
});

test("create consultor", async () => {
  const expectedFindUniqueCalls = [
    [{ where: { cpf: input.cpf, email: input.email } }],
  ] as typeof prismaMock.consultor.findUnique.mock.calls;
  const expectedResult = { id: "some-id", ...input };
  prismaMock.consultor.create.mockResolvedValue(expectedResult);

  const result = await service.create(input);

  assert.isUndefined(result.error);
  assert.deepStrictEqual(prismaMock.consultor.findUnique.mock.calls, expectedFindUniqueCalls);
  assert.deepStrictEqual(result.value, expectedResult);
});

describe("should return error if", () => {
  test("user already exists", async () => {
    prismaMock.consultor.findUnique.mockResolvedValue({ id: "some-id", ...input });

    const result = await service.create(input);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.statusCode, 409);
    assert.strictEqual(
      result.error.message,
      "consultor com email teste@teste.com e cpf 65748439018 já existe",
    );
  });

  test("prisma throws", async () => {
    prismaMock.consultor.findUnique.mockRejectedValue(new Error("some error"));

    const result = await service.create(input);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.statusCode, 502);
    assert.strictEqual(result.error.message, "some error");
  });
});
