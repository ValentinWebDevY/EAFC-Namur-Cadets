document.addEventListener('DOMContentLoaded', function () {
    new Splide('.splide.is-actus', {
        type: 'loop',
        perPage: 1,
        arrows: false,
        autoplay: true,
    }).mount();
});
