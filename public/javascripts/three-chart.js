function three() {
    // global variables
    var renderer;
    var scene;
    var camera;

    function init() {

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render, sets the background color and the size
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x0ffffff, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);

        // create a cube and add to scene
        var cubeGeometry = new THREE.BoxGeometry(10 * Math.random(), 10 * Math.random(), 10 * Math.random());
        var cubeMaterial = new THREE.MeshNormalMaterial();
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.name = 'cube';
        scene.add(cube);

        // position and point the camera to the center of the scene
        camera.position.x = 15;
        camera.position.y = 16;
        camera.position.z = 13;
        camera.lookAt(scene.position);


        container = document.getElementById( 'three' );
//        document.body.appendChild( container );

        // add the output of the renderer to the html element
//        document.body.appendChild(renderer.domElement);
        container.appendChild(renderer.domElement);

        // call the render function
        render();
    }

    function render() {
        renderer.render(scene, camera);
        renderer.setSize(350, 250);
        scene.getObjectByName('cube').rotation.x += 0.05;
        requestAnimationFrame(render);
    }

    init();
}