const mongoose = require('mongoose')

const Flavor = mongoose.model('flavors')

module.exports = app => {
    app.post('/api/newflavor', (req, res) => {
        const flavor = new Flavor({
            ...req.body,
            _user: req.user.id,
            creationDate: Date.now()
        })
        flavor.save()
        res.send('post req done')
    });

    app.get('/api/flavors', (req, res, next) => {
        Flavor.find({ _user: req.user.id })
            .populate('_user')
            .exec()
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    });

    app.get("/api/flavors/:flavorId", (req, res, next) => {
        const id = req.params.flavorId;
        Flavor.findById(id)
            .populate('_user')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res
                        .status(404)
                        .json({ message: "No valid entry found for provided ID" });
                }
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    });

    app.patch("/api/flavors/update/:flavorId", (req, res, next) => {
        const id = req.params.flavorId;
        Flavor.update({ _id: id }, {
            $set: {
                ...req.body
            }
        })
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    });

    app.delete("/api/flavors/delete/:flavorId", (req, res, next) => {
        const id = req.params.flavorId;
        Flavor.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    });
}