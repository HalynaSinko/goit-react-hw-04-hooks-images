import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import s from "./Loader.module.css";

const LoaderSpinner = () => {
  return (
    <div className={s.container}>
      <Loader
        type="BallTriangle"
        color="#3f51b5"
        height={80}
        width={80}
        timeout={3000} //3 secs
      />
    </div>
  );
};

export default LoaderSpinner;
