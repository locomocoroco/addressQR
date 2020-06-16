const userDb = require('../model/users');
const visits = require('../model/visits');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALTROUNDS = process.env.SALT;
const SECRETKEY = process.env.SECRETKEY;


const register = async (req, res) => {
    const {email, password, firstName, lastName, address, zipCode, isBusiness} = req.body;
    
    const check = await userDb.findOne({email});
    if (check) return res.status(409).send('email already in use');
    console.log(SALTROUNDS)
    const passwordHash = await bcrypt.hash(password, parseInt(SALTROUNDS));
    try {
        const {_id} = await userDb.create({
            email,
            passwordHash,
            firstName,
            lastName,
            address,
            zipCode,
            isBusiness,
        });
        //JWT
        const token = jwt.sign({_id: _id}, SECRETKEY)
        res.status(201).send(token);
    } catch (error) {
        console.error(error);
        res.status(401).send('could not create user');
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email ,password);
    try {
        const user = await userDb.findOne({email});
        if (!user) throw new Error('no user');
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) throw new Error('wrong password');
        //JWT
        const token = jwt.sign({ _id: user._id }, SECRETKEY);
        res.status(200).send(token);
    } catch (error) {
        console.error(error);
        res.status(400).send('login failed');
    }
};
const logout = async (req, res) => {
    res.status(200).send('OK')
}
const userbyid = async (req, res) => {
    const {_id} = req.user
    try {
        const user = await userDb.findById(_id);
        user.passwordHash='';
        res.json(user);
    } catch (error) {
        res.status(400).json('could not get user');
    }
};
const visited = async (req, res) => {
    const {_id, isBusiness } = req.user;
    if (!isBusiness) res.sta(402).send('not a business');
    const bid = _id;
    try {
        const users = await visits.find({ bid });
        res.status(200).json(users);  
    } catch (error) {
        res.status(500).send('could not get from the server')
    }
};

const visit = async (req, res) => {
    const {bid} = req.body;  // <- userid from middleware
    //const {_id} = req.user; 
    try {
        const user = req.user // await userDb.findById(_id);
        delete user.passwordHash;
        const record = new visits({
            bid,
            user: user,
        })
        const singlevisit = await record.save();
        res.status(200).json(singlevisit);  
    } catch (error) {
        console.log(error)
        res.status(500).send('could not get from the server')
    }
};
const verifyBusiness = async (req, res) => {
    const {bid} = req.body
    try {
        const user = await userDb.findById(bid);
        user.passwordHash='';
        if (!user.isBusiness) throw new Error('not bid');
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json('could not get user');
    }
};
module.exports = { register, login, logout, visited, userbyid, visit, verifyBusiness };