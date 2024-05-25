/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { RotatingLines, Blocks } from "react-loader-spinner";

// export const LoadingComponent = () => {
//   return (
//     <RotatingLines
//       strokeColor="grey"
//       strokeWidth="5"
//       animationDuration="0.75"
//       width={96}
//       visible={true}
//     />
//   );
// };

export const LoadingScrollComponent = () => {
  return (
    <Blocks
      height="50"
      width="50"
      color="#4fa94d"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      visible={true}
    />
  );
}
