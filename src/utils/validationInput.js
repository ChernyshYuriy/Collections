const emptyLine = "plz complete required field";
const emailError = "error in your email";
const shortPassword = "password must contain at least 6 symbols";
export function isEmpty(input) {
  return input.length ? "" : emptyLine;
}
export function validEmail(email) {
  const regExpValidation = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regExpValidation.test(email) ? "" : emailError;
}
export function validPassword(password) {
  return password.length > 5 ? "" : shortPassword;

  // Minimum eight characters, at least one letter and one number:

  // "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"

  // Minimum eight characters, at least one letter, one number and one special character:

  // "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"

  // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:

  // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"

  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

  // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

  // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:

  // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
}
