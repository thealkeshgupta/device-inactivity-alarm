import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import TimeSelector from "./components/TimeSelector";
import IdleDetection from "./components/IdleDetection";
import TimerForm from "./components/TimerForm";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Grid,
  Switch,
} from "@mui/material";
import ReactCardFlip from "react-card-flip";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import { Shake } from "reshake";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  const [idleBeginTime, setIdleBeginTime] = useState(5 * 60 * 1000);
  const [alarmTime, setAlarmTime] = useState(15 * 60 * 1000);
  const [playAlarm, setPlayAlarm] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [enableFullScreen, setEnableFullScreen] = useState(true);

  const toggleFullScreen = () => {
    setEnableFullScreen(!enableFullScreen);
  };
  var elem = document.documentElement;

  function openFullscreen() {
    if (enableFullScreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    }
  }

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }

  return (
    <>
      {/* <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <Box align="center">
        <Stack direction={"row"} align="center" sx={{ width: "56.8vw" }}>
          <img src="/logo.png" style={{ height: "10vw", width: "10vw" }} />
          <div
            className="title-style"
            style={{
              fontSize: "4vw",
              position: "relative",
              bottom: "2vw",
              margin: "4vw 2vw 4vw 2vw",
              fontFamily: "Anta, sans-serif",
              fontWeight: 400,
              color: "#818080",
              fontStyle: "normal",
            }}
          >
            Device Inactivity Alarm
          </div>
        </Stack>

        <Box
          align="center"
          sx={{
            position: "relative",
            bottom: "6vw",
            left: "4vw",
            fontFamily: "Anta, sans-serif",
            fontWeight: 400,
            color: "rgb(99, 99, 99)",
            fontStyle: "normal",
          }}
        >
          - By : Alkesh Gupta -
        </Box>
      </Box>
      <ReactCardFlip isFlipped={playAlarm} flipDirection="vertical">
        <Box align="center">
          <Paper
            align="center"
            sx={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;",
              width: "50vw",
              padding: "5vw",
              borderRadius: "20px",
              height: "50vh",
            }}
          >
            <TimerForm
              idleBeginTime={idleBeginTime}
              alarmTime={alarmTime}
              setIdleBeginTime={setIdleBeginTime}
              setAlarmTime={setAlarmTime}
            />
            <Box sx={{ marginTop: "3vw" }}>
              <FormControlLabel
                value={enableFullScreen}
                control={
                  <Switch
                    defaultChecked
                    color="primary"
                    onClick={toggleFullScreen}
                    value={enableFullScreen}
                  />
                }
                label={
                  <div style={{ color: "#808080" }}> Enable Full Screen</div>
                }
                labelPlacement="start"
              />
            </Box>
            <Button
              size="large"
              variant="contained"
              color="error"
              sx={{
                borderRadius: "20px",
                marginY: "30px",
                background: "#930202",
              }}
              endIcon={<PlayCircleOutlineIcon />}
              onClick={() => {
                setPlayAlarm(true);
                openFullscreen();
              }}
            >
              Start Alarm
            </Button>
          </Paper>
        </Box>

        <Box align="center">
          <Shake
            h={4}
            v={4}
            r={4}
            dur={300}
            int={1}
            max={100}
            fixed={true}
            fixedStop={false}
            freez={false}
            active={false}
          >
            <Paper
              align="center"
              sx={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;",
                width: "50vw",
                padding: "5vw",
                borderRadius: "20px",
                height: "50vh",
              }}
            >
              {playAlarm ? (
                <IdleDetection
                  idleBeginTime={idleBeginTime}
                  alarmTime={alarmTime}
                  setVibrate={setVibrate}
                />
              ) : null}

              <Button
                size="large"
                variant="contained"
                color="error"
                sx={{
                  borderRadius: "20px",
                  marginY: "80px",
                  background: "#930202",
                }}
                endIcon={<SettingsIcon />}
                onClick={() => {
                  setPlayAlarm(false);
                  closeFullscreen();
                }}
              >
                Settings
              </Button>
            </Paper>
          </Shake>
        </Box>
      </ReactCardFlip>
    </>
  );
}

export default App;
