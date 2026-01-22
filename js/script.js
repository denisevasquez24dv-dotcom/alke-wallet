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

    alert(`Depósito de $${amount.toFixed(2)} realizado con éxito.`);
    amountInput.value = "";
  });
}

function manejarEnvioDinero() {
  const form = document.querySelector("form");
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

    alert(`Enviado $${amount.toFixed(2)} a ${contact} con éxito.`);
    contactInput.value = "";
    amountInput.value = "";
  });
}

function mostrarTransacciones() {
  const section = document.querySelector("section");

  const transacciones = [
    { fecha: "2026-01-20", descripcion: "Depósito", monto: 500 },
    { fecha: "2026-01-21", descripcion: "Envío a Juan", monto: -100 },
    { fecha: "2026-01-22", descripcion: "Depósito", monto: 300 },
  ];

  let html = `<table class="table table-striped">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>`;

  transacciones.forEach(tx => {
    html += `<tr>
               <td>${tx.fecha}</td>
               <td>${tx.descripcion}</td>
               <td>${tx.monto < 0 ? '-' : ''}$${Math.abs(tx.monto).toFixed(2)}</td>
             </tr>`;
  });

  html += `</tbody></table>`;

  section.innerHTML = html;
}