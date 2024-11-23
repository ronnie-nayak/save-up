"use client";

import { useRef, useState } from "react";

export default function Page({ params }: { params: { exercise: string } }) {
  const { exercise } = params;
  console.log(exercise, "params", params);
  const [openVideo, setOpenVideo] = useState(false);

  const exerciseData: {
    [key: string]: {
      title: string;
      image: string;
    };
  } = {
    bicepCurl: {
      title: "BICEP-CURLS",
      image: "/images/gifs/ezgif-2-6976e23002.gif",
    },
    pushUps: {
      title: "PUSH-UPS",
      image: "/images/gifs/ezgif-2-18601905c3.gif",
    },
    squats: {
      title: "SQUATS",
      image: "/images/gifs/squat.gif",
    },
    triceps: {
      title: "TRICEPS",
      image: "/images/gifs/tricep.gif",
    },
    tPose: {
      title: "T-POSE",
      image: "/images/gifs/tPose.png",
    },
    treePose: {
      title: "TREE POSE",
      image: "/images/gifs/ezgif-2-506b0f073f.gif",
    },
    warriorPose: {
      title: "WARRIOR POSE",
      image: "/images/gifs/ezgif-2-353f5f7b42.png",
    },
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        <b>{exerciseData[exercise]?.title}</b>
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-30px",
        }}
      >
        <div id="div-1" className="div-1">
          {openVideo && (
            <iframe
              id="video-iframe"
              style={{ border: "2px solid #fc6d6d" }}
              src={`http://localhost:5000/${exercise}_feed`}
              width="640"
              height="480"
            ></iframe>
          )}
        </div>
        <div id="div-2" className="div-2">
          <img
            className="camera-0"
            width="570px"
            height="380px"
            src={exerciseData[exercise]?.image}
            alt=""
          />
        </div>
      </div>

      <div className="center" id="div-3" style={{ marginLeft: "20rem" }}>
        <div className="btn btn2">
          <div className="inner"></div>
          <button id="b1" onClick={() => setOpenVideo(true)}>
            <b>START</b>{" "}
          </button>
        </div>
        <div className="btn btn1">
          <div className="inner"></div>
          <button id="b1" onClick={() => setOpenVideo(false)}>
            <b>FINISH</b>
          </button>
        </div>
      </div>
    </>
  );
}
