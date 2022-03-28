"use strict";

// change theme acccording to local storage
const localStorageDarkMode = localStorage.getItem('darkMode') == 'true' ? 1 : 0;
if (localStorageDarkMode) {
	$('body').addClass('dark');
	$('#change-theme').removeClass('checked');
} else {
	$('body').removeClass('dark');
	$('#change-theme').addClass('checked');
}

$(function () {
	$('#change-theme').on('click', function () {
		$('#change-theme').toggleClass('checked');
		$('body').toggleClass('dark');
		let isDarkMode = $('body').hasClass('dark');
		window.localStorage.setItem('darkMode', isDarkMode);
	});

	var video = document.getElementById('video');

	$('.sound').on('click', function () {
		$(this).toggleClass('mute');
		video.muted = !video.muted;
	})

	$('#carouselExampleIndicators').on('slid.bs.carousel', function () {
		if($('.first-slide').hasClass('active')) {
			$(video).trigger('play');
		} else {
			$(video).trigger('pause');
			$('.sound').addClass('mute');
			video.muted = true;
		}
	})

	$('.current-year').html(new Date().getFullYear());

	$('.cookie-banner .btn').on('click', function () {
		setCookie('gdpr', true);
		$('.cookie-banner').hide();
	});

	if (getCookie('gdpr')) {
		$('.cookie-banner').hide();
	} else {
		$('.cookie-banner').show();
	}

	$('body').css('overflow', 'hidden');
	$('.loader-overlay').css('top', `${window.pageYOffset + 'px'}`)

	setTimeout(function () {
		$('.loader-overlay').hide();
		$('body').css('overflow', 'auto')
	}, 300);
});

//cookie
function setCookie(cookieName, cookieValue) {
	var d = new Date();
	d.setTime(d.getTime() + (364 * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
	const cookies = document.cookie.split('; ');
	for (let cookie of cookies) {
		let cookieParts = cookie.split('=');
		if (cookieParts[0] == cookieName) {
			return cookieParts[1] === "true";
		}
	}
}

$(document).scroll(function () {
	var nav = $('.home-page.navbar');
	nav.toggleClass('scrolled', $(this).scrollTop() > nav.outerHeight());
	$('main').toggleClass('header-height', $(this).scrollTop() > nav.outerHeight() / 2)
});