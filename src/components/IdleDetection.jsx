import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useTimer } from "use-timer";
import ReactCardFlip from "react-card-flip";
import useSound from "use-sound";

const IdleDetection = ({ idleBeginTime, alarmTime, setVibrate }) => {
  const [status, setStatus] = useState("Active");
  const [remaining, setRemaining] = useState(0);

  const soundUrl = "/alarm.mp3";
  const [play, { stop, sound }] = useSound(soundUrl);

  useEffect(() => {
    sound?.on("end", () => {
      if (status !== "Active") {
        play();
      }
    });
  }, [sound, status]);

  const { time, start, pause, reset } = useTimer();

  const onIdle = () => {
    setStatus("Idle");
  };

  const onActive = () => {
    setStatus("Active");
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    timeout: idleBeginTime,
    throttle: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (status === "Idle") {
      start();
    } else {
      reset();
      stop();
      setVibrate(false);
    }
  }, [status]);

  useEffect(() => {
    if (time === alarmTime / 1000) {
      //   setVibrate(true);
      console.log("ring");
      play();
    }
  }, [time]);

  return (
    <>
      <Box align="center" sx={{ margin: "2vw" }}>
        <div
          class={
            status === "Active" ? "s-input-green-label" : "s-input-yellow-label"
          }
        >
          Status
        </div>
        <div
          className={
            status === "Active"
              ? "s-input-green -status"
              : "s-input-yellow -status"
          }
        >
          {status}
        </div>
      </Box>

      <ReactCardFlip isFlipped={status !== "Active"} flipDirection="vertical">
        <div class="s-time-green">
          {(Math.floor(remaining / 60) + "").padStart(2, "0")} {" : "}
          {(Math.floor(remaining % 60) + "").padStart(2, "0")}
        </div>
        <div
          class={time + 1 <= alarmTime / 1000 ? "s-time-yellow" : "s-time-red"}
        >
          {(Math.floor(time / 60) + "").padStart(2, "0")} {" : "}
          {((time % 60) + "").padStart(2, "0")}
        </div>
      </ReactCardFlip>
    </>
  );
};

export default IdleDetection;
