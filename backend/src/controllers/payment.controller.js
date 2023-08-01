const { default: axios } = require("axios");
var Publishable_Key = process.env.PUBLISHABLE_KEY;
var Secret_Key = process.env.SECRET_KEY;
const chapaSecretKey = process.env.CHAPA_SECRET_KEY;

const stripe = require("stripe")(Secret_Key);


const addPayment = async (req, res) => {
  try {

    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${chapaSecretKey}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `*`,
        },
      }
    );


    res.status(200).send(response);



  } catch (err) {

    res.status(500).send({ status: "error" });
    return;
  }
};

const addPaymentTwo = async (req, res) => {
  try {
    const { amount, receipt_email } = req.body;
    const paymentIntent = await stripe.paymentIntent.create({
      amount: amount,
      currency: "etb",
      receipt_email: `${receipt_email}`,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

module.exports = { addPayment, addPaymentTwo };
