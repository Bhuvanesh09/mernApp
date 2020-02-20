const express = require('express')
const orderModel = require('../../models/order');
const router = express.Router();


router.route('/test').get(
    (req,res) => res.send("Order route testing")
)

router.route('/list').get(
    (req, res) => {
        orderModel.find()
        .then(
            x => {
                return res.json(x)
            }
        )
        .catch(
            err => {
               return res.status(400).json(err)
            }
        )
    }
)

router.route('/listbyuser').get(
    (req, res) => {
        orderModel.find({userId : req.body.userId})
        .populate('productId')
        .then(
            x => {
                return res.json(x)
            }
        )
        .catch(
            err => {
               return res.status(400).json(err)
            }
        )
    }
)

router.route('/add').post(
    (req, res) => {
        data = req.body;
        console.log("Order add request")
        console.log(data)
        if(data.productId == undefined || data.userId == undefined || data.quantity == undefined){
            console.log("Undefined Value Error")
            return res.send("Error: Data Insufficient")
        }

        p = new orderModel(data);
        p.save()
                .then(x => {
                    console.log("Order Request Processed Successfully")
                    res.status(200).JSON({success : "Order Successfully Added"})
                })
                .catch(x => res.status(400).json({error : x}))
    }
)

router.route('/update').post(
    (req, res) => {
        let id = req.body._id;
        orderModel.findByIdAndUpdate(id,req.body)
        .then(x => { res.send("Success")})
        .catch(x => res.send("Error, Did not Update"))
    }
)

router.route('/details/:id').get(
    (req, res) => {
        orderModel.find({_id : req.params.orderId})
        .populate({ path: 'productId', populate: { path: 'sellerId', model: 'User' } })
        .populate('userId')
        .then(
            x => res.json(x)
        )
        .catch(
            x => res.status(400).send(x)
        )
    }
)
module.exports = router
