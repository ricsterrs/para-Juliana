// --- SISTEMA DE NAVEGACIÓN PRINCIPAL ---
function cambiarPantalla(actual, siguiente) {
    document.getElementById(`pantalla-${actual}`).classList.replace('activa', 'oculta');
    
    setTimeout(() => {
        document.getElementById(`pantalla-${siguiente}`).classList.replace('oculta', 'activa');
        
        // Inicializadores de nivel según la pantalla
        if(siguiente === 2) iniciarMaquinaEscribir();
        if(siguiente === 7) iniciarJuegoCorazones();
        if(siguiente === 8) iniciarTrivia();
    }, 1000); 
}

// --- PANTALLA 2: MÁQUINA DE ESCRIBIR ---
const textoCarta = "Amor quería explicarte por qué decidí hacer todo esto y es porque a veces las palabras normales no alcanzan para decirle lo importante que te has vuelto para mi vida";
let i = 0;

function iniciarMaquinaEscribir() {
    if (i === 0) document.getElementById("texto-maquina").innerHTML = ""; 
    
    if (i < textoCarta.length) {
        document.getElementById("texto-maquina").innerHTML += textoCarta.charAt(i);
        i++;
        setTimeout(iniciarMaquinaEscribir, 50); 
    } else {
        document.getElementById("btn-continuar-2").classList.remove("oculto");
    }
}

// --- PANTALLA 4: TARJETAS GIRATORIAS ---
let tarjetasGiradas = 0;

function girarTarjeta(elemento) {
    if (!elemento.classList.contains('girada')) {
        elemento.classList.add('girada');
        tarjetasGiradas++;
        
        if (tarjetasGiradas === 12) {
            setTimeout(() => {
                document.getElementById('btn-continuar-4').classList.remove('oculto');
            }, 800); 
        }
    }
}

// --- PANTALLA 5: GALERÍA DE FOTOS ---
function abrirModal(rutaImagen, textoRecuerdo) {
    const modal = document.getElementById('modal-foto');
    document.getElementById('img-modal').src = rutaImagen;
    document.getElementById('modal-texto').innerText = textoRecuerdo;
    modal.classList.remove('oculto-elemento');
}

// Sistema de cerrado robusto para móviles y PC
function cerrarModal() {
    const modal = document.getElementById('modal-foto');
    if (modal) {
        modal.classList.add('oculto-elemento');
        // Limpiamos la imagen al cerrar para que no parpadee la anterior al abrir una nueva
        setTimeout(() => { document.getElementById('img-modal').src = ""; }, 300);
    }
}

// --- PANTALLA 6: JUEGO DE LOS GOLPES CON SPRITES ---
let golpes = 0;

function darGolpe() {
    if (golpes >= 100) return; 
    
    golpes++;
    
    document.getElementById("barra-amor").style.width = `${golpes}%`;
    document.getElementById("porcentaje-amor").innerText = `${golpes}%`;
    
    const mensajeEl = document.getElementById("mensaje-juego");
    const imgPersonaje = document.getElementById("img-personaje");

    // Efecto de impacto visual
    imgPersonaje.src = "personaje_golpeado.png";
    
    // Regresa al estado normal casi al instante
    setTimeout(() => {
        if (golpes < 100) {
            imgPersonaje.src = "personaje_normal.png";
        }
    }, 150);
    
    // Progresión de diálogos
    if (golpes === 5) mensajeEl.innerText = "Amor cuidado que me duele";
    else if (golpes === 15) mensajeEl.innerText = "¡Uy juli!";
    else if (golpes === 30) mensajeEl.innerText = "¿Juli usted esta segura que me quiere?";
    else if (golpes === 45) mensajeEl.innerText = "Mi pecho ya se esta poniendo rojo amor";
    else if (golpes === 60) mensajeEl.innerText = "Pero mi amor verla feliz me hace feliz";
    else if (golpes === 80) mensajeEl.innerText = "Ya casi llena la barra amor";
    else if (golpes === 100) {
        mensajeEl.innerHTML = "Juli cada golpe que me da en el pecho... me hace sentir tu carino <br> Y llena mi corazón de amor. ❤️";
        
        // Sprite de victoria
        imgPersonaje.src = "personaje_feliz.png"; 
        
        document.getElementById("btn-continuar-6").classList.remove("oculto");
    }
}

// --- PANTALLA 7: JUEGO DE CORAZONES ---
let corazonesEncontrados = 0;
let intervaloCorazones;

function iniciarJuegoCorazones() {
    corazonesEncontrados = 0;
    document.getElementById("contador-corazones").innerText = "0 / 10";
    document.getElementById("mensaje-juego-7").innerText = "";
    document.getElementById("btn-continuar-7").classList.add("oculto");
    document.getElementById("contenedor-corazones").innerHTML = "";

    intervaloCorazones = setInterval(crearCorazon, 700);
}

