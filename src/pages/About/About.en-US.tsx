import Heading from '../../components/Heading/Heading';
import RouterLink from '../../components/RouterLink/RouterLink';

const About_en_US = () => {
  return (
    <>
      <Heading>The Pomodoro Technique</Heading>
      <p>
        The Pomodoro Technique is a productivity methodology created by{' '}
        <strong>Francesco Cirillo</strong>, which consists of dividing work into
        time blocks (the famous "Pomodoros") interspersed with breaks. The goal
        is to maintain total focus for a short period and ensure rest to avoid
        mental fatigue.
      </p>

      <img
        src='https://imgs.search.brave.com/hvArEcblPmQlHmUG7r6vOgPCUxtsmDNvwV00UOEL2oE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvcG9tb2Rvcm8t/dGVjaG5pcXVlLWtp/dGNoZW4tY2xvY2st/cmVkLXRvbWF0by1p/bmNyZWFzZS13b3Jr/LXByb2R1Y3Rpdml0/eS0yNW1pbnMtd29y/ay01bWlucy1yZXN0/XzEwMTU4OTctNDQu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MA'
        alt='Pomodoro Technique'
      />

      <h2>How does the traditional Pomodoro work?</h2>
      <ul>
        <li>
          <strong>1. Define a task</strong> you want to accomplish.
        </li>
        <li>
          <strong>2. Work on it for 25 minutes</strong> without interruptions.
        </li>
        <li>
          <strong>3. Take a short 5-minute break.</strong>
        </li>
        <li>
          <strong>4. After every 4 cycles, take a long break</strong> (usually
          15 to 30 minutes).
        </li>
      </ul>

      <h2>But at Selah, there's a difference 🚀</h2>
      <p>
        Our app follows the original concept but with some improvements and
        customizations to make the process even more efficient:
      </p>

      <h2>⚙️ Time Customization</h2>
      <p>
        You can set the time for your focus, short break, and long break however
        you want! Just go to the
        <RouterLink href='/settings'> settings page</RouterLink> and adjust the
        minutes as you prefer.
      </p>

      <h3>🔁 Cycles organized in sequence</h3>
      <p>
        After each completed cycle, a new task is automatically added to your
        history, and the app already suggests the next cycle (focus or break).
      </p>

      <p>
        <strong>Our default:</strong>
      </p>
      <ul>
        <li>
          <strong>Odd</strong> cycles: Work (focus).
        </li>
        <li>
          <strong>Even</strong> cycles: Short break.
        </li>
        <li>
          <strong>Cycle 8</strong>: Special long break, to reset the full cycle.
        </li>
      </ul>

      <h3>🍅 Cycle Visualization</h3>
      <p>
        Right below the timer, you will see colored dots representing the
        cycles:
      </p>
      <ul>
        <li>🟣 Purple → Work (focus). </li>
        <li>🟡 Yellow → Short break. </li>
        <li>🔵 Blue: Long break (appears every 8 cycles).</li>
      </ul>
      <p>
        This way, you always know what part of the process you're in and what
        comes next. No more writing it down on paper or doing mental math!
      </p>

      <h3>📊 Automatic History</h3>
      <p>
        All your completed tasks and cycles are saved in the{' '}
        <RouterLink href='/history'>history</RouterLink>, with a status of
        completed or interrupted. This allows you to track your progress over
        time.
      </p>
      <h3>🎛️ Different Modes</h3>
      <ul>
        <li>
          <strong>Normal: </strong>Default mode, following the original Pomodoro
          technique
        </li>
        <li>
          <strong>Aly Mode: </strong>Mode focused on people that tend to be more
          distracted.
        </li>
      </ul>
      <h2>Why use Selah?</h2>
      <ul>
        <li>✅ Organize your focus with clarity.</li>
        <li>✅ Work and rest in the right measure.</li>
        <li>✅ Customize your own cycles and times.</li>
        <li>✅ Track your history automatically.</li>
      </ul>

      <p>
        <strong>Ready to focus?</strong> Let's go{' '}
        <RouterLink href='/'>back to the homepage</RouterLink> and start your
        Pomodoros! 🍅🚀
      </p>

      <p>
        <em>"Total focus, no rush, no pause, just go!"</em> 💪🧘‍♂️
      </p>
    </>
  );
};

export default About_en_US;
