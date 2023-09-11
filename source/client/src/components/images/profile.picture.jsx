import React, { useState, useEffect } from "react";
import axios from "axios";
import nophoto from "./nophoto.png";
import "./profilepic.css";

const ProfilePicture = ({ id, style }) => {
  const [data, setData] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5050/api/updateuser/image?id=${id}`)
        .then((res) => {
          if (res.status === 200 && res.data !== false) {
            setData(res.data[0].profile_picture);
            setUser(res.data[0].first_name);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch the image", err);
        });
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  if (!data) {
    setData(nophoto);
  }

  return (
    <div className="pic-div">
      <img src={data} alt={user} style={style} className="picture" />
    </div>
  );
};

export default ProfilePicture;
