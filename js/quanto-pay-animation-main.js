let qpCard, qpCardAnimationTL, mixer, qpAmbassadorsCard, qpCardAnimationMasterTL, cssRenderer, camera,
		worldSectionDurations, devicePixelWiseValues, qpCardAnimationPlay, dotsInitValues, priceInitValues;


const canvas = document.createElement("canvas");
const scene = new THREE.Scene();
const cssScene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
	// canvas: canvas,
	antialias: true,
	alpha: true
})
const clock = new THREE.Clock()


const sizes = {
	height: window.innerHeight,
	width: window.innerWidth
}

ScrollTrigger.matchMedia({
	
	// large
	"(min-width: 960px)": function () {
		devicePixelWiseValues = {
			qpCard: {
				scale: 0.75,
				position: {
					x: -(window.innerWidth / window.innerHeight) * 3.45,
					y: 0,
					z: 0
				},
				section2: {
					scale: .75,
					position: {
						x: -7.25,
						y: -1.5
					},
				},
				section3: {
					position: {
						y: 1.5
					},
				},
				section4Pre: {
					position: [
						{x: 7.5, y: 0, z: -5},
						{x: 9, y: -1.89, z: -10},
						{x: 9, z: -20},
					],
					scale: [
						{x: .6, y: .6, z: .6},
						{x: .3, y: .3, z: .3},
						{x: .185, y: .185, z: .185},
					],
					rotation: [
						{x: .2, y: .25, z: -.75},
						{x: -6.2, y: .25, z: -.75},
						{x: 0, y: 0, z: 0}
					]
				},
				section4: {
					position: {
						y: 1.5
					},
					botLeft: {
						position: [
							{x: 0, y: -2.89, z: 3},
							{x: 2.35, y: 0, z: 3},
							{x: 4.5, y: 3, z: 3},
							{x: 4.5, y: 3, z: -20},
						],
					},
					botRight: {
						position: [
							{x: 4.5, y: -3, z: 3},
							{x: 2.35, y: 0, z: 3},
							{x: 0.35, y: 3, z: 3},
							{x: 0.35, y: 3, z: -20},
						],
					},
					midCenter: {
						position: [
							{x: 6, y: -0.05, z: 3},
							{x: 2.4, y: 0.15, z: 3},
							{x: 0.35, y: 0.3, z: 3},
							{x: -1.5, y: 0.3, z: -20},
						],
					}
				},
				section5: {
					scale: {x: .75, y: .75, z: .75},
					rotation: {x: -1, y: 0.25, z: .9},
					position: {x: -1.25, y: 1.25, z: -2.5}
				}
			},
			world: {
				scale: 2,
				position: {
					x: 2, y: -15, z: -1.5
				},
				section4: {
					position: {x: 3, y: 0}
				}
			},
			dots: {
				scale: 1.9
			},
			qpAmbassadorCards: {
				scale: 1.5,
				position: [
					{
						from: {x: 4, y: 15}, to: {y: -1}
					},
					{
						from: {y: -1}, to: {y: 15}
					},
				]
			}
		};
		dotsInitValues = [
			{position: {x: 2.35, y: 0, z: 3}, rotation: {x: 0, y: 0, z: -0.65}},
			{position: {x: 2.35, y: 0, z: 3}, rotation: {x: 0, y: 0, z: 0.65}},
			{position: {x: 2.4, y: 0, z: 3}, rotation: {x: 0, y: 0, z: -1.65}}
		];
		priceInitValues = [
			{position: {x: 5.6, y: 3.8, z: 0}, innerHTML: "35£"},
			{position: {x: 0, y: 3.8, z: 0}, innerHTML: "50$"},
			{position: {x: -1.9, y: 0.3, z: 0}, innerHTML: "60$"},
		];
		ScrollTrigger.refresh();
	},
	
	
	// small
	"(max-width: 767px)": function () {
		devicePixelWiseValues = {
			qpCard: {
				scale: .6,
				position: {
					x: 0.1,
					y: 0,
					z: 0
				},
				section2: {
					scale: .6,
					position: {
						x: 0,
						y: -3
					},
				},
				section3: {
					position: {
						y: 0
					},
				},
				section4Pre: {
					position: [
						{x: 3, y: 0, z: -5},
						{x: 4, y: -1.89, z: -10},
						{x: 2, z: -20},
					],
					scale: [
						{x: .4, y: .4, z: .4},
						{x: .25, y: .25, z: .25},
						{x: .1, y: .1, z: .1},
					],
					rotation: [
						{x: .2, y: .25, z: -.75},
						{x: -6.2, y: .25, z: -.75},
						{x: 0, y: 0, z: 0}
					]
				},
				section4: {
					position: {
						y: 0
					},
					botLeft: {
						position: [
							{x: -1.5, y: -2.89, z: 3},
							{x: 1, y: 0, z: 3},
							{x: 1.75, y: 1.59, z: 3},
							{x: 1.75, y: 1.59, z: -20},
						],
					},
					botRight: {
						position: [
							{x: 1.5, y: -2.89, z: 3},
							{x: 0, y: 0, z: 3},
							{x: -1.5, y: 1.29, z: 3},
							{x: 1, y: 1.29, z: -20},
						],
					},
					midCenter: {
						position: [
							{x: 2.5, y: -1, z: 3},
							{x: 1, y: -0.75, z: 3},
							{x: -2.35, y: -0.5, z: 3},
							{x: 0, y: 0, z: -20},
						],
					}
				},
				section5: {
					scale: {x: .475, y: .475, z: .475},
					rotation: {x: -1, y: 0.5, z: .8},
					position: {x: -0, y: -4, z: -10.5}
				}
			},
			world: {
				scale: 1.35,
				position: {
					x: 1, y: -15, z: -1.5
				},
				section4: {
					position: {x: 0.5, y: -2},
				}
			},
			dots: {
				scale: 1.25
			},
			qpAmbassadorCards: {
				scale: .85,
				position: [
					{
						from: {x: 0, y: 15}, to: {y: -2.25}
					},
					{
						from: {y: -2.25}, to: {y: 15}
					},
				]
			}
			
		}
		dotsInitValues = [
			{position: {x: 0.35, y: -0.8, z: 3}, rotation: {x: 0, y: 0, z: -0.65}},
			{position: {x: 0.35, y: -0.8, z: 3}, rotation: {x: 0, y: 0, z: 0.65}},
			{position: {x: 0.35, y: -0.8, z: 3}, rotation: {x: 0, y: 0, z: -1.65}}
		];
		priceInitValues = [
			{position: {x: 2.2, y: 1.5, z: 0}, innerHTML: "35£"},
			{position: {x: -1.6, y: 1.5, z: 0}, innerHTML: "50$"},
			{position: {x: -2.8, y: -0.6, z: 0}, innerHTML: "60$"},
		];
		ScrollTrigger.refresh();
		
	}
	
});


