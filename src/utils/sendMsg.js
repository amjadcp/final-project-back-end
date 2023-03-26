const axios = require('axios')

const sendEmail = (to, text, subject) => {

  if(typeof to === 'string') to = [to]
  to = to.map(e=> {return {email: e}})
  axios.post(
    "https://api.sendinblue.com/v3/smtp/email",
    {
      sender: {
        email: process.env.SIB_SOURCE
      },
      to: to,
      subject: subject,
      htmlContent: text
    },
    {
      headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': process.env.SIB_KEY
      }
    }
  ).then(data=>{
    console.log(data.data);
  })
  .catch(err=>{
    console.log(err);
  })
};

module.exports = {
    sendEmail
}