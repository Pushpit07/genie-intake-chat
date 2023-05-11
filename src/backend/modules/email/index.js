const aws = require("aws-sdk");

exports.sendEmailViaAWS_SES = async function ({ emailBody, emailSubject, emailTo, emailFrom }) {
	console.log("\n--- AWS SES Service ---\n");

	const ses = new aws.SES({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: "ap-south-1",
	});

	const params = {
		Destination: {
			ToAddresses: [emailTo],
		},
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: emailBody,
				},
			},
			Subject: {
				Charset: "UTF-8",
				Data: emailSubject,
			},
		},
		Source: emailFrom || process.env.SENDER_EMAIL,
	};

	try {
		const sendEmail = await ses.sendEmail(params).promise();
		console.log("Email send attempted::", sendEmail);
		return sendEmail;
	} catch (error) {
		console.log("SES error::", error);
	}
};
