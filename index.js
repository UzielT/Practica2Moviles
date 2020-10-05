function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var canciones = document.getElementById("Input3").value;
    var genero = document.getElementById("Input4").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var Disco = {
            id, //matricula:id
            nombre,
            canciones,
            genero,
        }

        var lista_Discos=JSON.parse(localStorage.getItem("Discos"));

        if(lista_Discos==null)
        { 
            var lista_Discos = [];
        }
        
        const existe = lista_Discos.some(element=>element.id==id); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_Discos=lista_Discos.filter(Disco=>Disco.id!=id);

            }
                
            lista_Discos.push(Disco);
            var temporal = lista_Discos.sort((a,b) => a.id-b.id);
            localStorage.setItem("Discos", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de alumno","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_Discos = JSON.parse(localStorage.getItem("Discos"));
    
     
    if(lista_Discos)
    {
        lista_Discos.forEach((Disco)=>printRow(Disco));
    }
}


function printRow(Disco){
    
    if(Disco!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Disco.id;
        cell2.innerHTML = Disco.nombre; 
        cell3.innerHTML = Disco.canciones;
        cell4.innerHTML = Disco.genero; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${Disco.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+Disco.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_Discos = JSON.parse(localStorage.getItem("Discos"));
    var temporal=lista_Discos.filter(Disco=>Disco.id!=id);
    localStorage.setItem("Discos", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Discos");
    }
 
    read();
    
}

function seekR(id){

    const lista_Discos = JSON.parse(localStorage.getItem("Discos"));
    var Disco=lista_Discos.filter(Disco=>Disco.id==id);
    //console.log(Diso[0]);
    updateR(Disco[0]);
}

function updateR(Disco){
    if(Disco!=null)
    {
        document.getElementById("Input1").value=Disco.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Disco.nombre;
        document.getElementById("Input3").value=Disco.canciones;
        document.getElementById("Input4").value=Disco.genero;
    }
}


//Para consulta de Disco
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;
  
    const lista_Discos = JSON.parse(localStorage.getItem("Discos"));
    var DiscosC=lista_Discos.filter(Disco=>Disco.genero==c);
    if(DiscosC)
    {
        DiscosC.forEach((Disco)=>printRowQ(Disco));
    }
    //console.log(DiscosC)

}


function printRowQ(Disco){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Disco.id;
    cell2.innerHTML = Disco.nombre; 
    cell3.innerHTML = Disco.canciones;
    cell4.innerHTML = Disco.genero; 
   
}
