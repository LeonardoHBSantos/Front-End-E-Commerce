import Swal from 'sweetalert2';

export function alertInvalidInputs() {
  return new Swal(
    'Campos Inválidos',
    // eslint-disable-next-line max-len
    'Confira se você colocou um e-mail válido, uma descrição de no mínimo 15 caracteres e se você deu uma nota usando as estrelas para o produto.',
    'error',
  );
}
