const router = require("express").Router();
let User = require("../models/User");

router.route("/add").post(async (req, res) => {
    const { name, email, age, gender, rating, role, clubId } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new User({
            name,
            email,
            age,
            gender,
            rating,
            role,
            clubId
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.route("/").get((req, res) => {
    User.find().then((users) => {
        res.json(users);
    }).catch((err) => {
        console.error(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
    const userId = req.params.id;
    const { name, email, age, gender, rating, role } = req.body;

    const updateUser = {
        name,
        email,
        age,
        gender,
        rating,
        role,
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateUser, { new: true });
        if (updatedUser) {
            res.status(200).json({ status: "User updated", user: updatedUser });
        } else {
            res.status(404).json({ status: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating data" });
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    const userId = req.params.id;

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).send({ status: "User Deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error with delete" });
    }
});

router.route("/get/:id").get(async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (user) {
            res.status(200).send({ status: "User Found", user });
        } else {
            res.status(404).send({ status: "User not Found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    }
});

router.route("/getRole/:role").get(async (req, res) => {
    const userRole = req.params.role;

    try {
        const user = await User.findOne({ role: userRole });
        if (user) {
            res.status(200).send({ status: "User Found", user });
        } else {
            res.status(404).send({ status: "User not Found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error with get role", error: err.message });
    }
});

module.exports = router;
