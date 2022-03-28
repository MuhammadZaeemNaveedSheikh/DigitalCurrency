var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

console.log(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
if (history.scrollRestoration) {
	history.scrollRestoration = 'manual';
} else {
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}
}
var camera, renderer, scene;
var card, cardAnim, card2;
var sphere;
var mixer;
var dots, dots2, dots3;
var scene2, renderer2, price1Object, price2Object, price3Object;
var cardLookAt = false
// var machine;

//Mouse Movement
const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
var mouseMovement = true
var overallMovement = true

//Mobile mouse movement ids
var mobileImage = document.getElementById("imagebox3")
// var mobileImage2 = document.getElementById("imagebox5")

//
function initScene() {
	
	//Camera
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.set(0, 0, 10)
	camera.lookAt(new THREE.Vector3(0, 0, 0))
	
	//Scene 1
	scene = new THREE.Scene()
	
	//Scene 2
	scene2 = new THREE.Scene()
	
	//Renderer 1
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.domElement.className = "renderer"
	document.body.appendChild(renderer.domElement)
	
	//Renderer 2
	renderer2 = new THREE.CSS3DRenderer()
	renderer2.setSize(window.innerWidth, window.innerHeight);
	renderer2.domElement.className = "renderer"
	document.body.appendChild(renderer2.domElement)
	
	//Lighting
	var light = new THREE.AmbientLight(0xffffff, 2.0);
	scene.add(light)
	var loader = new THREE.GLTFLoader()
	
	
	//World mesh
	var geometry = new THREE.SphereGeometry(2, 20, 20)
	var material = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load("Assets/World_.png"),
		transparent: true
	})
	sphere = new THREE.Mesh(geometry, material)
	sphere.scale.setScalar(isMobile ? 0.5 : 1)
	sphere.position.set(isMobile ? -0.2 : 2, -7, 0)
	scene.add(sphere)
	
	
	var machineAnimation = gsap.timeline()
	
	var worldGroup = new THREE.Group()
	//Machine mesh
	// var geometry = new THREE.PlaneGeometry(4, 4)
	// var material = new THREE.MeshBasicMaterial({
	// 	map: new THREE.TextureLoader().load("Assets/POS Payment Terminal.G15.2k.png"),
	// 	transparent: true
	// })
	// machine = new THREE.Mesh(geometry, material)
	// machine.position.set(isMobile ? -0.5 : 0, -14, -2)
	//
	// if (isMobile) {
	// 	machine.scale.setScalar(0.7)
	// }
	//
	//
	// scene.add(machine)
	
	//World dots meshes
	var dotsGeometry = new THREE.PlaneGeometry(3.35, 3.35)
	var dotsMaterial = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load("Assets/WL.png"),
		transparent: true,
		opacity: 0
	})
	dots = new THREE.Mesh(dotsGeometry, dotsMaterial)
	dots.scale.setScalar(isMobile ? 0.5 : 1)
	dots.rotation.set(0, 0, -0.4)
	dots.position.set(isMobile ? -0.2 : 2, -6, 2)
	
	dots2 = new THREE.Mesh(dotsGeometry, dotsMaterial.clone())
	dots2.scale.setScalar(isMobile ? 0.5 : 1)
	dots2.rotation.set(0, 0, 0.4)
	dots2.position.set(isMobile ? -0.2 : 1.5, -6, 2)
	
	dots3 = new THREE.Mesh(dotsGeometry, dotsMaterial.clone())
	dots3.scale.setScalar(isMobile ? 0.5 : 1)
	dots3.rotation.set(0, 0, -1.7)
	dots3.position.set(isMobile ? -0.2 : 1.65, -6, 2)
	
	scene.add(dots)
	scene.add(dots2)
	scene.add(dots3)
	
	
	//World price meshes
	var price1 = document.createElement("div")
	price1.innerHTML = "35£"
	price1.className = "price1"
	price1Object = new THREE.CSS3DObject(price1);
	price1Object.position.set(3.65, -6, 0)
	price1Object.scale.set(0.01, 0.01, 0.01)
	scene2.add(price1Object);
	
	var price2 = document.createElement("div")
	price2.innerHTML = "50$"
	price2.className = "price1"
	price2Object = new THREE.CSS3DObject(price2);
	price2Object.position.set(0.75, -6, 0)
	price2Object.scale.set(0.01, 0.01, 0.01)
	scene2.add(price2Object);
	
	var price3 = document.createElement("div")
	price3.innerHTML = "60$"
	price3.className = "price1"
	price3Object = new THREE.CSS3DObject(price3);
	price3Object.position.set(-0.8, -4, 0)
	price3Object.scale.set(0.01, 0.01, 0.01)
	scene2.add(price3Object);
	
	//Load and add Card Ambassadors Animation
	loader.load("Assets/Model/fin finAmbassadors Card(14--1-22) (2).glb", (gltf) => {
		var cards = gltf.scene
		cards.position.set(isMobile ? 0 : 2.2, -7, 0)
		cards.rotation.set(0, 1, 0)
		cardsAnimation.to(cards.position, {y: -0.35, duration: 0.5}, 0.9)
		// cardsAnimation.to(cards.position, {y: -0.5, duration: 0.5}, 0.9)
		// cardsAnimation.to(cards.position, {y: 1, duration: 0.15, delay: 1}, 1.73)
		cardsAnimation.to(cards.position, {y: 6, duration: 0.15}, 1.9)
		cards.scale.setScalar(isMobile ? 0.4 : 1.1)
		mixer = new THREE.AnimationMixer(cards);
		gltf.animations.map((v) => {
			var action = mixer.clipAction(v)
			action.timeScale = 0.6
			action.play()
		})
		scene.add(cards)
	})
	
	//Load and Add Cards models
	loader.load("Assets/Model/fin fin QP Card.glb", (gltf) => {
		card = gltf.scene
		card2 = gltf.scene.clone()
		card.scale.setScalar(isMobile ? 0.3 : 0.4)
		card.rotation.set(-1.41, 0, 1.05)
		
		
		console.log(card)
		
		
		//initial quantoPay card position
		if (isMobile) {
			card.position.set((window.innerWidth / window.innerHeight) * 0.15, 0, 0)
		} else {
			card.position.set(-(window.innerWidth / window.innerHeight) * 2, -0.25, 0)
		}
		
		
		//Initial Animation
		gsap.to(card.rotation, {duration: 2, x: 0, y: 0, z: 0})
		
		
		// Card 1 Scroll Trigger animations
		cardAnim.to(card.scale, {
			x: isMobile ? 0.4 : 0.4, y: isMobile ? 0.4 : 0.4, z: isMobile ? 0.4 : 0.4, duration: 1, onStart: () => {
				overallMovement = true
				mouseMovement = false
			}, onComplete: () => {
				overallMovement = false
			}
		}, 0)
		
		
		cardAnim.to(card.rotation, {x: -4.27, y: 0, z: 2.14, duration: 1}, 0)
		
		
		cardAnim.to(card.position, {x: isMobile ? -0.75 : -4, y: -1, z: 0, duration: 1}, 0)
		cardAnim.to(card.rotation, {x: -4.27, y: 0, z: 2.14, duration: 1}, 0)
		cardAnim.to(card.position, {x: isMobile ? -0.75 : 0, y: -1, z: 0, duration: 2}, 1.4)
		cardAnim.to(card.rotation, {x: 0, y: 0, z: 0, duration: 2}, 1.4)
		cardAnim.to(card.scale, {
			x: isMobile ? 0.2 : 0.4, y: isMobile ? 0.2 : 0.4, z: isMobile ? 0.2 : 0.4, duration: 2, onStart: () => {
				overallMovement = true
			}, onComplete: () => {
				mouseMovement = true
			}
		}, 1.4)
		cardAnim.to(card.position, {
			x: isMobile ? 0.2 : 3, y: 1, z: -2, duration: 1.5, onStart: () => {
				overallMovement = false
				mouseMovement = false
			}
		}, 3.8)
		cardAnim.to(card.rotation, {x: 2.63, y: -2.9, z: -2.22, duration: 1.5}, 3.8)
		cardAnim.to(card.scale, {
			x: isMobile ? 0.05 : 0.1, y: isMobile ? 0.05 : 0.1, z: isMobile ? 0.05 : 0.1, duration: 1.5, onComplete: () => {
				cardLookAt = true
			}
		}, 3.8)
		
		cardAnim.to(card.position, {x: isMobile ? -0.4 : 1.5, z: -2, y: isMobile ? -0.85 : -1.89, duration: 0.15}, 5.3)
		
		cardAnim.to(card.position, {z: 2.2, duration: 0.05}, 5.45)
		
		cardAnim.to(card.position, {x: isMobile ? 0.1 : 2.7, y: isMobile ? 0.9 : 1.6, duration: 0.15}, 5.5)
		cardAnim.to(dots.material, {opacity: 1, duration: 0.15}, 5.5)
		cardAnim.to(price1Object.element.style, {
			opacity: isMobile ? 0 : 1,
			fontSize: "15px",
			padding: "15px",
			duration: 0.15
		}, 5.5)
		
		cardAnim.to(card.position, {z: -2, duration: 0.05}, 5.65)
		
		cardAnim.to(card.position, {x: isMobile ? 0 : 2.7, y: isMobile ? -0.9 : -1.8, duration: 0.15}, 5.7)
		
		cardAnim.to(card.position, {z: 2.2, duration: 0.05}, 5.85)
		
		cardAnim.to(card.position, {x: isMobile ? -0.4 : 1, y: isMobile ? 0.9 : 1.8, duration: 0.15}, 5.9)
		cardAnim.to(price2Object.element.style, {
			opacity: isMobile ? 0 : 1,
			fontSize: "15px",
			padding: "15px",
			duration: 0.15
		}, 5.9)
		cardAnim.to(dots2.material, {opacity: 1, duration: 0.15}, 5.9)
		
		cardAnim.to(card.position, {z: -2, x: isMobile ? 0 : 1.3, duration: 0.05}, 6.05)
		
		cardAnim.to(card.position, {x: isMobile ? 0.9 : 3.8, y: isMobile ? 0 : -0.5, duration: 0.15}, 6.1)
		
		cardAnim.to(card.position, {x: isMobile ? 0.8 : 3.4, z: 2.2, duration: 0.05}, 6.25)
		
		cardAnim.to(card.position, {x: isMobile ? -1 : 0, y: 0, duration: 0.15}, 6.3)
		cardAnim.to(price3Object.element.style, {
			opacity: isMobile ? 0 : 1,
			fontSize: "15px",
			padding: "15px",
			duration: 0.15
		}, 6.3)
		cardAnim.to(dots3.material, {opacity: 1, duration: 0.15}, 6.3)
		
		cardAnim.to(card.position, {
			z: -2, duration: 0.05, onComplete: () => {
				cardLookAt = false
			}
		}, 6.45)
		
		cardAnim.to(card.position, {
			x: 2, duration: 0.1, onComplete: () => {
				cardLookAt = false
			}
		}, 6.5)
		
		cardAnim.to(card.position, {x: isMobile ? -0.9 : -0.1, y: isMobile ? 0.6 : 0.8, z: 0, duration: 1.1}, 6.6)
		cardAnim.to(card.rotation, {x: -4.13, y: -3.18, z: -2.36, duration: 1.2}, 6.6)
		cardAnim.to(card.scale, {
			x: isMobile ? 0.2 : 0.3,
			z: isMobile ? 0.2 : 0.3,
			y: isMobile ? 0.2 : 0.3,
			duration: 1.2
		}, 6.6)
		
		
		// cardAnim.to(card.position, {x: isMobile ? -0.9 : -0.1, y: isMobile ? 0.6 : 0.8, z: 0, duration: 1.1}, 7)
		
		// cardAnim.to(machine.position, {x: -1, y: 0.5, duration: 1.8}, 7.2)
		
		// cardAnim.to(machine.position, {x: isMobile ? 0 : -0.5, y: 0.5, duration: 1.1}, 7)
		// cardAnim.to(card.position, {x: isMobile ? 0 : -0.5, y: 0.5, duration: 1.1}, 7)
		
		// cardAnim.to(machine.position, {x: isMobile ? 0 : -1.25, y: -0.75, duration: 1.1}, 7.2)
		// cardAnim.to(card.position, {x: isMobile ? 0 : -1.05, y: -0.25, duration: 1.1}, 7.2)
		
		
		// cardAnim.to(card.position, { x: -2, y: 6, duration: 0.4}, 8)
		cardAnim.to(card.position, {y: 8, duration: 1.2}, 9.6)
		// cardAnim.to(machine.position, {x: isMobile ? 0 : -1.25, y: 6.35, duration: 1.2}, 9.3)
		
		
		cardAnim.to(sphere.position, {y: 0, duration: 0.9}, 4.5)
		cardAnim.to(sphere.rotation, {y: Math.PI * 2, duration: 0.9}, 4.5)
		cardAnim.to(dots.position, {y: -0.1, duration: 0.9}, 4.5)
		cardAnim.to(dots2.position, {y: -0.05, duration: 0.9}, 4.5)
		cardAnim.to(dots3.position, {y: -0.1, duration: 0.9}, 4.5)
		cardAnim.to(price1Object.position, {y: 2.3, duration: 0.9}, 4.5)
		cardAnim.to(price2Object.position, {y: 2.5, duration: 0.9}, 4.5)
		cardAnim.to(price3Object.position, {y: 0.2, duration: 0.9}, 5.5)
		
		cardAnim.to(sphere.position, {y: 7, duration: 1}, 6.6)
		cardAnim.to(dots.position, {y: 5.5, duration: 1}, 6.6)
		cardAnim.to(dots2.position, {y: 5.5, duration: 1}, 6.6)
		cardAnim.to(dots3.position, {y: 5.5, duration: 1}, 6.6)
		cardAnim.to(price1Object.position, {y: 7, duration: 0.7}, 6.6)
		cardAnim.to(price2Object.position, {y: 7, duration: 0.7}, 6.6)
		cardAnim.to(price3Object.position, {y: 7, duration: 0.7}, 6.6)
		scene.add(card)
		
		
		//Card 2 Scroll Trigger Animations
		card2.scale.setScalar(isMobile ? 0.2 : 0.4)
		card2.rotation.set(-1.41, 0, 1.05)
		card2.position.set(-13, -1, 0)
		cardAnim2.to(card2.rotation, {x: 0.36, y: -0.32, z: -1.81, duration: 0.6}, 1.5)
		cardAnim2.to(card2.position, {x: isMobile ? -0.75 : -4, y: isMobile ? 0 : 1, z: 0, duration: 0.6}, 1.5)
		cardAnim2.to(card2.position, {x: -13, y: -1, z: 0, duration: 2.7}, 2.4)
		cardAnim2.to(card2.rotation, {x: -1.41, y: 0, z: 1.05, duration: 2.7}, 2.4)
		scene.add(card2)
		render()
	})
	
	
}

