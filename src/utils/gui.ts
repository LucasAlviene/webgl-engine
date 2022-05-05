import WebGL from '@lib/webGL';
import Camera from '@lib/camera'
import * as dat from 'dat.gui';
import Model from '@lib/engine/model';
import Vector3 from '@lib/engine/vector3';
import m4 from './m4';
import Planet from '@models/planet';
import Orbit from '@models/orbit';
import Geometric from '@models/Geometric';
import Transform from '@lib/engine/transform';
import Animations, { AnimationProperty } from '@lib/animation';
import Color from '@lib/color';
/*
function getProperties(obj){
    const list = [];
    Object.entries(obj).map(([propriety,object]) => {
        const type = object.constructor.name;
        const isJSDefault = type == "Number" || type == "Object" || type == "Boolean" || type == "String" || type == "Function";
        list.push({name:propriety,value:object,type,isJSDefault});
    });
    console.log(list);
    return list;
    console.log(list);
}*/

class Gui {

    private static main: dat.GUI;

    /* Models */
    private static modelsController: dat.GUIController[] = [];

    static updateModels() {
        const names = ["None"];
        Model.gameObjects.map((item) => names.push(item.name));
        for (const key in this.modelsController) {
            const { object } = this.modelsController[key];
            if (object instanceof Transform) {
                this.modelsController[key] = this.modelsController[key].options(names.filter((name) => name != object.model.name));;
            } else {
                this.modelsController[key] = this.modelsController[key].options(names);
            }
        }
    }

    static GameObject(name: string, gameObject: any) {
        const { width, height } = WebGL.getContext().canvas;
        const main = Gui.main.addFolder(name);
        main.add(gameObject, 'enabled');
        if (gameObject.active) main.add(gameObject, 'active').name("Animacao");
        main.addColor(gameObject, 'color');
        this.modelsController.push(main.add(gameObject.transform, "parentGui", ["None"]).name("Parent"));
        const translation = main.addFolder("Translation");
        //console.log(gameObject.transform);
        //translation.add(gameObject.transform, 'TranslationType', ['Linear', 'Bezier', 'Spline'])
        translation.add(gameObject.transform.translation, 'x', -200, 200).listen();
        translation.add(gameObject.transform.translation, 'y', -200, 200).listen();
        translation.add(gameObject.transform.translation, 'z', -100, 100).listen();

        const scale = main.addFolder("Scale");
        scale.add(gameObject.transform.scale, 'x', 0, 10)//.listen();
        scale.add(gameObject.transform.scale, 'y', 0, 10)//.listen();
        scale.add(gameObject.transform.scale, 'z', 0, 10)//.listen();

        const rotation = main.addFolder("Rotation");
        rotation.add(gameObject.transform.rotation, 'x', 0, 360, 0.5).listen();
        rotation.add(gameObject.transform.rotation, 'y', 0, 360, 0.5).listen();
        rotation.add(gameObject.transform.rotation, 'z', 0, 360, 0.5).listen();

        const animation = main.addFolder("Animation");
        animation.add(gameObject.animation.translation, 'x', -200, 200, 0.5).listen();
        animation.add(gameObject.animation.translation, 'y', -200, 200, 0.5).listen();
        animation.add(gameObject.animation.translation, 'z', -200, 200, 0.5).listen();
        animation.add(gameObject.animation, 'velocity', 0, 100, 10);
        animation.add(gameObject.animation, 'type', ['Linear', 'Bezier', 'Spline']);
        animation.add(gameObject.animation, 'animate');
        const config = {
            remove: () => {
                Model.Destroy(name);
                Gui.main.removeFolder(main);
            }
        }
        main.add(config, "remove");
        this.updateModels();
        //Gui.targetController = Gui.targetController.options(names)
    }

