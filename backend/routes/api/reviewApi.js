const express = require('express')
const reviewModel = require('../../models/review');
const router = express.Router();


router.route('/test').get(
    (req,res) => res.send("Order route testing")
)

router.route('/list').get(
    (req, res) => {
        reviewModel.find()
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
        console.log("Review add request")
        console.log(data)

        p = new reviewModel(data);
        p.save()
                .then(x => {
                    console.log("Review added Successfully")
                    res.status(200).JSON({success : "Order Successfully Added"})
                })
                .catch(x => res.status(400).json({error : x}))
    }
)

router.route('/details/').get(
    (req, res) => {
        reviewModel.find({})
        .populate({ path: 'orderId', populate: { path: 'productId' , populate:{ path: 'selledId'} } })

        .then(
            x => res.json(x)
        )
        .catch(
            x => res.status(400).send(x)
        )
    }
)

module.exports = router
