var express = require('express');
var router = express.Router();
const {
    user,
    shortUrl,
    track
} = require('../db/models');
const passport = require('../helper/auth');
const chance = require('chance').Chance();
const {
    check,
    validationResult
} = require('express-validator/check');




/* GET track listing. */
router.get('/track', passport.authenticate('jwt'), async (req, res) => {
    //  console.log('sasasas')
    const {
        id
    } = req.user
    const data = await shortUrl.findAll({
        include: track,
        where: {
            idUser: id
        }
    })
    //    console.log(data)
    res.json(data);
});

/* GET shortUrls listing. */
router.get('/short', passport.authenticate('jwt'), async (req, res) => {
    //  console.log('sasasas')
    const {
        id
    } = req.user
    const data = await shortUrl.findAll({
        include: user,
        where: {
            idUser: id
        }
    })
    //    console.log(data)
    res.json(data);
});

router.get('/short/:id', passport.authenticate('jwt'), async (req, res) => {
    const id = req.params.id
    const data = await shortUrl.findOne({
        where: {
            id: id
        }
    })

    res.json(data)
})

/* POST shortUrls listing. */
router.post('/addshort', passport.authenticate('jwt'), async (req, res) => {
    const {
        title,
        short,
        url
    } = req.body
    const {
        id
    } = req.user
    console.log(id)
    const data = await shortUrl.create({
        title,
        short,
        url,
        idUser: id
    })
    res.json(data)
})

/* POST guess listing. */
router.post('/guesshort',[
    check('url').isURL()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    const {
        url
    } = req.body
    const regx = new RegExp(/^.+:\/\//);


    let newUrl = ''
    if (regx.test(url)) {
        newUrl = url
    } else {
        newUrl = 'https://' + url;
    }
    const data = await shortUrl.create({
        title: chance.string({
            length: 5,
            pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        }),
        short: chance.string({
            length: 5,
            pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        }),
        url: newUrl
    })
    console.log(data)

    res.json(data)
})



/*PUT shortUrls listing. */
router.put('/update/:id', passport.authenticate('jwt'), async (req, res) => {
    const {
        id
    } = req.params
    const {
        title,
        short,
        url
    } = req.body

    const data = await shortUrl.update({
        title,
        short,
        url
    }, {
        where: {
            id: id
        }
    })
    res.json(data)
    console.log('Update Success')

})


/*DELETE shortUrls listing. */
router.delete('/delete/:id', passport.authenticate('jwt'), async (req, res) => {
    const {
        id
    } = req.params

    const data = await shortUrl.destroy({
        where: {
            id: id
        }
    })
    res.json(data)
    console.log('Delete Success')
});

module.exports = router;