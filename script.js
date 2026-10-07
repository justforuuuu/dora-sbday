/* =========================================
   GLOBAL
========================================= */

let currentPage = 1;

const pages = document.querySelectorAll(".page");


/* =========================================
   PAGE NAVIGATION
========================================= */

function goToPage(number) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const nextPage = document.getElementById("page" + number);

    if (!nextPage) return;

    nextPage.classList.add("active");

    currentPage = number;


    /* PAGE 2 */

    if (number === 2) {
        startBirthdaySequence();
    }


    /* PAGE 6 */

    if (number === 6) {
        startFinale();
    }

}


/* =========================================
   PAGE 1 TYPING
========================================= */

const typingElement = document.querySelector(".typing");

const typingText = "RISHA";

let typingIndex = 0;

function typeName() {

    if (typingIndex < typingText.length) {

        typingElement.textContent +=
            typingText.charAt(typingIndex);

        typingIndex++;

        setTimeout(typeName, 180);

    }

}

setTimeout(typeName, 800);


/* =========================================
   MUSIC
========================================= */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

musicBtn.addEventListener("click", () => {

    if (!musicPlaying) {

        music.play()
            .then(() => {
                musicPlaying = true;
                musicBtn.textContent = "♫";
            })
            .catch(() => {
                alert("Add your-song.mp3 to the website folder first.");
            });

    } else {

        music.pause();

        musicPlaying = false;

        musicBtn.textContent = "♪";
    }

});


/* =========================================
   BIRTHDAY COUNTDOWN
========================================= */

let birthdayStarted = false;

function startBirthdaySequence() {

    if (birthdayStarted) return;

    birthdayStarted = true;

    const screen =
        document.getElementById("countdownScreen");

    const number =
        document.getElementById("countdownNumber");

    const page2 =
        document.getElementById("page2");

    const flames =
        document.querySelectorAll(".flame");

    let count = 3;


    function countdown() {

        number.textContent = count;

        number.style.animation = "none";

        void number.offsetWidth;

        number.style.animation =
            "countdownPop 1s ease";


        /* light candles */

        if (count === 3) {
            flames[0].classList.add("lit");
        }

        if (count === 2) {
            flames[1].classList.add("lit");
        }

        if (count === 1) {
            flames[2].classList.add("lit");
        }


        if (count > 1) {

            count--;

            setTimeout(countdown, 1000);

        } else {

            setTimeout(() => {

                screen.style.opacity = "0";

                page2.classList.add("doors-open");

                setTimeout(() => {
                    screen.style.display = "none";
                }, 1000);

                createConfetti();

            }, 1200);

        }

    }

    countdown();

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const container =
        document.querySelector(".confetti");

    for (let i = 0; i < 100; i++) {

        const piece =
            document.createElement("span");

        piece.style.position = "absolute";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.top = "-20px";

        piece.style.width = "7px";

        piece.style.height = "12px";

        piece.style.background =
            ["#ff5f8f",
             "#ffd166",
             "#6ee7ff",
             "#ffffff",
             "#c084fc"]
             [Math.floor(Math.random() * 5)];

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        piece.style.animation =
            `confettiFall ${2 + Math.random() * 4}s linear forwards`;

        container.appendChild(piece);

    }

}


const confettiStyle =
document.createElement("style");

confettiStyle.innerHTML = `

@keyframes confettiFall {

    from {
        transform:
            translateY(0)
            rotate(0deg);
        opacity: 1;
    }

    to {
        transform:
            translateY(110vh)
            rotate(720deg);
        opacity: 0;
    }

}

`;

document.head.appendChild(confettiStyle);


/* =========================================
   CARD FLIP
========================================= */

function flipCard(card) {

    card.classList.toggle("flipped");

    createHeart(
        window.innerWidth / 2,
        window.innerHeight / 2
    );

}


/* =========================================
   GIFTS
========================================= */

