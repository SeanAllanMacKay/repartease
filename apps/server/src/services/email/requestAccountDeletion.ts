export default ({
  emailAddress,
  reason,
}: {
  emailAddress: string;
  reason?: string;
}) => ({
  subject: "Account Deletion Requested",
  html: `<h2>${emailAddress} has requested that their account be deleted</h2><p>${reason ? `The reason they gave was:<br/>${reason}` : "They didn't give a reason why."}</p>`,
});
