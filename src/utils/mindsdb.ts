import MindsDB from "mindsdb-js-sdk";

const connect = async () => {
  try {
    await MindsDB.connect({
      host: "http://127.0.0.1:47334",
      user: "",
      password: "",
    });

    return console.log("Connected to MindsDB");
  } catch (error: any) {
    return error;
  }
};

export default connect;