function openGift(gift) {

    gift.classList.toggle("open");

    const box =
        gift.querySelector(".gift-box");

    if (gift.classList.contains("open")) {

        box.textContent = "✨🎁✨";

        createHeart(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

    } else {

        box.textContent = "🎁";

    }

}


/* FINAL GIFT */

function openFinalGift(gift) {

    gift.classList.add("open");

    const box =
        gift.querySelector(".gift-box");

    box.textContent = "💗";

    for (let i = 0; i < 20; i++) {

        setTimeout(() => {

            createHeart(
                window.innerWidth / 2,
                window.innerHeight / 2
            );

        }, i * 70);

    }

}


/* =========================================
   LETTER
========================================= */

function openLetter() {

    const envelope =
        document.getElementById("envelope");

    const openText =
        document.getElementById("openText");

    const letter =
        document.getElementById("letterText");

    const next =
        document.getElementById("letterNext");


    if (envelope.classList.contains("open")) {
        return;
    }


    envelope.classList.add("open");

    openText.style.opacity = "0";


    setTimeout(() => {

        letter.classList.add("show");

        next.classList.remove("hidden");

        next.classList.add("letter-next-visible");

    }, 1000);

}


/* =========================================
   FINAL PAGE
========================================= */

let finaleStarted = false;

function startFinale() {

    if (finaleStarted) return;

    finaleStarted = true;

    const start =
        document.getElementById("finalStart");

    const celebration =
        document.getElementById("finalCelebration");


    setTimeout(() => {

        start.style.opacity = "0";

    }, 2500);


    setTimeout(() => {

        start.style.display = "none";

        celebration.classList.add("show");

        finalExplosion();

    }, 4000);

}


/* =========================================
   FINAL EXPLOSION
========================================= */

function finalExplosion() {

    for (let i = 0; i < 80; i++) {

        setTimeout(() => {

            const x =
                window.innerWidth / 2 +
                (Math.random() - 0.5) *
                window.innerWidth;

            const y =
                window.innerHeight / 2 +
                (Math.random() - 0.5) *
                window.innerHeight;

            createHeart(x, y);

        }, i * 20);

    }

    createFinalConfetti();

}


/* =========================================
   HEART SYSTEM
========================================= */

function createHeart(x, y) {

    const layer =
        document.getElementById("heartLayer");

    const heart =
        document.createElement("span");

    heart.className = "floating-heart";

    heart.textContent =
        ["❤️", "💗", "💕", "💖", "✨"]
        [Math.floor(Math.random() * 5)];

    heart.style.left =
        x + (Math.random() * 40 - 20) + "px";

    heart.style.top =
        y + (Math.random() * 40 - 20) + "px";

    heart.style.fontSize =
        (14 + Math.random() * 20) + "px";

    layer.appendChild(heart);


    setTimeout(() => {
        heart.remove();
    }, 1600);

}


/* =========================================
   CLICK / TOUCH HEARTS
========================================= */

document.addEventListener("click", event => {

    if (
        event.target.tagName === "BUTTON" ||
        event.target.closest(".love-card") ||
        event.target.closest(".gift") ||
        event.target.closest(".envelope")
    ) {
        return;
    }

    createHeart(
        event.clientX,
        event.clientY
    );

});


/* =========================================
   TOUCH SUPPORT
========================================= */

document.addEventListener(
    "touchstart",
    event => {

        const touch =
            event.touches[0];

        if (!touch) return;

        createHeart(
            touch.clientX,
            touch.clientY
        );

    },
    { passive: true }
);


/* =========================================
   FINAL CONFETTI
========================================= */

function createFinalConfetti() {

    const finalPage =
        document.getElementById("page6");

    for (let i = 0; i < 120; i++) {

        const piece =
            document.createElement("span");

        piece.style.position = "absolute";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.top = "-20px";

        piece.style.width = "6px";

        piece.style.height = "10px";

        piece.style.background =
            ["#ff5f8f",
             "#ffd166",
             "#ffffff",
             "#c084fc",
             "#6ee7ff"]
             [Math.floor(Math.random() * 5)];

        piece.style.zIndex = "30";

        piece.style.animation =
            `finalFall ${2 + Math.random() * 5}s linear forwards`;

        finalPage.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 7000);

    }

}


const finalStyle =
document.createElement("style");

finalStyle.innerHTML = `

@keyframes finalFall {

    from {
        transform:
            translateY(0)
            rotate(0deg);
    }

    to {
        transform:
            translateY(110vh)
            rotate(900deg);
    }

}

`;

document.head.appendChild(finalStyle);