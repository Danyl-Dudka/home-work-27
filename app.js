const interval = 3000;
let currentSlide = 0;
const slidesElement = document.querySelector('.slides');
let slideInterval = setInterval(nextSlide, interval);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const indicator = document.querySelector('.indicators').children;
let start;
let end;

function nextSlide() {
    clearInterval(slideInterval);
    slidesElement.children[currentSlide].classList.remove('active');
    indicator[currentSlide].classList.remove('active');
    if (currentSlide === slidesElement.children.length - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    slidesElement.children[currentSlide].classList.add('active')
    indicator[currentSlide].classList.add('active');
    slideInterval = setInterval(nextSlide, interval);
}

function prevSlide() {
    clearInterval(slideInterval);
    slidesElement.children[currentSlide].classList.remove('active');
    indicator[currentSlide].classList.remove('active');
    if (currentSlide === 0) {
        currentSlide = slidesElement.children.length - 1;
    } else {
        currentSlide--;
    }
    slidesElement.children[currentSlide].classList.add('active');
    indicator[currentSlide].classList.add('active');
    slideInterval = setInterval(nextSlide, interval);
}

function changeSlides() {
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
}

function stopShowing() {
    let isPlaying = true;
    document.addEventListener('keydown', (event) => {
        if (event.code === "Space") {
            if (isPlaying) {
                clearInterval(slideInterval);
                console.log("Slider is stopped");
            } else {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, interval);
                console.log("Slider is playing");
            }
            isPlaying = !isPlaying;
        }
    })
}

function activateSlide(index) {
    clearInterval(slideInterval);
    slidesElement.children[currentSlide].classList.remove('active');
    indicator[currentSlide].classList.remove('active');

    currentSlide = index;

    slidesElement.children[currentSlide].classList.add('active');
    indicator[currentSlide].classList.add('active');
    slideInterval = setInterval(nextSlide, interval);
}

function activateIndicator() {
    for (let i = 0; i < indicator.length; i++) {
        indicator[i].addEventListener('click', () => {
            activateSlide(i);
        })
    }
}

function handleKeyboardControl() {
    document.addEventListener('keydown', (event) => {
        if (event.code === 'ArrowRight') {
            nextSlide();
        } if (event.code === 'ArrowLeft') {
            prevSlide();
        }
    })
}

slidesElement.addEventListener('touchstart', (event) => {
    clearInterval(slideInterval);
    start = event.touches[0].clientX;
    event.preventDefault();
})
slidesElement.addEventListener('touchend', (event) => {
    end = event.changedTouches[0].clientX;
    const diff = end - start;
    if (diff > 50) {
        prevSlide();
    } else if (diff < -50) {
        nextSlide();
    }
    event.preventDefault();
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, interval);
})

activateIndicator();
handleKeyboardControl();
changeSlides();
stopShowing();