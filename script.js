const estudiantes = [];
const form = document.getElementById("formulario");
const tabla = document.querySelector("#tablaNotas tbody");
const inputNota = document.getElementById("nota");

inputNota.addEventListener("keydown", function(e) {
  if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
    e.preventDefault();
  }
});

form.addEventListener("submit", function(e) {
  e.preventDefault();
  limpiarErrores();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const notaValor = document.getElementById("nota").value.trim();
  const nota = parseFloat(notaValor);

  let error = false;

  if (nombre === "") {
    mostrarError("errorNombre", "Por favor, ingrese el nombre.");
    error = true;
  }

  if (apellido === "") {
    mostrarError("errorApellido", "Por favor, ingrese el apellido.");
    error = true;
  }

  if (notaValor === "") {
    mostrarError("errorNota", "Por favor, ingrese una calificación.");
    error = true;
  } else if (isNaN(nota) || nota < 1 || nota > 7) {
    mostrarError("errorNota",
        
        "La calificación debe estar entre 1.0 y 7.0.");
    error = true;
  }

  if (error) return;

  const estudiante = { nombre, apellido, nota };
  estudiantes.push(estudiante);
  agregarFila(estudiante);
  actualizarPromedio();
  form.reset();
});

function agregarFila(est) {
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${est.nombre}</td>
    <td>${est.apellido}</td>
    <td>${est.nota.toFixed(1)}</td>
  `;
  tabla.appendChild(fila);
}

function actualizarPromedio() {
  const suma = estudiantes.reduce((acc, est) => acc + est.nota, 0);
  const promedio = suma / estudiantes.length;
  document.getElementById("promedio").textContent =
    "Promedio de Calificaciones: " + promedio.toFixed(1);
}

function mostrarError(id, mensaje) {
  document.getElementById(id).textContent = mensaje;
}

function limpiarErrores() {
  document.querySelectorAll(".error").forEach(el => el.textContent = "");
}
