const validation = (value, input, surname) => {
  if (input === "email") {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(value)) return "";
    else return "Ingresar email valido";
  }
  if (input === "nameSurname") {
    if (!value) return "No dejar vacio";
    if (!surname) return "Agregar apellido";
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(value) || !regex.test(surname))
      return "Nombre/Apellido invalido";
    else return "";
  }
  if (input === "profession") {
    const regex = /^[a-zA-Z\s]+$/;
    if (regex.test(value)) return "";
    else return "Profesion invalida";
  }
  if (input === "rating") {
    if (!/^[0-9]+$/.test(value)) return "Debe ser un número válido";
    if (value < 1 || value > 5) return "Debe ser entre 1 y 5";
    else return "";
  } else {
    const wordCount = value
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    if (wordCount >= 10 && wordCount <= 200) return "";
    else return "La opinión debe tener entre 10 y 200 palabras";
  }
};
export default validation;