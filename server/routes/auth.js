const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.get('/', (req, res) => {
    res.send('Hola desde auth!')
});

//Creo un usuario
router.post('/register', async (req, res) => {
    
    const { error } = registerValidation(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);
    
    //Checkeo que no exista el email
    const emailExist = await User.findOne({email: req.body.email});
    if ( emailExist ) return res.status(400).send('El email ya se encuentra registrado');

    //Hasheo el password para no guardarlo como texto plano
    const salt = await bcrypt.genSalt(10); //Genera random string de 10
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Creo el objeto usuario para insertar
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        //Inserto el usuario
        const savedUser = await user.save();
        res.status(200).send({_id: savedUser.id});
    } catch (err){
        res.status(500).json({ message: err});
    }
});

//Login
router.post('/login', async (req, res) => {
    //Valido el body
    const { error } = loginValidation(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);

    //Checkeo que exista el email y me traigo el usuario
    const user = await User.findOne({email: req.body.email});
    if ( !user ) return res.status(400).send('Usuario no registrado');

    //Checkeo la contraseña
    const validPass = await bcrypt.compare(req.body.password, user.password);  
    if ( !validPass ) return res.status(400).send('Constraseña incorrecta');

    //Creo y asigno el token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    
    res.header('auth-token',token).send(token).status(200);
});

module.exports = router;