export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = '';
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError"
];

const mensajesDeError = {
  nombre: {
    valueMissing: "Este campo no puede estar vacío"
  },
  email: {
    valueMissing: "Este campo no puede estar vacío",
    typeMismatch: "El correo no es valido"
  },
  password: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "Al menos 6 caracteres..."
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener al menos 18 años"
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "Debes colocar un numero de telefono valido XX-XXXX-XXXX"
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La direccion debe contener de 10 a 40 caracteres"
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La ciudad debe contener de 4 a 30 caracteres"
  },
  estado: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El estado debe contener de 4 a 30 caracteres"
  }
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input)
};

// Ya no se utilizará las funciones siguientes:
// const inputNacimiento = document.querySelector("#birth");
// inputNacimiento.addEventListener('blur', (evento) => {
//   validarNacimiento(evento.target);
// });

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
};

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";

  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al memos 18 años";
  };

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMont(),
    fecha.getUTCDate()
  );
  return diferenciaFechas < fechaActual;
}