var clock = new THREE.Clock()

//Render 3D objects
function render() {
	requestAnimationFrame(render)
	renderer.render(scene, camera)
	renderer2.render(scene2, camera);
	const delta = clock.getDelta();
	target.x = (1 - mouse.x) * 0.0004;
	target.y = (1 - mouse.y) * 0.0003;
	if (cardAnim.time() == 0 || (cardAnim.time() > 3.4 && cardAnim.time() < 3.7315789)) {
		card.rotation.y += 0.05 * (target.x - card.rotation.y);
		card.rotation.x += 0.05 * (target.y - card.rotation.x);
	}
	
	if ((cardAnim.time() > 0 && cardAnim.time() < 0.8347368) || (cardAnim.time() > 1.6884211 && cardAnim.time() < 2.5621053)) {
		card.rotation.y += 0.05 * (target.x - card.rotation.y);
	}
	if (cardAnim.time() > 5.3357895 && cardAnim.time() < 6.7210526) {
		card.lookAt(new THREE.Vector3(2, 0, 0))
	}
	mobileImage.style.transform = `rotateY(${mouse.x * 0.02}deg) rotateX(${mouse.y * 0.02}deg)`
	// mobileImage2.style.transform = `rotateY(${mouse.x * 0.02}deg) rotateX(${mouse.y * 0.02}deg)`
	if (mixer) {
		mixer.update(delta);
	}
}

