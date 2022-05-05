import Model from "@lib/engine/model";
import WebGL from "@lib/webGL";
import { radToDeg } from "@utils/index";
class Planet extends Model{

    public velocity : number = 0;
    public active : boolean = true;
    start(): void {
    }
    update(){
        if(this.active)this.transform.rotation.y += radToDeg(this.velocity);
        /*
        switch(this.name){
            case "Sun": this.transform.rotation.y += 0.005;break;
            case "Earth": this.transform.rotation.y += 0.05;break;
            case "Moon": this.transform.rotation.y += -0.01;break;
            case "Mars": this.transform.rotation.y += -0.01;break;
        }*/
    }
}
export default Planet;