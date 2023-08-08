import {
  findFamilyCircleMembers,
  updateProfilePicture,
} from "./controller/websocket.controllers";

const createWebSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("New client successfully connected to the server");

    socket.on("profile_image_update", async (data) => {
      try {
        await updateProfilePicture(data.userId, data.imageUrl);

        socket.emit("profile_image_updated_response", {
          success: true,
          message: "Profile image updated successfully.",
        });
      } catch (err) {
        socket.emit("profile_image_updated_response", {
          success: false,
          message: "Error updating profile image.",
        });
        console.error("Error updating profile image:", err);
      }

      io.emit("profile_image_updated", {
        userId: data.userId,
        newImageUrl: data.imageUrl,
      });
    });

    socket.on("get_family_circle_members", async () => {
      try {
        const familyCircleMembers =
          await findFamilyCircleMembers(/* parameters */);

        socket.emit("family_circle_members_response", {
          success: true,
          members: familyCircleMembers,
        });
      } catch (err) {
        console.error("Error fetching family circle members:", err);
        socket.emit("family_circle_members_response", {
          success: false,
          message: "Error fetching family circle members.",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("WebSocket connection closed");
    });
  });
};

export default createWebSocket;
