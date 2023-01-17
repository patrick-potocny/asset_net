import React from "react";
import { screen, render } from "@testing-library/react";
import Modal from "../components/Modal";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";

const onCloseMock = jest.fn();

beforeEach(() => {
  const modal = document.createElement('div');
  modal.setAttribute('id', 'modal');
  document.body.appendChild(modal);
});

describe("Modal component", () => {
  test("should render modal open when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Children elements</div>
      </Modal>
    );

    expect(screen.getByText('Children elements')).toBeInTheDocument()
  });

  test('should not render modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={onCloseMock}>
        <div>Children elements</div>
      </Modal>
    );

    expect(screen.queryByText('Children elements')).toBeNull()
  });

  test('should call onCLose when overlay is clicked', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Children elements</div>
      </Modal>
    );

    expect(screen.getByText('Children elements')).toBeInTheDocument()

    userEvent.click(screen.getByTestId('overlay'))

    expect(onCloseMock).toHaveBeenCalled()
  });
});
