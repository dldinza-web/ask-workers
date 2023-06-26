import * as Alexa from 'ask-sdk-core'
import { retrieveAllWorkers } from '../services/workers.service'

export const ShowAllWorkersIntentHandler = {
    canHandle(handlerInput: any) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ShowAllWorkersIntent'
    },
    async handle(handlerInput: any) {
        const allWorkers = await retrieveAllWorkers()
        const totalWorkers = allWorkers.length

        let speakAllWorkersNames = ''
        allWorkers.forEach((worker: any, index) => {
            const union = (index === totalWorkers - 1)
                ? ' and '
                : ', '

            speakAllWorkersNames = speakAllWorkersNames.concat(union + worker.name)
        });

        const speakResponse = (totalWorkers === 0)
            ? 'There is no workers. Please create a worker.'
            : `There are ${allWorkers.length}. They are ${speakAllWorkersNames}`

        return handlerInput.responseBuilder
            .speak(speakResponse)
            .reprompt()
            .getResponse()
    }
}