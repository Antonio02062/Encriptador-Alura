// todo:    Como hacer que el enter ejecute tal boton
// todo:    Hacer validacion de caracteres especiales

const EncryptRules = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat" 
};
// ?Procedemos a crear un nuevo objeto con las claves y valores intercambiados, para desencriptar. https://ultimatecourses.com/blog/reverse-object-keys-and-values-in-javascript 
const DecryptRules = Object.fromEntries(Object.entries(EncryptRules).map(([key, value]) => [value,key]));


var HasToEncryptText = true;    

function ProcessText(){
    let InputText = document.getElementById("Input").value;
    if (CheckEmptyInput(InputText) == false){return 0;} // Se valida que la entrada sea válida

    // * https://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings
    if(HasToEncryptText){
            // ? De esta manera si queremos poner mas reglas de encriptado, será mas sencillo, solo se modifica el objeto.
        let ParameterRegExp = new RegExp(Object.keys(EncryptRules).join("|"),"gi");
            // ? la expresión regular que se está utilizando para buscar coincidencias en la cadena TextToEncrypt es ParameterRegExp. 
            // ? Si un carácter en la cadena InputText coincide con esta expresión regular, entonces se utiliza una función flecha 
            // ? para reemplazar ese carácter con su correspondiente valor cifrado en el objeto EncryptRules.
        let OutputText = InputText.replace(ParameterRegExp, (letter) => EncryptRules[letter.toLowerCase()]);
    
        document.getElementById("Output").value = OutputText.toLowerCase();
        return 0;
    }

    let ParameterRegExp = new RegExp(Object.values(EncryptRules).join("|"),"gi");
    var OutputText = InputText.replace(ParameterRegExp, (letter) => DecryptRules[letter.toLowerCase()]);

    document.getElementById("Output").value = OutputText.toLowerCase();

}

function SwitchEncryptDecrypt(){
    // Se hace la negacion de la variable, para pasarla a True o False
    HasToEncryptText = !HasToEncryptText;
    
    
    if(HasToEncryptText){
        document.getElementById("SwitchButton").textContent = "Modo: Encriptador";
        SwapInputs();
        return 0;
    }
    
    
    document.getElementById("SwitchButton").textContent = "Modo: Desencriptador";
    SwapInputs();
    

}

function CleanInputText(){

    if (document.getElementById("Input").value != "") {
        document.getElementById("Input").value = "", document.getElementById("Output").value = "";
        return 0;
    }

    Swal.fire({
        title: '¡Hey!',
        text: 'No hay nada que limpiar.',
        icon: 'error',
        confirmButtonText: '¡Entendido!'
      })

}

function SwapInputs(){
    [document.getElementById("Input").value, document.getElementById("Output").value] = [document.getElementById("Output").value,  document.getElementById("Input").value];
}

function CheckEmptyInput(TextToProcess) {
    if (!TextToProcess.length) {
        // console.log("String vacio")
        Swal.fire({
            title: '¡Hey!',
            text: 'Aún, no has escrito nada.',
            icon: 'error',
            confirmButtonText: '¡Entendido!'
          })
        return false;       
    }
}

function CopyToClipboard() {
    // Obtener el elemento textarea
    var OutputTextarea = document.getElementById("Output");
    var Text = OutputTextarea.value;
    
    // Utilizar el API Clipboard para copiar el texto al portapapeles
    navigator.clipboard.writeText(Text)
      .then(function() {
        Swal.fire({
            title: '¡Hey!',
            text: 'Texto copiado al portapapeles.',
            icon: 'success',
            confirmButtonText: '¡Entendido!'
        })
      })
      .catch(function(err) {
        Swal.fire({
            title: '¡Hey!',
            text: 'El Texto no se ha copiado al portapapeles.',
            icon: 'error',
            confirmButtonText: '¡Entendido!'
        })
      });
  }



