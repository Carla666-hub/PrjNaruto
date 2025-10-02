const container = document.getElementById('characters');
const searchInput = document.getElementById('searchInput');
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

function displayCharacter(character) {
  container.innerHTML = '';

  const form = document.createElement('form');
  form.className = 'character-form';

  form.innerHTML = `
    <label>ID:<br><input type="text" name="id" value="${character.id}" readonly></label>
    <label>Nome:<br><input type="text" name="name" value="${character.name}"></label>
    <label>Rank:<br><input type="text" name="rank" value="${character.rank || ''}"></label>
    <label>Power:<br><input type="number" name="power" value="${character.power || ''}"></label>
    <label>Resumo:<br><textarea name="summary">${character.summary || ''}</textarea></label>
  `;

  container.appendChild(form);
}

function searchCharacter() {
  const query = searchInput.value.trim().toLowerCase();
  container.innerHTML = '';

  if (!query) return;

  fetch('https://naruto-br-api.site/characters/')
    .then(response => {
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      return response.json();
    })
    .then(data => {
      const found = data.find(c => c.name.toLowerCase().includes(query));
      if (found) {
        displayCharacter(found);
      } else {
        container.innerHTML = '<p>Nenhum personagem encontrado.</p>';
      }
    })
    .catch(error => {
      container.innerHTML = `<p>Erro ao buscar personagem: ${error.message}</p>`;
    });
}

function clearSearch() {
  searchInput.value = '';
  container.innerHTML = '';
  searchInput.focus();
}

btnSearch.addEventListener('click', searchCharacter);
btnClear.addEventListener('click', clearSearch);

// Opcional: buscar ao pressionar Enter no campo
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchCharacter();
  }
});
