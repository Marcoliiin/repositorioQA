/* Teste unitário em Jest para verificar o bug de senha com caractere especial "!" */

import { isPasswordValid } from "../../utils/password";

test('Valida o bug de não reconhecer "!" como caractere especial', () => {
  expect(isPasswordValid("Senha123!")).toBe(true);
});