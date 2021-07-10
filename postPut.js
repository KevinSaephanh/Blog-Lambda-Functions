"use strict";
const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const {
    id,
    title,
    thumbnail,
    author,
    authorPic,
    description,
    body,
    categories,
  } = event.body;
  const params = {
    TableName: "Posts",
    Item: {
      id,
      title,
      thumbnail,
      author,
      authorPic,
      description,
      body,
      categories,
      createdAt: Date.now(),
    },
  };

  try {
    const data = await documentClient.put(params).promise();
    const res = JSON.stringify(data);
    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
      },
      responseBody: res,
    };
  } catch (error) {
    return {
      statusCode: 403,
      responseBody: `Unable to add post" ${error}`,
    };
  }
};