//load 3d qp card
const sceneGLTFLoader = (fileLocation, callBack) => {
	const gltfLoader = new THREE.GLTFLoader();
	gltfLoader.load(fileLocation, (glb) => {
				callBack(glb)
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total * 100) + "% loaded");
				const loading = document.querySelector('.qp-loader-container');
				if (loading) {
					loading.remove()
					document.querySelector('.wrapper').classList.add("d-block")
					ScrollTrigger.refresh();
				}
				
			}, function (error) {
				console.log(error)
			})
}

const qpCardLoader = (glb) => {
	
	
	qpCard = glb.scene // set card
	qpCard.scale.setScalar(devicePixelWiseValues.qpCard.scale) // set card scale
	
	//cloning qp card to make sure both cards are same size
	const cardCloned = qpCard.clone()
	
	qpCard.rotation.set(0, 0.02, 0) //set card initial rotation
	qpCard.position.set(
			devicePixelWiseValues.qpCard.position.x,
			devicePixelWiseValues.qpCard.position.y,
			devicePixelWiseValues.qpCard.position.z
	) //set card initial position
	
	// initialize qpCard Animation Master Timeline
	qpCardAnimationMasterTL = gsap.timeline();
	
	//card animation timeline added
	qpCardAnimationTL = gsap.timeline({
		scrollTrigger: {
			trigger: '.hero-section',
			endTrigger: '.section-6',
			start: `${window.innerHeight / 2} center`,
			end: 'top bottom',
			scrub: 1,
			// markers: true,
			id: "main",
			toggleActions: "restart pause reverse restart",
		},
		duration: 10
	});
	
	
	gsap.to(qpCard.rotation, {
		z: 6.275, duration: 1, scrollTrigger: {
			trigger: ".hero-section"
		},
		once: true
	})
	
	
	//card animation from section 1 to section 2
	cardAnimeTillSection2();
	
	//card cloned animation in section 2
	cardClonedAnimateInSection2(scene, cardCloned);
	
	//card animation in section 3
	cardAnimateInSection3();
	
	
	if (window.innerWidth >= 768) {
		// card animation in section 4
		cardAnimateInSection4();
		worldTimeline(scene)
		
		//card animation in section 5
		cardAnimateInSection5();
	}
	
	
	scene.add(qpCard)
	
}

