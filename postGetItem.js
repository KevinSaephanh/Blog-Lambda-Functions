"use strict";
const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const { title } = JSON.parse(event.body);
  const params = {
    TableName: "Posts",
    Key: { title },
  };

  try {
    const data = await docClient.get(params).promise();
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
      body: `Unable to get post : ${error}`,
    };
  }
};
