const imagens = [
  'imagens/1.jpeg',
  'imagens/2.jpeg',
  'imagens/3.jpeg',
  'imagens/4.jpeg',
  'imagens/5.jpeg',
  'imagens/6.jpeg'
];

let baralho = [...imagens, ...imagens];
baralho = baralho.sort(() => Math.random() - 0.5);

let selecionadas = [];
let encontradas = 0;

const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const gameBoard = document.getElementById("gameBoard");
const victoryMessage = document.getElementById("victoryMessage");
const bgMusic = document.getElementById("bgMusic");

function iniciarJogo() {
  telaInicial.classList.add("d-none");
  telaJogo.classList.remove("d-none");
  bgMusic.play();
  montarCartas();
}

function montarCartas() {
  baralho.forEach((src, index) => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card-memoria";
    card.dataset.index = index;
    card.dataset.src = src;

    const img = document.createElement("img");
    img.src = src;

    const cover = document.createElement("div");
    cover.className = "cover";
    cover.innerText = "💖";

    card.appendChild(img);
    card.appendChild(cover);

    card.addEventListener("click", () => virarCarta(card));
    col.appendChild(card);
    gameBoard.appendChild(col);
  });
}

function showVictoryModal() {
  document.getElementById("victoryModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("victoryModal").classList.add("hidden");
}


function virarCarta(card) {
  if (card.classList.contains("reveal") || selecionadas.length === 2) return;

  card.classList.add("reveal");
  selecionadas.push(card);

  if (selecionadas.length === 2) {
    const [c1, c2] = selecionadas;
    if (c1.dataset.src === c2.dataset.src) {
      encontradas += 2;
      selecionadas = [];

      if (encontradas === baralho.length) {
        victoryMessage.classList.remove("d-none");
      }
    } else {
      setTimeout(() => {
        c1.classList.remove("reveal");
        c2.classList.remove("reveal");
        selecionadas = [];
      }, 1000);
    }
  }
}
