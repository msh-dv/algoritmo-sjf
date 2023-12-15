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
    this.procesos = [];
  }

  agregarProceso() {
    const nombre = document.getElementById('nombre').value;
    const tiempoEjecucion = parseInt(document.getElementById('tiempo').value);

    if (nombre && !isNaN(tiempoEjecucion) && tiempoEjecucion > 0) {
      const nuevoProceso = new Proceso(this.procesos.length + 1, nombre, tiempoEjecucion);
      this.procesos.push(nuevoProceso);

      // Limpiar los campos después de agregar un proceso
      document.getElementById('nombre').value = '';
      document.getElementById('tiempo').value = '';

      // Actualizar la lista de procesos en la interfaz
      this.actualizarListaProcesos();
    } else {
      alert('Por favor, ingresa un nombre válido y un tiempo de ejecución positivo.');
    }
  }

  actualizarListaProcesos() {
    const listaProcesosElement = document.getElementById('listaProcesos');
    listaProcesosElement.innerHTML = ''; // Limpiar la lista

    this.procesos.forEach(proceso => {
      const li = document.createElement('li');
      li.textContent = proceso.mensaje();
      listaProcesosElement.appendChild(li);
    });
  }

  ejecutarSJF() {
    // Implementar la lógica para ordenar y ejecutar los procesos según el algoritmo SJF
    for(let i=0;i<this.procesos.length;i++){
      this.procesos.sort(function(a,b){
	return a.tiempoEjecucion - b.tiempoEjecucion;
      })
    }
    // En este ejemplo, simplemente imprimimos la lista actual de procesos
    const ejecucionFinal = document.getElementById("lista-final");
    this.procesos.forEach(proceso => {
      const ejecucion = document.createElement('li');
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

