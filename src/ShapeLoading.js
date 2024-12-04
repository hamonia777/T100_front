import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ShapeLoading = ({ setLoading }) => {
  const topShapeRef = useRef(null);
  const bottomShapeRef = useRef(null);
  const mergedShapeRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => setLoading(false), // 애니메이션 종료 후 로딩 상태 변경
    });

    timeline
      // 위쪽 반원과 아래쪽 반원이 화면의 위아래에서 지정된 위치로 이동
      .fromTo(
        topShapeRef.current,
        { y: "-150vh" },
        { y: "-99px", duration: 1.5, ease: "power3.out" }
      )
      .fromTo(
        bottomShapeRef.current,
        { y: "150vh" },
        { y: "75px", duration: 1.5, ease: "power3.out" },
        "<" // 동시에 시작
      )
      // 위쪽과 아래쪽 반원이 동시에 서서히 사라짐
      .to(
        [topShapeRef.current, bottomShapeRef.current],
        { opacity: 0, duration: 0.5 },
        "+=0.2" // 이동 애니메이션이 끝난 뒤
      )
      // 1초 지연 후 합쳐진 도형이 서서히 나타남
      .to(
        mergedShapeRef.current,
        { opacity: 1, duration: 0.5 },
        "+=1.0" // 사라진 후 1초 뒤 시작
      )
      // 합쳐진 도형이 화면 전체로 확대
      .to(
        mergedShapeRef.current,
        {
          scale: 20,
          duration: 1.5,
          ease: "power4.out",
        },
        "+=0.2"
      );

    return () => {
      timeline.kill(); // 타임라인 정리
    };
  }, [setLoading]);

  return (
    <div className="loading-container">
      {/* 위쪽 반원 */}
      <div ref={topShapeRef} className="circle1"></div>

      {/* 아래쪽 반원 */}
      <div ref={bottomShapeRef} className="circle2"></div>

      {/* 합쳐진 도형 */}
      <div ref={mergedShapeRef} className="merged-circle"></div>
    </div>
  );
};

export default ShapeLoading;
