import WebGL from "./lib/webGL";
import Gui from "./utils/gui";
import * as stars from "./stars.jpg";
console.log(stars);
const canvas = document.querySelector("canvas");
canvas.style.backgroundImage = `url(${stars})`
new WebGL(canvas);
WebGL.start();
Gui.start();
/*
const RectangleObject = new Rectangle();
const FObject = new F();

const gameObject = new GameObject<Rectangle>("Rectangle1",RectangleObject);
gameObject.transform.translation = new Vector3(50,50,0);
webGL.gameObject.push(gameObject);  

const gameObject2 = new GameObject<F>("Rectangle2",FObject);
gameObject2.transform.translation = new Vector3(0,0,0);
webGL.gameObject.push(gameObject2);
const cube = new Cube();
const gameObject3 = new GameObject<Cube>("Cube",cube);
gameObject3.transform.translation = new Vector3(0,0,0);
webGL.gameObject.push(gameObject3);*/
//requestAnimationFrame(gameLoop);
