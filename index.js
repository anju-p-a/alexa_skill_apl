/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
// handles the first launch request
const launchSkillHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {

    const speechOutput = GET_LAUNCH_MSG;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      //.withSimpleCard(SKILL_NAME, randomMonument)
      .reprompt(speechOutput)
      .getResponse();
  },
};

// launches the game upon yes

///validates and responds to the answer

const startGameHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'launch';
  },
  handle(handlerInput) {
    const monumentArray = monumentList;
    const monumentIndex = Math.floor(Math.random() * monumentList.length);
    const randomMonument = monumentList[monumentIndex];
    var speechOutput;
    if(handlerInput.requestEnvelope.request.intent.slots.value === randomMonument){
      speechOutput = 'You got the right answer !'
    }else{
      speechOutput = " the correct answer was "+randomMonument
    }


    return handlerInput.responseBuilder
      .speak(speechOutput)
      //.withSimpleCard(SKILL_NAME, randomMonument)
      .reprompt(speechOutput)
      .addDirective({
        type : 'Alexa.Presentation.APL.RenderDocument',
        document : document,
        datasources : data
    })
      .getResponse();
  },
};
///validates and responds to the answer

 /**const validateMonumentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'answerIntent';
  },
  handle(handlerInput) {
    const monumentArray = monumentList;
    const monumentIndex = Math.floor(Math.random() * monumentList.length);
    const randomMonument = monumentList[monumentIndex];
    var speechOutput;
    if(handlerInput.requestEnvelope.request.intent.slots.value === randomMonument){
      speechOutput = 'You got the right answer !'
    }else{
      speechOutput = " the correct answer was "+randomMonument
    }


    return handlerInput.responseBuilder
      .speak(speechOutput)
      //.withSimpleCard(SKILL_NAME, randomMonument)
      .reprompt(speechOutput)
      .addDirective({
        type : 'Alexa.Presentation.APL.RenderDocument',
        document : document,
        datasources : data
    })
      .getResponse();
  },
};
*/
/**
const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};
***/
const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};



const SKILL_NAME = 'Trick Color';
const START_MESSAGE = 'Each time you see a word, you must tell the color of the font';
const GET_LAUNCH_MSG = 'This is trick color game. In this game you will see a word in a certain color. \
                        You need to tell the color of the word without getting tricked by what the word is.  Sounds simple?,\
                        Are you Ready ?';
const colorWords = ['BLUE', 'BLACK'];
const colorCodes = ['#5A9FD9','#000000'];





//const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
  /**'A year on Mercury is just 88 days long.',
  'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
  'Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.',
  'On Mars, the Sun appears about half the size as it does on Earth.',
  'Earth is the only planet not named after a god.',
  'Jupiter has the shortest day of all the planets.',
  'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
  'The Sun contains 99.86% of the mass in the Solar System.',
  'The Sun is an almost perfect sphere.',
  'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
  'Saturn radiates two and a half times more energy into space than it receives from the sun.',
  'The temperature inside the Sun can reach 15 million degrees Celsius.',
  'The Moon is moving approximately 3.8 cm away from our planet every year.',**/
  'You are 5 feet tall, It was just a guess, sorry if I am worng.',
  'I am a human being, just kidding, hahaha.',
  'I am such a awesome robot.'
];
//const GET_LAUNCH_MSG = 'Welcome to Guess the Monument game!. Try to figure out what monument it is from what I say next. '
const dataMonuments = [
  'This a building located in India and it was among the seven wonders of the world.'
  ];
const monumentList = [
  'Taj Mahal'];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    launchHandler,
    startGameHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
