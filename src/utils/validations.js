/**
 * validator custom validator method
 * @param {Array} arr
 * @param {String} expose
 * @arg  {[{type, value}]} @param {arr}
 * @arg  {email,password,isempty,empty,all} @param {expose}
 * @param {arr} @returns {String} contains validation errors
 */

export default function validator(arr, expose) {
  let error = "";
  /**
   *  validateEmail validation method
   * @param {String} email
   * @returns {Boolean} True or False
   *
   */
  const validateEmail = (email /*string*/) => {
    const regexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!regexp.test(email)) {
      error += "invalid email format, ";
      return false;
    }
    return true;
  };

  /**
   * ValidatePassword validation method
   * @param {String} password
   * @returns {Boolean} True or False
   *
   */
  const validatePassword = (password /*string*/) => {
    /**Password must contain at least one letter, at least one number, and be longer than six charaters */
    const regexp = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!regexp.test(password)) {
      error +=
        "Password must contain at least one letter, at least one number, and be longer than six charaters, ";
      return false;
    }
    return true;
  };

  /**
   * isEmpty validation method
   * @param {String,String} input Type
   * @returns {Boolean} True or False
   *
   */
  const isEmpty = (input, type, optional /*string*/) => {
    if (input === undefined || input === "") {
      error += `${optional ? optional : type} is empty`;
      return true;
    }
    if (input.replace(/\s/g, "").length) {
      return false;
    }
    return true;
  };

  /**
   * empty validation method
   * @param {String} input
   * @returns {Boolean} True or False
   *
   */
  const empty = (input /*string*/) => {
    if (input === undefined || input === "") {
      return true;
    }
  };
  /**
   * delegate methods if @param arr is passed
   */
  if (arr) {
    arr.forEach(({ type, value, optional }) => {
      switch (type) {
        case "password":
          validatePassword(value);
          break;
        case "email":
          validateEmail(value);
          break;
        case "username":
          isEmpty(value, optional);
          break;
      }
    });
  }
  if (expose) {
    switch (expose) {
      case "all":
        return { validatePassword, validateEmail, isEmpty, empty };
        break;
      case "password":
        return validatePassword;
        break;
      case "email":
        return validateEmail;
        break;
      case "username":
        return isEmpty;
        break;
      default:
        console.error({ error: "please use email,password,username or all" });
        break;
    }
  }
  return error;
}
