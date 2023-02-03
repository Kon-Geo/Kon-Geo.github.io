let slideIndex = 1;
let timeout;
showSlides(slideIndex);

function plusSlides(n) {
    clearTimeout(timeout);
    showSlides((slideIndex += n));
}

function currentSlide(e) {
    clearTimeout(timeout);
    showSlides((slideIndex = Array.from(e.parentElement.children).indexOf(e) + 1));
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (slides.length && dots.length) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        timeout = setTimeout(showSlides, 5000, ((slideIndex += 1)));
    } else {
        setTimeout(showSlides, 500, (slideIndex = 0));
    }
}