import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import Stats from 'stats.js';
import WandText from './WandText';
import FireFliesBackground from './fireflies/FireFliesBackground';


//Things to fix:
//Tag placement
//Hitbox placement
//Camera

const ThreeScene = () => {
  const containerRef = useRef(null);
  // 'loading' and 'progress' are updated as models load in the background.
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  // 'preloaderStarted' tracks whether the user has clicked the welcome button.
  const [preloaderStarted, setPreloaderStarted] = useState(false);
  // Prevent multiple initializations
  const initiated = useRef(false);

  useEffect(() => {
    // Only initialize once preloaderStarted is true
    if (!preloaderStarted || initiated.current) return;
    initiated.current = true;
    // -- VARIABLES & INITIAL SETUP -----------------------------------------
    let scene, camera, renderer, composer, labelRenderer, animationFrameId;
    let stats;
    const clock = new THREE.Clock();
    const raycaster = new THREE.Raycaster();
    const 
    hitboxes = [];
    let taaRenderPass;
    let taaIndex = 0;
    let isDragging = false;
    let prevMouseX = null;
    let userAngle = 0;
    let initialRadius = 0;
    let userSpun = false;
    let interactionTimeout;

    // Global parameters
    let params = {
      showStats: false,
      userInteracting: true,
      fov: 27,
      fxaa: false,
      taa: false,
      bloomPass: true,
      taaSampleLevel: 1,
      nightAmount: 0,
      bloomStrength: 1,
      bloomRadius: 0.2,
      bloomThreshold: 0.8,
      fogHeight: 1,
      fogColor: 0x446677,
      groundFogDensity: 10,
      cameraInitialX: 10,
      cameraInitialY: 3,
      cameraInitialZ: 10,
      lookAt: new THREE.Vector3(0, 1, 0),
      enableHorizontalSpin: true,
      spinSpeed: 0.01,
      noOfStars: 1000,
      moonColor: 0x91a3b0,
      skyColor: 0x546bab,
      lightIntensity: 1,
    };

    function isPhone() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    }

    if (isPhone()) {
      params = {
        showStats: false,
        userInteracting: true,
        fov: 30,
        fxaa: false,
        taa: false,
        bloomPass: false,
        taaSampleLevel: 1,
        nightAmount: 0,
        bloomStrength: 1,
        bloomRadius: 0.1,
        bloomThreshold: 0.8,
        fogHeight: 1.5,
        fogColor: 0x446677,
        groundFogDensity: 8,
        cameraInitialX: 15,
        cameraInitialY: 3,
        cameraInitialZ: 15,
        lookAt: new THREE.Vector3(0, 1, 0),
        enableHorizontalSpin: true,
        spinSpeed: 0.01,
        noOfStars: 400,
        moonColor: 0x91a3b0,
        skyColor: 0x546bab,
        lightIntensity: 2,
      };
    }

    // Models & Colors
    const models = Array.from({ length: 15 }, (_, i) => `./model_${i}.obj`);
    const modelColors = {
      0: { color: 0x754e1a, opacity: 1 },
      1: { color: 0x754e1a, opacity: 1 },
      2: { color: 0x754e1a, opacity: 1 },
      3: { color: 0x2b4e2a, opacity: 1 },
      4: { color: 0x66665c, opacity: 1 },
      5: { color: 0x66665c, opacity: 1 },
      6: { color: 0x7e99a3, opacity: 1 },
      7: { color: 0xffffff, opacity: 1 },
      8: { color: 0xffffff, opacity: 1 },
      9: { color: 0xffffff, opacity: 1 },
      10: { color: 0xb4b4b4, opacity: 1 },
      11: { color: 0xe8f9ff, opacity: 1 },
      12: { color: 0xffffff, opacity: 1 },
      13: { color: 0xffffff, opacity: 1 },
      14: { color: 0xffffff, opacity: 0.5 },
      15: { color: 0x865110, opacity: 1 },
      16: { color: 0xe8f9ff, opacity: 0.8 },
    };

    const sites = [
      "/houdiniheist",
      "/amongus",
      "/hackmatrix",
      "/datathon",
      "/pixelperfect",
    ];

    // -- UTILITY FUNCTIONS --------------------------------------------------
    const materialCache = new Map();
    function getFoggyMaterial(fogDepth, fogColor, color, side) {
      const key = `${fogDepth}_${fogColor}_${color}_${side}`;
      if (materialCache.has(key)) {
        return materialCache.get(key);
      }
      const material = new THREE.MeshStandardMaterial({
        color: color,
        side: side,
        metalness: 0.5,
        roughness: 0.75,
      });
      material.onBeforeCompile = (shader) => {
        shader.uniforms.fDepth = { value: fogDepth };
        shader.uniforms.fColor = { value: new THREE.Color(fogColor) };

        shader.fragmentShader =
          `uniform float fDepth;
        uniform vec3 fColor;
        ` + shader.fragmentShader;

        shader.fragmentShader = shader.fragmentShader.replace(
          `#include <clipping_planes_fragment>`,
          `
          float planeFog = 1.0;
          #if NUM_CLIPPING_PLANES > 0
            vec4 plane;
            #pragma unroll_loop
            for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
              plane = clippingPlanes[ i ];
              planeFog = smoothstep(0.0, -fDepth, dot( vViewPosition, plane.xyz ) - plane.w);
            }
          #endif
        `
        );

        shader.fragmentShader = shader.fragmentShader.replace(
          `#include <fog_fragment>`,
          `#include <fog_fragment>
          gl_FragColor.rgb = mix( gl_FragColor.rgb, fColor, 1.0 - planeFog );
          `
        );
      };
      materialCache.set(key, material);
      return material;
    }

    // -- MODEL LOADING ------------------------------------------------------
    function loadModels() {
      let loadedCount = 0;
      const totalModels = models.length;
      const objLoader = new OBJLoader();
      const promises = models.map((model, index) => {
        return new Promise((resolve) => {
          objLoader.load(
            `hogwarts/hogwartsModel/${model}`,
            (object) => {
              object.traverse((child) => {
                if (child.isMesh) {
                  const { color, opacity } =
                    modelColors[index] || { color: 0x0077ff, opacity: 1.0 };
                  child.material = getFoggyMaterial(
                    params.fogHeight,
                    params.fogColor,
                    color,
                    THREE.FrontSide
                  );
                  child.material.transparent = true;
                  child.material.opacity = opacity;
                  child.material.polygonOffset = true;
                  child.material.polygonOffsetFactor = 1;
                  child.material.polygonOffsetUnits = 1;
                  child.material.depthWrite = true;
                  child.material.depthTest = true;
                  child.renderOrder = index;
                  if ([7, 8, 9, 12, 13, 14].includes(index)) {
                    child.material.emissive = new THREE.Color(0xffbb00);
                    child.material.emissiveIntensity = 1;
                  }
                }
              });
              object.scale.set(1.4, 1.4, 1.4);
              object.rotation.x = -Math.PI / 2;
              object.position.y -= 4;
              scene.add(object);
              if (index === 15) {
                object.scale.x = 10;
                object.scale.y = 10;
              }
              loadedCount++;
              // Update progress (as a percentage)
              setProgress((loadedCount / totalModels) * 100);
              resolve();
            },
            undefined,
            (error) => {
              console.error(error);
              loadedCount++;
              setProgress((loadedCount / totalModels) * 100);
              resolve();
            }
          );
        });
      });
      return Promise.all(promises);
    }

    // -- SCENE SETUP FUNCTIONS ----------------------------------------------
    function loadSkyboxSphere() {
      const segments = isPhone() ? 8 : 15;
      const material = getFoggyMaterial(
        params.fogHeight,
        params.fogColor,
        params.skyColor,
        THREE.BackSide
      );
      const skyboxGeometry = new THREE.SphereGeometry(40, segments, segments);
      const skybox = new THREE.Mesh(skyboxGeometry, material);
      scene.add(skybox);
    }

    function setupStars() {
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.3,
        sizeAttenuation: true,
      });
      const starVertices = [];
      const radius = 25;
      const yMin = 0;
      const yMax = 150;
      let count = 0;
      while (count < params.noOfStars) {
        const u = Math.random();
        const v = Math.random();
        const theta = Math.acos(2 * u - 1);
        const phi = 2 * Math.PI * v;
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = Math.abs(radius * Math.sin(theta) * Math.sin(phi));
        const z = radius * Math.cos(theta);
        if (y >= yMin && y <= yMax) {
          starVertices.push(x, y, z);
          count++;
        }
      }
      starGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starVertices, 3)
      );
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
    }

    function setupScene() {
      camera.fov = params.fov;
      camera.updateProjectionMatrix();
      camera.position.set(
        params.cameraInitialX,
        params.cameraInitialY,
        params.cameraInitialZ
      );
      camera.lookAt(params.lookAt);
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);
      loadSkyboxSphere();
      // scene.fog = new THREE.Fog(params.fogColor, 1, 3000);
    }

    function setupLights() {
      const directionalLight = new THREE.DirectionalLight(
        params.moonColor,
        2*params.lightIntensity
      );
      directionalLight.position.set(-2, 1, 1);
      const ambientLight = new THREE.AmbientLight(0xccdbdf, 0.9*params.lightIntensity);
      const moonlight = new THREE.DirectionalLight(params.moonColor, 1*params.lightIntensity);
      moonlight.position.set(-20, 3, -20);
      const moonGeometry = new THREE.SphereGeometry(2, 16, 16);
      const moonMaterial = new THREE.MeshStandardMaterial({
        color: params.moonColor,
        emissive: params.moonColor,
        emissiveIntensity: 3.5,
      });
      const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
      moonMesh.position.copy(moonlight.position);
      scene.add(moonMesh);
      scene.add(ambientLight, moonlight, directionalLight);
    }

    function setupPostProcessing() {
      composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);
      if (params.fxaa) {
        const fxaaPass = new ShaderPass(FXAAShader);
        fxaaPass.enabled = true;
        composer.addPass(fxaaPass);
      }
      if (params.taa) {
        taaRenderPass = new TAARenderPass(scene, camera);
        taaRenderPass.unbiased = false;
        taaRenderPass.sampleLevel = params.taaSampleLevel;
        renderPass.enabled = false;
        composer.addPass(taaRenderPass);
      }
      if (params.bloomPass) {
        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          params.bloomStrength,
          params.bloomRadius,
          params.bloomThreshold
        );
        composer.addPass(bloomPass);
      }
    }

    function createHitboxes() {
      labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.top = '0';
      // labelRenderer.domElement.style.pointerEvents = 'none';
      // labelRenderer.domElement.style.zIndex = '10';
      containerRef.current.appendChild(labelRenderer.domElement);

      const hitboxPositions = [
        [-1.4, 0.8, 1.45],
        [1.2, 0, 0.2],
        [0.2, 1.4, 0],
        [-1.9, -0.2, 2],
        [0.5, -0.5, -1.7],
      ];
      const hitboxSizes = [
        new THREE.Vector3(0.6, 1.6, 0.6),
        new THREE.Vector3(1.5, 1, 1.5),
        new THREE.Vector3(0.6, 1.7, 0.6),
        new THREE.Vector3(1.2, 0.9, 1.2),
        new THREE.Vector3(0.3, 1.9, 0.3),
      ];

      for (let i = 0; i < hitboxPositions.length; i++) {
        const hitboxGeometry = new THREE.BoxGeometry(
          hitboxSizes[i].x,
          hitboxSizes[i].y,
          hitboxSizes[i].z
        );
        const hitboxMaterial = new THREE.MeshBasicMaterial({ visible: false });
        const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
        hitbox.position.set(
          hitboxPositions[i][0],
          hitboxPositions[i][1],
          hitboxPositions[i][2]
        );
        scene.add(hitbox);
        hitboxes.push(hitbox);

        const labelDiv = document.createElement('div');
        labelDiv.className = `label${i + 1}`;
        labelDiv.style.backgroundImage = `url('src/assets/icons8-hogwarts-legacy${["-gryffindor", "-slytherin", "-ravenclaw", "-hufflepuff", ""][i]}.svg')`;
        labelDiv.style.height = '50px';
        if (i == 4) {
          labelDiv.style.height = '65px';
          labelDiv.style.width = '65px';
        }
        labelDiv.style.width = '50px';
        labelDiv.addEventListener('click', () => {
          window.location.href = sites[i];
        })
        const label = new CSS2DObject(labelDiv);
        label.position.set(0, hitboxSizes[i].y / 2 + 0.1, 0);
        hitbox.add(label);
      }
    }

    // -- EVENT HANDLERS -----------------------------------------------------
    function onClick(event) {
      const mouse = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hitboxes);
      if (intersects.length > 0) {
        const index = hitboxes.indexOf(intersects[0].object);
        setTimeout(() => {
          window.location.href = sites[index];
        }, 500);
      }
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.fov = params.fov;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    }
    let hasDragged = false;
    let pointerDownX = null; // Records where the pointer started