    static add() {
        const main = Gui.main.addFolder("Novos Modelos");
        let i = 0;
        const config = {
            Cube: () => {
                Geometric.Create("Cube " + (i++), WebGL.mesh.cube);
            },
            Cone: () => {
                Geometric.Create("Cone " + (i++), WebGL.mesh.cone);
            },
            Sphere: () => {
                Geometric.Create("Sphere " + (i++), WebGL.mesh.sphere);
            },
            Chair: () => {
                const chair = Geometric.Create("Chair " + (i++), WebGL.mesh.chair);
                chair.transform.scale = new Vector3(10, 10, 10);
            },
            SolarSystem: () => {
                const solarSystemNode = Orbit.Create("solarSystemNode");
                const sun = Planet.Create("Sun", WebGL.mesh.sphere) as Planet;
                sun.velocity = -0.05;
                sun.color = [255, 255, 100, 255];
                sun.transform.parent = solarSystemNode;
                sun.transform.scale = new Vector3(5, 5, 5);

                const earthOrbit = Orbit.Create("EarthOrbit") as Orbit;
                earthOrbit.velocity = -0.01;
                earthOrbit.transform.parent = solarSystemNode;
                earthOrbit.transform.translation.x = 100;

                const earth = Planet.Create("Earth", WebGL.mesh.sphere) as Planet;
                earth.velocity = -0.05;
                earth.color = [90, 150, 255, 255];
                earth.transform.parent = earthOrbit;
                earth.transform.scale = new Vector3(1, 1, 1)

                const moonOrbit = Orbit.Create("MoonOrbit") as Orbit;
                moonOrbit.velocity = -0.005;
                moonOrbit.transform.parent = earthOrbit;
                moonOrbit.transform.translation.x = 20;

                const moon = Planet.Create("Moon", WebGL.mesh.sphere) as Planet;
                moon.velocity = -0.01;
                moon.color = [150, 150, 150, 255];
                moon.transform.parent = moonOrbit;
                moon.transform.scale = new Vector3(0.4, 0.4, 0.4);

                const marsOrbit = Orbit.Create("MarsOrbit") as Orbit;
                marsOrbit.velocity = -0.008;
                marsOrbit.transform.parent = solarSystemNode;
                marsOrbit.transform.translation.x = 200;

                const mars = Planet.Create("Mars", WebGL.mesh.sphere) as Planet;
                mars.velocity = -0.02;
                mars.color = [200, 50, 50, 255]
                mars.transform.parent = marsOrbit;
                mars.transform.scale = new Vector3(1, 1, 1)
            },
            Hall: function(){
                const Point = Model.Create("Point");
                const Floor = Geometric.Create("Floor", WebGL.mesh.cube);
                Floor.transform.parent = Point;
                Floor.transform.translation = new Vector3(0,-25,0);
                Floor.transform.scale = new Vector3(10,1,50);
                Floor.color = [90,90,90,255];
                for(let i= 0;i<50;i++){
                    const itemLeft = Geometric.Create("Cube " + (i++), WebGL.mesh.cube);
                    itemLeft.transform.parent = Point;
                    itemLeft.transform.translation = new Vector3(-25,0,-500 + 10 * i);
                    const itemRight = Geometric.Create("Cube " + (i++), WebGL.mesh.cube);
                    itemRight.transform.parent = Point;
                    itemRight.transform.translation = new Vector3(25,0,-500 + 10 * i);
                }
            }
        }
        config.Cube();
        main.add(config, "Cube");
        main.add(config, "Cone");
        main.add(config, "Sphere");
        main.add(config, "Chair");
        main.add(config, "SolarSystem");
        main.add(config, "Hall");
    }

    /* Camera */

    static camera() {
        new Camera("Camera 2",new Vector3(10,-10,10));
        new Camera("Camera 3",new Vector3(0,0,-50));
        const main = Gui.main.addFolder("Camera");
        main.add(Camera,"_camera",["Camera 1","Camera 2","Camera 3"]).name("Cameras");
        const translation = main.addFolder("Position");
        translation.add(Camera.main.position, 'x', -500, 500)
        translation.add(Camera.main.position, 'y', -500, 500)
        translation.add(Camera.main.position, 'z',-500,500)
        translation.add(Camera.main.config, 'zoom', 1, 200);
        const rotation = main.addFolder("Rotation");
        rotation.add(Camera.main.rotation, 'x', 0, 360, 0.5)
        rotation.add(Camera.main.rotation, 'y', 0, 360, 0.5)
        rotation.add(Camera.main.rotation, 'z', 0, 360, 0.5)
        const scale = main.addFolder("Scale");
        scale.add(Camera.main.scale, 'x', 1, 10, 0.5)
        scale.add(Camera.main.scale, 'y', 1, 10, 0.5)
        scale.add(Camera.main.scale, 'z', 1, 10, 0.5)
        const config = main.addFolder("Config");
        config.add(Camera.main.config, 'fear', 1, 2000);
        config.add(Camera.main.config, 'near', 1, 2000);
        config.add(Camera.main.config, 'fieldOfViewRadians', 0, 179);
        this.modelsController.push(config.add(Camera.main.config, 'target', ['None']));
    }

