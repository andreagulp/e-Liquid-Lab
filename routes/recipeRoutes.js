const mongoose = require('mongoose')

const Recipe = mongoose.model('recipes')

module.exports = app => {

    // add new recipe
    app.post('/api/newRecipe', (req, res) => {
        const recipe = new Recipe({
            ...req.body,
            _user: req.user.id,
            creationDate: Date.now()
        })
        recipe.save()
        res.send('post req done')
    });

    // fetch all pubblic recipes
    app.get('/api/public-recipes', (req, res, next) => {
        Recipe.find({ isPublic: true })
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

    // fetch all recipes that the logged user can see
    app.get('/api/recipes', (req, res, next) => {
        if (req.user) {
            Recipe.find({ _user: req.user.id })
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
        } else {
            res.send("please login")
        }
    });

    // fetch single recipe
    app.get("/api/recipes/:recipeId", (req, res, next) => {
        const id = req.params.recipeId;
        // console.log(id)
        Recipe.findById(id)
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

    app.patch("/api/recipes/update/:recipeId", (req, res, next) => {
        const id = req.params.recipeId;
        Recipe.update({ _id: id }, {
            $set: {
                ...req.body
            }
        })
            .exec()
            .then(result => {
                // console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    });

    app.delete("/api/recipes/delete/:recipeId", (req, res, next) => {
        const id = req.params.recipeId;
        Recipe.remove({ _id: id })
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


    // retrive all records that are piublic or visible to the user loggedin
    // app.get('/api/recipes', (req, res, next) => {
    //     if (req.user) {
    //         Recipe.find({ $or: [{ isPublic: true }, { _user: req.user.id }] })
    //             .populate('_user')
    //             .exec()
    //             .then(docs => {
    //                 res.status(200).json(docs);
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 res.status(500).json({
    //                     error: err
    //                 });
    //             });
    //     } else {
    //         Recipe.find({ isPublic: true })
    //             .populate('_user')
    //             .exec()
    //             .then(docs => {
    //                 res.status(200).json(docs);
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 res.status(500).json({
    //                     error: err
    //                 });
    //             });
    //     }
    // });