function onPointerDown(event) {
  hasDragged = false;
  // Capture initial X coordinate (works for both mouse and touch)
  pointerDownX = event.clientX || event.touches[0].clientX;
  prevMouseX = pointerDownX;
  if (params.enableHorizontalSpin) {
    isDragging = true;
    // Set initial values
    initialRadius = Math.sqrt(camera.position.x ** 2 + camera.position.z ** 2);
    userAngle = Math.atan2(camera.position.z, camera.position.x);
    // Do not immediately set userSpun to true; wait until movement is detected
    userSpun = false;
  }
  params.userInteracting = true;
}

function onPointerMove(event) {
  if (isDragging && params.enableHorizontalSpin) {
    const clientX = event.clientX || event.touches[0].clientX;
    const delta = clientX - prevMouseX;
    // Check if the total movement exceeds a threshold (e.g., 5 pixels)
    if (Math.abs(clientX - pointerDownX) > 16) {
      hasDragged = true;
      userSpun = true; // Only enable spinning if there is significant movement
    }
    // Update the angle regardless (if it's not a tap, this won't matter)
    userAngle += delta * 0.01;
    prevMouseX = clientX;
  }
}

function onPointerUp() {
  isDragging = false;
  params.userInteracting = false;
  // If there wasn't enough movement, consider it a tap and disable spinning
  if (!hasDragged) {
    userSpun = false;
  }
}


    function setupEventListeners() {
      window.addEventListener("resize", onWindowResize, false);
      window.addEventListener("mousedown", onPointerDown, false);
      window.addEventListener("mousemove", onPointerMove, false);
      window.addEventListener("mouseup", onPointerUp, false);
      window.addEventListener("touchstart", onPointerDown, false);
      window.addEventListener("touchmove", onPointerMove, false);
      window.addEventListener("touchend", onPointerUp, false);
      window.addEventListener("click", onClick);
    }

    // -- ANIMATION ----------------------------------------------------------
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      if (!animate.lastFrameTime) animate.lastFrameTime = now;
      const deltaTime = now - animate.lastFrameTime;

      const isPhone = /Mobi|Android/i.test(navigator.userAgent);
      const frameInterval = isPhone ? 1000 / 30 : 1000 / 100; // 30 FPS for phones

      if (deltaTime < frameInterval) return;
      animate.lastFrameTime = now;

      if (stats) stats.begin();
      // Use deltaTime (in seconds) for smooth, frame-independent updates:
      // Subtract the offset so that animation effectively starts at time=0.
      const time = clock.getElapsedTime() - startTime;
      if (params.enableHorizontalSpin && userSpun) {
        camera.position.x = initialRadius * Math.cos(userAngle + time * 0.1);
        camera.position.z = initialRadius * Math.sin(userAngle + time * 0.1);
      } else {
        camera.position.x = initialRadius * Math.cos(time * 0.1);
        camera.position.z = initialRadius * Math.sin(time * 0.1);
      }
      camera.position.y = params.cameraInitialY;
      camera.lookAt(params.lookAt);
      if (taaRenderPass) {
        taaIndex++;
        taaRenderPass.accumulate = Math.round(taaIndex / 200) % 2 !== 0;
      }
      renderer.autoClear = false;
      renderer.clear();
      renderer.render(scene, camera);
      if (labelRenderer) labelRenderer.render(scene, camera);
      if (composer) composer.render();
      if (stats) stats.end();
    }

    // -- INITIALIZATION -----------------------------------------------------
    let startTime =clock.getElapsedTime();
    function init() {
      // Mark the very start of initialization
      performance.mark('init-start');

      // Create renderer, camera, and scene
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        logarithmicDepthBuffer: true,
        precision: "highp",
      });
      renderer.setPixelRatio(isPhone() ? 1 : window.devicePixelRatio);
      const globalPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.5);
      renderer.clippingPlanes = [globalPlane];
      camera = new THREE.PerspectiveCamera(
        params.fov,
        window.innerWidth / window.innerHeight,
        1,
        3000
      );
      initialRadius = Math.sqrt(
        params.cameraInitialX ** 2 + params.cameraInitialZ ** 2
      );
      userAngle = Math.atan2(params.cameraInitialZ, params.cameraInitialX);
      scene = new THREE.Scene();

      if (params.showStats) {
        stats = new Stats();
        containerRef.current.appendChild(stats.dom);
      }

      // Setup various scene elements
      setupScene();
      performance.mark('after-setupScene');
      setupLights();
      performance.mark('after-setupLights');
      setupStars();
      createHitboxes();
      setupPostProcessing();
      performance.mark('init-setup-complete');
      
      // Load models and mark when done
      loadModels().then(() => {
        setLoading(false);
        performance.mark('models-loaded');
        performance.measure('init-total', 'init-start', 'models-loaded');
        const measure = performance.getEntriesByName('init-total')[0];
        console.log(`3JS Scene loaded in ${measure.duration.toFixed(2)}ms`);
        console.log('Performance marks:', performance.getEntriesByType('mark'));
        animate();
      });
    }
    
    init();
    setupEventListeners();

    // -- CLEANUP ON UNMOUNT -----------------------------------------------
    return () => {
      // This is the cleanup function.
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("click", onClick);

      if (containerRef.current) {
        if (renderer && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
        if (labelRenderer && labelRenderer.domElement && containerRef.current.contains(labelRenderer.domElement)) {
          containerRef.current.removeChild(labelRenderer.domElement);
        }
        if (stats && stats.dom && containerRef.current.contains(stats.dom)) {
          containerRef.current.removeChild(stats.dom);
        }
      }
    };
  }, [preloaderStarted]);

  return (
    <div 
      className='min-h-screen'
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Welcome overlay (always shown until the user clicks "Start") */}
      {!preloaderStarted && (
        <div
          style={{
            position: 'absolute',
            zIndex: 5999,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#000',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Cinzel, sans-serif',
            fontSize: '40px',
            padding: '20px',
          }}
        >
          <FireFliesBackground />
          <h1 style={{ fontSize: '60px', marginBottom: '80px' }}>
            Welcome to the wizarding world...
          </h1>
          <WandText />
          <p style={{ fontSize: '25px', marginTop: '80px' }}>
            Press the button below to be amazed!!
          </p>
          <button
            onClick={() => setPreloaderStarted(true)}
            style={{
              padding: '15px 30px',
              fontColor: '#FFD700',
              cursor: 'pointer',
              background: '#000',
              border: 'none',
              borderRadius: '5px',
              fontSize: '25px',
            }}
          >
            Start
          </button>
        </div>
      )}

      {/* Progress overlay: revealed after the user clicks "Start" */}
      {preloaderStarted && loading && (
        <div
          style={{
            position: 'absolute',
            zIndex: 9999,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Cinzel, sans-serif',
            fontSize: '40px',
            padding: '20px',
          }}
        >
          <div
            style={{
              color: '#fff',
              marginBottom: '10px',
              fontSize: '25px',
            }}
          >
            Loading {Math.floor(progress)}%
          </div>
          <img
            src='src/assets/harryPotterOnBroom.gif'
            style={{
              width: '150px',
              height: '150px',
            }}
            alt="Harry Potter dancing"
          />
        </div>
      )}
    </div>
  );
};

export default ThreeScene;
