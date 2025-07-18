
const db = firebase.firestore();

document.getElementById('registroForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    prefixo: document.getElementById('prefixo').value,
    turno: document.getElementById('turno').value,
    horimetro: parseFloat(document.getElementById('horimetro').value),
    problema: document.getElementById('problema').value,
    observacoes: document.getElementById('observacoes').value,
    data: new Date().toLocaleString("pt-BR")
  };
  await db.collection("registros").add(data);
  alert("Registro salvo!");
  e.target.reset();
  carregarRegistros();
});

async function carregarRegistros() {
  const tabela = document.querySelector("#registrosTabela tbody");
  tabela.innerHTML = "";
  const snapshot = await db.collection("registros").orderBy("data", "desc").get();
  snapshot.forEach(doc => {
    const r = doc.data();
    tabela.innerHTML += `<tr>
      <td>${r.prefixo}</td>
      <td>${r.turno}</td>
      <td>${r.horimetro}</td>
      <td>${r.problema}</td>
      <td>${r.observacoes}</td>
      <td>${r.data}</td>
    </tr>`;
  });
}

window.onload = carregarRegistros;