//Resize Scene
function resize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer2.setSize(window.innerWidth, window.innerHeight);
	if (cardAnim.time() == 0) {
		card.position.set(-(window.innerWidth / window.innerHeight) * 2.8, 0, 0)
	}
}

//Save mouse coordinates
function onMouseMove(event) {
	mouse.x = (event.clientX - windowHalf.x);
	mouse.y = (event.clientY - windowHalf.x);
	
}

//Event Listeners
window.addEventListener("resize", resize)
document.addEventListener('mousemove', onMouseMove, false);

initScene()

//Card Animation Timelines
var cardAnim = gsap.timeline({
	scrollTrigger: {
		startTrigger: ".herosection",
		endTrigger: ".eighthSection",
		start: "top start",
		end: "top 40%",
		scrub: true,
		// markers: true
	},
	duration: 9
})


var cardAnim2 = gsap.timeline({
	scrollTrigger: {
		trigger: ".herosection",
		endTrigger: ".sixthSection",
		start: "top start",
		end: "top 40%",
		scrub: true,
		
	},
	duration: 10
})

var cardsAnimation = gsap.timeline({
	scrollTrigger: {
		trigger: ".seventhSection",
		endTrigger: ".eighthSection",
		start: "55% start",
		end: "110% start",
		scrub: true,
		// markers: true
	},
	duration: 2
	// duration: 10
})


