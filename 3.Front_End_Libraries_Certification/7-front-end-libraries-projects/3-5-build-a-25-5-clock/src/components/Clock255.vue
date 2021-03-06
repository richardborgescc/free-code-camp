<template>
  <div>
    <!--
      User Story #1: I can see an element with id="break-label" that contains 
      a string (e.g. "Break Length").

      User Story #5: I can see an element with a corresponding id="break-length", 
      which by default (on load) displays a value of 5.
    -->
    <p id="break-label">Break Length</p>
    <input id="break-length" value="5" v-model="breakLength" />
    <!--
      User Story #2: I can see an element with id="session-label" that contains 
      a string (e.g. "Session Length").

      User Story #6: I can see an element with a corresponding id="session-length", 
      which by default displays a value of 25.
    -->
    <p id="session-label">Session Length</p>
    <input id="session-length" value="25" v-model="sessionLength" />
    <!--
      User Story #3: I can see two clickable elements with corresponding 
      IDs: id="break-decrement" and id="session-decrement".
    -->
    <p>
      <button id="break-decrement" @click="breakDecrements()">
        break-decrement
      </button>
      <button id="session-decrement" @click="sessionDecrements()">
        session-decrement
      </button>
    </p>
    <!--
      User Story #4: I can see two clickable elements with corresponding 
      IDs: id="break-increment" and id="session-increment".
    -->
    <p>
      <button id="break-increment" @click="breakIncrements()">
        break-increment
      </button>
      <button id="session-increment" @click="sessionIncrements()">
        session-increment
      </button>
    </p>
    <!--
      User Story #7: I can see an element with a corresponding id="timer-label", 
      that contains a string indicating a session is initialized (e.g. "Session").
    -->
    <p id="timer-label">Session: {{ sessionMinutes }}:{{ sessionSeconds }}</p>
    <!--
      User Story #8: I can see an element with corresponding id="time-left". 
      NOTE: Paused or running, the value in this field should always be displayed 
      in mm:ss format (i.e. 25:00).
    -->
    <p id="time-left">
      {{ timeLeftLabel }}: {{ timeLeftMinutes }}:{{ timeLeftSeconds }}
    </p>
    <!--
      User Story #9: I can see a clickable element with a corresponding 
      id="start_stop".
    -->
    <p>
      <button id="start_stop" @click="startStopTimer()">start_stop</button>
    </p>
    <!--
      User Story #10: I can see a clickable element with a corresponding id="reset".
    -->
    <p>
      <button id="reset" @click="reset()">reset</button>
    </p>

    <!--
      User Story #26: When a countdown reaches zero (NOTE: timer MUST reach 00:00), 
      a sound indicating that time is up should play. This should utilize an HTML5 
      audio tag and have a corresponding id="beep".

      User Story #27: The audio element with id="beep" must be 1 second or longer.

      User Story #28: The audio element with id of beep must stop playing and be 
      rewound to the beginning when the element with the id of reset is clicked.
    -->
    <audio
      id="beep"
      class="clip"
      src="https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Cheesy%20Lo-Fi%20Sound%20Effects/7[kb]Beep-Boop.aif.mp3"
      type="audio/mpeg"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      breakLength: 5,
      sessionLength: 25,
      sessionMinutes: 0,
      sessionSeconds: 0,
      timeLeftLabel: "time-left",
      timeLeftMinutes: 0,
      timeLeftSeconds: 0,
      clockOn: false,
      timer: 0,
    };
  },
  methods: {
    /*
      User Story #11: When I click the element with the id of reset, any running 
      timer should be stopped, the value within id="break-length" should return to 5, 
      the value within id="session-length" should return to 25, and the element with 
      id="time-left" should reset to it's default state.
    */
    reset() {
      this.sessionMinutes = 0;
      this.sessionSeconds = 0;
      this.timeLeftMinutes = this.sessionLength;
      this.timeLeftSeconds = 0;
      this.timeLeftLabel = "time-left";
      document.getElementById("beep").play();
    },
    /*
      User Story #12: When I click the element with the id of break-decrement, 
      the value within id="break-length" decrements by a value of 1, and I can see 
      the updated value.
    */
    breakDecrements() {
      // User Story #16: I should not be able to set a session or break length to <= 0.
      if (this.breakLength > 0) {
        this.breakLength -= 1;
      }
    },
    /*
      User Story #13: When I click the element with the id of break-increment, 
      the value within id="break-length" increments by a value of 1, and I can see 
      the updated value.
    */
    breakIncrements() {
      // User Story #17: I should not be able to set a session or break length to > 60.
      if (this.breakLength < 60) {
        this.breakLength += 1;
      }
    },
    /*
      User Story #14: When I click the element with the id of session-decrement, 
      the value within id="session-length" decrements by a value of 1, and I can 
      see the updated value.
    */
    sessionDecrements() {
      if (this.sessionLength > 0) {
        this.sessionLength -= 1;
      }
    },
    /*
      User Story #15: When I click the element with the id of session-increment, 
      the value within id="session-length" increments by a value of 1, and I can 
      see the updated value.
    */
    sessionIncrements() {
      this.sessionLength += 1;
    },
    /*
      User Story #18: When I first click the element with id="start_stop", 
      the timer should begin running from the value currently displayed in 
      id="session-length", even if the value has been incremented or decremented 
      from the original value of 25.

      User Story #19: If the timer is running, the element with the id of time-left 
      should display the remaining time in mm:ss format (decrementing by a value of 
      1 and updating the display every 1000ms).

      User Story #20: If the timer is running and I click the element with 
      id="start_stop", the countdown should pause.

      User Story #21: If the timer is paused and I click the element with 
      id="start_stop", the countdown should resume running from the point at which 
      it was paused.

      User Story #22: When a session countdown reaches zero (NOTE: timer MUST 
      reach 00:00), and a new countdown begins, the element with the id of 
      timer-label should display a string indicating a break has begun.
    */
    startStopTimer() {
      this.clockOn = !this.clockOn;

      if (this.clockOn) {
        this.timeLeftMinutes = this.sessionLength - 1;
        this.timeLeftSeconds = 60;

        this.timer = setInterval(() => {
          this.sessionSeconds++;
          this.timeLeftSeconds--;

          if (this.sessionSeconds === 60) {
            this.sessionSeconds = 0;
            /*
              User Story #25: When a break countdown reaches zero (NOTE: timer MUST 
              reach 00:00), a new session countdown should begin, counting down from 
              the value currently displayed in the id="session-length" element.
            */
            this.sessionMinutes++;
            this.timeLeftSeconds = 60;
            this.timeLeftMinutes--;
          }

          /*
            User Story #23: When a session countdown reaches zero (NOTE: timer MUST 
            reach 00:00), a new break countdown should begin, counting down from the 
            value currently displayed in the id="break-length" element.

            User Story #24: When a break countdown reaches zero (NOTE: timer MUST 
            reach 00:00), and a new countdown begins, the element with the id of 
            timer-label should display a string indicating a session has begun.
          */
          if (this.timeLeftMinutes === -1) {
            document.getElementById("beep").play();
            this.timeLeftMinutes = this.breakLength - 1;

            if (this.timeLeftLabel === "time-left") {
              this.timeLeftLabel = "break-left";
            } else {
              this.timeLeftLabel = "time-left";
            }
          }
        }, 1000);
      } else {
        this.clockOn = false;
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
