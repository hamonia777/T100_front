import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './settings.css';
import './Pageswap.css';
import { Link } from 'react-router-dom';

function Home() {
  const transitionRef = useRef(null);
  const navigate = useNavigate();

  const transition = useRef(null);
  const tlTransition = useRef(null);

  const transitionIn = () => {
    console.log("in");
    return new Promise((resolve) => {
      const t = transition.current;
      tlTransition.current
        .to(t.wrapper, { yPercent: 0 })
        .to(t.rowBackground, { scaleY: 1 }, 0.8)
        .to(t.words, { duration: 2.4, xPercent: 0 }, 1.2)
        .to(t.words, { yPercent: 0, stagger: 0.064, onComplete: resolve }, 1.2);
    });
  };

  const transitionOut = () => {
    console.log("out");
    return new Promise((resolve) => {
      const t = transition.current;
      tlTransition.current
        .to(t.rows[1], { overflow: 'unset' })
        .to(t.rowBackground, { scaleY: 3 }, '<0.2')
        .to('.transition_row > h2:not(.unique)', { autoAlpha: 0 }, '<1')
        .to(t.wrapper, {
          duration: 2,
          autoAlpha: 0,
          onComplete: () => {
            tlTransition.current.clear();
            resolve();
          },
        });
    });
  };

  const AnimatedLink = ({ to, className, children }) => {
    const handleClick = async (e) => {
      console.log("AnimatedLink clicked");
      await transitionOut();
      navigate(to);
    };

    return (
      <a className={className} onClick={handleClick} role="button" tabIndex="0">
        {children}
      </a>
    );
  };

  useEffect(() => {
    transition.current = {
      element: transitionRef.current.querySelector('.transition'),
      wrapper: transitionRef.current.querySelector('.transition_wrapper'),
      rows: transitionRef.current.querySelectorAll('.transition_row'),
      rowBackground: transitionRef.current.querySelector('.transition_row_background'),
      words: transitionRef.current.querySelectorAll('.transition_row > h2'),
    };

    tlTransition.current = gsap.timeline({
      defaults: {
        duration: 1.6,
        ease: 'expo.inOut',
      },
    });

    const init = () => {
      const t = transition.current;
      gsap.set(t.wrapper, { autoAlpha: 1, yPercent: 100 });
      gsap.set(t.rows[1], { overflow: 'hidden' });
      gsap.set(t.rowBackground, { scaleY: 0, transformOrigin: 'center' });
      gsap.set(t.words, { xPercent: -150, yPercent: 100, autoAlpha: 1 });
      gsap.set('.reverse > h2', { xPercent: 150 });
    };

    const handleTransitions = async () => {
      init();
      await transitionIn();
      await transitionOut();
    };

    handleTransitions().catch((err) =>
      console.error("Error during transitions:", err)
    );

    return () => {
      tlTransition.current.kill();
    };
  }, []);

  return (
    <div data-barba="wrapper" ref={transitionRef}>
      {/* 네비게이션 바 */}
      <div className="nav">
        <div className="nav_wrapper">
          <AnimatedLink to="/" className="nav_page">Home &#8599;</AnimatedLink>
          <AnimatedLink to="/login" className="nav_page">Login &#8599;</AnimatedLink>
        </div>
      </div>

      {/* 페이지 전환 애니메이션 */}
      <div className="transition">
        <div className="transition_wrapper">
          <div className="transition_row">
            <h2>T100</h2>
            <h2>T100</h2>
            <h2>T100</h2>
            <h2>T100</h2>
            <h2>T100</h2>
          </div>
          <div className="transition_row reverse">
            <h2>T100</h2>
            <h2>T100</h2>
            <h2 className="unique">T100</h2>
            <h2>T100</h2>
            <h2>T100</h2>
            <div className="transition_row_background"></div>
          </div>
          <div className="transition_row">
            <h2>T100</h2>
            <h2>T100</h2>
            <h2>T100</h2>
            <h2>T100</h2>
            <h2>T100</h2>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="app" data-barba="container" data-barba-namespace="home">
        <div className="hero">
          <div className="hero_wrapper">
            <div className="hero_title">
              <h1>T100</h1>
              <h2>Creative</h2>
            </div>
            <div className="hero_description">
              <Link to="/login" className="hero_button">Explore More</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;