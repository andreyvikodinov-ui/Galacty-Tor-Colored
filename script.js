// Сцена
const scene = new THREE.Scene();

// Камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

// Рендерер
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создание частиц в форме тора
const particleCount = 5000;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

const torusRadius = 5;
const tubeRadius = 2;

for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    
    // Параметрическое уравнение тора
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    
    positions[i3] = (torusRadius + tubeRadius * Math.cos(v)) * Math.cos(u);
    positions[i3 + 1] = (torusRadius + tubeRadius * Math.cos(v)) * Math.sin(u);
    positions[i3 + 2] = tubeRadius * Math.sin(v);
    
    // Цвета
    colors[i3] = Math.random();     // R
    colors[i3 + 1] = Math.random(); // G  
    colors[i3 + 2] = Math.random(); // B
}

// Геометрия частиц
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Материал частиц
const material = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
});

// Объект частиц
const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Анимация
function animate() {
    requestAnimationFrame(animate);
    
    particles.rotation.x += 0.002;
    particles.rotation.y += 0.005;
    
    renderer.render(scene, camera);
}

animate();

// Респонсив
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});