const checkUserRole = (req, res, next) => {
  // Assuming you have a way to determine the user's role
  const userRole = req.user.role;

  // Check if the user has the necessary role (e.g., admin)
  if (userRole === "admin") {
    // User has the necessary role, proceed to the next middleware or router handler
    next();
  } else {
    // User does not have the necessary role, return an error response
    res.status(403).json({ error: "Unauthorized" });
  }
};

export default checkUserRole;