// Text animation
var section1anim = gsap.timeline();
// Main heading animation
section1anim.from(".maintext", {
	y: 200,
	opacity: 0,
	duration: 3,
}, "<0.5");

// Card description
section1anim.from(".description", {
	y: 60,
	duration: 1,
	opacity: 0,
	stagger: 0.5,
}, "<0.5");


var sectThree = gsap.timeline({
	scrollTrigger: {
		target: ".thirdSection",
		start: "top start",
		endTrigger: ".forthSection",
		end: "top start",
		pin: ".thirdSection",
		scrub: 1,
	},
	delay: 1,
});

sectThree.from(".icon3", {
	x: 200,
	y: 70,
	opacity: 0,
	duration: 1,
});
sectThree.fromTo(
		".icon2 img",
		{x: 200, y: 70, opacity: 0},
		{x: -50, y: -100, opacity: 1, scale: 2, duration: 1},
		"-=.7"
);
sectThree.fromTo(
		".icon1 img",
		{x: 200, y: 70, opacity: 0},
		{x: -30, y: -200, opacity: 1, scale: 3, duration: 1},
		"-=.8"
);

sectThree.from(".icon6", {
	x: -250,
	y: 70,
	opacity: 0,
	duration: 1,
}, "-=1.5");
sectThree.fromTo(
		".icon5 img",
		{x: -250, y: 70, opacity: 0},
		{x: 40, y: -130, opacity: 1, scale: 2, duration: 1},
		"-=.9"
);
sectThree.fromTo(
		".icon4 img",
		{x: -250, y: 70, opacity: 0},
		{x: 30, y: -280, opacity: 1, scale: 3, duration: 1},
		"-=1"
);

