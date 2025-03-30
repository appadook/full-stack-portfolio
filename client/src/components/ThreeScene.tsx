import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene and set background transparent (since hero has its own gradients)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true; // Enable shadow mapping
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
    containerRef.current.appendChild(renderer.domElement);
    
    // Enhanced lighting setup
    // Ambient light - increased for better overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Increased from 0.6 to 1.0
    scene.add(ambientLight);
    
    // Main directional light (like sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0); // Increased from 1.2 to 2.0
    directionalLight.position.set(0, 5, 10); // Moved more to the front (positive z)
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);
    
    // Add fill light from opposite direction (for better model visibility)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8); // Increased from 0.5 to 0.8
    fillLight.position.set(-5, 2, -7.5);
    scene.add(fillLight);
    
    // Add powerful front-facing spotlight for dramatic front illumination
    const frontSpotLight = new THREE.SpotLight(0xffffff, 3.0); // Very bright spotlight
    frontSpotLight.position.set(0, 0, 15); // Positioned directly in front of the model
    frontSpotLight.angle = Math.PI / 4; // Wider angle
    frontSpotLight.penumbra = 0.2;
    frontSpotLight.decay = 1; // Less decay for stronger light
    frontSpotLight.distance = 50;
    frontSpotLight.castShadow = true;
    frontSpotLight.shadow.mapSize.width = 1024;
    frontSpotLight.shadow.mapSize.height = 1024;
    scene.add(frontSpotLight);
    
    // Add a front-facing point light for extra illumination
    const frontPointLight = new THREE.PointLight(0xffffff, 2.0, 50);
    frontPointLight.position.set(0, 0, 10);
    scene.add(frontPointLight);
    
    // Keep the original spotlight for dynamic lighting effects
    const spotLight = new THREE.SpotLight(0xffffff, 1.0);
    spotLight.position.set(0, 10, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.3;
    spotLight.decay = 2;
    spotLight.distance = 50;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);
    
    // Create animated star field
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1500; // Reduced from 3000 to 1500 stars
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    
    // Create stars with varied sizes and colors for a more vibrant effect
    for (let i = 0; i < starCount; i++) {
      // Positions
      starPositions[i * 3] = (Math.random() - 0.5) * 100;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      starPositions[i * 3 + 2] = -Math.random() * 50; // set further back
      
      // Colors - add slight variations to make some stars slightly blue or gold tinted
      // All still primarily white but with subtle color variations
      const colorChoice = Math.random();
      if (colorChoice > 0.8) {
        // Slightly blue-ish white
        starColors[i * 3] = 0.9;
        starColors[i * 3 + 1] = 0.95; 
        starColors[i * 3 + 2] = 1.0;
      } else if (colorChoice < 0.2) {
        // Slightly gold/yellow-ish white
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 0.95;
        starColors[i * 3 + 2] = 0.85;
      } else {
        // Pure white
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 1.0;
        starColors[i * 3 + 2] = 1.0;
      }
      
      // Reduced sizes - smaller stars overall
      starSizes[i] = Math.random() * 0.3 + 0.1; // Between 0.1 and 0.4 (reduced from 0.2-0.7)
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    
    // Use vertex colors from our attribute
    const starMaterial = new THREE.PointsMaterial({
      size: 0.3, // Reduced from 0.5 to 0.3
      sizeAttenuation: true,
      transparent: true,
      opacity: 1.0,
      vertexColors: true, // Use the colors we defined
      blending: THREE.AdditiveBlending, // Add glow effect
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // Create a second star layer with larger but more transparent stars for a glow effect
    const glowStarGeometry = new THREE.BufferGeometry();
    const glowStarCount = 100; // Reduced from 200 to 100
    const glowStarPositions = new Float32Array(glowStarCount * 3);
    
    for (let i = 0; i < glowStarCount; i++) {
      glowStarPositions[i * 3] = (Math.random() - 0.5) * 80;
      glowStarPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      glowStarPositions[i * 3 + 2] = -Math.random() * 30;
    }
    
    glowStarGeometry.setAttribute('position', new THREE.BufferAttribute(glowStarPositions, 3));
    
    const glowStarMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.0, // Reduced from 1.5 to 1.0
      transparent: true,
      opacity: 0.3, // Reduced from 0.4 to 0.3
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    
    const glowStars = new THREE.Points(glowStarGeometry, glowStarMaterial);
    scene.add(glowStars);
    
    // Load and add 3D model (update the URL to your model path in public folder)
    let model: THREE.Group;
    const loader = new GLTFLoader();
    loader.load('/models/3d_model.glb', (gltf) => {
      model = gltf.scene;
      // Position the model lower in the scene
      model.position.set(0, -2, 0); // Changed from (0, 0, 0) to move model downward
      
      // Enable shadows for all model meshes and increase material brightness if possible
      model.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          
          // Enhance material properties - make materials more responsive to light
          if (node.material) {
            if (Array.isArray(node.material)) {
              node.material.forEach(material => {
                if (material) {
                  // Increase the emissive factor slightly to make model more visible
                  if (material.emissive) material.emissive.set(0x222222);
                  // Increase material brightness
                  if (material.color) material.color.multiplyScalar(1.2);
                  material.needsUpdate = true;
                }
              });
            } else if (node.material) {
              // Increase the emissive factor slightly to make model more visible
              if (node.material.emissive) node.material.emissive.set(0x222222);
              // Increase material brightness
              if (node.material.color) node.material.color.multiplyScalar(1.2);
              node.material.needsUpdate = true;
            }
          }
        }
      });
      
      scene.add(model);
    });

    // Animate the scene: floating model & rotated star field
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      const t = clock.getElapsedTime();
      
      if (model) {
        // Reduce both amplitude (from 0.5 to 0.2) and frequency (by multiplying t by 0.5 instead of 1)
        model.position.y = -2 + Math.sin(t * 0.5) * 0.2; // Slower and smaller floating effect
      }
      
      // Animate stars - slow rotation for a moving background effect
      stars.rotation.y += 0.0003;
      glowStars.rotation.y += 0.0001; // slower rotation for glow layer
      
      // Pulse effect for stars - subtle brightness changes over time
      const sin = Math.sin(t * 0.5) * 0.1 + 0.9; // Value between 0.8 and 1.0
      starMaterial.opacity = sin + 0.05;
      
      // Update spotlight position to create dynamic lighting effect
      spotLight.position.x = Math.sin(t * 0.2) * 5;
      spotLight.position.z = Math.cos(t * 0.2) * 5;
      
      // Add a subtle movement to the front point light for dynamic illumination
      frontPointLight.position.x = Math.sin(t * 0.3) * 3;
      frontPointLight.position.y = Math.cos(t * 0.3) * 2;
      
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle resizing
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
};

export default ThreeScene;