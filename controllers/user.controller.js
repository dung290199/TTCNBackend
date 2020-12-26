const { getToken } = require('../middlewares/auth.middleware');
const User = require('../models/user.model');

exports.update = async (req, res) => {
    const id = req.params.id;
    const user = await User.findOneById(id);

    if (user){
        user.fullName = req.body.fullName || user.fullName;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

        const updatedUser = await user.save();

        return res.send({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: getToken(updatedUser),
        });
    }
    return res.status(404).send({ msg: "User not found!" });
}

exports.signin = async (req, res) => {

    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (signinUser){
        res.send({
            fullName: signinUser.fullName,
            email: signinUser.email,
            phoneNumber: signinUser.phoneNumber,
            password: signinUser.password,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
        })
    } else{
        res.status(401).send({msg: 'Invalid email or password!'});
    }
}

exports.register = async (req, res) => {

    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });

    const newUser = await user.save();

    if (newUser){
        res.send({
            fullName: newUser.fullName,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            password: newUser.password,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        })
    } else{
        res.status(401).send({msg: 'Invalid user data!'});
    }
}

exports.createAdmin = async (req, res) => {
    try {
        const user = new User({
            fullName: "admin",
            email: "admin@example.com",
            password: "1234",
            phoneNumber: "0000",
            isAdmin: true,
        });

        const newUser = await user.save();
        res.send(newUser);
    } catch (err) {
        res.send({msg: err.message});
    }
}