sceneGLTFLoader("../assets/3d/models/FIN FIN QP Card (2).glb", qpCardLoader)


//load ambassador
const qpCardAmbassadorLoader = (glb) => {
	qpAmbassadorsCard = glb.scene // set card
	qpAmbassadorsCard.scale.setScalar(devicePixelWiseValues.qpAmbassadorCards.scale) // set card scale
	qpAmbassadorsCard.position.set(3, 15, 0) //set card initial position
	qpAmbassadorsCard.visible = false;
	
	
	mixer = new THREE.AnimationMixer(qpAmbassadorsCard);
	
	glb.animations.map((v) => {
		const action = mixer.clipAction(v)
		action.timeScale = 0.6
		action.play()
	})
	
	ambassadorAnimation();
	scene.add(qpAmbassadorsCard)
}

sceneGLTFLoader("../Assets/Model/fin finAmbassadors Card(14--1-22) (2).glb", qpCardAmbassadorLoader)


const cardAnimeTillSection2 = () => {
	qpCardAnimationTL
			// .to(qpCard.position, {x: -(window.innerWidth / window.innerHeight) * 3.5, y: 0, z: 0})
			// .to(qpCard.rotation, {x: 0, y: 0, z: 0})
			.to(".hero-section .circle-pointer", {opacity: 0, scale: 0}, 0)
			
			.to(qpCard.rotation, {x: -4.25, y: 0, z: 1.9, duration: 1.6}, 0)
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section2.position,
				duration: 1.6
			}, 0)
			.to(qpCard.scale, {
				...devicePixelWiseValues.qpCard.section2.scale,
				duration: 1.6
			}, 0)
			
			.from(".section-2 .circle-pointer", {opacity: 0, scale: 0})
			.to(".section-2 .circle-pointer", {opacity: 1, scale: 1}, 1.5)
			.to(".section-2 .circle-pointer", {opacity: 0, scale: 0}, 2)
	
	
}

const cardClonedAnimateInSection2 = (scene, cardCloned) => {
	
	
	const scrollTrigger = {
		trigger: ".section-2",
		scrub: 1,
		endTrigger: ".section-3",
		start: `top 80%`,
		end: '10% top',
		// markers: true
	}
	
	const qpCardAnimationTL = gsap.timeline({scrollTrigger});
	cardCloned.position.set({x: -20})
	qpCardAnimationTL
			.set(cardCloned.position, {x: -20, y: 1})
			.to(cardCloned.position, {
				x: devicePixelWiseValues.qpCard.position.x,
				y: devicePixelWiseValues.qpCard.section3.position.y,
				duration: 0.75
			}, 1)
			.to(cardCloned.rotation, {z: 1.6, y: -0.2, duration: 0.75}, 1)
			.to(cardCloned.rotation, {z: 0, y: 0, duration: 1}, 2)
			.to(cardCloned.position, {x: -30, duration: 1}, 2)
	
	scene.add(cardCloned)
}

