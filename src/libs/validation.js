const validation = (value, input, extra) => {
  if (input === "email") {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(value)) return "";
    else return "Ingresar email valido";
  }
  if (input === "nameSurname") {
    if (!value) return "No dejar vacio";
    if (!extra) return "Agregar apellido";
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(value) || !regex.test(extra))
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
  }
  if (input === "car") {
    const exist = extra.some((car) => car.id == input);
    if (exist) return " ";
    else return "Auto no valido";
  }
  if (input === "opinion") {
    const wordCount = value
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    if (wordCount >= 10 && wordCount <= 200) return "";
    else return "La opinión debe tener entre 10 y 200 palabras";
  }
  if (["name", "type", "transmission"].includes(input)) {
    if (!value) return "No dejar vacio";
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(value)) return "Campo invalido";
    else return "";
  }
  if (input === "year") {
    if (!/^[0-9]{4}$/.test(value)) {
      return "Año invalido";
    }
    const actualDate = new Date();
    const actualYear = actualDate.getFullYear();
    if (value > actualYear || value < 1990) return "Año invalido";
    else return "";
  }
  if (input === "capacity" || input === "price") {
    if (!/^[0-9]+$/.test(value)) return "Número inválido";
    else return "";
  }
  if (input === "file") {
    if (value instanceof File) {
      const typesOfImages = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
        "image/webp",
      ];
      if (!typesOfImages.includes(value.type))
        return "Sube un formato valido (jpeg, png, gif, jpg, webp)";
      else return "";
    } else return "No es un archivo valido";
  }
};
export default validation;
