$(document).ready(function(){
	
});

// Кнопочка показать/скрыть пароль
	// function showPassword() {
	// 	const passwdBtn = document.querySelector('.popup__password-btn');
	// 	const passwdInp = document.querySelector('.password-inp');

	// 	passwdBtn.addEventListener('click', () => {
	// 		passwdBtn.classList.toggle('active');

	// 		if (passwdInp.getAttribute('type') === 'password') {
	// 			 passwdInp.setAttribute('type', 'text');
	// 		} else {
	// 			 passwdInp.setAttribute('type', 'password');
	// 		}
	// 	})
	// }
	// showPassword();

// Определение тачСкрина ====================================
	const isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() ||
				isMobile.iOS() ||
				isMobile.Opera() ||
				isMobile.Windows());
		}
	};
		// Добавление класса на body в зависимости от экрана
	if (isMobile.any()) {
		document.body.classList.add('_touch');

	} else {
		document.body.classList.add('_pc'); // Если не тачСкрин то будет класс пк
	}
// Определение тачСкрина ====================================
// Попап ==============================================================
	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');
	const lockPadding = document.querySelectorAll('.lock-padding'); // Добавлять элементу, который багается при Lock'е

	let unlock = true;
	const timeout = 200; // Время выполнения transition, как и в CSS

	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++){
			const popupLink = popupLinks[index];
			popupLink.addEventListener('click', function (e){
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const curentPopup = document.getElementById(popupName);
				popupOpen(curentPopup);
				e.preventDefault();
			});
		}
	}
	const popupCloseIcon = document.querySelectorAll('.popup__close');
	if (popupCloseIcon.length > 0){
		for (let index = 0; index < popupCloseIcon.length; index++){
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}
	function popupOpen(curentPopup) {
		if (curentPopup && unlock){
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			curentPopup.classList.add('open');
			curentPopup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}
	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			if (doUnlock){
				bodyUnLock();
			}
		}
	}
	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
		if (lockPadding.length > 0){
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = lockPaddingValue;
			}
		}
		body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock');
		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}
	function bodyUnLock() {
		setTimeout(function () {
			if (lockPadding.length > 0) {
				for (let index = 0; index < lockPadding.length; index++) {
					const el = lockPadding[index];
					el.style.paddingRight = '0px';
				}
			}
			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout);
		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}
	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});

	(function () {
		if (!Element.prototype.closest) {
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function () {
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
		}
	})();
// Попап ==============================================================
// Анимация Цифр =====================================================
	window.addEventListener("load", windowLoad);

	function windowLoad() {
		// Инициализация цифр
		function digitsCountersInit(digitsCountersItems) {
			let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");

			if (digitsCounters) {
				digitsCounters.forEach (digitsCounter => {
					digitsCountersAnimate(digitsCounter);
				});
			}
		}
		// Анимация цифр
		function digitsCountersAnimate(digitsCounter) {
			let startTimestamp = null;
			const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
			const startValue = parseInt(digitsCounter.innerHTML);
			const startPosition = 0;
			const step = (timestamp) => {
				if (!startTimestamp) startTimestamp = timestamp;
				const progress = Math.min((timestamp - startTimestamp) / duration, 1);
				digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
				if (progress < 1) {
					window.requestAnimationFrame(step);
				}
			};
			window.requestAnimationFrame(step);
		}
		// Пуск при загрузке страницы
		// digitsCountersInit();


		// Пуск при скролле
		let options = {
			threshold: 0.3
		}
		let observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const targetElement = entry.target;
					const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
					if (digitsCountersItems.length) {
						digitsCountersInit(digitsCountersItems);
					}
					// Отключение после срабатывания
					observer.unobserve(targetElement);
				}
			});
		}, options );

		// Секция до которой будем доходить, чтобы начиналась анимация
		let sections = document.querySelectorAll('.page__section');
		if(sections.length) {
			sections.forEach(section => {
				observer.observe(section);
			});
		}
	}
// Анимация Цифр =====================================================
// Анимация при скролле ==============================================
	const animItems = document.querySelectorAll('._anim-items');

	if (animItems.length > 0 ){
		window.addEventListener('scroll', animOnScroll);
		function animOnScroll(params){
			for(let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;
				const animStart = 4;

				let animItemPoint = window.innerHeight - animItemHeight / animStart;
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
					animItem.classList.add('_active');
				} else {
					if(!animItem.classList.contains('_anim-no-hide')){
						animItem.classList.remove('_active');	
					}
				}
			}
		}
		function offset (el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return {top: rect.top + scrollTop, left: rect.left + scrollLeft }
		}
		setTimeout(() => {
			animOnScroll();
		}, 300 );
	}
// Анимация при скролле ==============================================