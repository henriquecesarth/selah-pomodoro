import Heading from "../../components/Heading/Heading";
import RouterLink from "../../components/RouterLink/RouterLink";

const NotFound_en_US = () => {
  return (
    <>
      <Heading>404 - Page not found 🚀</Heading>
      <p>
        Oops! It looks like the page you are trying to access does not exist.
        Maybe it went on vacation, decided to explore the universe, or got lost
        somewhere between two black holes. 🌌
      </p>
      <p>
        But don't worry, you're not lost in space (yet). You can safely return
        to the <RouterLink href='/'>homepage</RouterLink> or{' '}
        <RouterLink href='/history'>the history</RouterLink> — or you can stay
        here and pretend you found a secret page that only the coolest explorers
        can access. 🧭✨
      </p>
      <p>
        If you think this page should exist (or if you want to chat about time
        travel and wormholes), just get in touch. Otherwise, use the menu to get
        back to the real world.
      </p>
      <p>
        In the meantime, here's a thought: "If a page doesn't exist on the
        internet, did it ever truly exist?" 🤔💭
      </p>
    </>
  );
};

export default NotFound_en_US;