function crearCorazon() {
    const contenedor = document.getElementById("contenedor-corazones");
    const corazon = document.createElement("div");
    corazon.classList.add("corazon-flotante");

    corazon.style.left = (Math.random() * 85 + 5) + "%";
    
    const duracion = Math.random() * 2 + 3; 
    corazon.style.animationDuration = `${duracion}s`;

    const esVerdadero = Math.random() > 0.3; 
    
    if (esVerdadero) {
        corazon.innerText = "❤️";
        corazon.onclick = () => atraparCorazon(corazon, true);
    } else {
        const falsos = ["💜", "🖤", "💙"];
        corazon.innerText = falsos[Math.floor(Math.random() * falsos.length)];
        corazon.onclick = () => atraparCorazon(corazon, false);
    }

    contenedor.appendChild(corazon);

    setTimeout(() => {
        if (contenedor.contains(corazon)) {
            corazon.remove();
        }
    }, duracion * 1000);
}

function atraparCorazon(elemento, esVerdadero) {
    elemento.onclick = null; 

    if (esVerdadero) {
        elemento.innerText = "✨";
        elemento.classList.add("explosion-corazon");
        
        corazonesEncontrados++;
        document.getElementById("contador-corazones").innerText = `${corazonesEncontrados} / 10`;

        if (corazonesEncontrados >= 10) {
            finalizarJuegoCorazones();
        }
    } else {
        elemento.innerText = "💔";
        elemento.style.animationPlayState = 'paused'; 
        setTimeout(() => elemento.remove(), 400);
    }
}

function finalizarJuegoCorazones() {
    clearInterval(intervaloCorazones); 
    
    const contenedor = document.getElementById("contenedor-corazones");
    contenedor.innerHTML = ""; 
    
    document.getElementById("mensaje-juego-7").innerText = "Juli cada corazón que atrapaste significa lo mucho que te has esforzado para que lo nuestro funcione";
    document.getElementById("btn-continuar-7").classList.remove("oculto");
}

// --- PANTALLA 8: TRIVIA ---
const preguntas = [
    {
        pregunta: "¿Cuál fue la primera película que vimos juntos en cine?",
        opciones: ["Michael Jackson", "Home", "La posesión de la momia", "Scary movie"],
        correcta: 2 
    },
    {
        pregunta: "¿cual es mi color favorito?",
        opciones: ["naranja", "Verde", "Negro", "Azul"],
        correcta: 1
    },
    {
        pregunta: "¿Realmente por que me enamoré de usted?",
        opciones: ["Por que tiene mero culo", "por que me chupa el pipi rico", "su personalidad alocada", "No estoy enamorado"],
        correcta: 2
    }
];

let preguntaActualIndex = 0;

function iniciarTrivia() {
    preguntaActualIndex = 0; 
    cargarPregunta();
}

function cargarPregunta() {
    const q = preguntas[preguntaActualIndex];
    document.getElementById("num-pregunta").innerText = preguntaActualIndex + 1;
    document.getElementById("pregunta-texto").innerText = q.pregunta;
    document.getElementById("feedback-trivia").innerText = "";
    
    const contenedor = document.getElementById("opciones-contenedor");
    contenedor.innerHTML = ""; 
    
    q.opciones.forEach((opcion, index) => {
        const boton = document.createElement("button");
        boton.classList.add("btn-opcion");
        boton.innerText = opcion;
        boton.onclick = () => verificarRespuesta(index, boton);
        contenedor.appendChild(boton);
    });
}

function verificarRespuesta(indiceSeleccionado, botonPresionado) {
    const q = preguntas[preguntaActualIndex];
    const feedback = document.getElementById("feedback-trivia");
    
    const botones = document.querySelectorAll(".btn-opcion");
    botones.forEach(b => b.disabled = true);

    if (indiceSeleccionado === q.correcta) {
        botonPresionado.classList.add("btn-correcto");
        
        if (preguntaActualIndex === 2) {
            feedback.innerText = "ahhh no amor usted sabe mucho";
        } else {
            feedback.innerText = "Uffff que makinota bebé";
        }
        
        setTimeout(() => {
            preguntaActualIndex++;
            if (preguntaActualIndex < preguntas.length) {
                cargarPregunta();
            } else {
                feedback.innerText = "¡Trivia completada! Todo guardado en el corazón.";
                document.getElementById("btn-continuar-8").classList.remove("oculto");
            }
        }, 2000);
    } else {
        feedback.innerText = "Nop... ¡Inténtalo otra vez! 🤭";
        
        setTimeout(() => {
            botones.forEach(b => b.disabled = false);
            feedback.innerText = "";
        }, 1500);
    }
}

// --- PANTALLA 11: REGALO Y TIMER ---
function activarRegalo() {
    document.getElementById('btn-regalo').classList.add('oculto-elemento');
    
    const contador = document.getElementById('cuenta-regresiva');
    contador.classList.remove('oculto-elemento');
    contador.style.display = 'flex'; 
    
    document.getElementById('mensaje-final').classList.remove('oculto-elemento');

    const fechaObjetivo = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);

    const intervalo = setInterval(function() {
        const ahora = new Date().getTime();
        const distancia = fechaObjetivo - ahora;

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        document.getElementById("cd-dias").innerText = dias < 10 ? "0" + dias : dias;
        document.getElementById("cd-horas").innerText = horas < 10 ? "0" + horas : horas;
        document.getElementById("cd-minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
        document.getElementById("cd-segundos").innerText = segundos < 10 ? "0" + segundos : segundos;

        if (distancia < 0) {
            clearInterval(intervalo);
            document.getElementById("cuenta-regresiva").innerHTML = "<h2 style='color:#d47683;'>¡Es hora!</h2>";
        }
    }, 1000);
}