// Section four animation

var sectFour = gsap.timeline({
	scrollTrigger: {
		target: ".thirdSection",
		start: " top end",
		endTrigger: ".fifthSection",
		end: "top start",
		pin: ".forthSection",
		scrub: true,
		
	},
	duration: 5,
});

var sectFive = gsap.timeline({
	scrollTrigger: {
		target: ".fifthSection",
		start: "top 23%",
		endTrigger: ".sixthSection",
		end: "92% 100%",
		pin: ".fifthSection",
		scrub: 1,
		// markers: true
	},
});

sectFive.from(
		".mactext",
		{
			y: 380,
			opacity: 0,
			duration: 1.5,
			stagger: .5
		},
		"<.5"
);

// Sixth Section Animation
var sectSixth = gsap.timeline({
	scrollTrigger: {
		target: ".sixthSection",
		start: "top 5%",
		endTrigger: ".seventhSection",
		end: "top 35%",
		pin: ".sixthSection",
		scrub: false,
		// markers: true
	},
	duration: 5
});


// Section seven anmation

// var sectSeven = gsap.timeline({
// 	scrollTrigger: {
// 		target: ".seventhSection",
// 		start: " top end",
// 		endTrigger: ".ninthSection",
// 		end: "top start",
// 		pin: ".seventhSection",
// 		scrub: 2,
// 	},
// });
// sectSeven.from(".imagebox3", {
// 	y: 400,
// 	opacity: 0,
// 	duration: 2,
// });
// sectSeven.add(pillAnime());