    /* Animações */

    static updateListAnimation() {
        const names = Object.keys(Animations.listAnimations);
        console.log(names);
        Gui.animationController = Gui.animationController.options(["None", ...names]);
    }

    static animationController: dat.GUIController;

    static singleAnimation(main: dat.GUI, name: string, animationClass?: Animations) {
        const Animation = animationClass ?? new Animations(name);
        const animFolder = main.addFolder(name);
        let i = 1;
        const config = {
            add: function (configAnimate?) {
                const animate = animFolder.addFolder("Passo " + (i++))
                configAnimate = configAnimate ?? Animation.add(Vector3.zero);
                animate.add(configAnimate.to, "x", -200, 200)
                animate.add(configAnimate.to, "y", -200, 200)
                animate.add(configAnimate.to, "z", -200, 200)
                animate.add(configAnimate, "type", ["translation", "scale", "rotation"]);
                animate.add(configAnimate, "velocity", 0, 100);
            }
        }
        Gui.updateListAnimation();
        animFolder.add(config, "add").name("Adicionar");
        if (animationClass.animations.length > 0) {
            animationClass.animations.map((item) => config.add(item));
        }
    }

    static animation() {
        Animations.start();
        const main = Gui.main.addFolder("Animation");
        const config = {
            animation: "",
            model: "",
            animate: function () {
                Animations.listAnimations[this.animation].animate(Model.FindWithName(this.model));
            },
            add: function () {
                const name = prompt("Nome do Grupo de Animações");
                if (name) {
                    Gui.singleAnimation(main, name);
                }
            }
        }
        Gui.animationController = main.add(config, "animation", ['None']);
        this.modelsController.push(main.add(config, 'model', ['None']));
        Gui.updateListAnimation();
        main.add(config, "animate");
        main.add(config, "add").name("Adicionar Animações");
        Object.entries(Animations.listAnimations).map(([name, item]) => {
            Gui.singleAnimation(main, name, item as Animations);
        })
    }

    /* Start */

    static start() {
        Gui.main = new dat.GUI();
        this.add();
        this.camera();
        this.animation();
    }

}

export default Gui;

/*
       const properties = getProperties(gameObject);
       properties.map((item) => {
           if(item.isJSDefault){
               if(item.name == "palette"){
                   main.addColor(gameObject.palette, 'color');
               }else{
                   main.add(gameObject,item.name);
               }
           }else{
               switch(item.type){
                   case "Transform":
                       const Transform = main.addFolder("Transform");
                       const translation = Transform.addFolder("Translation");
                       translation.add(gameObject[item.name].translation, 'x', -200, 200).listen();
                       translation.add(gameObject[item.name].translation, 'y', -200, 200).listen();
                       translation.add(gameObject[item.name].translation, 'z', -100, 100).listen();
                       
                       const scale = Transform.addFolder("Scale");
                       scale.add(gameObject[item.name].scale, 'x', 0, 10).listen();
                       scale.add(gameObject[item.name].scale, 'y', 0, 10).listen();
                       scale.add(gameObject[item.name].scale, 'z', 0, 10).listen();

                       const rotation = Transform.addFolder("Rotation");
                       rotation.add(gameObject[item.name].rotation, 'x', 0, 360, 0.5).listen();
                       rotation.add(gameObject[item.name].rotation, 'y', 0, 360, 0.5).listen();
                       rotation.add(gameObject[item.name].rotation, 'z', 0, 360, 0.5).listen();
                   break;
               }
           }
       })

       return;*/