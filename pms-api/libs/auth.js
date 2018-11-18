const uuid = require('uuid/v4');

module.exports = ({identityProvider, userService}) => {
    const postAuthenticationHandler = async (event, context, callback) => {
        const userData = {
            userId: event.userName,
            email: event.request.userAttributes.email
        }

        const user = await identityProvider.adminGetUser({
            UserPoolId: 'us-east-2_doqvtym22',
            Username: userData.userId
        }).promise();

        const rawUser = {
            Id: uuid(),
            Email: userData.email,
            UserId: userData.userId,
            Role: "Developer"
        };

        const userCreatedMessage = await userService.create(rawUser);
        context.done(null, event);
    }

    return {
        postAuthenticationHandler
    }
}