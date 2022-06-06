export const email = (email) => {
  const emailRegEx = /^[\w\d][\w\d.-]*?@[\w\d.-]*?[\w\d]$/;

  return emailRegEx.test(email);
};

export const required = (value) => {
  return !!value;
};
