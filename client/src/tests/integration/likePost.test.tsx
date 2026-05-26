/* Teste de integração para verificar o fluxo de curtida de post */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../../app/page";
import { postsService } from "../../service/posts/posts";
import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../service/posts/posts");
jest.mock("../../contexts/AuthContext");
jest.mock("../../components/Header", () => {
  return function Header() {
    return <div>Header</div>;
  };
});

describe("Fluxo de curtida de post", () => {
  test("Deve aplicar feedback visual ao curtir um post", async () => {
    window.alert = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 1 },
      isAuthenticated: true,
      isLoading: false,
    });

    (postsService.getPosts as jest.Mock).mockResolvedValue({
      posts: [
        {
          id: 3,
          title: "Post de teste",
          body: "Conteúdo do post",
          liked: false,
        },
      ],
    });

    (postsService.toggleLikePost as jest.Mock).mockResolvedValue(undefined);

    render(<Home />);

    const button = await screen.findByRole("button", { name: /Curtir/i });

    fireEvent.click(button);

   expect(
  screen.getByRole("button", { name: /Curtido/i })
).toBeTruthy();

    expect(window.alert).not.toHaveBeenCalled();
  });
});