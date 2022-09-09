export default class generalPlantInfo {
    constructor(name, type) {
        this.name = name;
        this.genus = type;
        this.multiple = []; 
    }

    add(plantSpecifics){
        this.multiple.push(plantSpecifics)
    }
}