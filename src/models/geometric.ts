import Model from "@lib/engine/model";
class Geometric extends Model{

    start() {
     //   this.addEvent("keydown",this.move);
    }
    update(){
      //  this.transform.rotation.y += 0.01;
    }

    /* Metodos personalizados (Temporário) */
    move = ({ key }) => {
        switch (key) {
            case "ArrowRight":
                this.transform.translation.x += 1;
                break;
            case "ArrowLeft":
                this.transform.translation.x -= 1;
                break;
            case "ArrowUp":
                this.transform.translation.y -= 1;
                break;
            case "ArrowDown":
                this.transform.translation.y += 1;
                break;
        }
    }
}
export default Geometric;