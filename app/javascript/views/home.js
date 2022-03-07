import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Home {
    constructor({parent} = {}) {
        this.parent = parent

        let topNav = document.getElementById('TopNav')
        topNav.style.display = 'none'

        this.initTHREE();
    }

    initTHREE() {
        var _this = this;

        /**
         * GUI
         */
         var globalDebugger = Utils.gui.addFolder('Global');
         globalDebugger.open();
 
         // Canvas
         const canvas = document.querySelector('canvas.webgl')
 
 
         /**
          * Renderer
          */
         window.renderer = new THREE.WebGLRenderer({
             canvas: canvas
         })
         renderer.setSize(Utils.screenSize.width, Utils.screenSize.height)
         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


         this.initScene();

        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(75, Utils.screenSize.width / Utils.screenSize.height)
        camera.position.z = 2
        // scene.add(camera) // Apparently this isn't needed
        window.cam = camera;

        const frontCamera = {};
        frontCamera.quaternion = new THREE.Quaternion().copy(camera.quaternion);
        frontCamera.pos = new THREE.Vector3().copy(camera.position);
        camera.currentPosition = 'frontCamera';

        const highAngleCamera = {};
        highAngleCamera.quaternion = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(-0.1151, 0.881, 0.2778), 0.365);
        highAngleCamera.pos = new THREE.Vector3(3.9486, 3.9486, -3.9486);

        Utils.debugger.toggleCamera = function() {
            if (camera.currentPosition == 'frontCamera') {
                camera.quaternion.copy(highAngleCamera.quaternion);
                camera.position.copy(highAngleCamera.pos);
                camera.currentPosition = 'highAngleCamera';
            } else {
                camera.quaternion.copy(frontCamera.quaternion);
                camera.position.copy(frontCamera.pos);
                camera.currentPosition = 'frontCamera';
            }
        }

        globalDebugger.add(Utils.debugger, 'toggleCamera');
        // Utils.debugger.toggleCamera();

         // Controls
        //  const controls = new OrbitControls(camera, canvas)
        //  controls.enableDamping = true
 
 
         // Resizing
         function sceneResizeHandler() {
             // Update camera
             camera.aspect = Utils.screenSize.width / Utils.screenSize.height
             camera.updateProjectionMatrix()
 
             // Update renderer
             renderer.setSize(Utils.screenSize.width, Utils.screenSize.height)
             renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
         }

         Utils.resizeCallbacks.push(sceneResizeHandler);

         const clock = new THREE.Clock();

        const tick = (e) =>
        {
            // Utils update
            Utils.elapsedTime = clock.getElapsedTime();
                
            // Update controls
            // controls.update()

            //  Scene updatee
            _this.scene.update();
                
            // Render
            renderer.render(_this.scene, window.cam)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)

            // // Save frame CCapture
            // capturer.capture( canvas );
        }

        tick();
 
    }


    initScene() {
        var _this = this;
        var loadedMeshes = 0;

        letrisms.forEach(letrism => {
            loadImage(letrism);
        });

        function loadImage(letrism) {
            var src = letrism.src
            var img = new Image()
            img.onload = function() {
                var w = img.width
                var h = img.height

                let ratio = h / w
                let scale = 3.5

                let texture = _this.textureLoader.load(img.src)

                let material = createEquillMaterial({
                    texture,
                    width: w,
                    height: h,
                });

                let equill = new THREE.Mesh(new THREE.PlaneGeometry(scale, scale * ratio, 100, 100), material)
                equill.position.z = Math.range(Math.random(), 0, 1, -2, -5)
                let depth = equill.position.z * .5

                switch (loadedMeshes) {
                    /** top */
                    case 0:
                        // equill.position.x = Math.range(Math.random(), 0, 1, -2.5 * depth, -1)
                        // equill.position.y = Math.range(Math.random(), 0, 1, 1.5 * depth, 2 * depth)
                        equill.position.x = -2.5
                        equill.position.y = 2.5
                        break

                    case 1:
                        // equill.position.x = Math.range(Math.random(), 0, 1, 1.5 * depth, 3 * depth)
                        // equill.position.y = Math.range(Math.random(), 0, 1, 1.5 * depth, 2 * depth)
                        equill.position.x = 1.5
                        equill.position.y = 3
                        break


                    /** Mid */
                    case 2:
                        // equill.position.x = Math.range(Math.random(), 0, 1, -4.5 * depth, -2.5 * depth)
                        // equill.position.y = Math.range(Math.random(), 0, 1, -depth, depth)
                        equill.position.x = -5
                        equill.position.y = -.5
                        break

                    case 3:
                        // equill.position.x = Math.range(Math.random(), 0, 1, 2.5 * depth, 4.5 * depth)
                        // equill.position.y = Math.range(Math.random(), 0, 1, -depth, depth)
                        equill.position.x = 5.1
                        equill.position.y = .3
                        break


                    /** Bottom */
                    case 4:
                        // equill.position.x = Math.range(Math.random(), 0, 1, -2.5 * depth, -1)
                        // equill.position.y = Math.range(Math.random(), 0, 1, -1.5 * depth, -2 * depth)
                        equill.position.x = -1
                        equill.position.y = -3.3
                        break

                    case 5:
                        // equill.position.x = Math.range(Math.random(), 0, 1, .5 * depth, 2 * depth)
                        // equill.position.y = Math.range(Math.random(), 0, 1, -1.5 * depth, -2 * depth)
                        equill.position.x = 4
                        equill.position.y = -2.8
                        break
                }

                equill.href = letrism.href;
                equill.strength = 0;

                equillsMeshes.push(equill)
                equillsGroup.add(equill)
                objectsToTest.push(equill)
                updateMeshesScale();

                loadedMeshes ++;
            }

            img.src = src
        }


         const shaders = {
             vertexShader: `
                uniform vec2 uSize;
                uniform vec2 uHover;
                uniform float uAnimate;
                uniform float uStrength;
                uniform float uDisplacementScale;
                
                uniform float uSignal;
                
                varying vec2 vUv;
                
                void main()
                {
                    vec3 pos = position;
                
                    float ratio = uSize.x / uSize.y;
                    vec2 squaredUv = vec2(
                        uv.x,
                        uv.y / ratio
                    );
                
                    vec2 squaredCenter = vec2(
                        .5,
                        .5 / ratio
                    );
                    
                    vec2 squaredHover = vec2(
                        uHover.x,
                        uHover.y / ratio
                    );
                
                    float blackGradient = distance( squaredUv, squaredHover ) * .75;
                    blackGradient = 1. - pow(blackGradient, 2. + blackGradient * blackGradient);
                    blackGradient = clamp(blackGradient, 0., 10.);
                
                    float ripples = abs( sin( (blackGradient * 10.) + uAnimate) );
                
                    float radialMask = 1. - distance( squaredUv, squaredHover ) * 1.05;
                    radialMask = clamp(radialMask, 0., 10.);
                
                    pos.z += ripples * radialMask * uStrength * uDisplacementScale;
                
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    vUv = uv;
                }
             `,

             fragmentShader: `
                uniform vec3 uColor;
                uniform vec2 uSize;
                uniform vec2 uHover;
                uniform float uStrength;
                uniform sampler2D tMap1;
                
                uniform float uProgress;
                uniform float uSignal;
                
                uniform float uAnimate;
                
                varying vec2 vUv;
                
                #pragma glslify: rangeF = require('../../shaders/modules/rangeF.glsl')
                
                
                void main() {
                    float ratio = uSize.x / uSize.y;
                    vec2 squaredUv = vec2(
                        vUv.x,
                        vUv.y / ratio
                    );
                
                    vec2 squaredCenter = vec2(
                        .5,
                        .5 / ratio
                    );
                    
                    vec2 squaredHover = vec2(
                        uHover.x,
                        uHover.y / ratio
                    );
                
                    vec4 tex1 = texture2D(tMap1, vUv);
                
                    float blackGradient = distance( squaredUv, squaredHover ) * .75;
                    blackGradient = 1. - pow(blackGradient, 2. + blackGradient * blackGradient);
                    blackGradient = clamp(blackGradient, 0., 10.);
                
                    float ripples = abs( sin( (blackGradient * 10.) + uAnimate) );
                
                    float radialMask = 1. - distance( squaredUv, squaredHover ) * 1.05;
                    radialMask = clamp(radialMask, 0., 10.);

                    float uBorderWidth = 0.005;
                    float borderStep = .5 - uBorderWidth;
                    vec2 borderAspectRatio = vec2(.5 - (uBorderWidth*ratio), borderStep);

                    float borderX = step(borderAspectRatio.x, abs(vUv.y - 0.5) );
                    float borderY = step(borderAspectRatio.y, abs(vUv.x - 0.5) );
                    float border = borderX + borderY;
                    border *= uStrength;
                
                    vec4 color = tex1;
                    color += border;
                    gl_FragColor = color;
                }
             `
         };

         /**
         * GUI
         */
        _this.Debugger = window.Utils.gui.addFolder('Scene10');
        _this.Debugger.open();
        _this.controller = {};

        // Scene animation speed
        _this.controller.speed = _this.controller.currentSpeed = 0.137
        _this.controller.lerpSpeed = 0.01
        _this.Debugger.add(_this.controller, 'speed').min(0).max(1).step(0.001).name('Scene speed');
        _this.Debugger.add(_this.controller, 'lerpSpeed').min(0.0001).max(0.1).step(0.0001).name('Scene lerp speed');


        /**
         * Texture loader
         */
        _this.loadingManager =  new THREE.LoadingManager()
        _this.textureLoader = new THREE.TextureLoader(_this.loadingManager)
        _this.texture1 = _this.textureLoader.load('img/map2.jpg')


        /**
         * Scene
         */
        _this.scene = new THREE.Scene()


        /**
         * Object
         */

        const totalEquills = 6;
        var equillsMeshes = [];
        var equillsGroup = new THREE.Group();
        _this.scene.add(equillsGroup);

        var moveAmplitude = new THREE.Vector2(1.5, .5);
        var glCursorLerped = new THREE.Vector2(0,0);

        // Scene animation speed
        _this.controller.groupFrictionX = 0.025;
        _this.controller.groupFrictionY = 0.015;
        _this.Debugger.add(_this.controller, 'groupFrictionX').min(0.00001).max(0.04).step(0.000001).name('Group friction X');
        _this.Debugger.add(_this.controller, 'groupFrictionY').min(0.00001).max(0.04).step(0.000001).name('Group friction Y');


        function createEquillMaterial({color, texture, width, height} = {}) {
            return new THREE.ShaderMaterial({
                vertexShader: shaders.vertexShader,
                fragmentShader: shaders.fragmentShader,
                side: THREE.DoubleSide,
                transparent: true,
                depthTest: false,
                uniforms: {
                    uColor: { value: new THREE.Color( color || 0x999999 ) },
                    uSize: { value: new THREE.Vector2(width || 1, height || 1) },
                    uHover: { value: new THREE.Vector2(.5,.5) },
                    uStrength: { value: 0 },
                    uDisplacementScale: { value: 0 },
                    tMap1: { value: texture },
                    
                    uProgress: { value: 0.6 },
                    uSignal: { value: 0.5 },
                    
                    uAnimate: { value: 0 },
                },
            });
        }

        _this.controller.displacementScale = .5;
        _this.Debugger.add(_this.controller, 'displacementScale').min(-1).max(1).step(0.001).name('Displacement scale').onFinishChange(updateMeshesScale);
        function updateMeshesScale() {
            equillsMeshes.forEach(equill => {
                equill.material.uniforms.uDisplacementScale.value = _this.controller.displacementScale;
            });
        }


        /**
         * Raycaster
         */
        const raycaster = new THREE.Raycaster()
        Utils.cursor.glPos = new THREE.Vector2(0,0);


        /**
         * Animations
         */
        let animate = 0;
        let currentIntersect = null;
        const objectsToTest = [];

        _this.scene.update = function() {
            let time = Utils.elapsedTime;

            /** Raycaster */
            raycaster.setFromCamera(
                Utils.cursor.glPos,
                window.cam
            );
            const intersects = raycaster.intersectObjects(objectsToTest);


            if(intersects.length) {
                if(!currentIntersect) {
                    // console.log('mouse enter')
                    document.body.style.cursor = 'pointer'
                }

                if (currentIntersect && currentIntersect != intersects[0]) {
                    currentIntersect.object.material.uniforms.uColor.value = new THREE.Color(0xffffff)
                    currentIntersect.object.strength = 0;
                }

                currentIntersect = intersects[0]

                let mouseCenter = new THREE.Vector2(currentIntersect.uv.x, currentIntersect.uv.y)
                let center = new THREE.Vector2(currentIntersect.object.material.uniforms.uHover.value.x, currentIntersect.object.material.uniforms.uHover.value.y)
                center = Math.verletVec(center, mouseCenter, 0.15);

                
                currentIntersect.object.material.uniforms.uColor.value = new THREE.Color(0xff0000)
                currentIntersect.object.material.uniforms.uHover.value = new THREE.Vector2(center.x, center.y)
                currentIntersect.object.strength = 1;
                
            } else {
                if(currentIntersect) {
                    // console.log('mouse leave')
                    document.body.style.cursor = 'unset'
                }
                
                equillsMeshes.forEach(equill => {
                    equill.material.uniforms.uColor.value = new THREE.Color(0xffffff);
                    equill.strength = 0;
                });
                currentIntersect = null
            }



            _this.controller.currentSpeed = Math.verlet(
                _this.controller.currentSpeed,
                _this.controller.speed,
                _this.controller.lerpSpeed
            );
            animate += _this.controller.currentSpeed * 0.1;

            equillsMeshes.forEach((mesh, index) => {
                mesh.material.uniforms.uAnimate.value = animate;
                mesh.material.uniforms.uStrength.value = Math.verlet(mesh.material.uniforms.uStrength.value, mesh.strength, 0.05);
            });


            ////* Group position update *////
            glCursorLerped.x = Math.verlet(glCursorLerped.x, Utils.cursor.glPos.x, _this.controller.groupFrictionX);
            glCursorLerped.y = Math.verlet(glCursorLerped.y, Utils.cursor.glPos.y, _this.controller.groupFrictionY);
            
            equillsGroup.position.x = glCursorLerped.x * moveAmplitude.x * -1;
            equillsGroup.position.y = glCursorLerped.y * moveAmplitude.y * -1;

        }


        /**
         * Event Handlers
         */
         window.addEventListener('click', () => {
            if(currentIntersect)
            {
                if( equillsMeshes.indexOf(currentIntersect.object) ) {
                    console.log('clicked on', currentIntersect.object);
                    window.location.href = currentIntersect.object.href;
                }
            }
        })
 
         
    }
}