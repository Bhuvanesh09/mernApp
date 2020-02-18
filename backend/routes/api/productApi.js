const express = require('express')
const productModel = require('../../models/product');
const router = express.Router();


router.route('/test').get(
    (req,res) => res.send("product route testing")
)

router.route('/list').get(
    (req, res) => {
        productModel.find()
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

router.route('/listbyseller').get(
    (req, res) => {
        productModel.find({sellerId : req.body.sellerId})
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
        if(data.sellerId == undefined || data.name == undefined){
            
            return res.send(req.body)
        }

        p = new productModel(data);
        p.save()
                .then(x => res.send("Product Added"))
                .catch(x => res.status(400).json({error : x}))
    }
)

router.route('/update').post(
    (req, res) => {
        let id = req.body._id;
        productModel.findByIdAndUpdate(id,req.body)
        .then(x => { res.send("Success")})
        .catch(x => res.send("Error, Did not Update"))
    }
)

router.route('/details/:id').get(
    (req, res) => {
        productModel.find({_id : req.params.productId})
        .then(
            x => res.json(x)
        )
        .catch(
            x => res.status(400).send(x)
        )
    }
)
module.exports = router
