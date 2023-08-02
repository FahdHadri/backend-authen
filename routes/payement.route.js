const express=require('express');
const router = express.Router();
const stripe = require ('stripe');
const Stripe =
stripe('sk_test_51NXU02G9MFrVfPLrqHAABuT7q9HVEu1DCE1w50wbpGW90rfjpFhbgH3wyjcc3JDAnS5NaYtZ63jV1GQS23y9apAk00krp4LqIT');
router.post('/', async (req, res) => { console.log(req.body)
    let status, error;
    const { token, amount } = req.body;
    try {
        await Stripe.charges.create({
        source: token.id,
        amount,
        currency: 'usd',
        });
        status = 'success';
        } catch (error) {
        console.log(error);
        status = 'Failure';
        }
        res.json({ error, status });
        });
        module.exports = router;