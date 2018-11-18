import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "Projects",
        Key: {
            UserId: event.requestContext.identity.cognitoIdentityId,
            ProjectId: event.pathParameters.id
        },
        UpdateExpression: "SET Content = :Content, Attachment = :Attachment, ProjectStatus = :ProjectStatus",
        ExpressionAttributeValues: {
            ":ProjectStatus": data.ProjectStatus || "Pending",
            ":Attachment": data.Attachment || null,
            ":Content": data.Content || ""
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await dynamoDbLib.call("update", params);
        return success({ status: true });
    } catch (e) {
        return failure({ status: false });
    }
}