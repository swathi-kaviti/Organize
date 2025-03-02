import React, { useEffect, useState } from "react";
import img from "../assets/images/img2.png";

const Home = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setDate(today.toLocaleDateString(undefined, options));

    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid px-5">
      <div className="row align-items-center mt-4">
        <div className="col-md-9">
          <h1 className="mt-9" style={{ marginTop: "45px"}}>
            <b>Confused with all your works...?<br />Organize your work with us</b>
          </h1>
          <h3><b>Get started...</b></h3>
        </div>
        <div className="col-md-3 text-start border border-dark rounded p-3">
          <h4>Date: <span className="text-secondary">{date}</span></h4>
          <h4>Time: <span className="text-secondary">{time}</span></h4>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="row align-items-center">
        <div className="col-md-6">
          <img 
            src={img} 
            className="img-fluid" 
            alt="Work Organization"
            style={{ width: "70%", height: "auto" }} // Reduced width
          />
        </div>
        <div className="col-md-6">
          <p className="fw-bold fs-4">Your roadmap to success starts with a single list — organize today, thrive tomorrow.</p>
          <ul className="list-unstyled fs-5">
            <li><b>📅 Calendar:</b> Mark your important days</li>
            <li><b>✅ To-do List:</b> Organize your daily, weekly, and monthly tasks</li>
            <li><b>📝 Notes:</b> Keep track of your memories</li>
            <li><b>📂 Files:</b> Store your important documents</li>
            <li><b>📊 Progress:</b> Track your work</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
