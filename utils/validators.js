module.exports.validateRegisterInput = (input) => {
  const { username, email, password, confirmPassword } = input;
  const errors = {};
  if (username.trim() === "") errors.username = "You must provide a username";

  if (email.trim() === "") {
    errors.email = "You must provide an email";
  } else {
    const pattern =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(pattern)) errors.email = "Invalid email provided";
  }

  if (password === "") {
    errors.password = "You must write a password";
  } else if (password !== confirmPassword) {
    errors.password = "Passwords must match";
  }

  return {
    valid: Object.keys(errors) < 1,
    errors,
  };
};

module.exports.validateLoginInput = (input) => {
  const { username, password } = input;
  const errors = {};

  if (username.trim() === "") errors.username = "You must provide a username";

  if (password === "") errors.password = "You must write a password";

  return {
    valid: Object.keys(errors) < 1,
    errors,
  };
};
