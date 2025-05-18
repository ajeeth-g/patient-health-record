export default function validateForm(data, type = "register") {
  const errors = {};

  if (type === "register" && !data.username?.trim()) {
    errors.username = "Name is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Enter a valid email";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (type === "register" && data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}
