export const InvitationTemplate = (invitedBy, teamName, productName, joinInvitationLink) => {
	var content =
		`<html>
        <body style='background: black; text-align: center; align-items: center'>
            <div style='max-width: 480px; margin:auto; padding-top: 30px; padding-bottom: 50px; padding-left: 40px; padding-right: 40px'>
                <p style='font-size:2em; color:white'>You've Been Invited</p>
                <p style='color:white; text-align: left;'>Hey there!</p>
    <p style='color:white; text-align: left;'>` +
		invitedBy +
		` invited you to join their team ` +
		teamName +
		` on ` +
		productName +
		`! Click the button below to accept the invitation.</p>
                <a href="${joinInvitationLink}" target="_blank">
                    <button style='padding: 15px 60px; text-align:center; margin: 20px; color: black; cursor: pointer;'>Accept Invite</button>
                </a>
                <p style='color:white; text-align: left;'>Make sure to sign up with the same email you received this invitation on.</p>
            </div>
        </body>
    </html>`;

	return content;
};
