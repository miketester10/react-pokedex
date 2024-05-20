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
      <animated.div className={style.text404} style={numberSpringProps}>
        404
      </animated.div>
      <animated.div className={style.text} style={textSpringProps}>
        <p>Oops! Page not found</p>
        <Link to="/" className={style.btn}>
          Back to Home
        </Link>
      </animated.div>
    </div>
  );
};

export default NotFoundPageComponent;

