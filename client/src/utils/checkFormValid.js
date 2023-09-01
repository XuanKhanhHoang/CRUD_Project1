const checkValidEmail = (email) => {
  let emailFormat = /\S+@\S+\.\S+/;
  return emailFormat.test(email);
};
export { checkValidEmail };
