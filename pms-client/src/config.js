export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-east-2",
        BUCKET: "pms-uploads"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://09iwxo1i3i.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_doqvtym22",
        APP_CLIENT_ID: "39geftf1usabb3eu95ed2tds6t",
        IDENTITY_POOL_ID: "us-east-2:e77b4c49-310f-4f1a-9531-12ecdc3e4476"
    }
};