  // Three.js Heart Background
        const container = document.getElementById('canvas-container');
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        // Improved Heart Geometry
        const x = 0, y = 0;
        const heartShape = new THREE.Shape();
        heartShape.moveTo(x + 0.5, y + 0.5);
        heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 1, y, x, y);
        heartShape.bezierCurveTo(x - 1, y, x - 1, y + 1.5, x - 1, y + 1.5);
        heartShape.bezierCurveTo(x - 1, y + 2.5, x + 0.5, y + 3.5, x + 0.5, y + 3.5);
        heartShape.bezierCurveTo(x + 0.5, y + 3.5, x + 2, y + 2.5, x + 2, y + 1.5);
        heartShape.bezierCurveTo(x + 2, y + 1.5, x + 2, y, x + 1, y);
        heartShape.bezierCurveTo(x + 0.5, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

        const extrudeSettings = {
            depth: 0.5,
            bevelEnabled: true,
            bevelSegments: 3,
            bevelSize: 0.2,
            bevelThickness: 0.3
        };

        const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

        // Create multiple hearts with different colors and properties
        const hearts = [];
        const colors = [
            0xff6b6b, 0xff8e8e, 0xffb3b3, 0xffd8d8,
            0xff9e9e, 0xffc1c1, 0xff6b8e, 0xff8eb3
        ];

        for (let i = 0; i < 25; i++) {
            const material = new THREE.MeshPhongMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                emissive: 0xff0000,
                emissiveIntensity: 0.1,
                shininess: 100,
                transparent: true,
                opacity: 0.9
            });

            const heart = new THREE.Mesh(heartGeometry, material);

            // Random position and scale
            heart.position.x = (Math.random() - 0.5) * 50;
            heart.position.y = (Math.random() - 0.5) * 50;
            heart.position.z = (Math.random() - 0.5) * 50;

            const scale = Math.random() * 0.8 + 0.5;
            heart.scale.set(scale, scale, scale);

            // Random rotation
            heart.rotation.x = Math.random() * Math.PI;
            heart.rotation.y = Math.random() * Math.PI;

            // Store animation properties
            heart.userData = {
                speedX: Math.random() * 0.02 - 0.01,
                speedY: Math.random() * 0.02 - 0.01,
                speedZ: Math.random() * 0.02 - 0.01,
                rotationSpeedX: Math.random() * 0.01,
                rotationSpeedY: Math.random() * 0.01,
                originalX: heart.position.x,
                originalY: heart.position.y,
                originalZ: heart.position.z,
                floatDistance: 2 + Math.random() * 3
            };

            scene.add(heart);
            hearts.push(heart);
        }

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Animate hearts
            hearts.forEach(heart => {
                // Floating animation
                const time = Date.now() * 0.001;
                heart.position.x = heart.userData.originalX + Math.sin(time * heart.userData.speedX * 10) * heart.userData.floatDistance;
                heart.position.y = heart.userData.originalY + Math.sin(time * heart.userData.speedY * 10) * heart.userData.floatDistance;
                heart.position.z = heart.userData.originalZ + Math.sin(time * heart.userData.speedZ * 10) * heart.userData.floatDistance;

                // Rotation
                heart.rotation.x += heart.userData.rotationSpeedX;
                heart.rotation.y += heart.userData.rotationSpeedY;
            });

            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Step Navigation
        let currentStep = 1;
        const totalSteps = 5;

        function updateProgressBar() {
            const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
            document.getElementById('progress-bar').style.width = `${progress}%`;
        }

        function showStep(stepNumber) {
            // Hide all steps
            document.querySelectorAll('.step').forEach(step => {
                step.classList.remove('active');
            });

            // Show current step
            document.getElementById(`step${stepNumber}`).classList.add('active');

            // Update progress bar
            updateProgressBar();

            // Special effect for last step
            if (stepNumber === totalSteps) {
                document.getElementById('confetti-btn').classList.add('animate-pulse');
            }
        }

        // Button event listeners
        document.getElementById('start-btn').addEventListener('click', () => {
            currentStep = 2;
            showStep(currentStep);
        });

        document.getElementById('next-btn-2').addEventListener('click', () => {
            currentStep = 3;
            showStep(currentStep);
        });

        document.getElementById('next-btn-3').addEventListener('click', () => {
            currentStep = 4;
            showStep(currentStep);
        });

        document.getElementById('next-btn-4').addEventListener('click', () => {
            currentStep = 5;
            showStep(currentStep);
        });

        // Confetti button
        document.getElementById('confetti-btn').addEventListener('click', () => {
            // Standard confetti
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff0000', '#ff69b4', '#ff1493', '#ffc0cb']
            });

            // Heart-shaped confetti
            setTimeout(() => {
                confetti({
                    particleCount: 30,
                    spread: 60,
                    origin: { y: 0.5 },
                    shapes: ['heart'],
                    colors: ['#ff0000', '#ff69b4']
                });
            }, 300);

            // More hearts from different directions
            setTimeout(() => {
                confetti({
                    particleCount: 20,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    shapes: ['heart'],
                    colors: ['#ff0000', '#ff69b4']
                });

                confetti({
                    particleCount: 20,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    shapes: ['heart'],
                    colors: ['#ff0000', '#ff69b4']
                });
            }, 600);

            // Make hearts float up from the background
            hearts.forEach(heart => {
                gsap.to(heart.position, {
                    y: heart.position.y - 30,
                    duration: 3,
                    ease: "power1.out"
                });

                gsap.to(heart.material, {
                    opacity: 0,
                    duration: 3,
                    ease: "power1.out"
                });
            });
        });

        // Initialize progress bar
        updateProgressBar();