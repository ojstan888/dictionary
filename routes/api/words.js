const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Word = require('../../models/Word')
const User = require('../../models/User')

const router = Router()

// @route -> POST api/words
// @desc -> Create a word
// @access -> Private
router.post('/', [auth, [
    check('word', 'word is required').not().isEmpty(),
    check('translation', 'translation is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { word, translation, examples, transcription } = req.body

    const wordFields = {}
    wordFields.user = req.user.id
    if (word) wordFields.word = word
    if (translation) wordFields.translation = translation
    if (examples) wordFields.examples = examples
    if (transcription) wordFields.transcription = transcription


    try {

        const newWord = new Word(wordFields)

        const word = await newWord.save()

        res.json(word)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

// @route -> PUT api/words
// @desc -> Edit a word
// @access -> Private
router.put('/:id', [auth, [
    check('word', 'word is required').not().isEmpty(),
    check('translation', 'translation is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const wordForUpdate = await Word.findById(req.params.id)

    if (!wordForUpdate) {
        return res
            .status(404)
            .json({ message: 'Word not found' })
    }

    // check user
    if (wordForUpdate.user.toString() !== req.user.id) {
        return res
            .status(401)
            .json({message: 'User not authorized'})
    }

    const { word, translation, examples, transcription } = req.body

    if (word) wordForUpdate.word = word
    if (translation) wordForUpdate.translation = translation
    if (examples) wordForUpdate.examples = examples
    if (transcription) wordForUpdate.transcription = transcription


    try {

        await wordForUpdate.save()

        res.json(wordForUpdate)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

// @route -> GET api/words
// @desc -> Get all words
// @access -> Private
router.get('/', auth, async (req, res) => {
    try {
        // const words = await Word.find({ user: req.user.id }).sort({ date: -1 })
        //
        // res.json(words)

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const search = req.query.search

        const results = {}

        if (search) {
            results.results = await Word.find({
                word: { $regex: new RegExp('^' + search.trim(), "i") },
                user: req.user.id
            }).sort({ date: -1 });
            results.amount = await Word.find({ word: { $regex: search.trim() }, user: req.user.id }).countDocuments().exec()
            res.json(results)
            return
        }

        const startIndex = ( page - 1 ) * limit
        const endIndex = page * limit

        if (startIndex > 1) {
            results.previous = {
                page: page - 1,
                limit
            }
        }

        if (endIndex < await User.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit
            }
        }
        results.results = await Word.find({ user: req.user.id }).limit(limit).skip(startIndex).exec()
        results.amount = await Word.countDocuments({ user: req.user.id }).exec()

        res.json(results)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

// @route -> GET api/words/:id
// @desc -> Get particular words
// @access -> Private
router.get('/:id', auth, async (req, res) => {
    try {
        const word = await Word.findById(req.params.id)

        if (!word) {
            return res
                .status(404)
                .json({ message: 'Word not found' })
        }

        // check user
        if (word.user.toString() !== req.user.id) {
            return res
                .status(401)
                .json({ message: 'User not authorized' })
        }

        res.json(word)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

// @route -> DELETE api/words/:id
// @desc -> Delete word
// @access -> Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const word = await Word.findById(req.params.id)

        if (!word) {
            return res
                .status(404)
                .json({ message: 'Word not found' })
        }

        // check user
        if (word.user.toString() !== req.user.id) {
            return res
                .status(401)
                .json({ message: 'User not authorized' })
        }

        await word.remove()

        res.json({ message: 'Post removed' })

    } catch (error) {
        console.error(error.message)
        if (error.kind === 'ObjectId') {
            return res
                .status(404)
                .json({ message: 'Post not found' })
        }
        res.status(500).send('Server error')
    }
})

module.exports = router
