const AWS = require("aws-sdk");

exports.handler = async (event) => {
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
  } = JSON.parse(event.body);
  const params = {
    TableName: "Posts",
    Item: {
      id: id,
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
      responseBody: `Unable to add post: " ${error}`,
    };
  }
};
