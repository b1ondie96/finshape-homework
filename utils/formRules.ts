export const emailRules = {
  required: { value: true, message: "Email is required" },
  pattern: {
    value: /\b[\w.-]+@[\w.-]+\.\w{2,6}\b/,
    message: "Invalid email format",
  },
};
export const passwordRules = {
  required: { value: true, message: "Password is required" },
  pattern: {
    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
    message:
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
  },
};
