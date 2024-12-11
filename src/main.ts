import "./style.css";
//import { setupCounter } from "./counter.ts";
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
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

const geometry = new THREE.SphereGeometry(1, 10, 10);
const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 500 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;


const controls = new OrbitControls( camera, renderer.domElement);
controls.minDistance = 50;
controls.maxDistance = 500;
controls.keys = {
  LEFT:'a',
  RIGHT:'d',
  BOTTOM:'s',
  UP:'w',
}


let goingUp = true;
function animate() {
  controls.target = cube.position
  if (goingUp) {
    cube.position.y += 0.01;
  } else {
    cube.position.y -= 0.01;
  }
  if (cube.position.y > 3.0)
    goingUp = false
  else if (cube.position.y < 0.0)
    goingUp = true
  cube.rotation.x += 0.01;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
