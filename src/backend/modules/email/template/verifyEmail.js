const VerifyEmailTemplate = (verificationCode) => {
	var content = `<html>
            <body style='background: black; text-align: center; align-items: center'>
                <div style='max-width: 480px; margin:auto; padding-top: 30px; padding-bottom: 50px; padding-left: 40px; padding-right: 40px'>
                    <img src="https://backslope-images.s3.amazonaws.com/Logo%403x.png" alt="logo" />
                    <p style='font-size:2em; color:white'>Your verification code is ${verificationCode}</p>
                </div>
            </body>
        </html>`;

	return content;
};

module.exports = {
	VerifyEmailTemplate,
};
