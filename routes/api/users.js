const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken")
const authorizeAdmin = require("../../middleware/verifyAdminRole")

const User = require("../../models/User")

// fetching all users
// router.get("/", verifyToken, authorizeAdmin, (req, res)=> { verifyToken,authorizeAdmin,
router.get("/" , (req, res)=> {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json({error: "Error fetching users"}))
})

// fetch user by id
router.get("/:id", verifyToken, (req, res) => {
    const userId = req.params.id;
    User.findById(userId).then(user => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(user);
    }).catch(err => res.status(500).json({ error: "Error fetching user" }));
});

// update user by id
router.put("/update", verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.json({ message: "User updated successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// delete user
router.delete("/:id", verifyToken, async (req, res) => {
    const userId = req.params.id;
    const requestingUserId = req.user.id;
    const requestingUserRole = req.user.role;

    try {
        // Allow admin to delete any user or a user to delete their own account
        if (requestingUserRole === "admin" || requestingUserId === userId) {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Prevent admin from accidentally deleting their own account
            if (user.role === "admin" && requestingUserId === userId) {
                return res.status(400).json({ error: "Admin cannot delete their own account" });
            }

            await User.findByIdAndDelete(userId);
            res.json({ message: "User deleted successfully" });
        } else {
            return res.status(401).json({ error: "Unauthorized" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// Fetch all users with role 'user'
router.get("/role/user", verifyToken,authorizeAdmin, (req, res) => {
    User.find({ role: "user" })
        .then(users => res.json(users))
        .catch(err => res.status(400).json({ error: "Error fetching users" }));
});

// Fetch all users with role 'admin'
router.get("/role/admin", verifyToken,authorizeAdmin,(req, res) => {
    User.find({ role: "admin" })
        .then(users => res.json(users))
        .catch(err => res.status(400).json({ error: "Error fetching users" }));
});
module.exports = router;
