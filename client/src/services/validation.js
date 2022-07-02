export class PlantObjectValidator{
    constructor(plantInfo){
        this.plantInfo = plantInfo; 
        this.hasAllRequiredFields = true; 
        this.inputNumberIsValid = true; 
    }
    
    validate(){ 
        if (!(this.plantInfo.name.trim() !== "" && this.plantInfo.category.trim() !== "" && this.plantInfo.quantity !== 0 && this.plantInfo.size.trim() !== "" && this.plantInfo.description.trim() !== "" && this.plantInfo.price !== 0 && this.plantInfo.selectedFiles.length !== 0)) {
            this.hasAllRequiredFields = false; 
        } else if (isNaN(parseInt(this.plantInfo.quantity)) || parseInt(this.plantInfo.quantity) < 0) {
            this.inputNumberIsValid = false;     
        } else if (isNaN(parseInt(this.plantInfo.price)) || parseInt(this.plantInfo.price) < 0) {
            this.inputNumberIsValid = false;
        } else {
            return true;
        }
        return this.hasAllRequiredFields && this.inputNumberIsValid; ;
    } 
}