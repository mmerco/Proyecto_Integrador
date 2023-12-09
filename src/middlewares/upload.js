import multer from "multer";


// CONFIG MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage }).fields([{ name: 'image_front' }, { name: 'image_back' }]);


export default upload;