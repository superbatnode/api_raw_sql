function otpGenerator(min = 1000000, max = 1999999) {
    return Math.floor(Math.random() * (max - min) + min);
}
module.exports = otpGenerator; 
  