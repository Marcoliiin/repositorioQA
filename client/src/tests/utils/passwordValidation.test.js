/* Teste unitário em Jest para verificar se todos os requisitos para cadastro de senha
funcionam corretamente */

import { isPasswordValid } from "../../utils/password";

test("Valida uma senha com todos os requisitos dos documentos", () => {
  expect(isPasswordValid("Senha123@")).toBe(true);
});