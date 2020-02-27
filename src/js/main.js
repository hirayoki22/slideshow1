class Slideshow {
    static createSlideshow() {
        let slideshowContainer = document.querySelector('.slideshow-container');
        let navBtnContainer = document.createElement('div');

        let images = [
            'src/img/311.jpg',
            'src/img/773A5509.jpg',
            'src/img/anotherone.jpg',
            'src/img/Brown-Anole.jpg',
            'src/img/imageagbag.jpg',
            'src/img/Photo-skils-and-tips.jpg'
        ];

        navBtnContainer.className = 'nav-btn-wrapper';
        slideshowContainer.appendChild(navBtnContainer);

        images.forEach((image, index) => {
            let card   = document.createElement('div');
            let navBtn = document.createElement('span');
            
            card.className   = 'card';
            navBtn.className = 'nav-btn';
            card.innerHTML = `
            <img src="${image}" alt="${image}" draggable="false">`;

            if (index == 0) {
                navBtn.classList.add('nav-btn-active');
                card.classList.add('card-active');
            }

            navBtnContainer.appendChild(navBtn);
            slideshowContainer.appendChild(card);
        });
    }
}

class UI {
    static loadSlideshow() {
        Slideshow.createSlideshow();
        this.playSlideshow();
        this.switchImage();
    }

    static switchImage() {
        let cards   = document.querySelectorAll('.card');
        let navBtns = document.querySelectorAll('.nav-btn');

        navBtns.forEach((navBtn, btnIndex) => {            
            navBtn.addEventListener('click', () => {
                UI.resetToDefault(cards, 'card-active');
                UI.resetToDefault(navBtns, 'nav-btn-active');

                cards.forEach((card, cardIndex) => {
                    if (btnIndex == cardIndex) {
                        navBtn.classList.add('nav-btn-active');
                        card.classList.add('card-active');
                    }
                });

                index = btnIndex;
            });
        });
    }

    static playSlideshow() {
        let cards   = document.querySelectorAll('.card');
        let navBtns = document.querySelectorAll('.nav-btn');

        index = index > cards.length - 1 ? 0 : index;

        UI.resetToDefault(cards, 'card-active');
        UI.resetToDefault(navBtns, 'nav-btn-active');

        cards.forEach((card, cardIndex) => {
            navBtns.forEach((navBtn, btnIndex) => {
                if (cardIndex == index && btnIndex == index) {
                    card.classList.add('card-active');
                    navBtn.classList.add('nav-btn-active');
                }
            });
        });
        index++;

        setTimeout(UI.playSlideshow, 5000);
    }

    static resetToDefault(eles, className) {
        eles.forEach(ele => {
            ele.classList.remove(className);
        });
    }

    static dynamicNavbarBkColor(window) {
        let navbar = document.querySelector('.main-navbar');

        if (window.scrollY > 0) {
            navbar.style.backgroundColor = 'rgba(245, 246, 255, 0.4)';
        } else {
            navbar.style.backgroundColor = '#f7f8ff';
        }
    }

}

// Event change navbar bkcolor
window.addEventListener('scroll', () => UI.dynamicNavbarBkColor(this));

// Event: Load Slideshow
let index = 0;
document.addEventListener('DOMContentLoaded', () => UI.loadSlideshow());