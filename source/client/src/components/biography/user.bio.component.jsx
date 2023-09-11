import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../authContext";
import axios from "axios";
import "./biography.css";
import "./edit.bio.css";

const UserBiography = ({ id }) => {
  const { user } = useContext(AuthContext);
  const [biography, setBiography] = useState("");
  const [buttonClicked, setButtonClicked] = useState("false");

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5050/api/updateuser/biography?id=${id}`)

        .then((res) => {
          if (res.status === 200 && res.data !== false) {
            setBiography(res.data[0].biography);
          }
        });
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  const editBiography = (e) => {
    e.preventDefault();
    setButtonClicked("true");
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const info = {
      biography: biography,
      id: id,
    };

    try {
      await axios.put(
        "http://localhost:5050/api/updateuser/biographyupdate",
        info
      );

      const response = await axios.get(
        "http://localhost:5050/api/updateuser/biography",
        {
          params: { id },
        }
      );

      setBiography(response.data[0].biography);
      setButtonClicked("false");
    } catch (err) {
      console.error("An error occured:", err);
    }
  };

  const handleExitButton = (e) => {
    setButtonClicked("false");
  };

  return (
    <>
      {buttonClicked === "false" && (
        <div className="bio-card">
          <div className="bio-actions">
            <span className="bio-title">Biography</span>
            {id === user.user_info.user_id && (
              <button className="bio-edit" onClick={editBiography}>
                Edit
              </button>
            )}
          </div>
          <p className="bio-description">{biography}</p>
        </div>
      )}

      {id === user.user_info.user_id && buttonClicked === "true" && (
        <div className="ebio-card">
          <div className="ebio-actions">
            <span className="ebio-title">Biography</span>
            <button className="ebio-edit exit-btn" onClick={handleExitButton}>
              Exit
            </button>
            <button className="ebio-edit" onClick={handleSubmitEdit}>
              Submit
            </button>
          </div>
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            className="ebio-content placeholder:text-slate-600 placeholder:opacity-50"
          ></textarea>
        </div>
      )}
    </>
  );
};

export default UserBiography;
