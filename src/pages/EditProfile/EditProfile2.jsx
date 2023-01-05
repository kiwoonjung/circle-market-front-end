import "./EditProfile.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import defaultAvatar from "../../assets/images/icons/default_profile.svg";
import Avatar from "react-avatar-edit";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [image, setImage] = useState("");
  const [src, setsrc] = useState(false);
  const [imageCrop, setImageCrop] = useState("");
  const [profile, setProile] = useState([]);
  const [preview, setPreivew] = useState(false);

  const profileFinal = profile.map((item) => item.preview);

  const onClose = () => {
    setPreivew(null);
  };

  const onCrop = (view) => {
    setPreivew(view);
  };

  const saveCropImage = () => {
    setProile([...profile, { preview }]);
    setImageCrop(false);
  };

  /*
   * Get user data
   * send JWT token as part of request headers
   * token is decoded on the server and if valid sends back a user object
   */

  const loadProfile = (jwtToken) => {
    const decode = jwt_decode(jwtToken);
    axios
      .get(`http://localhost:8080/api/auth/findOneUser/${decode.id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setUsername(response.data[0].name);
        if (image) {
          return setUserAvatar(image);
        }
        if (response.data[0].imageUrl) {
          setUserAvatar(response.data[0].imageUrl);
        } else {
          return setUserAvatar(defaultAvatar);
        }
        // setLoggedIn(true);
        // setUserAvatar(response.data[0].imageUrl);
        // setUserId(response.data[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*
   * Component Mount, check if localStorage has JWT token
   * if token exists verify JWT and login user
   */

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt_token");
    // if JWT token exists try to load the user profile, user object
    if (jwtToken) {
      loadProfile(jwtToken);
    }
  }, []);

  function handleEdit(event) {
    event.preventDefault();

    const form = new FormData();
    // for (const image of images) {
    //   form.append("files", image);
    // }
    form.append("name", username);

    const jwtToken = localStorage.getItem("jwt_token");
    const decode = jwt_decode(jwtToken);

    axios
      .post(`http://localhost:8080/api/auth/findOneUser/${decode.id}`, form)
      .then((response) => {
        console.log(response.data);
        alert("Thank you for uploading!");
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Header />
      <div>
        <form onSubmit={handleEdit}>
          <div className="editProfile text-center p-4">
            <img
              style={{
                width: "200px",
                height: "200px",
                borderRadis: "50%",
                objectFit: "cover",
                border: "4px solid green",
              }}
              onClick={() => setImageCrop(true)}
              src={profileFinal.length ? profileFinal : userAvatar}
              alt="userAvatar"
            />
            <input type="text" defaultValue={username} />

            <Dialog
              visible={imageCrop}
              header={() => <p htmlFor="">Update Profile</p>}
              onHide={() => setImageCrop(false)}
            >
              <Avatar
                width={500}
                height={400}
                onCrop={onCrop}
                onClose={onClose}
                src={src}
                shadingColor={"#474649"}
                backgroundColor={"#474649"}
              />

              <Button onClick={saveCropImage} label="save" icon="pi pi-check" />
            </Dialog>

            <InputText
              type="file"
              accept="/image/*"
              style={{ display: "none" }}
              onChange={(event) => {
                const file = event.target.files[0];
                if (file && file.type.substring(0, 5) === "image") {
                  setImage(file);
                } else {
                  setImage(null);
                }
              }}
            />
          </div>

          <button className="addItem__btn-post" type="submit">
            Edit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

// import React, { useSate, useState } from "react";
// import Avatar from "react-avatar-edit";
// import { Dialog } from "primereact/dialog";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import img from "../../assets/images/icons/default_profile.svg";

// export default function EditProfile() {
//   const [imageCrop, setImageCrop] = useState(false);
//   const [image, setImage] = useState("");
//   const [src, setSrc] = useState(false);
//   const [profile, setProfile] = useState([]);
//   const [preview, setPreview] = useState(false);

//   const profileFinal = profile.map((item) => item.preview);

//   const onClose = () => {
//     setPreview(null);
//   };

//   const onCrop = (view) => {
//     setPreview(view);
//   };

//   const saveCropImage = () => {
//     setProfile([...profile, { preview }]);
//     setImageCrop(false);
//   };

//   return (
//     <div>
//       <div className="profile_img text-center p-4">
//         <div className="flex flex-colum justify-content-center align-items-center">
//           <img
//             style={{
//               width: "200px",
//               height: "200px",
//               borderRadis: "50%",
//               objectfit: "cover",
//               border: "4px soild green",
//             }}
//             onClick={() => setImageCrop(true)}
//             src={profileFinal.length ? profileFinal : img}
//             alt="useravatar"
//           />
//           <label htmlFor="" className="mt-3 font-semibold text-5x1">
//             username
//           </label>

//           <Dialog
//             visible={imageCrop}
//             header={() => (
//               <p htmlFor="" className="text-2x1 font-semibold textColor">
//                 Update Profile{" "}
//               </p>
//             )}
//             onHide={() => setImageCrop(false)}
//           >
//             <div className="confirmation-content flex  flex-colum align-items-center">
//               <Avatar
//                 width={500}
//                 height={400}
//                 onCrop={onCrop}
//                 onClose={onClose}
//                 src={src}
//                 shadingColor={"#474649"}
//                 backgroundColor={"#474649"}
//               />

//               <div className="flex flex-colum align-item-center mt-5 w-12">
//                 <div className="flex justify-content-around w12 mt-4">
//                   <Button
//                     onClick={saveCropImage}
//                     label="Save"
//                     icon="pi pi-check"
//                   />
//                 </div>
//               </div>
//             </div>
//           </Dialog>
//           <InputText
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={(event) => {
//               const file = event.target.files[0];
//               if (file && file.type.substring(0, 5) === "image") {
//                 setImage(file);
//               } else {
//                 setImage(null);
//               }
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
