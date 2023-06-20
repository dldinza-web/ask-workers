import * as uuid from 'uuid'
import { faker } from '@faker-js/faker'
import AWS from 'aws-sdk'

const dynamoDbDocument = new AWS.DynamoDB.DocumentClient()

export const createWorker = async () => {
    const worker = {
        id: uuid.v1(),
        name: faker.person.fullName(),
        updatedAt: new Date().toISOString()
    }

    const dynamoParams = {
        TableName: 'workers',
        Item: worker
    }

    const dbResponse = await dynamoDbDocument.put(dynamoParams).promise()
    console.log('!!! dbResponse', dbResponse)

    return worker
}