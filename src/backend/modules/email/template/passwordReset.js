export const PasswordResetTemplate = (resetUrl) => {
	var content =
		`<html>
        <body style='background: black; text-align: center; align-items: center'>
            <div style='max-width: 480px; margin:auto; padding-top: 30px; padding-bottom: 50px; padding-left: 40px; padding-right: 40px'>
                <p style='font-size:2em; color:white'>Password Recovery</p>
                <p style='color:white; text-align: left;'>Hey there!</p>
                <p style='color:white; text-align: left;'>` +
		`Your password reset url is:\n\n${resetUrl}` +
		`<p style='color:white; margin: 20px;'>Please click the link or the button below to change your password.</p>
                <a href="${resetUrl}" target="_blank">
                    <button style='padding: 15px 60px; text-align:center; margin: 20px; color: black; cursor: pointer;'>Reset Password</button>
                </a>
                <p style='color:white; text-align: center;'>If you have not requested this email, then ignore it.</p>
            </div>
        </body>
    </html>`;

	return content;
};
