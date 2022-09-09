
import selectedFile from '../models/fileClass';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export async function setFileSelection(event, object, setObject) {
    let files = event.target.files;
    let tempArray = [];

    if (files) {
        for (let i = 0; i < files.length; i++) {
            let selectedFileObj = new selectedFile(files[i].name, files[i].type, files[i].size, await toBase64(files[i]));
            tempArray.push(selectedFileObj);
        };
    }
    setObject({ ...object, selectedFiles: tempArray })
}