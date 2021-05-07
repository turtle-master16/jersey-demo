import { Engine, Scene, Color4, HemisphericLight, Vector3, ArcRotateCamera, Tools, SceneLoader } from "babylonjs";
import "babylonjs-loaders"

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);

function createScene() {
    let scene = new Scene(engine);
    scene.clearColor = Color4.FromHexString("#222222FF");

    createLight(scene);
    createCamera(scene);
    loadAsset(scene);

    return scene;
}

function createLight(scene) {
    let light = new HemisphericLight("light", new Vector3(0, 5, 0), scene);
    light.intensity = 2;
}

function createCamera(scene) {
    let camera = new ArcRotateCamera("cam", Tools.ToRadians(45), Tools.ToRadians(45), 2, new Vector3(0, 4, 0), scene);
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 20;
    camera.attachControl(canvas, true);
}

function loadAsset(scene) {
    SceneLoader.ImportMesh('', './assets/', 'jersey.glb', scene);
}


let scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});