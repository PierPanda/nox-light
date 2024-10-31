import * as THREE from 'three';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

gsap.registerPlugin(ScrollTrigger);

let scene, camera, renderer, model;

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const container = document.querySelector('.content');
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 100);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight.position.set(5, 7, 3);
  scene.add(directionalLight);

  camera.position.z = 6;

  const loader = new GLTFLoader();


  loader.load(
    './public/assets/V6.glb', (gltf) => {
      model = gltf.scene;
      model.scale.setScalar(1);
      scene.add(model);

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      setupScrollAnimation();
    },
    (progress) => {
      console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
      console.error('Error loading model:', error);
    }
  );

  window.addEventListener('resize', onWindowResize, false);
}
// //OPTION 1
// function setupScrollAnimation() {

//   model.position.set(3, -1.8, 0);
//   model.rotation.set(0, -1, 0);

//   const rotationTimeline = gsap.timeline({
//     scrollTrigger: {
//       trigger: "#container",
//       start: "top top",
//       end: "bottom bottom",
//       scrub: 2,
//     }
//   });

//   rotationTimeline.to(model.rotation, {
//     y: Math.PI * 2,
//     x: Math.PI * 2,
//     ease: "slow(0.7,0.7,false)"
//   });

//   const scaleTimeline = gsap.timeline({
//     scrollTrigger: {
//       trigger: "#container",
//       start: "top top",
//       end: "bottom bottom",
//       scrub: 2,
//     }
//   });

//   scaleTimeline.to(model.scale, {
//     x: 1.5,
//     y: 1.5,
//     z: 1.5,
//     ease: "back.inOut(1.7)"
//   });


//   const positionTimeline = gsap.timeline({
//     scrollTrigger: {
//       trigger: "#container",
//       start: "top top",
//       end: "bottom bottom",
//       scrub: 1,
//     }
//   });

//   model.position.x = 3;

//   positionTimeline
//     .to(model.position, {
//       x: -3,
//       y: 1,
//       ease: "slow(0.7,0.7,false)",
//       duration: 1,
//     })
//     .to(model.position, {
//       x: 0,
//       y: 1,
//       ease: "slow(0.7,0.7,false)",
//       duration: 1,
//     });
// }

// OPTION 2
function setupScrollAnimation() {

  model.position.set(3.5, -3, 0);
  model.rotation.set(0, 0.5, 0);
  model.scale.set(0.9, 0.9, 0.9);

  const animationTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#container",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    }
  });

  animationTimeline
    .to(model.position, {
      x: -3,
      y: -1.8,
      ease: "power1.inOut",
      duration: 2,
    })
    .to(model.rotation, {
      y: Math.PI * 1.7,
      ease: "power1.inOut",
      duration: 2,
    }, "<")
    .to(model.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      ease: "power1.inOut",
      duration: 2,
    }, "<")
  // .to(model.position, {
  //   x: -3,
  //   y: 0,
  //   ease: "power1.inOut",
  //   duration: 2,
  // })
  // .to(model.rotation, {
  //   y: 0.5,
  //   x: 0.1,
  //   ease: "power1.inOut",
  //   duration: 2,
  // }, "<")
  // .to(model.scale, {
  //   x: 2,
  //   y: 2,
  //   z: 2,
  //   ease: "power1.inOut",
  //   duration: 2,
  // }, "<");
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}


//TEXT ANIMATIONS APPARITIONS

const spacers = document.querySelectorAll('.spacer');

spacers.forEach((spacer, index) => {
  const texts = spacer.querySelectorAll('.fade-text');

  texts.forEach(text => {
    gsap.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: text,
        start: "top 70%",
        end: "top 30%",
        toggleActions: "play reverse play reverse",
        // markers: true,
      }
    });
  });
});


// NAVBAR ANIMATION AU SCROLL
let lastScroll = 0;
const navbar = document.querySelector('nav');
const scrollThreshold = 10;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (Math.abs(currentScroll - lastScroll) > scrollThreshold) {
    if (currentScroll > lastScroll) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }
    lastScroll = currentScroll;
  }
});

//VIDEO LOADER
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const loaderVideo = document.getElementById("loader-video");

  function hideLoader() {
    loader.style.display = "none";

    gsap.to("nav", { opacity: 1, duration: 1, delay: 0.5 });
    gsap.to(".title-product", { opacity: 1, duration: 1, delay: 1 });
    gsap.to("#container", { opacity: 1, duration: 1, delay: 1.5 });
    gsap.to(".product", { opacity: 1, duration: 1, delay: 2 });
    gsap.to("footer", { opacity: 1, duration: 1, delay: 2.5 });
  }

  loaderVideo.onended = hideLoader;

  setTimeout(hideLoader, 3000);
});


//CHOIX DES COULEURS
const color1 = document.querySelector('.color1');
const color2 = document.querySelector('.color2');
const image = document.querySelector('.product__image');

color1.addEventListener('click', () => {
  color1.classList.add('active');
  color2.classList.remove('active');
  image.style.backgroundImage = "url('nox-light/public/assets/nox-silver.png')";
  image.style.backgroundSize = 'contain';
  image.style.backgroundPosition = 'center';
  image.style.backgroundRepeat = 'no-repeat';
});

color2.addEventListener('click', () => {
  color1.classList.remove('active');
  color2.classList.add('active');
  image.style.backgroundImage = "url('nox-light/public/assets/nox-black.png')";
  image.style.backgroundSize = 'contain';
  image.style.backgroundPosition = 'center';
  image.style.backgroundRepeat = 'no-repeat';
});


//ICONE PANIER UPDATE

const cartIcon = document.querySelector('.fa-basket-shopping');
const buyButton = document.querySelector('.cta');

let cartCount = 0;

const createNotificationBadge = () => {
  const badge = document.createElement('span');
  badge.classList.add('cart-badge');
  badge.style.cssText = `
    position: absolute;
    top: -2px;
    right: 2px;
    // background-color: white;
    color: white;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 8px;
    // border-radius: 50%;
    // width: 10px;
    // height: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  return badge;
};

const setupCartContainer = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    position: relative;
    display: inline-block;
  `;

  cartIcon.parentNode.insertBefore(container, cartIcon);
  container.appendChild(cartIcon);

  const badge = createNotificationBadge();
  container.appendChild(badge);
  badge.style.display = 'none';

  return badge;
};

const badge = setupCartContainer();

buyButton.addEventListener('click', () => {
  cartCount++;
  badge.textContent = cartCount;
  badge.style.display = 'flex';

  badge.style.transform = 'scale(1.2)';
  setTimeout(() => {
    badge.style.transform = 'scale(1)';
  }, 200);
});


//AFFICHAGE PANIER
