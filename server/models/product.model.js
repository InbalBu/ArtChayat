const mongoose = require('mongoose');

const GallerySchema = mongoose.Schema({
    id: String,
    name: {
        en: String,
        he: String
    },
    artist: {
        en: String,
        he: String
    },
    size: {
        en: String,
        he: String
    },
    technic: {
        en: String,
        he: String
    },
    isForSale: Boolean,
    price: {
        en: String,
        he: String
    },
    category: {
        en: String,
        he: String
    },
    imageURL: String
});

const Gallery = mongoose.model('Gallery', GallerySchema);

const ShoshiGallery = mongoose.model('ShoshiGallery', GallerySchema);
const JacobGallery = mongoose.model('JacobGallery', GallerySchema);

module.exports = {
    Gallery,
    ShoshiGallery,
    JacobGallery
};

