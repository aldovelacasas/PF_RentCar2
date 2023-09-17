export const sliceData = (data, page, maxPageData) => {
  return data.slice((page - 1) * maxPageData, page * maxPageData);
};

export const slicePage = (data, currentPage, maxPages) => {
  if (currentPage === 1) {
    return data.slice(currentPage, currentPage + maxPages + 2);
  }
  if (currentPage === 2) {
    return data.slice(currentPage - 1, currentPage + maxPages + 1);
  } else if (currentPage <= 3) {
    return data.slice(currentPage - 2, currentPage + maxPages);
  }
  return data.slice(currentPage - 3, currentPage + maxPages);
};

export function emailValidate(input) {
  const regexEmail = /^([\w]{1,20})+@([\w]{1,10})+\.([a-z]{2,4})$/i;
  let errors = {};
  if (!regexEmail.test(input)) {
    errors.email = "Por favor introduce un email válido";
  } else if (regexEmail.test(input)) {
    delete errors.email;
  }
  return errors;
}

export function validateContactForm(inputs) {
  const regexText = /^[a-z0-9_,;.-áéíóú]*$/i;
  const regexEmail = /^([\w]{1,20})+@([\w]{1,10})+\.([a-z]{2,4})$/i;

  let errors = {};

  if (inputs.name !== "" && !regexText.test(inputs.name.split(" ").join(""))) {
    errors.name = "Por favor introduce un nombre válido";
  } else if (regexText.test(inputs.name.split(" ").join(""))) {
    delete errors.name;
  }
  if (
    inputs.name !== "" &&
    (inputs.name.length < 3 || inputs.name.length > 30)
  ) {
    errors.nameLength = "El nombre debe ser de entre 4 y 30 caracteres";
  } else if (inputs.name.length > 3 && inputs.name.length <= 30) {
    delete errors.nameLength;
  }
  if (inputs.email !== "" && !regexEmail.test(inputs.email)) {
    errors.email = "Por favor introduce un email válido";
  } else if (regexEmail.test(inputs.email)) {
    delete errors.email;
  }
  if (
    inputs.comments !== "" &&
    !regexText.test(inputs.comments.split(" ").join(""))
  ) {
    errors.comments = "Esta sección no puede contener caracteres especiales";
  } else if (regexText.test(inputs.comments.split(" ").join(""))) {
    delete errors.comments;
  }
  if (
    inputs.comments !== "" &&
    (inputs.comments.length < 8 || inputs.comments.length > 200)
  ) {
    errors.commentsLength =
      "Las dudas/comentarios deben ser de entre 8 y 200 caracteres";
  } else if (inputs.comments.length >= 8 || inputs.comments.length <= 200) {
    delete errors.commentsLength;
  }

  return errors;
}

export function validateUserForm(inputs) {
  const regexText = /^[A-Záéíóúa-z0-9_,;.-]*$/i;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const regexPasaporte = /^([A-Za-z]{3})([0-9]{6})$/i;
  const regexPhone = /^[0-9]{10}$/i;
  let errors = {};
  if (
    inputs.nombre !== "" &&
    !regexText.test(inputs.nombre.split(" ").join(""))
  ) {
    errors.nombre = "Por favor introduce un nombre válido";
  } else if (regexText.test(inputs.nombre.split(" ").join(""))) {
    delete errors.nombre;
  }
  if (
    inputs.name !== "" &&
    (inputs.nombre.length < 3 || inputs.nombre.length > 30)
  ) {
    errors.nameLength = "El nombre debe ser de entre 4 y 30 caracteres";
  } else if (inputs.nombre.length > 3 && inputs.nombre.length <= 30) {
    delete errors.nameLength;
  }
  if (inputs.correo !== "" && !regexEmail.test(inputs.correo)) {
    errors.correo = "Por favor introduce un email válido";
  } else if (regexEmail.test(inputs.correo)) {
    delete errors.correo;
  }
  if (inputs.pasaporte !== "" && !regexPasaporte.test(inputs.pasaporte)) {
    errors.pasaporte = "Por favor introduce un número de pasaporte válido";
  } else if (regexPasaporte.test(inputs.pasaporte)) {
    delete errors.pasaporte;
  }
  if (inputs.telefono !== "" && !regexPhone.test(inputs.telefono)) {
    errors.telefono = "Por favor introduce un número de teléfono válido";
  } else if (regexPhone.test(inputs.telefono)) {
    delete errors.telefono;
  }

  return errors;
}
