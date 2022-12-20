import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        reqiured: true,
        minLength:3,
        maxLength:50,
    },
    email:{
        type:String,
        reqiured: true,
        minLength:6,
        maxLength:100,
    },
    password:{
        type:String,
        reqiured: true,
        minLength:6,
        maxLength:1024,
        // 密碼的東西會經過hash 所以會很大
    },
    role :{
        type:String,
        enum: ["student", "instructor"],
        reqiured: true
    },
    date: {
        type: Date,
        default: Date.now,
    }

})


// 確認身分
userSchema.methods.isStudent = function(){
    return this.role == "student";
}

userSchema.methods.isInstructor = function(){
    return this.role == "instructor";
}

userSchema.methods.isAdmin = function(){
    return this.role == "admin";
}

// mongoose Schema middleware
// 在密碼被儲存之先確定他的 hash ,並且進行Hash
userSchema.pre("save", async function(next){
    if (this.isModified("passward") || this.isNew){
        const hash = await bcrypt.hash(this.password,10);
        this.password = hash;
        next();
    }else{
        return next();
    }
    

})

userSchema.methods.comparePassword = function (password, cb){
    bcrypt.compare(password, this.password, (err,isMatch)=>{
        if(err) {
            return cb(err, isMatch)
        }
        cb(null, isMatch)

    });
}


// const User = mongoose.model("User",userSchema);
// export default User ;
export default mongoose.model("User",userSchema);