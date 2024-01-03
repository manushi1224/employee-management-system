const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          value: action.payload,
          isValid: validate(action.field, action.payload),
        }
      };
    case "SWITCH_SUPERUSER":
      return {
        ...state,
        isSuperUser: !state.isSuperUser,
      };
    case "TOUCHED":
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          isTouched: true,
        }
      };
    // case "SUBMIT":
    //   let formValid = true;
    //   for (const data in action.payload) {
    //     if (!state[data] || state[data] === true) {
    //       continue;
    //     }
    //     formValid = formValid && state[data].isValid;
    //   }
    //   console.log(formValid)
    //   return {
    //     ...state,
    //     isFormValid: formValid,
    //   };
    default:
      return state;
  }
};

export default formReducer;

const validate = (field, value) => {
  switch (field) {
    case "email":
      const re = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
      if (value !== "" && re.test(value)) {
        return true;
      }
      return false;
    case "password":
      const rePass = /^([a-zA-Z0-9@*#$%^&*!]{6,15})$/;
      if (value !== "" && rePass.test(value)) {
        return true;
      }
      return false;
    case "joiningDate":
      const reDate = /^\d{4}-\d{2}-\d{2}$/;
      if (value !== "" && reDate.test(value)) {
        return true;
      }
      return false;
    case "position":
      if (value !== "") {
        return true;
      }
      return false;
    case "name":
      if (value !== "") {
        return true;
      }
      return false;
    case "aadhar":
      const reAadhar = /^[2-9][0-9]{3} [0-9]{4} [0-9]{4}$/;
      if (value !== "" && reAadhar.test(value)) {
        return true;
      }
      return false;
    case "panNo":
      const rePan = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
      if (value !== "" && rePan.test(value)) {
        return true;
      }
      return false;
    default:
      break;
  }
};
