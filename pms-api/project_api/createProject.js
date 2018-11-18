import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: "Projects",
        Item: {
            UserId: event.requestContext.identity.cognitoIdentityId,
            ProjectId: uuid.v1(),
            ProjectStatus: data.ProjectStatus,
            Content: data.Content,
            Attachment: data.Attachment,
            CreatedAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({ status: false });
    }
}