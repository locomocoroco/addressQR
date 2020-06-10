const userDb = require('../model/users');
const bcrypt = require('bcrypt');

const SALTROUNDS = process.env.SALT

const register = async (req, res) => {
    const {email, password, firstName, lastName, address, zipcode, bid, isBusiness} = req.body;
    
    const check = await userDb.findOne({email: newUser.email});
    if (check) return res.send(409).send('email already in use');
    const passwordHash = await bcrypt.hash(newUser.password, SALTROUNDS);
    try {
        const {_id} = await userDb.create({
            email,
            passwordHash,
            firstName,
            lastName,
            address,
            zipcode,
            visited: {
                bid,
            },
            isBusiness,
        });
        res.status(201).send('token');
        //JWT
    } catch (error) {
        console.error(error);
        res.status(401).send('could not create user');
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userDb.findOne({email});
        if (!user) throw new Error('no user');
        const match = await bcrypt(password, user.passwordHash);
        if (!match) throw new Error('wrong password');
        res.status(200).send('token');
        //JWT
    } catch (error) {
        console.error(error);
        res.status(400).send('login failed');
    }
};
const logout = async (req, res) => {
    //JWT Whitelist delete ?
};
const visited = async (req, res) => {
    const {bid} = req.body;
    try {
        const users = await userDb.find({visited: {id: bid}});
        const usersNoPw = users.filter((user)=> !user.passwordHash);
        res.status(200).json(usersNoPw);  
    } catch (error) {
        res.status(500).send('could not get from the server')
    }
};
const user = async (req, res) => {
    const {_id} = req.body;
    try {
        const user = await userDb.findById(_id);
        delete user.passwordHash;
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send('could not get user');
    }
};

module.exports = { register, login, logout, visited, user }