const pokemonImage = document.querySelector('.poke');
const form = document.querySelector('.form');
const input = document.querySelector('#input__text');
const pointCorrect = document.querySelector('.point_correct');
const pointWrong = document.querySelector('.point_wrong');
const pokemonName = document.querySelector('.poke_name');
const option1Div = document.querySelector('[data-options="1"]');
const option2Div = document.querySelector('[data-options="2"]');
const option3Div = document.querySelector('[data-options="3"]');
const option4Div = document.querySelector('[data-options="4"]');
const buttons = document.querySelectorAll('.options_area button');
const input_button = document.querySelector('.input_button');
let blank = '';
let pokemongen = 151;
let pokemonImageName = '';
let pointC = 0;
let pointW = 0;
let option1 = '';
let option2 = '';
let option3 = '';
let option4 = '';
let order = [option1Div, option2Div, option3Div, option4Div];
let clicked = false;
let shadow = '';



document.querySelector('#try_button').addEventListener('click', () => startGame(pokemongen));
document.querySelector('#show_names').addEventListener('click', () => showNames());
document.querySelector('.settings_button').addEventListener('click', () => {
    document.querySelector('.settings span').innerHTML = 'Altere o nível da sombra!';
    document.querySelector('.settings_area').style.display='flex';
    document.querySelector('main').style.display='none';
});


document.querySelectorAll('.settings_shadow_info').forEach(s => {
    s.addEventListener('click', () => {
        let shadowID = s.getAttribute('data-shadow');
        console.log(shadowID);
        if(shadowID == 'lvl1') {
            pokemonImage.style.filter ='brightness(20%)';
        } 
        else if (shadowID == 'lvl2') {
           pokemonImage.style.filter ='brightness(10%)';
        } 
        else if (shadowID == 'lvl3') {
            pokemonImage.style.filter ='brightness(0%)';
        }
        shadow = pokemonImage.style.filter;
        document.querySelector('main').style.display='flex';
        document.querySelector('.settings_area').style.display='none';
    })
})

document.querySelectorAll('.gen div').forEach(e => {
    e.addEventListener('click', ()=>{
        let gen = e.getAttribute('data-gen');
        switch (gen) {
            case '1':
              pokemongen = 151;
              break;
            case '2':
                pokemongen = 251;
                break;
            case '3':
                pokemongen = 386;
                break;
            case '4':
                pokemongen = 493;
                break;
            case '5':
                pokemongen = 649;
                break;
            case '6':
                pokemongen = 721;
                break;
            case '7':
                pokemongen = 809;
                break;
            case '8':
                pokemongen = 905;
          }
          document.querySelector('.active').classList.remove('active');
          e.classList.add('active');
    });
    
});
    
const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
    }
}


startGame(pokemongen);
score();

function shuffleArray(order) {
    order.sort(() => Math.random() - 0.5);
  }
  
  shuffleArray(order);

function showNames() {
    const nameDiv = document.querySelector('.options');
    
    if(nameDiv.style.display == 'flex') {
        nameDiv.style.display = 'none';
    } else {
        nameDiv.style.display = 'flex';
    }
    
}

function score() {
pointWrong.innerHTML = pointW;
pointCorrect.innerHTML = pointC;
}

async function startGame(max) {
    pokemonImage.style.filter = shadow;
    randomNumber1 = generateRandom(max, [option2, option3, option4]);
    randomNumber2 = generateRandom(max, [option1, option3, option4]);
    randomNumber3 = generateRandom(max, [option1, option2, option4]);
    randomNumber4 = generateRandom(max, [option1, option2, option3]);
    


    const data = await fetchPokemon(randomNumber1);
    const data2 = await fetchPokemon(randomNumber2);
    const data3 = await fetchPokemon(randomNumber3);
    const data4 = await fetchPokemon(randomNumber4);

    if(data) {
        pokemonImage.style.display = 'block';
        pokemonImage.src = data['sprites']['front_default'];
        pokemonImageName = data.name;

        option1 = data.name;
        option2 = data2.name;
        option3 = data3.name;
        option4 = data4.name;
        order[0].innerHTML = option1;
        order[1].innerHTML = option2;
        order[2].innerHTML = option3;
        order[3].innerHTML = option4;

    }

};

function generateRandom(max, exclude) {
    let random2;
    while (!random2) {
      const x = Math.floor(Math.random() * max + 1);
      if (exclude.indexOf(x) === -1) random2 = x;
    }
    return random2;
  }


form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(input !== blank) {
    checkAnswers(input.value.toLowerCase());
    };
});


buttons.forEach(b => {
    b.addEventListener('click', () => {
        if (!clicked) {
        checkAnswers(b.innerHTML)
        clicked = true;}
})
});





async function checkAnswers(pokemon) {
    let pokeName = pokemon

  
        if(pokeName === pokemonImageName) {
            pointC++;          
        } else {
            pointW++;
        }
    
    pokemonImage.style.filter = 'brightness(100%)';
    pokemonName.style.display = 'block';
    pokemonName.innerHTML = `RESPOSTA: ${pokemonImageName.toUpperCase()}`;
    score();
    input.value = '';
    setTimeout(()=>{
        pokemonName.style.display = 'none';
        pokemonImage.style.filter = shadow;
        startGame(pokemongen);
        shuffleArray(order);
        console.log(order);
        clicked = false;
        }, 1500);   

};

