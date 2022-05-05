import Model from "@lib/engine/model";
import WebGL from "@lib/webGL";
import { radToDeg } from "@utils/index";
class Orbit extends Model{

    public velocity : number = 0;
    public active : boolean = true;
    start(): void {
    }
    update(){
        if(this.active) this.transform.rotation.y += radToDeg(this.velocity);
        /*
        switch(this.name){
            case "EarthOrbit": this.transform.rotation.y += 0.01;break;
            case "MoonOrbit": this.transform.rotation.y += 0.09;break;
            case "MarsOrbit": this.transform.rotation.y += 0.005;break;
        }*/
    }
}
export default Orbit;