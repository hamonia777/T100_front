import { SyncLoader } from "react-spinners";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <SyncLoader />
    </div>
  );
};

export default Loading;
