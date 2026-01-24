// Función para formatear números a peso chileno
function formatoPesosCLP(valor) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0, // Pesos no tienen centavos
  }).format(valor);
}

// Variables globales para saldo e historial de transacciones
let saldoDisponible = 1000; // saldo inicial
let historialTransacciones = [
  { fecha: "2026-01-20", descripcion: "Saldo inicial", monto: saldoDisponible }
];

document.addEventListener("DOMContentLoaded", function () {
  const pagina = document.title;

  if (pagina === "Login | Alke Wallet") {
    validarLogin();
  } else if (pagina === "Depósito | Alke Wallet") {
    manejarDeposito();
  } else if (pagina === "Enviar Dinero | Alke Wallet") {
    manejarEnvioDinero();
  } else if (pagina === "Últimos movimientos | Alke Wallet") {
    mostrarTransacciones();
  }
});

function validarLogin() {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      alert("Por favor, ingresa tu correo electrónico.");
      emailInput.focus();
      return;
    }
    if (!emailPattern.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      emailInput.focus();
      return;
    }
    if (!password) {
      alert("Por favor, ingresa tu contraseña.");
      passwordInput.focus();
      return;
    }

    const usuarioCorrecto = "usuario@alke.com";
    const passwordCorrecta = "1234";

    if (email === usuarioCorrecto && password === passwordCorrecta) {
      alert("¡Login exitoso!");
      window.location.href = "menu.html";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
}

function manejarDeposito() {
  const form = document.querySelector("form");
  const amountInput = document.getElementById("amount");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
      alert("Por favor, ingresa un monto válido mayor a cero.");
      amountInput.focus();
      return;
    }

    // Actualizar saldo global
    saldoDisponible += amount;

    // Agregar transacción al historial con fecha actual
    const fechaActual = new Date().toISOString().split("T")[0];
    historialTransacciones.push({
      fecha: fechaActual,
      descripcion: "Depósito",
      monto: amount,
    });

   alert(`Depósito de ${formatoPesosCLP(amount)} realizado con éxito. Saldo actual: ${formatoPesosCLP(saldoDisponible)}`);

    amountInput.value = "";
  });
}

function manejarEnvioDinero() {
  const form = document.getElementById("form-envio");
  const contactInput = document.getElementById("contact");
  const amountInput = document.getElementById("amount");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const contact = contactInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!contact) {
      alert("Por favor, ingresa el nombre del contacto.");
      contactInput.focus();
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      alert("Por favor, ingresa un monto válido mayor a cero.");
      amountInput.focus();
      return;
    }
    if (amount > saldoDisponible) {
    console.log("Saldo disponible:", saldoDisponible, "Monto a enviar:", amount); 
      alert("Saldo insuficiente para realizar la transferencia.");
      amountInput.focus();
      return;
    }

    // Restar del saldo global
    saldoDisponible -= amount;

    // Agregar transacción al historial con fecha actual
    const fechaActual = new Date().toISOString().split("T")[0];
    historialTransacciones.push({
      fecha: fechaActual,
      descripcion: `Envío a ${contact}`,
      monto: -amount,
    });

    alert(`Enviado ${formatoPesosCLP(amount)} a ${contact} con éxito. Saldo actual: ${formatoPesosCLP(saldoDisponible)}`);

    contactInput.value = "";
    amountInput.value = "";
  });
}

function mostrarTransacciones() {
  const section = document.querySelector("section");
  if (!section) return; // evita errores si no encuentra el contenedor

  let html = `<table class="table table-striped">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>`;

  historialTransacciones.forEach(tx => {
    html += `<tr>
               <td>${tx.fecha}</td>
               <td>${tx.descripcion}</td>
               <td>${tx.monto < 0 ? '-' : ''}${formatoPesosCLP(Math.abs(tx.monto))}</td>
             </tr>`;
  });

  html += `</tbody></table>`;

  section.innerHTML = html;
}
$(document).ready(function () {

  // Efecto visual en los inputs de monto
  $("#amount").on("focus", function () {
    $(this).css("background-color", "#e6f2ff");
  });

  $("#amount").on("blur", function () {
    $(this).css("background-color", "white");
  });


});