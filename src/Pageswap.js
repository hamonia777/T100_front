import React, { useEffect, useRef } from "react";
import barba from "@barba/core";
import { gsap } from "gsap";

const Transition = () => {
  const transitionRef = useRef(null);
  const wrapperRef = useRef(null);
  const rowsRef = useRef([]);
  const rowBackgroundRef = useRef(null);
  const wordsRef = useRef([]);

  // Barba.js 초기화
  useEffect(() => {
    barba.init({
      debug: true,
      transitions: [
        {
          name: "page-transition",
          once() {
            console.log("once");
          },
          async leave() {
            console.log("leave");
            await transitionIn();
          },
          enter() {
            console.log("enter");
            transitionOut();
          },
        },
      ],
    });
    init();

    return () => {
      barba.destroy();
    };
  }, []);

  // Transition 초기화
  const init = () => {
    gsap.set(wrapperRef.current, { autoAlpha: 1, yPercent: 100 });
    gsap.set(rowsRef.current[1], { overflow: "hidden" });
    gsap.set(rowBackgroundRef.current, { scaleY: 0, transformOrigin: "center" });
    gsap.set(wordsRef.current, { xPercent: -150, yPercent: 100, autoAlpha: 1 });
    gsap.set(".reverse > h2", { xPercent: 150 });
  };

  // Transition In 애니메이션
  const transitionIn = () => {
    const tl = gsap.timeline({
      defaults: {
        duration: 1.6,
        ease: "expo.inOut",
      },
    });

    return new Promise((resolve) => {
      tl.to(wrapperRef.current, { yPercent: 0 })
        .to(rowBackgroundRef.current, { scaleY: 1 }, 0.8)
        .to(wordsRef.current, { duration: 2.4, xPercent: 0 }, 1.2)
        .to(
          wordsRef.current,
          {
            yPercent: 0,
            stagger: 0.064,
            onComplete: resolve,
          },
          1.2
        );
    });
  };

  // Transition Out 애니메이션
  const transitionOut = () => {
    const tl = gsap.timeline({
      defaults: {
        duration: 1.6,
        ease: "expo.inOut",
      },
    });

    tl.to(rowsRef.current[1], { overflow: "unset" })
      .to(
        rowBackgroundRef.current,
        {
          scaleY: 3,
        },
        "<0.2"
      )
      .to(
        ".transition_row > h2:not(.unique)",
        {
          autoAlpha: 0,
        },
        "<1"
      )
      .to(wrapperRef.current, {
        duration: 2,
        autoAlpha: 0,
        onComplete: () => {
          tl.clear();
          init();
        },
      });
  };

  return (
    <div className="transition" ref={transitionRef}>
      <div className="transition_wrapper" ref={wrapperRef}>
        <div className="transition_row" ref={(el) => (rowsRef.current[0] = el)}>
          {Array(5)
            .fill("T100")
            .map((text, index) => (
              <h2 key={`row1-${index}`}>{text}</h2>
            ))}
        </div>
        <div
          className="transition_row reverse"
          ref={(el) => (rowsRef.current[1] = el)}
        >
          {Array(5)
            .fill("T100")
            .map((text, index) => (
              <h2
                key={`row2-${index}`}
                className={index === 2 ? "unique" : ""}
                ref={(el) => (wordsRef.current[index] = el)}
              >
                {text}
              </h2>
            ))}
          <div
            className="transition_row_background"
            ref={rowBackgroundRef}
          ></div>
        </div>
        <div className="transition_row" ref={(el) => (rowsRef.current[2] = el)}>
          {Array(5)
            .fill("T100")
            .map((text, index) => (
              <h2 key={`row3-${index}`}>{text}</h2>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Transition;
