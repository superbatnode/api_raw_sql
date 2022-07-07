const sendMail = require("./gmail");
const email = async (option) => {
  const options = {
    to: option.email,
    subject: option.subject,
    html: option.template,
    textEncoding: "base64",
    headers: [
      { key: "Jr Node Dev", value: "Sandeep Soni" },
    ],
  };
  try{
    const messageId = await sendMail(options);
    return {status: true, messageId}
  }catch(e){
    return {status:false, error:e}; 
  }
};
module.exports = email; 
