/* eslint-disable react/prop-types */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingCardsComponent = ({ qty }) => {
  return (
    <div className="poke-container">
      {Array.from({ length: qty }).map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  );
};

const LoadingCard = () => {
  return (
    <SkeletonTheme
      baseColor=" rgba(58, 58, 57, 0.766)"
      highlightColor="#686767"
    >
      <div
        className="pokemon"
        style={{
          border: "2px solid #686767",
        }}
      >
        <span className="number" style={{ backgroundColor: "transparent" }}>
          <Skeleton width={30} height={15} />
        </span>
        <span className="type-icon" style={{ backgroundColor: "transparent" }}>
          <Skeleton
            width={22}
            height={15}
            style={{ position: "absolute", right: "0.2rem", top: "0.1rem" }}
          />
        </span>

        <div
          className="img-container"
          style={{ background: "transparent", boxShadow: "none" }}
        >
          <Skeleton className="img-skeleton" circle={true} />
        </div>
        <div className="info">
          <h3 className="name">
            <Skeleton width={100} height={20} />
          </h3>

          <div className="extra-info">
            <div>
              <Skeleton width={44} height={15} />
              <h5 className="weight">
                <Skeleton width={44} height={15} />
              </h5>
            </div>
            <div>
              <Skeleton width={44} height={15} />
              <h5 className="height">
                <Skeleton width={44} height={15} />
              </h5>
            </div>
          </div>

          <div className="type-data">
            <h5 className="type">
              <Skeleton width={130} height={15} />
            </h5>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default LoadingCardsComponent;
