//Main Div

const mainresultInnerDivEle = document.createElement('div');

// H1 Element

const h1Ele = document.createElement('h1');
h1Ele.innerText = 'English Dictionary';
h1Ele.setAttribute('class', 'cl-h1-ele');

// Main Inner Div

const mainInnerDivEle = document.createElement('div');
mainInnerDivEle.setAttribute('class', 'cl-main-innerdiv');

//Search Element

const inpEle = document.createElement('input');
inpEle.type = 'text';
inpEle.placeholder = 'Type the word';
inpEle.setAttribute('class', 'cl-input-ele');

//Button Element

const submitBtnEle = document.createElement('button');
submitBtnEle.innerText = 'Submit';
submitBtnEle.setAttribute('class', 'cl-btn-ele');

mainInnerDivEle.append(inpEle, submitBtnEle);

// Spinner Element

const spinnerEle = document.createElement('i');
spinnerEle.setAttribute('class', 'fa-solid fa-circle-notch fa-spin fa-3x cl-spinner-ele');

//Result Div

const resultDivEle = document.createElement('div');

mainresultInnerDivEle.append(h1Ele, mainInnerDivEle, spinnerEle, resultDivEle);

document.body.append(mainresultInnerDivEle);

// async/await Function to get the meanings of a word from the Dictionary API
const getWordDefinitions = async (name) => {

  try {

    inpEle.value = name;
    inpEle.setSelectionRange(0, name.length);
    inpEle.focus();

    // Dictionary API request & its response
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${name}`);
    const wordDefinitions = await response.json();

    if (wordDefinitions[0] !== undefined) {

      try {

        resultDivEle.innerHTML = '';

        const h2Ele = document.createElement('h4');
        h2Ele.innerHTML = `Showing meaning for word <b> "${wordDefinitions[0].word}"</b>`;
        resultDivEle.append(h2Ele);

        wordDefinitions[0].meanings.forEach(({ partOfSpeech, definitions: [definitions], synonyms, antonyms }) => {

          const resultInnerDivEle = document.createElement('div');
          resultInnerDivEle.setAttribute('class', 'cl-resultinnerdiv');

          resultDivEle.setAttribute('class', 'cl-resultdiv bg-success text-white');

          if (partOfSpeech !== undefined && definitions.definition !== undefined) {

            resultInnerDivEle.innerHTML = `<b>${partOfSpeech} : </b> ${definitions.definition}`;
          }
          if (synonyms[0] !== undefined) {
            resultInnerDivEle.innerHTML += `<br><br><b>Synonyms : </b>${synonyms[0]}`;
          }
          if (antonyms[0] !== undefined) {
            resultInnerDivEle.innerHTML += `<br><br><b> Antonyms: </b>${antonyms[0]}`;
          }

          resultDivEle.append(resultInnerDivEle);

        })
        spinnerEle.style.display = 'none';
        resultDivEle.style.display = 'block';

      }
      catch (error) {
        console.log(error);
      }

    } else {

      resultDivEle.setAttribute('class', 'bg-danger');
      resultDivEle.innerHTML = "<text style = 'color: white'> Not Found! Please try with some other word";
      spinnerEle.style.display = 'none';
      resultDivEle.style.display = 'block';

    }

    // Removing Event Listeners for Input box & Submit button
    submitBtnEle.removeEventListener('click', resultClickFunc);
    inpEle.removeEventListener('keydown', resultEnterFunc);
  }
  catch (error) {
    console.log(error);
  }
}

// Click Listener Function for Submit button
const resultClickFunc = () => {

  const name = inpEle.value;

  if (name.trim() !== '') {
    resultDivEle.style.display = 'none';
    spinnerEle.style.display = 'inline-block';

    getWordDefinitions(name.trim());
  }
  else {
    resultDivEle.innerHTML = '';
    resultDivEle.style.display = 'none';
    alert("You didn't given any name! So Please enter some person name & try again");
  }
}

// Enter Key Listener Function for Input box
const resultEnterFunc = (e) => {

  if (e.key === 'Enter') {
    resultClickFunc();
  }
}

// Event Listeners for Input box & Submit button
inpEle.addEventListener('input', () => {

  submitBtnEle.addEventListener('click', resultClickFunc);

  inpEle.addEventListener('keydown', resultEnterFunc);

})
