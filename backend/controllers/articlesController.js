const asyncHandler = require('express-async-handler')
const Articles = require('../models/articlesModel')
const Users = require('../models/usersModel')
const multer = require("multer");
const postImageUpload = multer({ dest: 'uploads/posts/' })
const upload = multer().none()

// @desc Get all Articles
// @route GET /api/articles/all
// Access public
const getAllArticles = asyncHandler(async (req, res) => {
    const articles = await Articles.find()
    res.status(200).json(articles)
})


// @desc Get Articles from user
// @route GET /api/articles
// Access private
const getUserArticles = asyncHandler(async (req, res) => {
    const articles = await Articles.find({user: req.user.id})

    if (articles){
        res.status(200).json(articles)
    } else {
        res.status(401)
        throw new Error("Aucun article lié à cet utilisateur.")
    }
})

// @desc Set Articles
// @route POST /api/articles
// Access private
const setArticles = asyncHandler(async (req, res) => {
    //ICI ON GERE ON LES ARTICLES QUI Y SONT ENVOYÉS
    //console.log(req)
    //if (req.body.text && req.body.text !== "") {
    //    console.log("ça passe")
//
    //    const createdArticle = await Articles.create({content: req.body.text, user: req.user.id})
    //    res.status(200).json(createdArticle)
    //} else {
    //    res.status(400).json("ça ne marche pas.")
    //}

    upload(req, res, async (err) => {
        if (err) {
            console.error('Erreur: ', err)
            return res.status(500).json({message: 'Error: ' + err})
        }

        if (req.body.text && req.body.text !== "" || req.body.image) {
            const createdArticle = await Articles.create({content: req.body.text, user: req.user.id, image: req.body.image})
            res.status(200).json(createdArticle)
        } else {
            res.status(400).json({message: 'Post is empty.'})
        }

    })
})

// @desc Update Articles
// @route PUT /api/articles:id
// Access private
const updateArticles = asyncHandler(async (req, res) => {
    const article = await Articles.findById(req.params.id)

    if(!article){
        res.status(400)
        throw new Error("Impossible de mettre la main sur cet article...")
    }

    if(!req.user){
        res.status(400)
        throw new Error("L'utilisateur ayant fait la requête n'a pas été trouvé.")
    }

    if (article.user.toString() !== req.user.id ) {
        res.status(403)
        throw new Error("Vous n'êtes pas autorisé.")
    }

    const updatedArticle = await Articles.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedArticle)
})

// @desc Delete Articles
// @route DELETE /api/articles:id
// Access private
const deleteArticle = asyncHandler(async (req, res) => {
    const article = await Articles.findById(req.params.id)

    if (!article) {
        res.status(400)
        throw new Error("Impossible de mettre la main sur cet article...")
    }

    if(!req.user){
        res.status(400)
        throw new Error("L'utilisateur ayant fait la requête n'a pas été trouvé.")
    }

    if (article.user.toString() !== req.user.id ) {
        res.status(403)
        throw new Error("Vous n'êtes pas autorisé.")
    }

    await Articles.findByIdAndRemove(req.params.id)
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getAllArticles,
    getUserArticles,
    setArticles,
    updateArticles,
    deleteArticle
}