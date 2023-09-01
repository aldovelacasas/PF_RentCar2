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
    errors.email = "Please introduce a valid email";
  } else if (regexEmail.test(input)) {
    delete errors.email;
  }
  return errors;
}
