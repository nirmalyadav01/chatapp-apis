const multer = require("multer");
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let baseFolder = "uploads/"
        let destinationFolder = "";
        if (file.fieldname === "photo") {
            if (file.mimetype.includes("image")) {
                destinationFolder = "images/"
            } else {
                file.Error = true;
                file.msg = "only image file can Upload"
                return cb(new Error('Only PNG and JPEG files are allowed'), false);
            }
        }

        cb(null, `${baseFolder}${destinationFolder}`);
    },
    filename: (req, file, cb) => {
        cb(null, `upload-${file.originalname}`);
    }
});

const upload = multer({ storage: Storage })

module.exports = upload;