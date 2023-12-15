//Declaramos nuestra clase para crear procesos
class Proceso {
  constructor(id, nombre, tiempoEjecucion, tiempoLlegada) {
    this.id = id;
    this.nombre = nombre;
    this.tiempoEjecucion = tiempoEjecucion;
    this.tiempoLlegada = tiempoLlegada;
    this.estado = "Listo";
  }

  mensaje() {
    return `Proceso ${this.id} | Nombre: ${this.nombre} | Llegada: ${this.tiempoLlegada} | CPU:${this.tiempoEjecucion} | Estado:${this.estado}`;
  }
  mensajeOrdenado(){
    return `Proceso ${this.id} | Nombre:${this.nombre} | CPU:${this.tiempoEjecucion} | Estado:${this.estado}`;
  }
}

// Clase que representa la aplicación
class App {
  constructor() {
    //Declaramos nuestra cola de procesos
    this.procesos = [];
    this.procesosOrdenados=[];
  }


  agregarProceso() {
    //Declaramos los valores del nombre del proceso y el tiempo
    const nombre = document.getElementById('nombre').value;
    const tiempoEjecucion = parseInt(document.getElementById('tiempo').value);
    const tiempoLlegada = parseInt(document.getElementById('llegada').value);

    //Revisar si los datos son correctos, si son numeros y si es mayor a cero
    if (nombre && !isNaN(tiempoEjecucion) && tiempoEjecucion > 0 && tiempoLlegada >= 0) {
      const nuevoProceso = new Proceso(this.procesos.length + 1, nombre, tiempoEjecucion, tiempoLlegada);
      this.procesos.push(nuevoProceso);
      this.procesosOrdenados.push(nuevoProceso);

      // Limpiamos los campos después de agregar un proceso
      document.getElementById('nombre').value = '';
      document.getElementById('tiempo').value = '';
      document.getElementById('llegada').value = '';

      // Actualizar la lista de procesos en la interfaz
      this.actualizarListaProcesos();
    } else {
      alert('Ingresa un nombre válido, y un tiempo superior a cero.');
    }
  }

  //Metodo que limpia el array de procesos

  limpiarCola(){
    this.procesos = [];
    this.actualizarListaProcesos();
  }

  //Metodo que actualiza la lista en la interfaz
  actualizarListaProcesos() {
    const listaProcesosElement = document.getElementById('listaProcesos');
    listaProcesosElement.innerHTML = ''; // Limpiar la lista

    this.procesos.forEach(proceso => {
      const li = document.createElement('li'); //Creamos elementos hijos para el elemento de lista
      li.textContent = proceso.mensaje();
      listaProcesosElement.appendChild(li);
    });
  }

  ejecutarSJF() {
    //Algoritmo de ordenamiento, de menor a mayor 

    for(let i=0;i<this.procesos.length;i++){
      this.procesos.sort(function(a,b){
	return a.tiempoLlegada - b.tiempoLlegada; //Si son iguales, se ejecuta el primero en llegar
      })
    }
    this.actualizarListaProcesos();

    for(let i=0;i<this.procesosOrdenados.length;i++){
      this.procesosOrdenados.sort(function(a,b){
	return a.tiempoEjecucion - b.tiempoEjecucion; //Si son iguales, se ejecuta el primero en llegar
      })
    }

    for(let j=0;j<this.procesosOrdenados.length;j++){
      this.procesosOrdenados[j].estado = "Finalizado";
    }

    this.actualizarProcesosOrdenados();

    graficos();

  }
  actualizarProcesosOrdenados(){
    //Limpiar la lista de procesos ordenados
    const ejecucionFinal = document.getElementById("lista-final");
    ejecucionFinal.innerHTML='';

    //Imprimir la lista de procesos ordenados
    this.procesosOrdenados.forEach(proceso => {
      const ejecucion = document.createElement('li'); //Imprimimos nuestros procesos ordenados por su tiempo de ejecución
      ejecucion.textContent=proceso.mensajeOrdenado();
      ejecucionFinal.appendChild(ejecucion);
    });
  }

graficos(){
  const ctx = document.getElementById("myChart");
  const xValues =this.procesos.map(proceso => proceso.nombre);
  const yValues = this.procesos.map(proceso => proceso.tiempoEjecucion);
  const barColors = ["#1f1", "#2f2","#0f0","#3f3","#0fff0f"];

    new Chart(ctx, {
      type: "bar",
      data: {
	labels: xValues,
	datasets: [{
	  backgroundColor: barColors,
	  data: yValues
	}]
      },
      options: {
	layout: {padding:0},
	legend: {display: false},
	title: {
	  display: true,
	  text: "Procesos"
	}
      }
    });
  } 
}






// Instanciar la aplicación
const app = new App();


// Funciones globales para interactuar con la aplicación
function agregarProceso() {
  app.agregarProceso();
}

function ejecutarSJF() {
  app.ejecutarSJF();
}

function limpiar(){
  app.limpiarCola()
}


function graficos(){
  app.graficos()
}
