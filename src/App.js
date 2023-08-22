import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  get,
  child,
  set,
} from "firebase/database";
import config from "./config";

function App() {
  const [data, setData] = useState({
    dataCollection: [],
    developers: [],
  });
  const [statusList, setStatusList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  // const statusList = [];

  const [schoolCode, setSchoolCode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // const schoolCode = "engage";

  useEffect(() => {
    getUserData();
  }, [schoolCode, userEmail]);

  useEffect(() => {
    writeUserData();
  }, [data]);

  const writeUserData = () => {
    // const db = getDatabase();
    // set(ref(db, "/"), data);
    console.log("DATA SAVED");
  };

  const getUserData = () => {
    const dbRef = ref(getDatabase());
    console.log("hellooo", dbRef);
    get(child(dbRef, `/`)).then((snapshot) => {
        console.log("snapshot", snapshot.val());
        if (snapshot.exists()) {
          setData(snapshot.val());
          console.log("try1", snapshot.val());
          if (snapshot.val()[schoolCode]) {
            const temp = snapshot.val()[schoolCode];
            const filtered = temp.filter((obj) => obj.email === userEmail);
            setStatusList(temp);
            setDisplayList(filtered);
            // console.log("try2", temp);
            // const newArray = [];
            // for (const key in temp) {
            //   newArray.push({
            //     id: key,
            //     email: temp[key].email,
            //     colorCode: temp[key].colorCode,
            //     schoolCode: temp[key].schoolCode,
            //     statusName: temp[key].statusName,
            //   });
            // }
            // setStatusList(newArray);
            // console.log("final", newArray);
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let name = nameRef.current.value;
    let role = roleRef.current.value;
    let uid = uidRef.current.value;

    if (uid && name && role) {
      const newDevelopers = data.developers.map((developer) =>
        developer.uid === uid ? { ...developer, name, role } : developer
      );
      setData({ ...data, developers: newDevelopers });
    } else if (name && role) {
      const uid = new Date().getTime().toString();
      const newDeveloper = { uid, name, role };
      setData({
        ...data,
        developers: [...data.developers, newDeveloper],
      });
    }

    nameRef.current.value = "";
    roleRef.current.value = "";
    uidRef.current.value = "";
  };
  const handleSubmitStatus = (event) => {
    event.preventDefault();
    // const email="ardini@qs.com";
    // const sCode="engage";
    const sName= statusName.current.value;
    const cCode = colorCode.current.value;

    if (sName && cCode) {
      const newArray = [...statusList, {email: userEmail, schoolCode: schoolCode, statusName: sName, colorCode: cCode}];
      console.log("newArray", newArray);
      // setStatusList(newArray);
      const db = getDatabase();
      set(ref(db, `${schoolCode}/`), newArray);
      getUserData();
    }

    // let name = nameRef.current.value;
    // let role = roleRef.current.value;
    // let uid = uidRef.current.value;

    // if (uid && name && role) {
    //   const newDevelopers = data.developers.map((developer) =>
    //     developer.uid === uid ? { ...developer, name, role } : developer
    //   );
    //   setData({ ...data, developers: newDevelopers });
    // } else if (name && role) {
    //   const uid = new Date().getTime().toString();
    //   const newDeveloper = { uid, name, role };
    //   setData({
    //     ...data,
    //     developers: [...data.developers, newDeveloper],
    //   });
    // }

    // nameRef.current.value = "";
    // roleRef.current.value = "";
    // uidRef.current.value = "";
  }
  const handleSubmitEmail = (event) => {
    event.preventDefault();

    const email = emailField.current.value;
    const sCode = sCodeField.current.value;

    if (email && sCode) {
      console.log("can submit", email, sCode);
      setSchoolCode(sCode);
      setUserEmail(email);
    }
  };

  // const removeData = (developer) => {
  //   const newDevelopers = data.developers.filter(
  //     (dev) => dev.uid !== developer.uid
  //   );
  //   setData({ ...data, developers: newDevelopers });
  // };
  // const handleDelete = (selected) => {
  //   const newList = statusList.filter(
  //     (obj) => obj.id !== selected.id
  //   );
  //   setStatusList(newList);
  // }
  const handleDeleteStatus = (selected) => {
    const newList = statusList.filter(
      (obj) => obj.statusName !== selected.statusName
    );
    setStatusList(newList);
    const db = getDatabase();
    set(ref(db, `${schoolCode}/`), newList);
    getUserData();

    console.log("newList", newList);
  }

  const updateData = (developer) => {
    uidRef.current.value = developer.uid;
    nameRef.current.value = developer.name;
    roleRef.current.value = developer.role;
  };

  const nameRef = React.createRef();
  const roleRef = React.createRef();
  const uidRef = React.createRef();
  const statusName = React.createRef();
  const colorCode = React.createRef();

  const emailField = React.createRef();
  const sCodeField = React.createRef();

  return (
    <React.Fragment>
      <div className="container">
        <div className="row" style={{ marginBottom: "20px", marginTop: "20px"}}>
          <div className="col-xl-12">
            <h3>Input School Code & Email</h3>
            <form onSubmit={handleSubmitEmail}>
              <div className="form-row">
                <input type="hidden" /**ref={uidRef}*/ />
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    type="text"
                    ref={emailField}
                    className="form-control"
                    placeholder="email"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>School Code</label>
                  <input
                    type="text"
                    ref={sCodeField}
                    className="form-control"
                    placeholder="School Code"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-xl-12">
            {/* {data.developers.map((developer) => (
              <div
                key={developer.uid}
                className="card float-left"
                style={{ width: "18rem", marginRight: "1rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{developer.name}</h5>
                  <p className="card-text">{developer.role}</p>
                  <button
                    onClick={() => removeData(developer)}
                    className="btn btn-link"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => updateData(developer)}
                    className="btn btn-link"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))} */}
            {displayList.map((el) => (
              <div
                key={el.id}
                className="card float-left"
                style={{ width: "18rem", marginRight: "1rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{el.statusName}</h5>
                  <p className="card-text">{el.colorCode}</p>
                  <button className="btn btn-link" onClick={() => handleDeleteStatus(el)}>Delete</button>
                  {/* <button className="btn btn-link">Edit</button> */}
                </div>
              </div>
            ))}
            {displayList.length === 0 && (
              <div><h4>no data</h4></div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <h3>Add new status here</h3>
            <form onSubmit={handleSubmitStatus}>
              <div className="form-row">
                <input type="hidden" /**ref={uidRef}*/ />
                <div className="form-group col-md-6">
                  <label>Status Name</label>
                  <input
                    type="text"
                    ref={statusName}
                    className="form-control"
                    placeholder="Status Name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Color Code</label>
                  <input
                    type="text"
                    ref={colorCode}
                    className="form-control"
                    placeholder="Color Code"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-xl-12">
            <h1>Add new team member here</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="hidden" ref={uidRef} />
                <div className="form-group col-md-6">
                  <label>Name</label>
                  <input
                    type="text"
                    ref={nameRef}
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Role</label>
                  <input
                    type="text"
                    ref={roleRef}
                    className="form-control"
                    placeholder="Role"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div> */}
      </div>
    </React.Fragment>
  );
}

export default App;
