/*Verificar se o botão renderiza o texto corretamente.*/

import { render, screen } from "@testing-library/react";
import Button from "../../components/Button";

describe("Button Component", () => {
  test("Deve renderizar o texto do botão", () => {
    render(<Button>Enviar</Button>);

    expect(screen.getByText("Enviar")).toBeTruthy();
  });
});