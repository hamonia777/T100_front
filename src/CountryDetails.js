import React from "react";
import { useParams } from "react-router-dom";

const CountryDetails = () => {
  const { name } = useParams(); // URL에서 파라미터 가져오기

  return (
    <div>
      <h1>{name}의 정보</h1>
      <p>이곳에 나라 정보를 추가하세요.</p>
    </div>
  );
};

export default CountryDetails;
