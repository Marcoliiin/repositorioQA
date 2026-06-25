import { test, expect } from '@playwright/test';

const API_URL = 'http://localhost:8080';

test.describe('Testes de API - Autenticação', () => {

  
  // TESTE 1 - CADASTRAR USUÁRIO COM SUCESSO
  
  test('deve cadastrar um usuário com sucesso', async ({ request }) => {
    const email = `usuario_${Date.now()}@teste.com`;

    const response = await request.post(`${API_URL}/auth/signup`, {
      data: {
        email: email,
        password: 'Senha123@'
      }
    });

    expect(response.status()).toBe(200);
  });
  
  // TESTE 2 - NÃO CADASTRAR USUÁRIO COM E-MAIL DUPLICADO
  
  test('não deve cadastrar usuário com e-mail duplicado', async ({ request }) => {
    const email = `duplicado_${Date.now()}@teste.com`;

    await request.post(`${API_URL}/auth/signup`, {
      data: {
        email: email,
        password: 'Senha123@'
      }
    });

    const response = await request.post(`${API_URL}/auth/signup`, {
      data: {
        email: email,
        password: 'Senha123@'
      }
    });

    expect(response.status()).not.toBe(200);
  });

  // TESTE 3 - REALIZAR LOGIN COM SUCESSO

  test('deve realizar login com sucesso', async ({ request }) => {
    const email = `login_${Date.now()}@teste.com`;
    const password = 'Senha123@';

    await request.post(`${API_URL}/auth/signup`, {
      data: {
        email: email,
        password: password
      }
    });

    const response = await request.post(`${API_URL}/auth/signin`, {
      data: {
        email: email,
        password: password
      }
    });

    expect(response.status()).toBe(200);
  });

  // TESTE 4 - NÃO REALIZAR LOGIN COM SENHA INCORRETA
  
  test('não deve realizar login com senha incorreta', async ({ request }) => {
    const email = `senha_errada_${Date.now()}@teste.com`;

    await request.post(`${API_URL}/auth/signup`, {
      data: {
        email: email,
        password: 'Senha123@'
      }
    });

    const response = await request.post(`${API_URL}/auth/signin`, {
      data: {
        email: email,
        password: 'SenhaErrada123@'
      }
    });

    expect(response.status()).not.toBe(200);
  });
});