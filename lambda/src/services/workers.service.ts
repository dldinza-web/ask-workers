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

    return worker
}

export const retrieveAllWorkers = async () => {
    const dynamoParams = {
        TableName: 'workers'
    }

    let items: any[] = []

    do {
        const dbResponse = await dynamoDbDocument.scan(dynamoParams).promise()
        items = items.concat(dbResponse.Items)

        console.log('!!!!dbResponse.LastEvaluatedKey', dbResponse.LastEvaluatedKey, (dbResponse.Items) ? dbResponse.Items[0] : null)

        dynamoParams.ExclusiveStartKey = dbResponse.LastEvaluatedKey
    } while(dynamoParams.ExclusiveStartKey)

    return items
}