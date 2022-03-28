var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (history.scrollRestoration) {
	history.scrollRestoration = 'manual';
} else {
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}
}

var disableDone = false

var camera, renderer, scene;
var card, cardAnim, card2;
var sphere;
var mixer;
var dots, dots2, dots3;
var scene2, renderer2, price1Object, price2Object, price3Object;
var cardLookAt = false
var machine;

//Mouse Movement
const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
var mouseMovement = true
var overallMovement = true

//Mobile mouse movement ids
var mobileImage = document.getElementById("imagebox3")
var mobileImage2 = document.getElementById("imagebox5")

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
	sphere.position.set(isMobile ? -0.2 : 2, -10, 0)
	scene.add(sphere)
	
	
	var worldGroup = new THREE.Group()
	
	//Machine mesh
	// var geometry = new THREE.PlaneGeometry(4,4)
	// var material = new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load("Assets/POS Payment Terminal.G15.2k.png"), transparent: true })
	// machine = new THREE.Mesh(geometry, material)
	// machine.position.set(isMobile ? -0.5:0, -6, -2)
	// if(isMobile){
	//     machine.scale.setScalar(0.7)
	// }
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
	price1Object.position.set(4, -6, 0)
	price1Object.scale.set(0.01, 0.01, 0.01)
	scene2.add(price1Object);
	
	var price2 = document.createElement("div")
	price2.innerHTML = "50$"
	price2.className = "price1"
	price2Object = new THREE.CSS3DObject(price2);
	price2Object.position.set(1.6, -6, 0)
	price2Object.scale.set(0.01, 0.01, 0.01)
	scene2.add(price2Object);
	
	var price3 = document.createElement("div")
	price3.innerHTML = "60$"
	price3.className = "price1"
	price3Object = new THREE.CSS3DObject(price3);
	price3Object.position.set(-0.8, -6, 0)
	price3Object.scale.set(0.01, 0.01, 0.01)
	scene2.add(price3Object);
	
	//Load and add Card Ambassadors Animation
	loader.load("Assets/Model/Ambassadors Cards (14-12-21).glb", (gltf) => {
		var cards = gltf.scene
		cards.position.set(isMobile ? 0 : 2, -7, 0)
		cards.rotation.set(0, 1, 0)
		cardAnim.to(cards.position, {y: isMobile ? 1 : 0, duration: isMobile ? 0.8 : 0.5}, isMobile ? 6.96 : 7.5)
		cardAnim.to(cards.position, {y: 7, duration: isMobile ? 0.5 : 0.27}, isMobile ? 8.3 : 8.5)
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
	loader.load("Assets/Model/fin fin fin qp card.glb", (gltf) => {
		card = gltf.scene
		card2 = gltf.scene.clone()
		card.scale.setScalar(isMobile ? 0.2 : 0.4)
		card.rotation.set(-1.41, 0, 1.05)
		if (isMobile) {
			card.position.set(-0.15, 0.2, 0)
		} else {
			card.position.set(-(window.innerWidth / window.innerHeight) * 2.8, 0, 0)
		}
		
		
		//Initial Animation
		gsap.to(card.rotation, {duration: 2, x: 0, y: 0, z: 0})
		
		cardAnim.to(".mactext1", {
			duration: 0.1, onComplete: () => {
				document.getElementById("circleArrow").style.opacity = "1"
			}
		}, 0)
		
		// Card 1 Scroll Trigger animations
		cardAnim.to(card.scale, {
			x: isMobile ? 0.2 : 0.4, y: isMobile ? 0.2 : 0.4, z: isMobile ? 0.2 : 0.4, duration: 0.7, onStart: () => {
				overallMovement = true
				mouseMovement = false
			}, onComplete: () => {
				overallMovement = false
			}
		}, 0)
		
		
		cardAnim.to(card.rotation, {x: -4.27, y: 0, z: 2.14, duration: 0.7}, 0)
		cardAnim.to(card.position, {x: isMobile ? -0.15 : -4, y: -1, z: 0, duration: 0.7}, 0)
		cardAnim.to(card.rotation, {x: -4.27, y: 0, z: 2.14, duration: 0.7}, 0)
		cardAnim.to(card.position, {x: isMobile ? -0.15 : 0, y: -1, z: 0, duration: 1.2}, 1.4)
		cardAnim.to(card.rotation, {x: 0, y: 0, z: 0, duration: 1.2}, 1.4)
		cardAnim.to(card.scale, {
			x: isMobile ? 0.2 : 0.4, y: isMobile ? 0.2 : 0.4, z: isMobile ? 0.2 : 0.4, duration: 1.2
		}, 1.4)
		cardAnim.to(card.position, {
			x: isMobile ? 0.2 : 3, y: 1, z: -2, duration: 1
		}, 2.9)
		cardAnim.to(card.rotation, {x: 2.63, y: -2.9, z: -2.22, duration: 1}, 2.9)
		cardAnim.to(card.scale, {
			x: isMobile ? 0.05 : 0.1, y: isMobile ? 0.05 : 0.1, z: isMobile ? 0.05 : 0.1, duration: 0.3, onComplete: () => {
				cardLookAt = true
			}
		}, 2.9)
		
		cardAnim.to(card.position, {x: isMobile ? -0.4 : 1.5, z: -2, y: isMobile ? 0.15 : -1.89, duration: 0.15}, 4.3)
		
		cardAnim.to(card.position, {z: 2.2, duration: 0.05}, 4.45)
		
		cardAnim.to(card.position, {x: isMobile ? 0.1 : 2.7, y: isMobile ? 1.9 : 1.6, duration: 0.15}, 4.5)
		cardAnim.to(dots.material, {opacity: 1, duration: 0.15}, 4.5)
		cardAnim.to(price1Object.element.style, {
			opacity: isMobile ? 0 : 1,
			fontSize: "15px",
			padding: "15px",
			duration: 0.15
		}, 4.5)
		
		cardAnim.to(card.position, {z: -2, duration: 0.05}, 4.65)
		
		cardAnim.to(card.position, {x: isMobile ? 0 : 2.7, y: isMobile ? 0.1 : -1.8, duration: 0.15}, 4.7)
		
		cardAnim.to(card.position, {z: 2.2, duration: 0.05}, 4.85)
		
		cardAnim.to(card.position, {x: isMobile ? -0.4 : 1, y: isMobile ? 1.9 : 1.8, duration: 0.15}, 4.9)
		cardAnim.to(price2Object.element.style, {
			opacity: isMobile ? 0 : 1,
			fontSize: "15px",
			padding: "15px",
			duration: 0.15
		}, 4.9)
		cardAnim.to(dots2.material, {opacity: 1, duration: 0.15}, 4.9)
		
		cardAnim.to(card.position, {z: -2, x: isMobile ? 0 : 1.3, duration: 0.05}, 5.05)
		
		cardAnim.to(card.position, {x: isMobile ? 0.9 : 3.8, y: isMobile ? 1 : -0.5, duration: 0.15}, 5.1)
		
		cardAnim.to(card.position, {x: isMobile ? 0.8 : 3.4, z: 2.2, duration: 0.05}, 5.25)
		
		cardAnim.to(card.position, {x: isMobile ? -1 : 0, y: 1, duration: 0.15}, 5.3)
		cardAnim.to(price3Object.element.style, {
			opacity: isMobile ? 0 : 1,
			fontSize: "15px",
			padding: "15px",
			duration: 0.15
		}, 5.3)
		cardAnim.to(dots3.material, {opacity: 1, duration: 0.15}, 5.3)
		
		cardAnim.to(card.position, {
			z: -2, duration: 0.05, onComplete: () => {
				cardLookAt = false
			}
		}, 5.45)
		
		cardAnim.to(card.position, {
			x: 2, duration: 0.1, onComplete: () => {
				cardLookAt = false
			}
		}, 5.5)
		
		cardAnim.to(card.position, {
			x: isMobile ? -0.1 : -0.1,
			y: isMobile ? 0.6 : 0.8,
			z: 0,
			duration: isMobile ? 0.6 : 1.1
		}, 5.6)
		cardAnim.to(card.rotation, {x: -4.13, y: -3.18, z: -2.36, duration: isMobile ? 0.6 : 1.1}, 5.6)
		cardAnim.to(card.scale, {
			x: isMobile ? 0.2 : 0.3,
			z: isMobile ? 0.2 : 0.3,
			y: isMobile ? 0.2 : 0.3,
			duration: isMobile ? 0.6 : 1.1
		}, 5.6)
		
		
		// cardAnim.to(machine.position, {y: 0.5, duration: 0.7 }, isMobile?5.2:5.6)
		
		cardAnim.to(card.position, {y: 5.6, duration: 0.7}, isMobile ? 6.7 : isMobile ? 7 : 6.9)
		// cardAnim.to(machine.position, { y: 6.35, duration: 0.7 }, isMobile ? 6.7 :isMobile ? 7 :6.9)
		
		cardAnim.to(sphere.position, {y: isMobile ? 1 : 0, duration: 0.7}, 2.8)
		cardAnim.to(sphere.rotation, {y: Math.PI * 2, duration: 0.7}, 2.8)
		cardAnim.to(dots.position, {y: isMobile ? 0.8 : -0.1, duration: 0.7}, 2.8)
		cardAnim.to(dots2.position, {y: isMobile ? 0.8 : -0.05, duration: 0.7}, 2.8)
		cardAnim.to(dots3.position, {y: isMobile ? 0.9 : -0.1, duration: 0.7}, 2.8)
		cardAnim.to(price1Object.position, {y: isMobile ? 3.3 : 2.3, duration: 0.7}, 2.8)
		cardAnim.to(price2Object.position, {y: isMobile ? 3.7 : 2.8, duration: 0.7}, 2.8)
		cardAnim.to(price3Object.position, {y: isMobile ? 1 : 0, duration: 0.7}, 2.8)
		
		cardAnim.to(sphere.position, {y: 7, duration: 1}, isMobile ? 5.45 : 5.6)
		cardAnim.to(dots.position, {y: 5.5, duration: 1}, isMobile ? 5.45 : 5.6)
		cardAnim.to(dots2.position, {y: 5.5, duration: 1}, isMobile ? 5.45 : 5.6)
		cardAnim.to(dots3.position, {y: 5.5, duration: 1}, isMobile ? 5.45 : 5.6)
		cardAnim.to(price1Object.position, {y: 7, duration: 0.7}, isMobile ? 5.45 : 5.6)
		cardAnim.to(price2Object.position, {y: 7, duration: 0.7}, isMobile ? 5.45 : 5.6)
		cardAnim.to(price3Object.position, {y: 7, duration: 0.7}, isMobile ? 5.45 : 5.6)
		scene.add(card)
		
		
		//Card 2 Scroll Trigger Animations
		card2.scale.setScalar(isMobile ? 0.2 : 0.4)
		card2.rotation.set(-1.41, 0, 1.05)
		card2.position.set(-13, -1, 0)
		cardAnim2.to(card2.rotation, {x: 0.36, y: -0.32, z: -1.81, duration: 0.6}, 1.5)
		cardAnim2.to(card2.position, {x: isMobile ? -0.15 : -4, y: isMobile ? 0 : 1, z: 0, duration: 0.6}, 1.5)
		cardAnim2.to(card2.position, {x: -13, y: -1, z: 0, duration: 2.7}, 4.3)
		cardAnim2.to(card2.rotation, {x: -1.41, y: 0, z: 1.05, duration: 2.7}, 4.3)
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
	
	if (cardAnim.time() > 1.3) {
		if (!disableDone) {
			disableDone = true
			cardAnim.scrollTrigger.disable(false)
		}
	}
	
	
	if (cardAnim.time() > 3.6 && cardAnim.time() < 5.6) {
		card.lookAt(new THREE.Vector3(2, 0, 0))
	}
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
		endTrigger: ".tenthSection",
		start: "top start",
		end: "top 40%",
		scrub: true,
		disable: false,
		id: "cardAnim"
	},
	duration: 10
})


var cardAnim2 = gsap.timeline({
	scrollTrigger: {
		trigger: ".herosection",
		endTrigger: ".sixthSection",
		start: "top start",
		end: "top 40%",
		scrub: true,
		disable: false,
		id: "cardAnim2"
		
	},
	duration: 10
})

var cardsAnimation = gsap.timeline({
	scrollTrigger: {
		trigger: ".seventhSection",
		endTrigger: ".eighthSection",
		start: "top start",
		end: "bottom start",
		scrub: true,
	},
	duration: 2
})


// Text animation
var section1anim = gsap.timeline();
// Main heading animation
section1anim.from(".maintext", {
	y: 200,
	opacity: 0,
	duration: 3,
}, "<0.5");

// Card discription
section1anim.from(".description", {
	y: 60,
	duration: 1,
	opacity: 0,
	stagger: 0.5,
}, "<0.5");


var sect2Anim = gsap.timeline({
	scrollTrigger: {
		target: ".secondSection",
		start: "top start",
		endTrigger: ".thirdSection",
		end: "top start",
		pin: ".secondSection",
	},
});

sect2Anim.to("abv", {
	onComplete: () => {
		cardAnim.scrollTrigger.enable()
	}
})


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


sectThree.fromTo(".icon3",
		{x: -70, y: 0, opacity: 0},
		{x: -150, y: -30, opacity: 0, duration: 1, scale: 1.8},
);
sectThree.fromTo(
		".icon2",
		{x: -50, y: 70, opacity: 0},
		{x: -140, y: 150, opacity: 1, scale: 2, duration: 1},
		"-=.7"
);
sectThree.fromTo(
		".icon1",
		{x: -30, y: 70, opacity: 0},
		{x: -100, y: -50, opacity: 1, scale: 2, duration: 1},
		"-=.8"
);

sectThree.fromTo(".icon6",
		{x: 0, y: -450, opacity: 0,},
		{x: 115, y: -350, opacity: 1, duration: 1, scale: 2},
		"-=1.5");

sectThree.fromTo(
		".icon5",
		{x: 0, y: -450, opacity: 0},
		{x: 100, y: -450, opacity: 0, scale: 2, duration: 1},
		"-=.9"
);
sectThree.fromTo(
		".icon4",
		{x: 0, y: -450, opacity: 0},
		{x: 80, y: -525, opacity: 1, scale: 1.8, duration: 1},
		"-=1"
);

// Section four animation

var sectFour = gsap.timeline({
	scrollTrigger: {
		target: ".thirdSection",
		start: " top end",
		endTrigger: ".sixthSection",
		end: "bottom start",
		pin: ".forthSection",
		scrub: 1,
		// markers:true
	},
	duration: 10,
});

// sectFour.to("abc",{
//     duration:5
// })

var sectFive = gsap.timeline({
	scrollTrigger: {
		target: ".fifthSection",
		start: "top 30%",
		endTrigger: ".sixthSection",
		end: "top start",
		pin: ".fifthSection",
		scrub: 1,
		// markers:true
	},
});

sectFive
		.to(".text-start",
				{
					y: -100,
					stagger: .5
				},
				"<.5");
sectFive
		.to(".revolving-prices",
				{
					top: "-65%",
					stagger: .5
				});

sectFive.from(
		".mactext",
		{
			y: 280,
			opacity: 0,
			stagger: .5
		},
		"<.5"
);

// Sixth Section Animation
var sectSixth = gsap.timeline({
	scrollTrigger: {
		target: ".sixthSection",
		start: "top end",
		endTrigger: ".seventhSection",
		end: "top start",
		pin: ".sixthSection",
		scrub: true,
	},
});


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


// Section seven anmation

// var sectSeven = gsap.timeline({
//     scrollTrigger: {
//         target: ".seventhSection",
//         start: " top end",
//         endTrigger: ".ninthSection",
//         end: "top start",
//         pin: ".seventhSection",
//         scrub: 2,
//     },
// });
// sectSeven.from(".imagebox3 ", {
//     y: 400,
//     opacity: 0,
//     duration: 1.5,
// });
// sectSeven.from(
//     ".seventext",
//     {
//         y: 380,
//         opacity: 0,
//         duration: 1.5,
//         stagger: .5
//     },
//     "<.5"
// );
// sectSeven.add(pillAnime());


// function pillAnime() {
//     var pill = gsap.timeline();
//     pill.set(".box1", { transformOrigin: "100% 50%" });
//     pill.from(".mask1", 2.2, {
//         width: "0px",
//         ease: Power1.easeNone,
//         duration: 1,
//     });
//     pill.from(".wrapImg", {
//         scale: 0,
//         stagger: 0.5,
//     } ,"<");
//     pill.from(".wrap", {
//         opacity: 0,
//         x: -60,
//         duration: 1,
//         delay: 1.5,
//         stagger: 0.2,

//     } );

//     return pill;
// };


// Section eight animation

// var sectEight = gsap.timeline({
//     scrollTrigger: {
//         target: ".eighthSection",
//         start: " top end",
//         pin: ".eighthSection",
//         scrub: 2,
//     },
// });

// sectEight.from(".imagebox5", {
//     y: 400,
//     rotationY: 360,
//     scale: 3,
//     opacity: 0,
//     duration: 2
// });

// sectEight.from(".el", {
//     opacity: 0,
//     y: 300,
//     duration: 2,
//     stagger: 0.2
// });
