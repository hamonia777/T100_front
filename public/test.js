// Barba.js 초기화
barba.init({
    debug: true,
    transitions: [
        {
            name: 'page-transition',
            once() {
                console.log("once")
            },
            async leave() {
                console.log("leave");
                await transitionIn();
            },
            enter() {
                console.log("enter");
                transitionOut();
              }        },
    ],
});

// Transition 객체
const transition = {
    element: document.querySelector('.transition'),
    wrapper: document.querySelector('.transition_wrapper'),
    rows: document.querySelectorAll('.transition_row'),
    rowBackground: document.querySelector('.transition_row_background'),
    words: document.querySelectorAll('.transition_row > h2'),
};

// GSAP 타임라인 설정
const tlTransition = gsap.timeline({
    defaults: {
        duration: 1.6,
        ease: 'expo.inOut',
    },
});

// 초기화 함수
const init = () => {
    gsap.set(transition.wrapper, { autoAlpha: 1, yPercent: 100 });
    gsap.set(transition.rows[1], { overflow: 'hidden' });
    gsap.set(transition.rowBackground, { scaleY: 0, transformOrigin: 'center' });
    gsap.set(transition.words, { xPercent: -150, yPercent: 100, autoAlpha: 1 });
    gsap.set('.reverse > h2', { xPercent: 150 });
};

// Transition In 함수
const transitionIn = () => {
    return new Promise((resolve) => {
        tlTransition
            .to(transition.wrapper,
                {
                    yPercent : 0,
                }
            )
            .to(transition.rowBackground,
                {
                    scaleY : 1,
                },
                0.8
            )
            .to(transition.words,
                {
                    duration : 2.4,
                    xPercent : 0
                },1.2
            )
            .to(transition.words,
                {
                    yPercent : 0,
                    stagger : 0.064,
                    onComplete : resolve
                },1.2
            );
    });
};

const transitionOut = () => {
    tlTransition
        .to(transition.rows[1], {
            overflow: 'unset',
        })
        .to(
            transition.rowBackground,
            {
                scaleY: 3,
            },
            '<0.2'
        )
        .to(
            '.transition_row > h2:not(.unique)',
            {
                autoAlpha: 0,
            },
            '<1'
        )
        .to(transition.wrapper, {
            duration: 2,
            autoAlpha: 0,
            onComplete: () => {
                tlTransition.clear();
                init();
            },
        });
};
// DOMContentLoaded 이벤트 리스너 등록
window.addEventListener('DOMContentLoaded', init);