import Joi from "joi";

// Register Validation

const registerValidation = (data) =>{
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(6).max(50).required().email(),
        password: Joi.string().min(6).max(255).required(),
        role: Joi.string().required().valid("student","instructor"),
        //這邊是確定 你的role 的設定 是student, 還是 instructor
    });

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(50).required().email(),
        password: Joi.string().min(6).max(255).required(),
    });
    return schema.validate(data);
}


const cousreValidation = (data) =>{
    const schema = Joi.object({
        title: Joi.string().min(6).max(50).required(),
        description : Joi.string().min(6).max(50).required(),
        price: Joi.number().min(10).max(9999).required(),
    })
    return schema.validate(data);
};


export default {registerValidation, loginValidation, cousreValidation}