const cardAnimateInSection3 = () => {
	
	
	qpCardAnimationTL
			.to(qpCard.position, {x: 0, y: -2, z: 0, duration: 1.5}, 2)
			.to(qpCard.rotation, {x: 0, y: 0, z: 0, duration: 1.5}, 2)
			.to(qpCard.rotation, {x: 6, y: 0, z: 0, duration: 1}, 3)
			
			.from(".section-3 .circle-pointer", {opacity: 0, scale: 0})
			.to(".section-3 .circle-pointer", {opacity: 1, scale: 1}, 4.5)
			.to(".section-3 .circle-pointer", {opacity: 0, scale: 0}, 5.2)
	
	if (window.innerWidth < 768) {
		qpCardAnimationTL
				.to(qpCard.scale, {x: 0.35, y: 0.35, z: 0.35, duration: 1.5}, 2)
		
		qpCardAnimationTL
				.to(qpCard.position, {y: 15, duration: 2}, 5.9)
		
		
	}
	
}

const cardAnimateInSection4 = () => {
	
	const worldSectionDurationInit = 7.8;
	worldSectionDurations = {
		segment1: [worldSectionDurationInit, worldSectionDurationInit + 0.05, worldSectionDurationInit + 0.1],
		segment2: [worldSectionDurationInit + 0.25, worldSectionDurationInit + 0.3, worldSectionDurationInit + 0.35],
		segment3: [worldSectionDurationInit + 0.50, worldSectionDurationInit + 0.55, worldSectionDurationInit + 0.6]
	}
	
	qpCardAnimationTL
			
			.to(qpCard.position, {...devicePixelWiseValues.qpCard.section4Pre.position[0], duration: .5}, 5.4)
			.to(qpCard.rotation, {...devicePixelWiseValues.qpCard.section4Pre.rotation[0], duration: .5}, 5.4)
			.to(qpCard.scale, {...devicePixelWiseValues.qpCard.section4Pre.scale[0], duration: .5}, 5.4)
			
			
			.to(qpCard.position, {...devicePixelWiseValues.qpCard.section4Pre.position[1]}, 6.2)
			.to(qpCard.rotation, {...devicePixelWiseValues.qpCard.section4Pre.rotation[1], duration: .5}, 6.2)
			
			
			.to(qpCard.position, {...devicePixelWiseValues.qpCard.section4Pre.position[2], duration: .5}, 6.4)
			.to(qpCard.scale, {...devicePixelWiseValues.qpCard.section4Pre.scale[1], duration: .5}, 6.4)
			
			
			.to(qpCard.rotation, {...devicePixelWiseValues.qpCard.section4Pre.rotation[2], duration: .5}, 6.7)
			.to(qpCard.scale, {...devicePixelWiseValues.qpCard.section4Pre.scale[2], duration: .5}, 6.7)
			
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section4Pre.position[3],
				duration: .1
			}, worldSectionDurations.segment1[0] - 0.1)
			
			//from bottom left to top right
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section4.botLeft.position[0],
				duration: .05
			}, worldSectionDurations.segment1[0])
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section4.botLeft.position[1],
				duration: .05
			}, worldSectionDurations.segment1[1])
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section4.botLeft.position[2],
				duration: .05
			}, worldSectionDurations.segment1[2])
			// hide behind globe
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section4.botLeft.position[3],
				duration: .1
			}, worldSectionDurations.segment1[2] + 0.1)
			
			
			//from bottom right to top left
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section4.botRight.position[0],
				duration: .05
			}, worldSectionDurations.segment2[0])
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section4.botRight.position[1],
				duration: .05
			}, worldSectionDurations.segment2[1])
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section4.botRight.position[2],
				duration: .05
			}, worldSectionDurations.segment2[2])
			// hide behind globe
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section4.botRight.position[3],
				duration: .1
			}, worldSectionDurations.segment2[2] + 0.1)
			
			
			//right to  left
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section4.midCenter.position[0],
				duration: .05
			}, worldSectionDurations.segment3[0])
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section4.midCenter.position[1],
				duration: .05
			}, worldSectionDurations.segment3[1])
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section4.midCenter.position[2],
				duration: .05
			}, worldSectionDurations.segment3[2])
			// hide behind globe
			.to(qpCard.position, {
				...devicePixelWiseValues.qpCard.section4.midCenter.position[3],
				duration: .1
			}, worldSectionDurations.segment3[2] + 0.1)
			.to(qpCard.position, {x: 0, duration: .01}, worldSectionDurations.segment3[2] + 0.2)
			
			.from(".section-4 .circle-pointer", {opacity: 0, scale: 0})
			.to(".section-4 .circle-pointer", {opacity: 1, scale: 1}, worldSectionDurations.segment3[2] + .05)
			.to(".section-4 .circle-pointer", {opacity: 0, scale: 0}, worldSectionDurations.segment3[2] + .55)
	
	
}

