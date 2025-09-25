import React from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonConfirm,
  ButtonCancel,
} from "./styles";

export function ModalConfirmDelete({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Confirmar exclusão</ModalHeader>
        <ModalBody>
          Tem certeza que deseja excluir{" "}
          <strong>{productName}</strong>?
        </ModalBody>
        <ModalFooter>
          <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
          <ButtonConfirm onClick={onConfirm}>Excluir</ButtonConfirm>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}
