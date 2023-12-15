//Declaramos nuestra clase para crear procesos
class Proceso {
  constructor(id, nombre, tiempoEjecucion) {
    this.id = id;
    this.nombre = nombre;
    this.tiempoEjecucion = tiempoEjecucion;
  }

  mensaje() {
    return `Proceso ${this.id}: ${this.nombre} - Tiempo de ejecución: ${this.tiempoEjecucion}`;
  }
}

// Clase que representa la aplicación
class App {
  constructor() {
    //Declaramos nuestra cola de procesos
    this.procesos = [];
  }


  agregarProceso() {
    //Declaramos los valores del nombre del proceso y el tiempo
    const nombre = document.getElementById('nombre').value;
    const tiempoEjecucion = parseInt(document.getElementById('tiempo').value);

    //Revisar si los datos son correctos, si son numeros y si es mayor a cero
    if (nombre && !isNaN(tiempoEjecucion) && tiempoEjecucion > 0) {
      const nuevoProceso = new Proceso(this.procesos.length + 1, nombre, tiempoEjecucion);
      this.procesos.push(nuevoProceso);

      // Limpiamos los campos después de agregar un proceso
      document.getElementById('nombre').value = '';
      document.getElementById('tiempo').value = '';

      // Actualizar la lista de procesos en la interfaz
      this.actualizarListaProcesos();
    } else {
      alert('Por favor, ingresa un nombre válido y un tiempo de ejecución positivo.');
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
	return a.tiempoEjecucion - b.tiempoEjecucion; //Si son iguales, se ejecuta el primero en llegar
      })
    }

    //Limpiar la lista de procesos ordenados
    const ejecucionFinal = document.getElementById("lista-final");
    ejecucionFinal.innerHTML='';

    //Imprimir la lista de procesos ejecutados
    this.procesos.forEach(proceso => {
      const ejecucion = document.createElement('li'); //Imprimimos nuestros procesos ordenados por su tiempo de ejecución
      ejecucion.textContent=proceso.mensaje();
      ejecucionFinal.appendChild(ejecucion);
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
