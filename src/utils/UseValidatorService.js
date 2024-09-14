export const checkvalidator = ({ email, password, name = "", isSignin }) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
    password
  );

  if (!isSignin && name === "") {
    return "Please enter your name";
  }

  if (name && !/^[a-zA-Z ]{2,30}$/.test(name)) {
    return "Please enter a valid name (2-30 characters, only letters and spaces)";
  }

  if (!isEmailValid) {
    return "Email ID is not valid";
  }

  if (!isPasswordValid) {
    return "Enter a valid password (at least 8 characters, including uppercase, lowercase, and a number)";
  }

  return null;
};
