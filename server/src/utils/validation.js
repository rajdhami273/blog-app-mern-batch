const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// at least 8 characters and nothing else, could be anything, uppercase, lowercase, numbers, special characters
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function validateUser(user) {
  const { name, email, password, dob } = user;

  if (!name) {
    return { message: "Name is required" };
  }

  if (!email) {
    return { message: "Email is required" };
  }

  if (!emailRegex.test(email)) {
    return { message: "Invalid email" };
  }

  if (!password) {
    return { message: "Password is required" };
  }

  if (!passwordRegex.test(password)) {
    return { message: "Invalid password" };
  }

  if (!dob) {
    return { message: "Date of birth is required" };
  }

  return null;
}

module.exports = {
  validateUser,
};
