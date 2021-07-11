const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = { TableName: "Posts" };

  try {
    const data = await docClient.scan(params).promise();
    const res = JSON.stringify(data.Items);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: res,
    };
  } catch (error) {
    return {
      statusCode: 403,
      body: `Unable to get posts: ${error}`,
    };
  }
};
