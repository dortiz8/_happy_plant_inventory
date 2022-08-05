export class PlantObjectValidator{
    constructor(plantInfo){
        this.plantInfo = plantInfo; 
        this.hasAllRequiredFields = true; 
        this.inputNumberIsValid = true; 
    }
    
    validatePlantObject(){ 
        if (this.plantInfo.name.trim() == "" || this.plantInfo.category.trim() == "" ) {
            this.hasAllRequiredFields = false; 
        }
        return this.hasAllRequiredFields && this.inputNumberIsValid; ;
    } 
    validatePlantDetailsObject() {
        if (this.plantInfo.description == "" || this.plantInfo.price == 0 || this.plantInfo.type == "" || this.plantInfo.selectedFiles.length == 0) {
            // Fill out entire form
            this.hasAllRequiredFields = false; 
        } else if (isNaN(this.plantInfo.price) || parseInt(this.plantInfo.price) < 0) {
            this.inputNumberIsValid = false; 
        }
        return this.hasAllRequiredFields && this.inputNumberIsValid;
    }
}