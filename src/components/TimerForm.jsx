import { Box, Chip, Stack } from "@mui/material";
import TimeInput from "./TimeInput";
import Grid from "@mui/material/Grid";
import SettingsIcon from "@mui/icons-material/Settings";

const TimerForm = ({
  idleBeginTime,
  setIdleBeginTime,
  alarmTime,
  setAlarmTime,
}) => {
  const onFocusHandler = (event) => {};

  const onBlurHandler = (event) => {};

  const onIdleBeginTimeChangeHandler = (val) => {
    if (val.length === 5) {
      // do something with this value
      let time = val.split(":");
      let min = time[0];
      let sec = time[1];
      setIdleBeginTime(min * 60 * 1000 + sec * 1000);
    }
  };

  const onAlarmTimeChangeHandler = (val) => {
    if (val.length === 5) {
      // do something with this value
      let time = val.split(":");
      let min = time[0];
      let sec = time[1];
      setAlarmTime(min * 60 * 1000 + sec * 1000);
    }
  };

  return (
    <>
      <Chip
        variant="outlined"
        color="primary"
        icon={<SettingsIcon sx={{ fontSize: "3vw", color: "#2a548a" }} />}
        sx={{
          height: "fit-content",
          padding: "00.5vw",
          borderRadius: "20vw",
          marginBottom: "4vw",
          color: "#2a548a",
        }}
        label={
          <div style={{ fontSize: "1.2vw" }}>
            Please set your system's active screen time <br /> and your desired
            alarm time below.
          </div>
        }
      />

      <Grid container sx={{ width: "40vw" }}>
        <Grid item xs={6}>
          <Box align="center">
            <div class="s-input-green-label">Set Active Time</div>
            <TimeInput
              name="Idle Begin Timer"
              initTime={
                (Math.floor(idleBeginTime / 60000) + "").padStart(2, 0) +
                ":" +
                ((Math.floor(idleBeginTime / 1000) % 60) + "").padStart(2, 0)
              }
              className="s-input-green -time"
              mountFocus="true"
              onTimeChange={onIdleBeginTimeChangeHandler}
              onFocusHandler={onFocusHandler}
              onBlurHandler={onBlurHandler}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box align="center">
            <div class="s-input-yellow-label">Set Alarm Time </div>
            <TimeInput
              name="Idle Begin Timer"
              initTime={
                (Math.floor(alarmTime / 60000) + "").padStart(2, 0) +
                ":" +
                ((Math.floor(alarmTime / 1000) % 60) + "").padStart(2, 0)
              }
              className="s-input-yellow -time"
              mountFocus="true"
              onTimeChange={onAlarmTimeChangeHandler}
              onFocusHandler={onFocusHandler}
              onBlurHandler={onBlurHandler}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TimerForm;
