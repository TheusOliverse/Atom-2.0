toggleInfoPanel();
let scene, camera, renderer, controls;
let currentAtomGroup = null;
let animatableObjects = [];
let isAutoRotating = true;
let currentModelIndex = 0;

let l1 = document.getElementById("link1");
let l2 = document.getElementById("link2");
let l3 = document.getElementById("link3");
let l4 = document.getElementById("link4");

l1.style.display = 'none';
l2.style.display = 'none';
l3.style.display = 'none';
l4.style.display = 'none';

function init3D() {
  const container = document.getElementById('webgl-container');
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x010a13, 0.015);
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 25);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 50;
  controls.minDistance = 5;
  const ambientLight = new THREE.AmbientLight(0x0a2540, 1.5);
  scene.add(ambientLight);
  const mainLight = new THREE.DirectionalLight(0xf0e6d2, 2.0);
  mainLight.position.set(10, 20, 15);
  scene.add(mainLight);
  const hextechBlueLight = new THREE.PointLight(0x0ac8b9, 3, 30);
  hextechBlueLight.position.set(-10, -5, -10);
  scene.add(hextechBlueLight);
  createBackgroundParticles();
  window.addEventListener('resize', onWindowResize);
  loadAtomicModel(0);
  animate();
}

function createBackgroundParticles() {
  const geometry = new THREE.BufferGeometry();
  const count = 300;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 80;
    positions[i + 1] = (Math.random() - 0.5) * 80;
    positions[i + 2] = (Math.random() - 0.5) * 80;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0x0ac8b9,
    size: 0.2,
    transparent: true,
    opacity: 0.4
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

function clearCurrentModel() {
  if (currentAtomGroup) {
    scene.remove(currentAtomGroup);
    currentAtomGroup.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material.dispose();
      }
    });
  }
  currentAtomGroup = new THREE.Group();
  scene.add(currentAtomGroup);
  animatableObjects = [];
}

function loadAtomicModel(index) {
  currentModelIndex = index;
  clearCurrentModel();

  const buttons = document.querySelectorAll('.controls-panel .btn-hextech');
  buttons.forEach((btn, idx) => {
    if (idx === index) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  const data = atomicModelsData[index];
  document.getElementById('model-title').innerText = data.name;
  document.getElementById('model-year').innerText = data.year;
  document.getElementById('model-desc').innerText = data.description;

  const detailsList = document.getElementById('model-details');
  detailsList.innerHTML = '<ul>' + data.details.map(d => `<li>${d}</li>`).join('') + '</ul>';

  switch (index) {
    case 0: buildDaltonModel(); break;
    case 1: buildThomsonModel(); break;
    case 2: buildRutherfordModel(); break;
    case 3: buildBohrModel(); break;
    case 4: buildSchrodingerModel(); break;
  }
}

function buildDaltonModel() {
  l1.style.display = '';
  l2.style.display = 'none';
  l3.style.display = 'none';
  l4.style.display = 'none';

  const geo = new THREE.SphereGeometry(4.5, 64, 64);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xc8aa6e,
    metalness: 0.8,
    roughness: 0.2,
    wireframe: false
  });
  const sphere = new THREE.Mesh(geo, mat);
  currentAtomGroup.add(sphere);
}

function buildThomsonModel() {
  l1.style.display = '';
  l2.style.display = 'none';
  l3.style.display = 'none';
  l4.style.display = 'none';

  const mainGeo = new THREE.SphereGeometry(5, 32, 32);
  const mainMat = new THREE.MeshPhongMaterial({
    color: 0x785a28,
    transparent: true,
    opacity: 0.5,
    wireframe: false
  });
  const mainSphere = new THREE.Mesh(mainGeo, mainMat);
  currentAtomGroup.add(mainSphere);

  const electronGeo = new THREE.SphereGeometry(0.4, 16, 16);
  const electronMat = new THREE.MeshBasicMaterial({ color: 0x0ac8b9 });

  const numElectrons = 14;
  for (let i = 0; i < numElectrons; i++) {
    const electron = new THREE.Mesh(electronGeo, electronMat);
    const radius = 3.5 * Math.random();
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    electron.position.x = radius * Math.sin(phi) * Math.cos(theta);
    electron.position.y = radius * Math.sin(phi) * Math.sin(theta);
    electron.position.z = radius * Math.cos(phi);

    currentAtomGroup.add(electron);
  }
}

