const express = require('express')

const userModel = require('../../models/user');
const bcrypt =  require("bcryptjs");
const router = express.Router();

//testing this route
router.get('/test', (req, res) => res.send("UserRouter testing"));

// Getting all the users:
router.route('/').get(function(req, res) {
    userModel.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

router.route('/login').post(
    function(req, res){
        if(!req | !req.body.username | !req.body.password){
            return res.status(200).json({ Success : false, "Error" : "Bad Request bhai"})
        }

        userModel.findOne({'username' : req.body.username}).then(
            userReturned => {
                if(!userReturned){
                    return res.status(400).json({ Success : false, error : "Username Not Found"})
                }

                bcrypt.compare(req.body.password, userReturned.password).then(
                    match => {
                        if(match){
                            return res.status(400).json({ Success : true, user_id : userReturned._id, name : userReturned.name})
                        }
                        else {
                            return res.status(400).json({ Success : false, error : "Password Incorrect"})
                        }
                    }
                )
            }
        )
    }
)

// Adding a new user
router.route('/add').post(function(req, res) {
    data = req.body
    userModel.findOne({ username: data.username}).then(
        x => {
            if(x) userExist()
            else userDoesntExist()
        }
    )
    
    function userExist() {
        res.status(200).json({'Error' : "Username Already Exists"})
    }

    function userDoesntExist(){
        bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data.password, salt, (err, hash) => {
                if (err) throw err;
                data.password=hash;
                console.log(data)
                console.log(hash)
                let user = new userModel(data)
                user.save()
                .then(user => {
                    res.status(200).json({'User': 'User added successfully'});
                })
                .catch(err => {
                    res.status(400).send('Error');
                });
            });
        });
    }
});

// Getting a user by id
router.route('/detail/:id').get(function(req, res) {
    let id = req.params.id;
    userModel.findById(id, function(err, user) {
        res.json(user);
    });
});

// Deletes the whole database ;)
router.route('/kardoDelete').get(function(req, res){
    userModel.remove().then(
        res.send({"Success" : "Hogaya Delete"})
    )
    .catch(
        x => {
            res.send({error : x})
        }
    )

});
// Delete kardo sab (For debugging , will not ship it dont worry)

module.exports = router