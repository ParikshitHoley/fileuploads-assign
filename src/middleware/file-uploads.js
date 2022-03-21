const path = require("path");

const multer = require("multer");


const storage = multer.diskStorage({

    destination: function (req, file, callBack) {

      callBack(null, path.join(__dirname,"../uploads"))
    },

    filename: function (req, file, callBack) {
      const uniquePreffix = Date.now() + Math.round().toString();
      callBack(null, uniquePreffix + file.originalname)
    }
  })

  function fileFilter (req, file, callback) {

    if( file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg" ){

        callback(null, true)

    }else{
        callback(new Error("something Went Wrong"), false);
    }
  }
  
 const upload = multer({ storage,fileFilter,limits:{
      fileSize:1024*1024*5
  }});

  const uploadSingle = (fileKey) => {

    return function (req,res,next){

      const uploadItem = upload.single(fileKey);

      uploadItem(req, res, function (err) {

        if (err instanceof multer.MulterError) {

          return res.status(501).send(err.message);

        } else if (err) {
          return res.status(502).send(err.message);
        }
    
        // Everything went fine.
        next();
      })
    };
  };


  const uploadMultiple = (fileKey) =>{

    return function(req,res,next){

      const uploadItem = upload.any(fileKey)

      uploadItem(req, res, function (err) {

        if (err instanceof multer.MulterError) {

          return res.status(501).send(err.message);
        } else if (err) {
          return res.status(502).send(err.message);
        }
    
        // Everything went fine.
        next();

      })
    };
  };

  module.exports = { upload,uploadSingle,uploadMultiple }