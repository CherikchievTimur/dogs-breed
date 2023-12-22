const dogsBreedList = document.querySelector(`#dogs-list`);
const dogImage = document.querySelector('#dog');
let dogBread = 'Any';

const getData = async (url) => {
    const res = await fetch(url);
    const data = await res.json()

    return data;
}

const loadDogsBreedList = async () => {
    const data = await getData(`https://dog.ceo/api/breeds/list/all`);

    for (let breed of Object.entries(data.message)) {
        if (breed[1].length > 0) {
            for (let subBreed of breed[1]) {
                addDogBreed(`${breed[0]} ${subBreed}`);
            }
        }
        else {
            addDogBreed(`${breed[0]}`);
        }
    }
}

const addDogBreed = (breed) => {
    const option = document.createElement(`option`);

    option.value = breed;
    option.textContent = breed;

    dogsBreedList.append(option);
}

const getDogImage = async (breed) => {
    let url = '';

    if(breed === 'Any')
        url = `https://dog.ceo/api/breeds/image/random`
    else
        url = `https://dog.ceo/api/breed/${breed}/images/random`;

    const data = await getData(url);

    dogImage.src = data.message;
}

const onChangeDogBreed = (e) => {
    dogBread = e.target.value;
    getDogImage(dogBread);
}

const onClickRefresh = () => {
    getDogImage(dogBread);
}

loadDogsBreedList();
getDogImage(dogBread);