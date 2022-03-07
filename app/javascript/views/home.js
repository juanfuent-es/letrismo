import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Home {
    constructor({parent} = {}) {
        this.parent = parent

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
         renderer.setSize(Utils.sizes.width, Utils.sizes.height)
         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


         this.initScene();

        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(75, Utils.sizes.width / Utils.sizes.height)
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
         const controls = new OrbitControls(camera, canvas)
         controls.enableDamping = true
 
 
         // Resizing
         function sceneResizeHandler() {
             // Update camera
             camera.aspect = Utils.sizes.width / Utils.sizes.height
             camera.updateProjectionMatrix()
 
             // Update renderer
             renderer.setSize(Utils.sizes.width, Utils.sizes.height)
             renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
         }

         Utils.resizeCallbacks.push(sceneResizeHandler);

         const clock = new THREE.Clock();

        const tick = (e) =>
        {
            // Utils update
            Utils.elapsedTime = clock.getElapsedTime();
                
            // Update controls
            controls.update()

            //  Scene updatee
            _this.scene.update();
                
            // Render
            renderer.render(_this.scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)

            // // Save frame CCapture
            // capturer.capture( canvas );
        }

        tick();
 
    }

    initScene() {
        var _this = this;
        /**
         * GUI
         */
         const scene1Debugger = window.Utils.gui.addFolder('Scene1');
         scene1Debugger.open();
         const scene1Controller = {};

        /**
         * Texture loader
         */
        _this.loadingManager =  new THREE.LoadingManager()
        _this.textureLoader = new THREE.TextureLoader(_this.loadingManager)
        _this.thumbnails = document.getElementsByClassName('letrism-thumb');
        let thumbSize = _this.thumbnails[0];
        let thumbSrc = letrisms[0].src;
        _this.texture1 = _this.textureLoader.load(thumbSrc);


        letrisms.forEach(letrism => {
            loadImage(letrism);
        });

        function loadImage(letrism) {
            var src = letrism.src
            var img = new Image()
            console.log('loading image');
            img.onload = function() {
                var w = img.width
                var h = img.height

                let ratio = h / w
                let scale = 2

                var mesh = new THREE.Mesh(
                    new THREE.PlaneGeometry(scale, scale * ratio),
                    material
                );

                _this.texture1 = _this.textureLoader.load(img.src)
                mesh.material.uniforms.tMap1.value = _this.texture1
                
                console.log(mesh);
                
                
                _this.scene.add(mesh)
            }

            img.src = src
            console.log(img.src);
        }
 
 
         /**
          * Scene
          */
         _this.scene = new THREE.Scene()
 
 
         /**
          * Object
          */
         const geometry = new THREE.PlaneGeometry(2, 2)
         const material = new THREE.ShaderMaterial({
             vertexShader: `
                varying vec2 vUv;

                void main()
                {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    vUv = uv;
                }
             `,

             fragmentShader: `
                uniform float uThickness;
                uniform float uRipples;
                uniform float uAnimate;
                uniform sampler2D tMap1;
                
                varying vec2 vUv;
                
                void main() {
                    float circle = distance(vUv, vec2(.5));
                    circle -= mod(uAnimate, 1.);
                    float square1 = step(0.495, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
                
                    float totalRipples = uRipples * 2.;
                    float ripples = mod(circle * (totalRipples), 1.);
                    ripples = 1. - smoothstep(uThickness, uThickness + .02, ripples);
                
                    vec4 tex1 = texture2D(tMap1, vUv);
                    
                    vec4 color = tex1 * ripples;
                
                    gl_FragColor = color;
                }
             `,
             side: THREE.DoubleSide,
             transparent: true,
             depthTest: false,
             uniforms: {
                    uThickness: { value: 0.4 },
                    uRipples: { value: 4 },
                    uAnimate: { value: 0 },
                    tMap1: { value: _this.texture1 },
             },
         });
 
         scene1Controller.uThickness = scene1Debugger.add(material.uniforms.uThickness, 'value').min(0.00001).max(0.95).step(0.00001).name('uThickness');
         // midiEvents.addEventListener('K1_change', updateThickness);
         
         scene1Controller.uRipples = scene1Debugger.add(material.uniforms.uRipples, 'value').min(1).max(30).step(1).name('uRipples');
 
 
        //  const mesh = new THREE.Mesh(geometry, material)
        //  _this.scene.add(mesh)
 
 
         /**
          * Camera
          */
         const camera = new THREE.PerspectiveCamera(75, Utils.sizes.width / Utils.sizes.height)
         camera.position.z = 9
         _this.scene.add(camera)
         _this.scene.myCamera = camera;
 
 
         /**
          * Animations
          */
         _this.scene.update = function() {
             let time = Utils.elapsedTime * 1;
 
             let animate = time * 0.075;
             material.uniforms.uAnimate.value = animate;
         }
    }
}