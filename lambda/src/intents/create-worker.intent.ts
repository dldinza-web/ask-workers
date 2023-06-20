import * as Alexa from 'ask-sdk-core'
import { createWorker } from '../services/workers.service';

export const CreateWorkerIntentHandler = {
    canHandle(handlerInput: any) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CreateWorkerIntent';
    },
    async handle(handlerInput: any) {
        const worker = await createWorker()
        
        const speakOutput = `The New worker "${worker.name}" has been created successfully!!`

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};