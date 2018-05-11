const mongoose = require('mongoose')

const Review = mongoose.model('reviews')

module.exports = app => {

    app.post('/api/newReview', (req, res) => {
        console.log('server side req.body content', req.body);
        const review = new Review({
            ...req.body,
            _user: req.user.id,
            creationDate: Date.now()
        })
        // console.log('server side newReview endpoint is called', review);

        review.save()
        res.send('post req done')
    });

    app.get("/api/reviews/:recipeId", (req, res, next) => {
        const id = req.params.recipeId;
        // console.log(id)
        Review.find({ recipeId: id })
            .populate('_user')
            .exec()
            .then(doc => {
                // console.log("From database", doc);
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res
                        .status(404)
                        .json({ message: "No valid entry found for provided ID" });
                }
            })
            .catch(err => {
                // console.log(err);
                res.status(500).json({ error: err });
            });
    });

}