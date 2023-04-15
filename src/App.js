import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../node_modules/react-calendar/dist/Calendar.css";
import axios from "axios";

function App() {
  const [value, onChange] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [status, setStatus] = useState(null);

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedDate("")
  };

  const handleOpen = async (val) => {
    setIsModalOpen(true);
    setSelectedDate(val.toLocaleDateString());
  };

  const handleUpdate = async (e) => {
    const res = await axios.patch(
      "http://localhost:4144/update",
      { date: selectedDate, status : e.target.value },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
     if (res.data) {
       console.log(res.data);
       setStatus(res.data.status);
     } else {
       setStatus(null);
     }
     handleClose()
  };

  const handleTileClick = async () => {
    const res = await axios.post(
      "http://localhost:4144/fetchByDate",
      { date: selectedDate },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data) {
      setStatus(res.data.status);
      console.log(status)
    } else {
      setStatus(null);
    }
  };

  useEffect(() => {
    handleTileClick();
  }, [selectedDate, status, handleUpdate]);

  return (
    <div>
      {isModalOpen && (
        <div
          style={{
            zIndex: 1,
            width: "300px",
            maxWidth: "500px",
            height: "400px",
            background: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // boxShadow: "0 0 40px 1000px rgba(0,0,0,0.6)",
            borderRadius: "5px",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "10px",
              fontSize: "small",
            }}
            onClick={handleClose}
          >
            Close
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "60px 20px",
            }}
          >
            <span>
              <b>Status</b>
              {status == "present" ? (
                <p
                  style={{
                    background: "lightgreen",
                    padding: "5px",
                    border: "1px solid #cecece",
                  }}
                >
                  {status}
                </p>
              ) : status == "absent" ? (
                <p
                  style={{
                    background: "crimson",
                    color: "#fff",
                    padding: "5px",
                    border: "1px solid #cecece",
                  }}
                >
                  {status}
                </p>
              ) : (
                <p
                  style={{
                    background: "yellow",
                    padding: "5px",
                    border: "1px solid #cecece",
                  }}
                >
                  Attendance not available
                </p>
              )}
            </span>
            <br/>
            <button
              value="present"
              style={{ margin: "10px", width: "100px" }}
              onClick={handleUpdate}
            >
              PRESENT
            </button>
            <button
              value="absent"
              style={{ margin: "10px", width: "100px" }}
              onClick={handleUpdate}
            >
              ABSENT
            </button>
          </div>
        </div>
      )}
      <Calendar
        onChange={(val) => {
          handleOpen(val);
        }}
        value={value}
      />
      {isModalOpen && (
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            top: 0,
            position: "absolute",
          }}
        ></div>
      )}
    </div>
  );
}
export default App;
