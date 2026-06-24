import { test, expect } from '@playwright/test';

const FRONT_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:8080';

test.describe('Testes E2E - Autenticação', () => {

  // =====================================================
  // TESTE 1 - CADASTRO DE USUÁRIO PELA TELA
  // =====================================================
  test('deve cadastrar um novo usuário pela tela', async ({ page }) => {
    const email = `e2e_signup_${Date.now()}@teste.com`;
    const password = 'Senha123@';

    // Acessa a tela de cadastro
    await page.goto(`${FRONT_URL}/signup`);

    // Preenche o campo de e-mail
    await page.locator('main input[type="email"]').fill(email);

    // Localiza os dois campos de senha:
    // nth(0) = senha
    // nth(1) = confirmar senha
    const passwordInputs = page.locator('main input[type="password"]');
    await passwordInputs.nth(0).fill(password);
    await passwordInputs.nth(1).fill(password);

    // Clica no botão "Criar conta"
    await page.locator('main').getByRole('button', { name: /criar conta/i }).click();

    // Verifica se saiu da página de cadastro
    await expect(page).not.toHaveURL(/signup/i);
  });

  // =====================================================
  // TESTE 2 - LOGIN DE USUÁRIO PELA TELA
  // =====================================================
  test('deve realizar login pela tela', async ({ page, request }) => {
    const email = `e2e_login_${Date.now()}@teste.com`;
    const password = 'Senha123@';

    // Antes de testar o login pela tela, cria um usuário pela API
    await request.post(`${API_URL}/auth/signup`, {
      data: {
        email,
        password,
      },
    });

    // Acessa a tela de login
    await page.goto(`${FRONT_URL}/signin`);

    // Preenche o campo de e-mail
    await page.locator('main input[type="email"]').fill(email);

    // Preenche o campo de senha
    await page.locator('main input[type="password"]').fill(password);

    // Clica no botão "Entrar"
    await page.locator('main').getByRole('button', { name: /^entrar$/i }).click();

    // Verifica se saiu da página de login
    await expect(page).not.toHaveURL(/signin/i);
  });
});