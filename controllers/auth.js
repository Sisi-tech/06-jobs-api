const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError } = require('../errors')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    // const { name, email, password } = req.body 
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt)
    // const tempUser = {name, email, password: hashedPassword}
    // const user = await User.create({ ...tempUser })
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    // const token = jwt.sign({ userId: user._id, name: user.name } ,'jwtSecret', {expiresIn: '30d', })
    res.status(StatusCodes.CREATED).json({ user: {name: user.name }, token })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password ) {
        throw new BadRequestError('please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new BadRequestError('Invalid credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!password) {
        throw new BadRequestError('Incorrect password')
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

module.exports = {
    register,
    login,
}
