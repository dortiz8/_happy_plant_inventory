export default class generalPlantInfo {
    constructor(name, type) {
        this.name = name;
        this.category = type;
        this.multiple = []; 
    }

    add(plantSpecifics){
        this.multiple.push(plantSpecifics)
    }
}