// function pillAnime() {
// 	var pill = gsap.timeline();
// 	pill.set(".box1", {transformOrigin: "100% 50%"});
// 	pill.from(".mask1", 2.2, {
// 		width: "0px",
// 		ease: Power0.easeNone,
// 		duration: 1,
// 	});
// 	pill.from(".wrapImg", {
// 		scale: 0,
// 		stagger: 0.5,
// 	});
// 	pill.from(".wrap", {
// 		opacity: 0,
// 		x: -60,
// 		duration: 0.5,
// 		delay: 1.5,
// 		stagger: 1,
// 	});

// 	return pill;
// };

// Section eight animation

// var sectEight = gsap.timeline({
// 	scrollTrigger: {
// 		target: ".eighthSection",
// 		start: " top end",
// 		pin: ".eighthSection",
// 		scrub: 2,
// 	},
// });
//
// sectEight.from(".imagebox5", {
// 	y: 400,
// 	rotationY: 360,
// 	scale: 3,
// 	opacity: 0,
// 	duration: 2
// });
//
// sectEight.from(".el", {
// 	opacity: 0,
// 	y: 300,
// 	duration: 2,
// 	stagger: 0.2
// });


// var sectSeven = gsap.timeline({
// 	scrollTrigger: {
// 		target: ".seventhSection",
// 		start: " top end",
// 		endTrigger: ".ninthSection",
// 		end: "top start",
// 		pin: ".seventhSection",
// 		scrub: 2,
// 	},
// });


gsap.fromTo('.herosection .circleArrow',
		{
			opacity: 1,
			scale: 1,
		},
		{
			opacity: 0,
			scale: 0,
			scrollTrigger: {
				trigger: '.herosection .circleArrow',
				endTrigger: '.herosection .circleArrow',
				start: 'top 65%',
				end: 'bottom 100%',
				scrub: true,
				// markers: true
			},
		}
)


var sectTwo = gsap.timeline({
	scrollTrigger: {
		target: ".secondSection",
		start: "top start",
		endTrigger: ".thirdSection",
		end: "top start",
		// pin: ".secondSection",
		pinSpaceing: true,
		scrub: 1,
	},
	delay: 1,
});

