type SuccessfulSignUpProps = {
  verificationCode: string;
  referer: string;
};

export default ({ verificationCode, referer }: SuccessfulSignUpProps) => ({
  subject: "Welcome to Repartease",
  html: `<p><a href="${referer}?verification=${verificationCode}">Click Here</a> to verify your emailaddress!</p>`,
});
