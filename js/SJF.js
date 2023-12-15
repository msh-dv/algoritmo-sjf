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
    return `Proceso ${this.id} | Nombre:${this.nombre} | CPU:${this.tiempoEjecucion} | Estado:${this.estado}`; }
}

// Clase que representa la aplicación
class App {
  constructor() {
    //Declaramos nuestra cola de procesos
    this.procesos = [];
    this.procesosOrdenados=[];
  }

  agregarProcRand(){ //Genera 15 procesos aleatorios con tiempos de ejecucion/llegada de entre 1 a 20
    let nombres = ["Chrome", "LibreOffice", "Photoshop", "Firefox", "Wine",
                   "Spotify", "Vim", "Inkscape", "GIMP", "htop", "node.js",
                   "vbox", "elinks", "bash", "fdisk"];

    for(let i=0; i<15;i++){
      const nuevoProceso = new Proceso(this.procesos.length +1, nombres[Math.floor(Math.random()*14 +1)], Math.floor(Math.random()*20 +1), Math.floor(Math.random()*20 +1));
      this.procesos.push(nuevoProceso);
      this.procesosOrdenados.push(nuevoProceso);
    }
    this.actualizarListaProcesos();
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
    this.procesosOrdenados = [];
    this.actualizarListaProcesos();
    this.actualizarProcesosOrdenados();
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

    for(let j=0;j<this.procesosOrdenados.length;j++){ // Los procesos "pasan" a la CPU
      this.procesosOrdenados[j].estado = "Finalizado";
    }

    this.actualizarProcesosOrdenados();

    graficos();

  }
  actualizarProcesosOrdenados(){ //actualiza la lista de procesos ordenados
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

graficos(){ //Funcion para generar graficas de chart.js
  const ctx = document.getElementById("myChart");
  const xValues =this.procesos.map(proceso => proceso.nombre);
  const yValues = this.procesos.map(proceso => proceso.tiempoEjecucion);

  const barColors = ["#00FF00", "#00CC00", "#60FF06", "#33a933", "#22FF22", //Colores para las graficas
                     "#33eC33", "#00f900", "#4CfF50", "#2EaD32", "#8Bf34A",
                     "#00FF00", "#00CC00", "#66FF66", "#039903", "#4aFF49",
                     "#33CC33", "#00ff00", "#4Cfa50", "#2EfD32", "#8Bf34A"];

    new Chart(ctx, {
      type: "bar",
      data: {
	labels: xValues,
	datasets: [{
	  backgroundColor: barColors, //Caracteristicas de la grafica de barras
	  data: yValues
	}]
      },
      options: {
	plugins:{
	  legend:{
	    labels:{
	      font:{
		size:16,
		family: "Arial",
	      },
	    },
	  },
	},
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

function procesosRandom(){
  app.agregarProcRand();
}
