import "./style.css";
//import { setupCounter } from "./counter.ts";
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from "stats.js"
/*
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
*/
var stats = new Stats();
stats.showPanel(0);
document.body.appendChild( stats.dom );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const pointLight = new THREE.PointLight(0xff00e5, 2.5, 0, 0);
pointLight.position.set(100, 500, 0);
scene.add(pointLight);
const pointLight2 = new THREE.PointLight(0xffffff, 2.5, 0, 0);
pointLight2.position.set(-100, -500, 0);
scene.add(pointLight2);

const spheregeometry = new THREE.SphereGeometry(1, 100, 100);
const spherematerial = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 500 });
const sphere = new THREE.Mesh(spheregeometry, spherematerial);
scene.add(sphere);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 500 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-1,-1,0)
scene.add(cube);

const controls = new OrbitControls( camera, renderer.domElement);
controls.minDistance = 5;
controls.maxDistance = 50;

controls.target = sphere.position
camera.position.set(0, 1, 5)
console.log(camera.position, sphere.position)
let goingUp = true;
function animate() {
  stats.begin()
  if (goingUp) {
    sphere.position.y += 0.01;
  } else {
    sphere.position.y -= 0.01;
  }
  if (sphere.position.y > 3.0)
    goingUp = false
  else if (sphere.position.y < 0.0)
    goingUp = true
  sphere.rotation.x += 0.01;
  camera.position.set(camera.position.x, sphere.position.y, camera.position.z)
  renderer.render(scene, camera);
  stats.end();
}

renderer.setAnimationLoop(animate);
window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
