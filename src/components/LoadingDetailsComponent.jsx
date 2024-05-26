import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./DetailsComponent.module.css";
import { useSpring, animated } from "react-spring"; // per animazioni

const LoadingDetailsComponent = () => {
  const slideAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(100%)" },
    to: { opacity: 1, transform: "translateY(0%)" },
    config: { duration: 800 },
  });

  return (
    <animated.div className="content" style={slideAnimation}>
      <SkeletonTheme
        baseColor=" rgba(58, 58, 57, 0.766)"
        highlightColor="#686767"
      >
        <div className={styles.content} style={{ border: "2px solid #686767" }}>
          <div className={styles.number}>
            <Skeleton className={styles.skeleton_number} />
          </div>
          <div>
            <div className={styles.title}>
              <div className={styles.subgrid}>
                <div className={styles.emoji}>
                  <Skeleton className={styles.skeleton_emoji} />
                </div>
                <div className={styles.type}>
                  <Skeleton width={125} height={20} />
                </div>
                <div className={styles.name}>
                  <Skeleton className={styles.skeleton_name} />
                </div>
                <div className={styles.details}>
                  <div className={styles.row}>
                    <Skeleton width={54} height={20} />
                    <Skeleton width={40} height={20} />
                  </div>
                  <div className={styles.row}>
                    <Skeleton width={54} height={20} />
                    <Skeleton width={40} height={20} />
                  </div>
                  <div className={styles.row}>
                    <Skeleton width={62} height={20} />
                    <Skeleton width={70} height={20} />
                  </div>
                </div>
              </div>
              <Skeleton className={styles.skeleton_picture} circle={true} />
            </div>

            <div className={styles.stats}>
              <div className={styles.title}>
                <Skeleton width={100} height={42} />
              </div>
              <div className={styles.graphics}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div className={styles.row} key={index}>
                    <div className={styles.name_stats}>
                      <Skeleton width={120} height={20} />
                    </div>
                    <div
                      className={styles.bar}
                      style={{ backgroundColor: "transparent" }}
                    >
                      <Skeleton height={20} />
                    </div>
                    <div className={styles.base}>
                      <Skeleton width={26} height={20} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </animated.div>
  );
};

export default LoadingDetailsComponent;
