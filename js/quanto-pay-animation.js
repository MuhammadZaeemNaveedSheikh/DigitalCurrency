// section-2 pinned
gsap.to(".section-2", {
	scrollTrigger: {
		target: ".section-2",
		start: "top 5%",
		endTrigger: ".section-3",
		end: "top 35%",
		pin: ".section-2",
		scrub: 1,
		anticipatePin: 1
		// markers: true
	}
});

gsap.from('.hero-section .section-description-header', 2, {autoAlpha: 0, y: 200})
gsap.from('.hero-section .hero-description', 2, {autoAlpha: 0, y: 200})


// section-3 pinned
gsap.to(".section-3", {
	scrollTrigger: {
		target: ".section-3",
		start: "top 5%",
		end: "+=1400",
		pin: ".section-3",
		scrub: 1,
		anticipatePin: 1
	}
});


ScrollTrigger.matchMedia({
	
	// large
	"(min-width: 960px)": function () {
		const sectThree = gsap.timeline({
			scrollTrigger: {
				target: ".section-3",
				start: "top start",
				endTrigger: ".section-4",
				end: "top start",
				scrub: 1,
			},
			delay: 1,
		});
		
		sectThree.from(".side-icon-3", {
			x: 200,
			y: 70,
			opacity: 0,
			duration: 1,
		});
		
		sectThree.fromTo(
				".side-icon-2 img",
				{x: 200, y: 70, opacity: 0},
				{x: -50, y: -100, opacity: 1, scale: 2, duration: 1},
				"-=.7"
		);
		sectThree.fromTo(
				".side-icon-1 img",
				{x: 200, y: 70, opacity: 0},
				{x: -30, y: -200, opacity: 1, scale: 3, duration: 1},
				"-=.8"
		);
		
		
		sectThree.from(".side-icon-6", {
			x: -250,
			y: 70,
			opacity: 0,
			duration: 1,
		}, "-=1.5");
		sectThree.fromTo(
				".side-icon-5 img",
				{x: 100, y: 70, opacity: 0},
				{x: 40, y: -130, opacity: 1, scale: 2, duration: 1},
				"-=.9"
		);
		sectThree.fromTo(
				".side-icon-4 img",
				{x: -150, y: 70, opacity: 0},
				{x: 30, y: -280, opacity: 1, scale: 3, duration: 1},
				"-=1"
		);
		ScrollTrigger.refresh();
	},
	
	
	// small
	"(max-width: 599px)": function () {
		
		ScrollTrigger.refresh();
		
	}
	
});


// section-4 pinned
const video = document.querySelector(".world-pricing-video");

video.click();
gsap.to(".section-4", {
	scrollTrigger: {
		target: ".section-4",
		start: "top 5%",
		end: "+=100%",
		pin: ".section-4",
		scrub: 1,
		anticipatePin: 1,
		onUpdate: (self) => {
			if (video.readyState) {
				if (self.progress >= 0.2) {
					video.play()
				} else if (self.progress < 0.2) {
					video.pause();
					video.currentTime = 0;
				}
			}
		}
	}
});

// section-5 pinned
gsap.to(".section-5", {
	scrollTrigger: {
		target: ".section-5",
		start: "top 5%",
		pin: ".section-5",
		end: "+=70%",
		scrub: 1,
		anticipatePin: 1
	}
});

// section-6 pinned
gsap.to(".section-6", {
	scrollTrigger: {
		target: ".section-6",
		start: "top 5%",
		end: "+=170%",
		pin: ".section-6",
		scrub: 1,
		anticipatePin: 1
	}
});

ScrollTrigger.batch(".section-7 .card-pill .card", {
	onEnter: elements => {
		
		const children = elements[0].children[0].children;
		gsap.from(elements, {autoAlpha: 0, width: 0});
		
		gsap.timeline()
				.from(children[0], {scale: 0, duration: .3, delay: .3})
				.from(children[1], {scale: 0, duration: .1})
				.from(children[2], {scale: 0})
	}
});


gsap.fromTo(".card-wrapper", {scale: 0}, {
	scrollTrigger: {
		trigger: ".card-outer",
		start: "top 90%",
		end: "top 50%",
		scrub: true,
		// markers: true,
	},
	scale: 1
	
});
//parallax card animation
gsap.to(".card-bgc", {
	yPercent: -50,
	duration: 0.1,
	scrollTrigger: {
		trigger: ".card-bgc",
		start: "0 100%",
		scrub: true
	},
	delay: 2
});

let mouse = {};
const mobileImage = document.querySelector(".payment-history > img")
const mobileImage2 = document.querySelector(".mobile-holder > img")


document.addEventListener('mousemove', (event) => {
	mouse.x = (event.clientX);
	mouse.y = (event.clientY);
	
	mobileImage.style.transform = `rotateY(${mouse.x * 0.02}deg) rotateX(${mouse.y * 0.02}deg)`;
	mobileImage2.style.transform = `translateY(-100px) rotateY(${mouse.x * 0.02}deg) rotateX(${mouse.y * 0.02}deg)`;
	
}, false);