function buildRutherfordModel() {
  modal.style.display = ''
  modal.showModal()
  s1.style.display = ''
  s2.style.display = 'none'
  s3.style.display = 'none'

  l1.style.display = 'none';
  l2.style.display = '';
  l3.style.display = 'none';
  l4.style.display = 'none';

  const nucleusGeo = new THREE.SphereGeometry(1.2, 32, 32);
  const nucleusMat = new THREE.MeshStandardMaterial({ color: 0xe84057, emissive: 0x500000 });
  const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
  currentAtomGroup.add(nucleus);

  const orbitsCount = 3;
  const electronGeo = new THREE.SphereGeometry(0.35, 16, 16);
  const electronMat = new THREE.MeshBasicMaterial({ color: 0x0ac8b9 });

  for (let i = 0; i < orbitsCount; i++) {
    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = (Math.PI / orbitsCount) * i;
    orbitGroup.rotation.y = (Math.PI / orbitsCount) * (i + 1);

    const curve = new THREE.EllipseCurve(0, 0, 7, 7, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(64);
    const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
    const ringMat = new THREE.LineBasicMaterial({ color: 0xc8aa6e, transparent: true, opacity: 0.5 });
    const ring = new THREE.Line(ringGeo, ringMat);
    orbitGroup.add(ring);

    const electron = new THREE.Mesh(electronGeo, electronMat);
    orbitGroup.add(electron);

    currentAtomGroup.add(orbitGroup);
    animatableObjects.push({ obj: electron, speed: 1.5 + i * 0.5, radius: 7 });
  }
}

function buildBohrModel() {
  modal.style.display = ''
  modal.showModal()
  s1.style.display = 'none'
  s2.style.display = ''
  s3.style.display = 'none'

  l1.style.display = 'none';
  l2.style.display = 'none';
  l3.style.display = '';
  l4.style.display = 'none';

  const nucleusGroup = new THREE.Group();
  for (let i = 0; i < 10; i++) {
    const isProton = i % 2 === 0;
    const pGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const pMat = new THREE.MeshStandardMaterial({
      color: isProton ? 0xe84057 : 0xf0e6d2
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.position.set(
      (Math.random() - 0.5) * 1.2,
      (Math.random() - 0.5) * 1.2,
      (Math.random() - 0.5) * 1.2
    );
    nucleusGroup.add(pMesh);
  }
  currentAtomGroup.add(nucleusGroup);

  const layers = [
    { radius: 4, electrons: 2, speed: 2.0 },
    { radius: 7, electrons: 4, speed: 1.2 },
    { radius: 10, electrons: 2, speed: 0.8 }
  ];

  const electronGeo = new THREE.SphereGeometry(0.3, 16, 16);
  const electronMat = new THREE.MeshBasicMaterial({ color: 0x0ac8b9 });

  layers.forEach((layer) => {
    const ringGeo = new THREE.RingGeometry(layer.radius - 0.03, layer.radius + 0.03, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x785a28, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    currentAtomGroup.add(ring);

    for (let e = 0; e < layer.electrons; e++) {
      const angleOffset = (Math.PI * 2 / layer.electrons) * e;
      const electron = new THREE.Mesh(electronGeo, electronMat);
      currentAtomGroup.add(electron);

      animatableObjects.push({
        obj: electron,
        speed: layer.speed,
        radius: layer.radius,
        offset: angleOffset,
        planar: true
      });
    }
  });
}

function buildSchrodingerModel() {
  modal.style.display = ''
  modal.showModal()
  s1.style.display = 'none'
  s2.style.display = 'none'
  s3.style.display = ''

  l1.style.display = 'none';
  l2.style.display = 'none';
  l3.style.display = 'none';
  l4.style.display = '';

  const nGeo = new THREE.SphereGeometry(0.5, 16, 16);
  const nMat = new THREE.MeshBasicMaterial({ color: 0xf0e6d2 });
  const nucleus = new THREE.Mesh(nGeo, nMat);
  currentAtomGroup.add(nucleus);

  const particleCount = 2500;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const c1 = new THREE.Color(0x0ac8b9);
  const c2 = new THREE.Color(0xc8aa6e);

  for (let i = 0; i < particleCount; i++) {
    const u1 = Math.random();
    const u2 = Math.random();
    const radius = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2) * 3 + 0.8;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const mixedColor = c1.clone().lerp(c2, radius / 8);
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  const cloudGeo = new THREE.BufferGeometry();
  cloudGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  cloudGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const cloudMat = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.7
  });

  const cloud = new THREE.Points(cloudGeo, cloudMat);
  currentAtomGroup.add(cloud);
  animatableObjects.push({ obj: cloud, isCloud: true });
}

function animate(time) {
  requestAnimationFrame(animate);

  const seconds = time * 0.001;

  if (isAutoRotating && currentAtomGroup) {
    currentAtomGroup.rotation.y += 0.005;
  }
  animatableObjects.forEach((item) => {
    if (item.planar) {
      const angle = seconds * item.speed + item.offset;
      item.obj.position.x = Math.cos(angle) * item.radius;
      item.obj.position.z = Math.sin(angle) * item.radius;
      item.obj.position.y = 0;
    } else if (item.isCloud) {
      item.obj.rotation.y += 0.002;
      item.obj.rotation.z += 0.001;
    } else {
      const angle = seconds * item.speed;
      item.obj.position.x = Math.cos(angle) * item.radius;
      item.obj.position.y = Math.sin(angle) * item.radius;
    }
  });

  controls.update();
  renderer.render(scene, camera);
}

function toggleAutoRotate() {
  isAutoRotating = !isAutoRotating;
}

function resetCamera() {
  camera.position.set(0, 5, 25);
  controls.target.set(0, 0, 0);
}

function toggleInfoPanel() {
  const card = document.getElementById('info-card');
  card.style.display = (card.style.display === 'none') ? 'block' : 'none';
}


function openWelcome() {
  document.getElementById('welcome-screen').style.display = 'flex';
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

document.getElementById('welcome-screen').style.display = '';
window.onload = init3D;

//Conexão
if (navigator.onLine) {
  console.log("Online.");
} else {
  alert("Sem internet! Algumas funcionalidades podem não carregar como deveriam.");
  console.log("Sem internet.");
}

window.addEventListener('online', () => {
  alert("Online.");
})

window.addEventListener('offline', () => {
  alert("Offline.");
})

const atomicModelsData = [
  {
    name: "Modelo de Dalton",
    year: "1808 • Bola de Bilhar",
    description: "John Dalton formulou a primeira teoria atômica científica moderna. Ele sugeriu que toda a matéria é composta de partículas indivisíveis chamadas átomos.",
    details: [
      "Átomos são esferas rídidas, maciças e indivisíveis.",
      "Átomos do mesmo elemento químico são idênticos em massa.",
      "Não considera a existência de cargas elétricas."
    ]
  },
  {
    name: "Modelo de Thomson",
    year: "1897 • Pudim de Passas",
    description: "Após a descoberta do elétron através de experimentos com raios catódicos, J.J. Thomson derrubou a indivisibilidade do átomo.",
    details: [
      "O átomo é uma esfera de carga elétrica positiva.",
      "Os elétrons (carga negativa) ficam incrustados na massa positiva.",
      "Primeira evidência de natureza elétrica da matéria."
    ]
  },
  {
    name: "Modelo de Rutherford",
    year: "1911 • Modelo Planetário",
    description: "Com o famoso experimento da lâmina de ouro e partículas alfa, Ernest Rutherford provou que o átomo é na sua maior parte espaço vazio.",
    details: [
      "Núcleo central denso, pequeno e de carga positiva.",
      "Eletrosfera espaçosa onde os elétrons orbitam o núcleo.",
      "O raio do átomo é ~10.000 vezes maior que o núcleo."
    ]
  },
  {
    name: "Modelo de Bohr",
    year: "1913 • Orbitais Quantizados",
    description: "Niels Bohr aprimorou o modelo de Rutherford aplicando a teoria quântica de Max Planck para explicar o espectro de emissão atômico.",
    details: [
      "Elétrons orbitam em camadas discretas (níveis de energia).",
      "O elétron não emite radiação enquanto estiver na mesma órbita.",
      "Saltos quânticos: ao absorver energia, o elétron pula de camada."
    ]
  },
  {
    name: "Modelo de Schrödinger",
    year: "1926 • Nuvem Eletrônica",
    description: "Erwin Schrödinger desenvolveu a mecânica quântica ondulatória, substituindo órbitas definidas por regiões de probabilidade (orbitais).",
    details: [
      "O elétron é tratado como uma onda de matéria.",
      "Não há órbita exata, mas sim uma 'nuvem de probabilidade'.",
      "Princípio da Incerteza de Heisenberg incorporado."
    ]
  }
];

function guia() {
  const linkInput = "https://docs.google.com/document/d/1um0horwyAZ556aF8lpUG3Z08udqea8_C/edit?usp=drive_link&ouid=104553812946944736231&rtpof=true&sd=true";
  const regExp = /\/d\/([a-zA-Z0-9-_]+)|id=([a-zA-Z0-9-_]+)/;
  const match = linkInput.match(regExp);

  if (match) {
    const fileId = match[1] || match[2];
    const directLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const tempLink = document.createElement('a');
    tempLink.href = directLink;
    tempLink.setAttribute('download', '');
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    alert("Iniciando download!")
  } else {
    alert("Oops! Houve um erro.");
  }
}
const modal = document.getElementById("modal");

const s1 = document.getElementById("s1");
const s2 = document.getElementById("s2");
const s3 = document.getElementById("s3")

document.getElementById("s1").addEventListener("click", () => {
  modal.close()
  modal.style.display = 'none'
  window.location.href = './app/rutherford.html'
})

document.getElementById("s2").addEventListener("click", () => {
  modal.close()
  modal.style.display = 'none'
  window.location.href = './app/bohr.html'
})

document.getElementById("s3").addEventListener("click", () => {
  modal.close()
  modal.style.display = 'none'
  window.location.href = './app/schrodinger.html'
})

document.getElementById("close").addEventListener("click", () => {
  modal.close()
  modal.style.display = 'none'
});

function fechar_modal() {
  modal.style.display = 'none'
}

fechar_modal()

document.getElementById("close_welcome").addEventListener("click", () => {
  document.getElementById("welcome-screen").style.display = 'none'
})

