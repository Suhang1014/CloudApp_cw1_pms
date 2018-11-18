import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

const defaultRole = {role: "Developer"};

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: "users_information",
        Item: {
            UserId: event.requestContext.identity.cognitoIdentityId,
            UserName: data.Email,
            Email: data.Email,
            Role: data.Role || defaultRole.Role
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({ status: false });
    }
}