//circleArrow fadeIn fadeOut animation
const fadeInOutAnimation = (parentSection, element, markers,
                            {
	                            fromDuration = 4,
	                            to1Duration = 3, to1Delay = 6,
	                            to2Duration = 5, to2Delay = 6,
	                            start = "top 30%", end = 'bottom end'
                            }
) => {
	const ele = `${parentSection} ${element}`;
	gsap.timeline({
		scrollTrigger: {
			trigger: parentSection,
			scrub: 1,
			start,
			end,
			markers
		}
	}).to(ele, {
		autoAlpha: 0,
		scale: 0,
		duration: fromDuration,
	}).to(ele, {
		autoAlpha: 1,
		scale: 1,
		duration: to1Duration,
		delay: to1Delay
		
	}).to(ele, {
		autoAlpha: 0,
		scale: 0,
		duration: to2Duration,
		delay: to2Delay,
	});
}

//define sections that have '.circleArrow' element
const sections = ['.secondSection', '.thirdSection', ".forthSection", ".fifthSection", ".sixthSection"];

sections.forEach((section, index) => {
	let delay = {
		fromDuration: 4,
		to1Duration: 3,
		to1Delay: 6,
		to2Duration: 5,
		to2Delay: 6
	};
	let markers = false
	if (section === '.secondSection') {
		delay = {
			fromDuration: 0,
			to1Duration: .5,
			to1Delay: .15,
			to2Duration: 1,
			to2Delay: 0,
		}
	} else if (section === '.thirdSection') {
		delay = {
			fromDuration: 30,
			to1Duration: 6,
			to1Delay: 30,
			to2Duration: 6,
			to2Delay: 6
		}
	} else if (section === '.forthSection') {
		delay = {
			start: "top start",
			fromDuration: 20,
			to1Duration: 6,
			to1Delay: 20,
			to2Duration: 6,
			to2Delay: 6
		}
	}else if (section === '.forthSection') {
		delay = {
			fromDuration: 60,
			start: "top 100%"
		}
	} else if (section === '.sixthSection') {
		
		delay = {
			fromDuration: 2,
			to1Duration: 3,
			to1Delay: 2,
			to2Duration: 3,
			to2Delay: 3,
			end: 'bottom 30%'
		}
	} else if (section === '.ninthSection') {
		delay = {
			fromDuration: 1,
			to1Duration: 2,
			to1Delay: 0,
			to2Duration: 2,
			to2Delay: 1,
			start: 'top 80%',
			end: 'bottom 60%'
		}
	} else if (section === '.tenthSection') {
		delay = {
			fromDuration: 1,
			to1Duration: 2,
			to1Delay: 0,
			to2Duration: 2,
			to2Delay: 1,
			start: 'top 60%',
			end: 'bottom 60%'
		}
	}
	
	fadeInOutAnimation(section, '.circleArrow', markers, delay)
})


//parallax card animation

gsap.fromTo(".cardWrapper", {scale: 0}, {
	scale: 1,
	scrollTrigger: {
		trigger: ".cardBgc",
		start: "top 90%",
		end: "top 60%",
		scrub: true,
		// markers: true
	}
});
gsap.to(".cardBgc", {
	yPercent: -50,
	duration: 0.1,
	scrollTrigger: {
		trigger: ".cardBgc",
		start: "0 100%",
		scrub: true,
		// markers: true
	},
	delay: 2
});


// scroll to change navbar background color
document.addEventListener("DOMContentLoaded", function () {
	window.addEventListener('scroll', function () {
		if (window.scrollY > 50) {
			document.getElementById('navbar_top').classList.add('fixed-top');
			// add padding top to show content behind navbar
			navbar_height = document.querySelector('.navbar').offsetHeight;
			document.body.style.paddingTop = navbar_height + 'px';
		} else {
			document.getElementById('navbar_top').classList.remove('fixed-top');
			// remove padding top from body
			document.body.style.paddingTop = '0';
		}
	});
});
 