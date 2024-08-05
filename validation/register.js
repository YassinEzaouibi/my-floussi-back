const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateRegisterInput(data){
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.role = !isEmpty(data.role) ? data.role : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    // check name
    if(Validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    }

    //check email
    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required"
    }else if (!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }



    // password check
    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required"
    }

    // confirm password
    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Confirm password field is required";
    }

    // password length and strength
    const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!Validator.isLength(data.password, { min: 8, max: 30 }) && !passwordStrength.test(data.password)) {
        errors.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }


    // password match
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};