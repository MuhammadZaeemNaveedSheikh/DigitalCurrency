if (history.scrollRestoration) {
	history.scrollRestoration = 'manual';
} else {
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}
}

ScrollTrigger.config({
	autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});

$(document).ready(function () {
	//load company-logos slider
	$('.partner-company-logos').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 1500,
		arrows: true,
		dots: false,
		pauseOnHover: false,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 3
			}
		}, {
			breakpoint: 520,
			settings: {
				slidesToShow: 3
			}
		}]
	});
});

// scroll to change navbar background color
document.addEventListener("DOMContentLoaded", function () {
	window.addEventListener('scroll', function () {
		if (window.scrollY > 200) {
			document.querySelector('.quanto-pay-navbar').classList.add('bg-firefly');
		} else {
			document.querySelector('.quanto-pay-navbar').classList.remove('bg-firefly');
		}
	});
});