const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const estadoElem = document.getElementById("estado");

const SHEET_URL = "https://script.google.com/macros/s/AKfycbwpZBZmTjNf5e_K9W-99348M5HOhIJfj0p5h0ym_naVpCYuvg-lxBDyEKgUDOyzVQ7T/exec"; // Aquí pondrás tu URL

async function validarCertificado() {
    if (!id) {
        estadoElem.textContent = "❌ No se proporcionó el ID del certificado.";
        return;
    }

    try {
        const res = await fetch(`${SHEET_URL}?id=${id}`);
        const data = await res.json();

        if (data.estado === "inactivo") {
            estadoElem.textContent = "⚠️ Este certificado ya fue utilizado.";
            return;
        }

        estadoElem.textContent = "✅ Certificado válido. Asistencia registrada y correo enviado.";
    } catch (error) {
        estadoElem.textContent = "❌ Error al validar el certificado.";
        console.error(error);
    }
}

validarCertificado();
