const moment = require('moment');
const { response } = require('express');
const express = require('express')
const transaction = require('../models/transaction')
const router = express.Router()


router.post('/add-transaction', async function (req, res) {

    try {
        const newtransaction = new transaction(req.body);
        await newtransaction.save();
        res.send('Transaction added Successfully')
    }
    catch (error) {
        res.status(500).json(error)
    }
});

router.post('/edit-transaction', async function (req, res) {

    try {
        await transaction.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload)
        res.send('Transaction updated Successfully');
    }
    catch (error) { 
        res.status(500).json(error)
    }
});

router.post('/delete-transaction', async function (req, res) {

    try {
        await transaction.findOneAndDelete({ _id: req.body.transactionId })
        res.send('Transaction updated Successfully');
    }
    catch (error) { 
        res.status(500).json(error)
    }
});

router.post('/get-all-transactions', async (req, res) => {
    const { frequency, selectedRange, type } = req.body
    try {
        const transactions = await transaction.find({
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(req.body.frequency), 'd').toDate()
                },
            } : {
                date: {
                    $gte: selectedRange[0],
                    $lte: selectedRange[1]
                }
            }),
            userId: req.body.userId,
            ...(type !== "all" && { type })

        });
        res.send(transactions);
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router;
