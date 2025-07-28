const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const body = JSON.parse(event.body);
  const secretKey = "6Le39pErAAAAAFsPcDwypom8n0RUcXNEd7AtYjbL";
  const token = body["g-recaptcha-response"];

  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const googleRes = await fetch(verifyURL, { method: "POST" });
    const googleData = await googleRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: googleData.success,
        score: googleData.score || null,
        message: googleData["error-codes"] || null
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Server error." })
    };
  }
};
