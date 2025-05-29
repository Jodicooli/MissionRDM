export const isValidName = (name) => {
  // Check if name is empty or only whitespace
  if (!name || !name.trim()) {
    return false;
  }

  // Regular expression to allow only alphanumeric characters
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  
  return alphanumericRegex.test(name.trim());
};