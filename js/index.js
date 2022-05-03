import i18Obj from './translate.js';

// burger-menu
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.nav');
const menuOverlay = document.querySelector('.nav-overlay');
const navLink = document.querySelector('.nav__list');

burger.addEventListener('click', () => {
  menu.classList.toggle('nav_active');
  menuOverlay.classList.toggle('nav-overlay_open');
  burger.classList.toggle('burger__close');
});

navLink.addEventListener('click', () => {
  menu.classList.remove('nav_active');
  menuOverlay.classList.remove('nav-overlay_open');
  burger.classList.remove('burger__close');
});

// Change image in section portfolio
const portfolioBtns = document.querySelector('.portfolio__tabs');
const portfolioImages = document.querySelectorAll('.portfolio__img');

const changeImage = portfolioBtns.addEventListener('click', (e) => {
  const season = e.target.dataset.season;
  if (e.target.classList.contains('portfolio__button')) {
    portfolioImages.forEach(
      (img, index) => (img.src = `./assets/img/${season}/${index + 1}.jpg`)
    );
  }
});

const seasons = ['winter', 'spring', 'summer', 'autumn'];
const preloadImages = (array) => {
  array.forEach((season) => {
    for (let i = 0; i < 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${season}/${i + 1}.jpg`;
    }
  });
};

preloadImages(seasons);

const changeClassActive = (nameClass) => {
  const buttons = portfolioBtns.querySelectorAll('.portfolio__button');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      let currentBtn = btn;
      buttons.forEach((btn) => {
        btn.classList.remove('button_active');
      });
      currentBtn.classList.add('button_active');
    });
  });
};

changeClassActive('button_active');

// Change language

const langEn = document.querySelector('.header__lang-en');
const langRu = document.querySelector('.header__lang-ru');

const getTranslate = (lang) => {
  const elemWithdata = document.querySelectorAll('[data-i18n]');
  elemWithdata.forEach((el) => {
    const currentElement = el;
    if (currentElement.placeholder) {
      currentElement.placeholder = i18Obj[lang][el.dataset.i18n];
      currentElement.textContent = '';
    }
    currentElement.textContent = i18Obj[lang][el.dataset.i18n];
  });
  localStorage.setItem('lang', lang);
};

langEn.addEventListener('click', () => {
  getTranslate('en');
});
langRu.addEventListener('click', () => {
  getTranslate('ru');
});

const changeActiveClassLanguage = () => {
  const btnLang = document.querySelectorAll('.language');

  btnLang.forEach((el) => {
    el.addEventListener('click', () => {
      let currentElement = el;

      btnLang.forEach((el) => {
        el.classList.remove('header__lang_active');
      });

      currentElement.classList.add('header__lang_active');
    });
  });
};

changeActiveClassLanguage();

//  Change theme

let lightStylesheet = document.querySelector('[title="theme"]');
const lightTheme = document.querySelector('.light-theme');
const darkTheme = document.querySelector('.dark-theme');

lightTheme.addEventListener('click', () => {
  applyTheme('light');
});
darkTheme.addEventListener('click', () => {
  applyTheme('dark');
});

const applyTheme = (themeName) => {
  if (themeName === 'light') {
    lightStylesheet.href = 'css/light-style.css';
    lightTheme.classList.add('hide');
    darkTheme.classList.remove('hide');
  } else if (themeName === 'dark') {
    lightStylesheet.href = '#';
    lightTheme.classList.remove('hide');
    darkTheme.classList.add('hide');
  }
  localStorage.setItem('theme', themeName);
};

// Local storage

let activeTheme = localStorage.getItem('theme');
let activeLang = localStorage.getItem('lang');

if (activeTheme === null || activeTheme === 'dark') {
  applyTheme('dark');
} else if (activeTheme === 'light') {
  applyTheme('light');
}

if (activeLang === null || activeLang === 'en') {
  getTranslate('en');
} else if (activeLang === 'ru') {
  getTranslate('ru');
}

// custom-video

const video = document.querySelector('.movie');
const playBtnBottom = document.querySelector('.play__button-bottom');
const imgPlay = playBtnBottom.querySelector('.play');
const playBtnCenter = document.querySelector('.play__button-center');
const progressBar = document.querySelector('.progress__bar');
const volumeInput = document.querySelector('.video__volume');
const muteBtn = document.querySelector('.video__mute-btn');

const buttonPlayToggle = () => {
  if (video.paused) {
    video.play();
    playBtnCenter.style.opacity = '0';
    imgPlay.src = 'assets/svg/pause.svg';
  } else {
    video.pause();
    playBtnCenter.style.opacity = '1';
    imgPlay.src = 'assets/svg/play.svg';
  }
};

const PlayToggle = () => {
  playBtnBottom.addEventListener('click', buttonPlayToggle);
  playBtnCenter.addEventListener('click', buttonPlayToggle);
};
PlayToggle();

const pauseVideo = () => {
  video.pause();
};
video.addEventListener('click', pauseVideo);

function videoVolume() {
  let currentVolume = this.value;
  video.volume = currentVolume / 100;
  if (video.volume === 0) {
    muteImg.classList.add('muted');
    unmuteImg.classList.remove('muted');
  } else {
    muteImg.classList.remove('muted');
    unmuteImg.classList.add('muted');
  }
}
const muteImg = document.querySelector('.mute');
const unmuteImg = document.querySelector('.unmute');

function videoMute() {
  video.muted = !video.muted;
  muteImg.classList.toggle('muted');
  unmuteImg.classList.toggle('muted');
}
volumeInput.addEventListener('change', videoVolume);
muteBtn.addEventListener('click', videoMute);

const progressUpdate = () => {
  progressBar.value = (video.currentTime / video.duration) * 100;
};

video.ontimeupdate = progressUpdate;

function videoRewind() {
  let width = this.offsetWidth;
  let currentPosition = event.offsetX;
  this.value = (currentPosition / width) * 100;
  video.pause();
  video.currentTime = video.duration * (currentPosition / width);
  video.play();
}
progressBar.addEventListener('click', videoRewind);
