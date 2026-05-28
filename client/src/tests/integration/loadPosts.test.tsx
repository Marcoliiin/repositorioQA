/* Teste de integração para verificar o carregamento e exibição de posts na tela. */

import { render, screen } from "@testing-library/react";
import Home from "../../app/page";
import { postsService } from "../../service/posts/posts";
import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../service/posts/posts", () => ({
  postsService: {
    getPosts: jest.fn(),
  },
}));

jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../components/Header", () => {
  return function Header() {
    return <div>Header</div>;
  };
});

describe("Carregamento de posts", () => {
  test("Deve carregar e exibir posts na tela", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 1 },
      isAuthenticated: true,
      isLoading: false,
    });

    (postsService.getPosts as jest.Mock).mockResolvedValue({
      posts: [
        {
          id: 1,
          title: "Post de teste",
          body: "Conteúdo do post",
          liked: false,
        },
      ],
    });

    render(<Home />);

    expect(await screen.findByText("Post de teste")).toBeTruthy();

    expect(await screen.findByText("Conteúdo do post")).toBeTruthy();
  });
});