const express = require('express')
const router = express.Router()
const Blog = require('../models/test')


// Keistasis Cors problemos sprendimas kuris. Pabandziau Corse biblioteka ir Proxy nelabai padejo. Speju problema kazkur mano uzklausose ☺

router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });



// get all

router.get('/', async (req,res) => {
    try {
        const blogs = await Blog.find()
        res.json(blogs)

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})



// get one
router.get('/:id',getBlog, (req,res) => {
   
    try {
        let blog = res.blog
        res.status(201).json(blog)

    } catch (err) {
        res.status(500).json({message: err.message})
    }
   
    
})

// get by searchtag BAND 

router.get('/search/:band',getBand, (req,res) => {
   
    try {
        let blog = res.blog
        res.status(201).json(blog)

    } catch (err) {
        res.status(500).json({message: err.message})
    }
   
    
})


// create one
router.post('/', async (req,res) => {
    const blog = new Blog({
        band: req.body.band,
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year,
        remaster:req.body.remaster,
        serial:req.body.serial,
        img: req.body.img,
        format:req.body.format
     
    })
    try {
        const newBlog  = await blog.save()
        res.status(201).json(newBlog)

    } catch (err) {
        res.status(400).json({message: err.message})
    }
        
    })

// update one
router.patch('/:id',getBlog,  async (req,res) => {
    if (req.body.band != null && req.body.band != '') {
        res.blog.band = req.body.band
    }
    if (req.body.serial != null && req.body.serial != '') {
        res.blog.serial = req.body.serial
    }
    if (req.body.year != null && req.body.year != '') {
        res.blog.year = req.body.year
    }
    if (req.body.title != null && req.body.title != '') {
        res.blog.title = req.body.title
    }
    if (req.body.remaster!= null && req.body.remaster != '') {
        res.blog.remaster = req.body.remaster
    }
   
    if (req.body.format!= null && req.body.format != '') {
        res.blog.format = req.body.format
    }
    if (req.body.genre!= null && req.body.genre != '') {
        res.blog.genre = req.body.genre
    }
    try {
        const updatedBlog = await res.blog.save()
        res.json(updatedBlog)
    } catch (err) {
        res.status(400).json({message: err.message})

    }
    
})



router.put('/:id',getBlog,  async (req,res) => {
   
    try {
        const updatedBlog = await res.blog.save()
        res.json(updatedBlog)
    } catch (err) {
        res.status(400).json({message: err.message})

    }
    
})
// delete one
router.delete('/:id', getBlog, async (req,res) => {
    try {
        await res.blog.deleteOne()
        res.json({message:'Entry deleted'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    
})

async function getBlog(req, res , next) {
    let blog
    try {
        blog = await Blog.findById(req.params.id)
        if (blog == null) {
            return res.status(404).json({message: 'Can not find entry'})
        }

    } catch (err) {
       return res.status(500).json({message: err.message})
    }
    res.blog = blog
    // console.log(res.blog)
    next()
}
async function getBand(req, res ,next) {
    let blog
    try {
        blog = await Blog.find(req.params)
        if (blog == null) {
            return res.status(404).json({message: 'Can not find entry'})
        }

    } catch (err) {
       return res.status(500).json({message: err.message})
    }
    res.blog = blog
    // console.log(res.blog)
    next()
}



module.exports = router