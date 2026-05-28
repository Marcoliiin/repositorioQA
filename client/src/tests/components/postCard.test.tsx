/*Verificar se o PostCard renderiza título e conteúdo do post.*/

import { render, screen } from "@testing-library/react";
import PostCard from "../../components/PostCard";

describe("PostCard Component", () => {
  test("Deve renderizar título e conteúdo do post", () => {
    render(
      <PostCard
        post={{
          id: 1,
          title: "Título teste",
          body: "Conteúdo teste",
          liked: false,
        }}
        isAuthenticated={true}
        onLike={jest.fn()}
      />
    );

    expect(screen.getByText("Título teste")).toBeTruthy();

    expect(screen.getByText("Conteúdo teste")).toBeTruthy();
  });
});