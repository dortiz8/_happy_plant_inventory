export default class plantSpecifics {
    constructor(description, price, type, selectedFiles, idx) {
        this.description = description; 
        this.price = price; 
        this.type = type; 
        this.selectedFiles = selectedFiles;
        this.idx = idx;
        this.saved = false;  
    }
}