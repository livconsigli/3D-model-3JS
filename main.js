import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 25, 60); // x, y, z
camera.lookAt(0, 0, 0);           // Look toward the model's center

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xffffff); // White background
document.body.appendChild(renderer.domElement);

// Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);
scene.add(new THREE.AmbientLight(0x404040));

const loader = new GLTFLoader();
let model;

loader.load('/model.glb', (gltf) => {
  model = gltf.scene;
  scene.add(model);
}, undefined, (error) => {
  console.error('Error loading model:', error);
});

function animate() {
  requestAnimationFrame(animate);
  if (model) model.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
