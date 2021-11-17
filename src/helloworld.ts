//hello function returns 200 with "hello world"
export const handler = async (event: any ={}): Promise<any> => {
  console.log("event", event);
    return {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello world",
    }),
  };
}
