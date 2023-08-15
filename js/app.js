"use strict";

// slide toggle
HTMLElement.prototype.slideToggle = function (duration, callback) {
    if (this.clientHeight === 0) {
        _s(this, duration, callback, true);
    } else {
        _s(this, duration, callback);
    }
};

HTMLElement.prototype.slideUp = function (duration, callback) {
    _s(this, duration, callback);
};

HTMLElement.prototype.slideDown = function (duration, callback) {
    _s(this, duration, callback, true);
};

function _s(el, duration, callback, isDown) {

    if (typeof duration === 'undefined') duration = 400;
    if (typeof isDown === 'undefined') isDown = false;

    el.style.overflow = "hidden";
    if (isDown) el.style.display = "block";

    var elStyles = window.getComputedStyle(el);

    var elHeight = parseFloat(elStyles.getPropertyValue('height'));
    var elPaddingTop = parseFloat(elStyles.getPropertyValue('padding-top'));
    var elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
    var elMarginTop = parseFloat(elStyles.getPropertyValue('margin-top'));
    var elMarginBottom = parseFloat(elStyles.getPropertyValue('margin-bottom'));

    var stepHeight = elHeight / duration;
    var stepPaddingTop = elPaddingTop / duration;
    var stepPaddingBottom = elPaddingBottom / duration;
    var stepMarginTop = elMarginTop / duration;
    var stepMarginBottom = elMarginBottom / duration;

    var start;

    function step(timestamp) {

        if (start === undefined) start = timestamp;

        var elapsed = timestamp - start;

        if (isDown) {
            el.style.height = (stepHeight * elapsed) + "px";
            el.style.paddingTop = (stepPaddingTop * elapsed) + "px";
            el.style.paddingBottom = (stepPaddingBottom * elapsed) + "px";
            el.style.marginTop = (stepMarginTop * elapsed) + "px";
            el.style.marginBottom = (stepMarginBottom * elapsed) + "px";
        } else {
            el.style.height = elHeight - (stepHeight * elapsed) + "px";
            el.style.paddingTop = elPaddingTop - (stepPaddingTop * elapsed) + "px";
            el.style.paddingBottom = elPaddingBottom - (stepPaddingBottom * elapsed) + "px";
            el.style.marginTop = elMarginTop - (stepMarginTop * elapsed) + "px";
            el.style.marginBottom = elMarginBottom - (stepMarginBottom * elapsed) + "px";
        }

        if (elapsed >= duration) {
            el.style.height = "";
            el.style.paddingTop = "";
            el.style.paddingBottom = "";
            el.style.marginTop = "";
            el.style.marginBottom = "";
            el.style.overflow = "";
            if (!isDown) el.style.display = "none";
            if (typeof callback === 'function') callback();
        } else {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}
// slide toggle


document.addEventListener("DOMContentLoaded", () => {




    document.addEventListener("click", (e) => {
        const target = e.target;

        // menu
        if (target.closest('.icon-menu')) {
            getMenu()
        }

        // read more
        if (target.classList.contains('desc__header-more')) {

            target.classList.toggle('active');
            document.querySelector('.desc__header-text').classList.toggle('visible');

            if (target.classList.contains('active')) {
                target.innerHTML = "Скрыть"
            } else {
                target.innerHTML = "Читать полностью"
            }
        }

        // tabs
        if (target.classList.contains('desc__slider-btn')) {

            let currentIndex = Array.from(document.querySelectorAll('.desc__slider-btn')).indexOf(target);

            document.querySelectorAll('.desc__slider-btn').forEach((btn, index) => {
                if (index !== currentIndex) {
                    btn.classList.remove('active');
                } else {
                    btn.classList.add("active");
                }
            });

            document.querySelectorAll('.desc__slider-tab').forEach((tab, index) => {
                if (index !== currentIndex) {
                    tab.classList.remove('active');
                } else {
                    tab.classList.add("active");
                }
            });
        }

        // accordion
        if (target.closest('.faq__item-btn')) {

            let btn = target.closest('.faq__item-btn');
            btn.classList.toggle('active');
            btn.nextElementSibling.slideToggle()

        }

        // modal
        if (target.closest("[data-modal]")) {
            const popupName = target
                .closest("[data-modal]")
                .getAttribute("href")
                .replace("#", "");
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        }

        if (target.classList.contains("popup__close") ||
            target.classList.contains("popup")) {
            popupClose(target.closest(".popup"));
            e.preventDefault();
        }

    });


    function getMenu() {
        document.body.classList.toggle('lock');
        document.querySelector('.icon-menu').classList.toggle('active');
        document.querySelector('.header').classList.toggle('active');
        document.querySelector('.menu').classList.toggle('open');
    }

    function popupOpen(curentPopup) {
        if (curentPopup) {
            const popupActive = document.querySelector(".popup.open");
            if (popupActive) {
                popupClose(popupActive);
            }
            document.body.classList.add('modal-lock');
            curentPopup.classList.add("open");
        }
    }

    function popupClose(popupActive) {
        popupActive.classList.remove("open");
        document.body.classList.remove('modal-lock');
    }




});

