import { Background, LoadingText } from "./Style";
import { SyncLoader } from "react-spinners";

export default () => {
  return (
    <div>
      <Background>
        <SyncLoader />
        <LoadingText>잠시만 기다려 주세요.</LoadingText>
      </Background>
    </div>
  );
};
