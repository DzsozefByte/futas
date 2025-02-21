const runForm = document.getElementById('run-form');
const runsList = document.getElementById('runs-list');
const teljestav = document.getElementById('teljestav');
const atlagsgyors = document.getElementById('atlag_gyorsasag');
const osszeskaloria = document.getElementById('osszeskaloria');

let runs = JSON.parse(localStorage.getItem('runs')) || [];

function frissit() {
  const teljestav_frissit = runs.reduce((sum, run) => sum + run.tavolsag, 0);
  const teljesido_frissit = runs.reduce((sum, run) => sum + run.ido, 0);
  const osszeskaloria_fissit = runs.reduce((sum, run) => sum + run.kaloria, 0);

  const atlaggyors_frissit = teljesido_frissit ? teljestav_frissit / teljesido_frissit : 0;

  teljestav.textContent = teljestav_frissit.toFixed(2);
  atlagsgyors.textContent = atlaggyors_frissit.toFixed(2);
  osszeskaloria.textContent = osszeskaloria_fissit.toFixed(0);
}

function asd() {
  runsList.innerHTML = '';
  runs.forEach((run, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>Futás ${index + 1}</strong><br>
      Időtartam: ${run.ido} óra<br>
      Távolság: ${run.tavolsag} km<br>
      Elégetett kalória: ${run.kaloria} kcal<br>
      Sebesség: ${(run.tavolsag / run.ido).toFixed(2)} km/h<br>
      <button onclick="futastorol(${index})">Törlés</button>
    `;
    runsList.appendChild(li);
  });
}

function mentes(event) {
  event.preventDefault();

  const ido = parseFloat(document.getElementById('ido').value);
  const tavolsag = parseFloat(document.getElementById('tavolsag').value);
  const suly = parseFloat(document.getElementById('suly').value);

  const met = 7.7; 
  const kaloria = met * suly * ido;

  const ujfutas = { ido, tavolsag, suly, kaloria };
  runs.push(ujfutas);
  localStorage.setItem('runs', JSON.stringify(runs));

  asd();
  frissit();

  runForm.reset();
}

function futastorol(index) {
  runs.splice(index, 1);
  localStorage.setItem('runs', JSON.stringify(runs));

  asd();
  frissit();
}

runForm.addEventListener('submit', mentes);

asd();
frissit();
