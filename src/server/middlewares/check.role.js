const checkUserRole = (req, res, next) => {
  const user_role = req.user.role;

  // Check if the user has the necessary role (e.g., admin)
  if (user_role === "admin") {
    // User has the necessary role, proceed to the next middleware or router handler
    next();
  } else {
    // User does not have the necessary role, return an error response
    res.status(403).json({ error: "Unauthorized" });
  }
};

export default checkUserRole;