const cardAnimateInSection5 = () => {
	
	qpCardAnimationTL
			.to(qpCard.position, {x: 1, y: 2, z: -5, duration: 1.5}, 9)
			.to(qpCard.scale, {...devicePixelWiseValues.qpCard.section5.scale, duration: 1.5}, 9)
			.to(qpCard.rotation, {...devicePixelWiseValues.qpCard.section5.rotation, duration: 1.5}, 9.2)
			.to(qpCard.position, {...devicePixelWiseValues.qpCard.section5.position, duration: 1.5}, 9.2)
	
	const scrollTrigger = {
		trigger: ".section-5",
		scrub: 0.1,
		endTrigger: ".section-6",
		start: `bottom 103%`,
		end: '90% bottom',
		// markers: true,
	}
	const tl = gsap.timeline({scrollTrigger});
	
	tl.to(qpCard.rotation, {x: -.5, y: 0.1, duration: 4}, 0)
			.to(qpCard.position, {x: devicePixelWiseValues.qpCard.section5.position.x, y: 12, duration: 4}, 0)
			.to(qpCard.position, {x: devicePixelWiseValues.qpCard.section5.position.x, y: 16, duration: 1}, 2.5)
	
	//add timelines
	qpCardAnimationMasterTL.add(qpCardAnimationTL).add(tl)
}

const ambassadorAnimation = () => {
	gsap.fromTo(qpAmbassadorsCard.position, {...devicePixelWiseValues.qpAmbassadorCards.position[0].from}, {
		...devicePixelWiseValues.qpAmbassadorCards.position[0].to,
		scrollTrigger: {
			trigger: '.section-6',
			endTrigger: '.section-6',
			start: "top 20%",
			end: "center center",
			scrub: 1
		},
		onStart: () => {
			qpAmbassadorsCard.visible = true;
		}
	});
	
	
	gsap.fromTo(qpAmbassadorsCard.position, {...devicePixelWiseValues.qpAmbassadorCards.position[1].from}, {
		...devicePixelWiseValues.qpAmbassadorCards.position[1].to,
		scrollTrigger: {
			trigger: '.section-7',
			endTrigger: '.section-7',
			top: "top 80%",
			end: "center center",
			scrub: 1
		}
	})
	
	
}

