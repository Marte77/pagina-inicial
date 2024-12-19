import "./style.css";
//import { setupCounter } from "./counter.ts";
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from "stats.js"
import { FirstPersonControls, FlyControls } from "three/examples/jsm/Addons.js";
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
const shaderMaterial = new THREE.ShaderMaterial({
	uniforms: {
		time: { 
      value: 1.0
    },
		resolution: {
      value: new THREE.Vector2()
    }
	},
	vertexShader: document.getElementById('vertexShader')!.textContent!,
	fragmentShader: document.getElementById('fragmentShader')!.textContent!
});
const scene = new THREE.Scene();
scene.overrideMaterial = shaderMaterial;
scene.background = new THREE.Color( 0xa0a0a0 );
scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1, 5)

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const pointLight = new THREE.DirectionalLight(0xffffff, 2.5);
pointLight.position.set(22, 11, 0);
pointLight.shadow.mapSize.width = 512; // default
pointLight.shadow.mapSize.height = 512; // default
pointLight.shadow.camera.near = 0; // default
pointLight.shadow.camera.far = 500; // default
pointLight.castShadow = true;
scene.add(pointLight);
//const pointLight2 = new THREE.PointLight(0xff00e5, 2.5, 0, 0);
//pointLight2.position.set(-100, -500, 0);
//scene.add(pointLight2);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry( 100, 100 ),
  new THREE.MeshPhongMaterial( { color: 0xcbcbcb, depthWrite: false })
);
ground.position.y = -0.5
ground.rotation.x = - Math.PI / 2;
ground.receiveShadow = true;
scene.add( ground );

const spheregeometry = new THREE.SphereGeometry(1, 100, 100);
const spherematerial = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 500 });
const sphere = new THREE.Mesh(spheregeometry, spherematerial);
sphere.receiveShadow = true;
sphere.castShadow = true;
scene.add(sphere);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 500 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-1,0,0)
cube.receiveShadow = true;
cube.castShadow = true;
scene.add(cube);

const cube2 = new THREE.Mesh(geometry, shaderMaterial);
cube2.position.set(-5,0,3)
cube2.receiveShadow = true;
cube2.castShadow = true;
scene.add(cube2);

const orbitControls = new OrbitControls( camera, renderer.domElement);
orbitControls.minDistance = 0;
orbitControls.maxDistance = 50;
orbitControls.target = sphere.position
let controls:THREE.Controls<{}> = orbitControls
const flyControls = new FirstPersonControls(camera, renderer.domElement)

let goingUp = true;
let followingSphere = true


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
  if (followingSphere)
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

window.onkeyup = ((ev) => {
  if(ev.key === 'p') {
    followingSphere = !followingSphere
    if (controls instanceof FlyControls)
      controls = orbitControls
    else controls = flyControls
  }
})
