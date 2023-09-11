import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../authContext";
import axios from "axios";
import "./members.component.css";

const MemberComponent = () => {
  const { user } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [code, setCode] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (user) {
      try {
        let info = {
          code: user.user_info.family_code,
          user_id: user.user_info.user_id,
        };

        axios
          .post("http://localhost:5050/api/retrieve/familycircle", info)
          .then((res) => {
            if (res.status === 200 && res.data !== false) {
              console.log("MEMBERS DATA", res.data);
              setMembers(res.data);
              setCode(user.user_info.family_code);
              setId(user.user_info.user_id);
            } else {
              console.error("This user has no famliy circle");
            }
          });
      } catch (err) {
        console.error("Error fetching user's family circle:", err);
      }
    }
  }, [user]);

  return (
    <div
      className=""
      style={{
        border: "0px",
        height: "70px",
        overflowX: "scroll",
        display: "flex",
      }}
    >
      {members.length === 1 && (
        <div>
          <p>
            Share your code with family! Add people to your circle!{" "}
            <b>{user.user_info.family_code}</b>
          </p>
        </div>
      )}
      {members.length > 1 && (
        <>
          {members.map((member, index) => {
            if (member.id !== id) {
              return (
                <div className="indiv-members-div">
                  <Link to={`/account/circlemember/${member.id}`}>
                    <img
                      src={member.profile_picture}
                      alt={member.id}
                      className="family-profiles"
                      key={index}
                    />
                  </Link>
                </div>
              );
            }
          })}
        </>
      )}
    </div>
  );
};

export default MemberComponent;