const worldTimeline = (scene) => {
	//World mesh
	const geometry = new THREE.SphereGeometry(2, 30, 30)
	const material = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load("../assets/3d/World_.png"),
		transparent: true
	})
	
	const world = new THREE.Mesh(geometry, material)
	world.scale.setScalar(devicePixelWiseValues.world.scale)
	world.position.set(
			devicePixelWiseValues.world.position.x,
			devicePixelWiseValues.world.position.y,
			devicePixelWiseValues.world.position.z
	)
	// world.visible = false
	
	scene.add(world)
	
	
	//World dots meshes
	const dotsGeometry = new THREE.PlaneGeometry(3.35, 3.35)
	const dotsMaterial = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load("../assets/3d/WL.png"),
		transparent: true,
		opacity: 0
	})
	
	
	const dots = [];
	
	dotsInitValues.forEach(({position, rotation}, key) => {
		dots[key] = new THREE.Mesh(dotsGeometry, key > 0 ? dotsMaterial.clone() : dotsMaterial)
		dots[key].scale.setScalar(devicePixelWiseValues.dots.scale);
		dots[key].position.set(position.x, position.y, position.z);
		dots[key].rotation.set(rotation.x, rotation.y, rotation.z);
		dots[key].material.opacity = 0;
	});
	
	scene.add(dots[0]);
	scene.add(dots[1]);
	scene.add(dots[2]);
	
	
	//World price meshes
	
	const prices = [];
	
	priceInitValues.forEach(({position, innerHTML}, key) => {
		prices[key] = document.createElement("div")
		prices[key].innerHTML = innerHTML
		prices[key].className = "price-circle"
		prices[key].obj = new THREE.CSS3DObject(prices[key]);
		prices[key].obj.position.set(position.x, position.y, position.z)
		prices[key].obj.scale.set(0, 0, 0)
		cssScene.add(prices[key].obj);
	});
	
	
	const worldSegmentIdentifiers = [
		{worldSegment: "segment1"},
		{worldSegment: "segment2"},
		{worldSegment: "segment3"}
	];
	
	//world scroll up to view
	qpCardAnimationTL
			.to(world.position, {
				...devicePixelWiseValues.world.section4.position,
				duration: .35
			}, worldSectionDurations.segment1[0] - 0.5)
			.to(world.rotation, {y: Math.PI * 2, duration: 1}, worldSectionDurations.segment1[0] - 0.1);
	
	//dots opacity change
	worldSegmentIdentifiers.forEach(({worldSegment}, key) => {
		qpCardAnimationTL
				.to(dots[key].material, {opacity: 0.33, duration: .05}, worldSectionDurations[worldSegment][0])
				.to(dots[key].material, {opacity: 0.66, duration: .05}, worldSectionDurations[worldSegment][1])
				.to(dots[key].material, {opacity: 1, duration: .05}, worldSectionDurations[worldSegment][2])
	})
	
	//prices change
	worldSegmentIdentifiers.forEach(({worldSegment}, key) => {
		qpCardAnimationTL
				.to(prices[key].obj.scale, {x: 0.01, y: 0.01, z: 0.01, duration: .05}, worldSectionDurations[worldSegment][0])
				.to(prices[key].obj.scale, {
					x: 0.0125,
					y: 0.0125,
					z: 0.0125,
					duration: .05
				}, worldSectionDurations[worldSegment][1])
				.to(prices[key].obj.scale, {
					x: 0.015,
					y: 0.015,
					z: 0.015,
					duration: .05
				}, worldSectionDurations[worldSegment][2])
	})
	
	
	const worldUp = worldSectionDurations.segment3[2] + 0.7;
	
	qpCardAnimationTL
			.to(world.position, {y: 15, duration: .85}, worldUp - 0.01)
			.to(dots[0].position, {y: 15, duration: .95}, worldUp)
			.to(dots[1].position, {y: 15, duration: .95}, worldUp)
			.to(dots[2].position, {y: 15, duration: .95}, worldUp)
			.to(prices[0].obj.position, {y: 15, duration: .5}, worldUp)
			.to(prices[1].obj.position, {y: 15, duration: .55}, worldUp)
			.to(prices[2].obj.position, {y: 15, duration: .6}, worldUp)
	
}


function render() {
	requestAnimationFrame(render)
	renderer.render(scene, camera)
	cssRenderer.render(cssScene, camera);
	
	const delta = clock.getDelta();
	if (mixer) {
		mixer.update(delta)
	}
}

const initializeRenderer = () => {
	
	
	renderer.setSize(sizes.width - 16, sizes.height + 2)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	
	//set light
	const light = new THREE.AmbientLight(0xffffff, 2.0);
	scene.add(light);
	
	//set camera
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.set(0, 0, 16.5);
	camera.lookAt(new THREE.Vector3(0, 0, 0))
	
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	// scene renderer
	renderer.domElement.className = "three-renderer"
	document.body.appendChild(renderer.domElement)
	
	//css scene renderer
	cssRenderer = new THREE.CSS3DRenderer()
	cssRenderer.setSize(window.innerWidth, window.innerHeight);
	cssRenderer.domElement.className = "three-renderer"
	document.body.appendChild(cssRenderer.domElement)
}


//Resize Scene
function resize() {
	renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
	cssRenderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
	camera.fov = window.innerHeight / window.screen.height;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

//Event Listeners
window.addEventListener("resize", resize, {delay: 0.02, throttle: true})


initializeRenderer()
render()



