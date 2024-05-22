import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import style from './NotFoundPageComponent.module.css';

const NotFoundPageComponent = () => {
  const numberSpringProps = useSpring({
    from: { transform: 'translateY(-50px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
    config: { tension: 220, friction: 120 },
    delay: 200,
  });

  const textSpringProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
    delay: 600,
  });

  return (
    <div className={style.container}>
      <animated.div style={numberSpringProps}>
        <img className={style.img404} src="/src/assets/img/pikachu404.png" alt="pikachu" />
      </animated.div>
      <animated.div className={style.text} style={textSpringProps}>
        <p>Oops! 404 Page not found</p>
        <Link to="/" className={style.btn}>
          Back to Home
        </Link>
      </animated.div>
    </div>
  );
};

export default NotFoundPageComponent;

