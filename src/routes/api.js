const express = require('express');

const router = express.Router();

const Allotments = require('../models/allotmentsModel')
const AwardType = require('../models/awardTypeModel')
const Committee = require('../models/committeeModel')
const IndividualAward = require('../models/individualAwardModel')
const RegistrationData = require('../models/registrationDataModel')
const License = require('../models/licenseModel')
const ValidLicense = require('../models/validLicenseModel')
const Settings = require('../models/settingsModel')
const multer = require("multer");

/**GETTING DATA FROM MONGODB */
router.get('/get/allotments', (req, res) => {
    Allotments.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/get/awardType', (req, res) => {
    AwardType.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/get/committee', (req, res) => {
    Committee.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/get/individualAward', (req, res) => {
    IndividualAward.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/get/registrationData', (req, res) => {
    RegistrationData.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/get/license', (req, res) => {
    License.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/get/validlicense', (req, res) => {
    ValidLicense.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/get/settings', (req, res) => {
    Settings.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

/**DELETING DATA FROM MONGODB */
router.delete('/delete/allotments', (req, res) => {
    const { id } = req.body;
    Allotments.findByIdAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.delete('/delete/awardType', (req, res) => {
    const { id } = req.body;
    AwardType.findByIdAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.delete('/delete/committee', (req, res) => {
    const { id } = req.body;
    Committee.findByIdAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.delete('/delete/individualAward', (req, res) => {
    const { id } = req.body;
    IndividualAward.findByIdAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.delete('/delete/registrationData', (req, res) => {
    const { id } = req.body;
    RegistrationData.findByIdAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.delete('/delete/license', (req, res) => {
    const { id } = req.body;
    License.findByIdAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.delete('/delete/settings', (req, res) => {
    const { id } = req.body;
    Settings.findByIdAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

/**UPDATING DATA FROM MONGODB */
router.put('/update/allotments', (req, res) => {
    const { id, update } = req.body.data;
    Allotments.findByIdAndUpdate(id, update, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.put('/update/awardType', (req, res) => {
    const { id, update } = req.body.data;
    AwardType.findByIdAndUpdate(id, update, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.put('/update/registrationData', (req, res) => {
    const { id, update } = req.body.data;
    RegistrationData.findByIdAndUpdate(id, update, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.put('/update/committee', (req, res) => {
    const { id, update } = req.body.data;
    Committee.findByIdAndUpdate(id, update, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.put('/update/individualAward', (req, res) => {
    const { id, update } = req.body.data;
    IndividualAward.findByIdAndUpdate(id, update, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

/**SAVING DATA TO MONGODB */
router.post('/save/allotments', (req, res) => {
    const data = req.body
    const newAllotments = new Allotments(data)

    newAllotments.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' })
            return;
        }

        return res.json({
            msg: 'We received your data.'
        });
    })
});

router.post('/save/awardType', (req, res) => {
    const data = req.body
    const newAwardType = new AwardType(data)

    newAwardType.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' })
            return;
        }

        return res.json({
            msg: 'We received your data.'
        });
    })
});

router.post('/save/committee', (req, res) => {
    const data = req.body
    const newCommittee = new Committee(data)

    newCommittee.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' })
            return;
        }

        return res.json({
            msg: 'We received your data.'
        });
    })
});

router.post('/save/individualAward', (req, res) => {
    const data = req.body
    const newIndividualAward = new IndividualAward(data)

    newIndividualAward.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' })
            return;
        }

        return res.json({
            msg: 'We received your data.'
        });
    })
});

router.post('/save/registrationData', (req, res) => {
    const data = req.body
    const newRegistration = new RegistrationData(data)

    newRegistration.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' })
            return;
        }

        return res.json({
            msg: 'We received your data.'
        });
    })
});

router.post('/save/license', (req, res) => {
    const data = req.body
    const newLicense = new License(data)

    newLicense.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' })
            return;
        }

        return res.json({
            msg: 'We received your data.'
        });
    })
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const fileFilter = async (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fieldSize: 1024 * 1024 * 8 },
    fileFilter: fileFilter,
});

router.post('/save/settings', upload.single("file"), (req, res) => {
    let address = "http://localhost:8080/uploads/";
    console.log("HERE", process.env.NODE_ENV)
    const data = req.body
    let filePath = ""

    if(req.file !== undefined) {
        filePath = req.file.path
        filePath = filePath.substring(8)
    }

    data.logo = address.concat(filePath)
    const newSettings = new Settings(data)

    newSettings.save((error) => {
        if (error) {
            console.log('error', error);
            res.status(500).json({ msg: 'Sorry, internal server errors' })
            return;
        }

        return res.json({
            msg: 'We received your data.'
        });
    })
});

module.exports = router