const express = require('express');
const mongoose = require('mongoose');
const { ShoshiGallery, JacobGallery } = require('./models/product.model'); 
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000', 
    'https://artchayat.netlify.app',
    'https://artchayat.onrender.com'  
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('The CORS policy for this site does not allow access from the specified origin.'), false);
        }
    }
}));

app.get('/', (req, res) => {
    res.send("Hello from Node API");
});

app.post('/api/products', async (req, res) => {
    try {
        let product;
        const {
            galleryType,
            nameEn, nameHe,
            artistEn, artistHe,
            sizeEn, sizeHe,
            technicEn, technicHe,
            priceEn, priceHe,
            categoryEn, categoryHe,
            imageURL
        } = req.body;

        const newProduct = {
            name: {
                en: nameEn,
                he: nameHe
            },
            artist: {
                en: artistEn,
                he: artistHe
            },
            size: {
                en: sizeEn,
                he: sizeHe
            },
            technic: {
                en: technicEn,
                he: technicHe
            },
            price: {
                en: priceEn,
                he: priceHe
            },
            category: {
                en: categoryEn,
                he: categoryHe
            },
            imageURL
        };

        if (galleryType === 'ShoshiGallery') {
            product = await ShoshiGallery.create(newProduct);
        } else if (galleryType === 'JacobGallery') {
            product = await JacobGallery.create(newProduct);
        } else {
            return res.status(400).json({ message: 'Invalid gallery type' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error creating product:', error); // Log server-side error
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products/jacob-gallery', async (req, res) => {
    try {
        const { lang } = req.query;
        const products = await JacobGallery.find();

        const localizedProducts = products.map(product => ({
            ...product.toObject(),
            name: product.name[lang],
            artist: product.artist[lang],
            size: product.size[lang],
            technic: product.technic[lang],
            price: product.price[lang],
            category: product.category[lang],
        }));

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(localizedProducts);
    } catch (error) {
        console.error('Error fetching products:', error); // Log server-side error
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products/shoshi-gallery', async (req, res) => {
    try {
        const { lang } = req.query;
        const products = await ShoshiGallery.find();

        const localizedProducts = products.map(product => ({
            ...product.toObject(),
            name: product.name[lang],
            artist: product.artist[lang],
            size: product.size[lang],
            technic: product.technic[lang],
            price: product.price[lang],
            category: product.category[lang],
        }));

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(localizedProducts);
    } catch (error) {
        console.error('Error fetching products:', error); // Log server-side error
        res.status(500).json({ message: error.message });
    }
});

// Fetch a single product from JacobGallery by ID
app.get('/api/products/jacob-gallery/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { lang } = req.query;
        
        const language = lang === 'he' ? 'he' : 'en';
        
        const product = await JacobGallery.findById(id); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const localizedProduct = {
            _id: product._id,
            name: product.name[language],
            artist: product.artist[language],
            size: product.size[language],
            technic: product.technic[language],
            price: product.price[language],
            category: product.category[language],
            imageURL: product.imageURL
        };

        res.status(200).json(localizedProduct);
    } catch (error) {
        console.error('Error fetching product:', error); // Log server-side error
        res.status(500).json({ message: error.message });
    }
});

// Fetch a single product from ShoshiGallery by ID
app.get('/api/products/shoshi-gallery/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { lang } = req.query;
        
        const language = lang === 'he' ? 'he' : 'en';
        
        const product = await ShoshiGallery.findById(id); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const localizedProduct = {
            _id: product._id,
            name: product.name[language],
            artist: product.artist[language],
            size: product.size[language],
            technic: product.technic[language],
            price: product.price[language],
            category: product.category[language],
            imageURL: product.imageURL
        };

        res.status(200).json(localizedProduct);
    } catch (error) {
        console.error('Error fetching product:', error); // Log server-side error
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database");
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((error) => {
        console.error('Connection failed:', error); // Log server-side error
    });
