import swal from 'sweetalert2';

// Capture all the id's from HTML necessary to create our Character's card
const image = document.querySelector('#image');
const charInfo = document.querySelector('#info');
const charInfo2 = document.querySelector('#info2');
const charInfo3 = document.querySelector('#info3');
const charInfo4 = document.querySelector('#info4');
const randomCharBtn = document.querySelector('#random-btn');
const inputText = document.querySelector('#input');

// The API has 731 characters in its glossary. So let's put them all in a variable!
const allCharacters = 563;

// Now let's do a simple function here to generate a random char.

const randomChar = () => Math.floor(Math.random() * allCharacters);

// We have our function, but we need to link it and the API, to the button. Here we go:

randomCharBtn.addEventListener('click', (event) => {  
  const charID = randomChar();
  fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
  .then((result) => result.json())
  .then((data) => {
    const characters = data[charID]
    image.src = characters.images.md;
    charInfo
      .innerHTML = `<p><b>Name:</b> ${characters.name}</p> <p><b>Race:</b> ${characters.appearance.race ? characters.appearance.race : 'Unknown'}</p>`;
    charInfo2
      .innerHTML = `<p><b>Civilian name:</b> ${characters.biography.fullName ? characters.biography.fullName: characters.name}</p>  <p><b>Alter ego:</b> ${characters.biography.alterEgos}</p>`;
    charInfo3
      .innerHTML = `<p><b>First appearance:</b> ${characters.biography.firstAppearance}</p> <p><b>Publisher:</b> ${characters.biography.publisher}</p>`;
    charInfo4
      .innerHTML = `<p><b>Alignment:</b> ${characters.biography.alignment}</p> <p><b>Occupation:</b> ${characters.work.occupation}</p> <p><b>Affiliation:</b> ${characters.connections.groupAffiliation}</p>`
  })
  .catch((error) => swal.fire({
    title: 'Character not found',
    text: error.message,
    icon: 'error',
    confirmButtonText: 'Alright!',
  }));
});

// Now we're gonna create an event on the input. When the user puts a name, that name has to be found on the database

inputText.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
  .then((result) => result.json())
  .then((data) => {    
    const characters = data
      .find((character) => character.name.toUpperCase().includes(inputText.value.toUpperCase()) || character.biography.fullName.toUpperCase().includes(inputText.value.toUpperCase()));
    if (characters) {
      image.src = characters.images.md;
      charInfo
        .innerHTML = `<p><b>Name:</b> ${characters.name}</p> <p><b>Race:</b> ${characters.appearance.race ? characters.appearance.race : 'Unknown'}</p>`;
      charInfo2
        .innerHTML = `<p><b>Civilian name:</b> ${characters.biography.fullName ? characters.biography.fullName: characters.name}</p>  <p><b>Alter ego:</b> ${characters.biography.alterEgos}</p>`;
      charInfo3
        .innerHTML = `<p><b>First appearance:</b> ${characters.biography.firstAppearance}</p> <p><b>Publisher:</b> ${characters.biography.publisher}</p>`;
      charInfo4
        .innerHTML = `<p><b>Alignment:</b> ${characters.biography.alignment}</p> <p><b>Occupation:</b> ${characters.work.occupation}</p> <p><b>Affiliation:</b> ${characters.connections.groupAffiliation}</p>`
    } else {
      throw new Error('Character not found =/')
    }
  })
  .catch((error) => swal.fire({
    title: 'Character not found',
    text: error.message,
    icon: 'error',
    confirmButtonText: 'Alright!',
  }));
}});
