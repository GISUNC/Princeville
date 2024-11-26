import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import GUI from 'lil-gui';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting setup
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft, general light
scene.add(ambientLight);

// Load the PLY file
const loader = new PLYLoader();
loader.load('./model.ply', (geometry) => {
    geometry.computeVertexNormals(); // Compute normals for lighting
    const material = new THREE.MeshStandardMaterial({ color: 0x0055ff });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}, undefined, (error) => {
    console.error('Error loading PLY:', error);
});

// Debug geometry (optional)
const debugBox = new THREE.BoxGeometry(1, 1, 1);
const debugMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const debugMesh = new THREE.Mesh(debugBox, debugMaterial);
scene.add(debugMesh);

// lil-gui for Debugging
const gui = new GUI();

// Camera Controls
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'x', -10, 10).onChange(() => camera.lookAt(0, 0, 0));
cameraFolder.add(camera.position, 'y', -10, 10).onChange(() => camera.lookAt(0, 0, 0));
cameraFolder.add(camera.position, 'z', -10, 10).onChange(() => camera.lookAt(0, 0, 0));
cameraFolder.open();

// Point Light Controls
const pointLightFolder = gui.addFolder('Point Light');
pointLightFolder.add(pointLight.position, 'x', -10, 10);
pointLightFolder.add(pointLight.position, 'y', -10, 10);
pointLightFolder.add(pointLight.position, 'z', -10, 10);
pointLightFolder.add(pointLight, 'intensity', 0, 2);
pointLightFolder.open();

// Ambient Light Controls
const ambientLightFolder = gui.addFolder('Ambient Light');
ambientLightFolder.add(ambientLight, 'intensity', 0, 2);
ambientLightFolder.open();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Adjust rendering on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
