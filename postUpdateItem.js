const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const { id, title, thumbnail, description, body, categories } = JSON.parse(
    event.body
  );
  const params = {
    TableName: "Posts",
    Key: { id },
    UpdateExpression:
      "set title = :t, thumbnail = :th, description = :d, body = :b, categories = :c",
    ExpressionAttributeValues: {
      ":t": title,
      ":th": thumbnail,
      ":d": description,
      ":b": body,
      ":c": categories,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await docClient.update(params).promise();
    const res = JSON.stringify(data);
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
      body: `Unable to update post : ${error}`,
    };
  }
};
