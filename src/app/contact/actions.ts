
"use server";

import type { ContactFormData } from "@/components/contact-form";
// Uncomment the next line when you are ready to use Twilio
// import Twilio from 'twilio';

// This is a placeholder for actual form submission logic (e.g., sending an email, saving to DB)
export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean, error?: string }> {
  console.log("Contact form submitted with data:", data);

  const smsRecipient = "+447742643648"; // The recipient phone number you requested
  let smsMessage = `New contact form submission:
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Message: ${data.message}`;

  if (data.phone) {
    smsMessage += `\nPhone: ${data.phone}`;
  }
  if (data.eventDate) {
    smsMessage += `\nEvent Date: ${data.eventDate}`;
  }
  if (data.numGuests) {
    smsMessage += `\nGuests: ${data.numGuests}`;
  }

  console.log(`SIMULATED SMS to ${smsRecipient}: \n${smsMessage}`);

  // --- TWILIO INTEGRATION POINT ---
  // To enable actual SMS sending:
  // 1. Make sure you have a Twilio account, Account SID, Auth Token, and a Twilio phone number.
  // 2. Add your TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER to your .env file.
  // 3. Uncomment the 'import Twilio from "twilio";' line at the top of this file.
  // 4. Uncomment and configure the Twilio client and message sending code below.

  /*
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.error("Twilio credentials are not configured in .env file.");
    // Optionally, you could return an error to the client here if live SMS is critical
    // return { success: false, error: "SMS service is currently unavailable." };
  } else {
    try {
      const client = new Twilio(accountSid, authToken);
      await client.messages.create({
        body: smsMessage,
        from: twilioPhoneNumber, // Your Twilio phone number
        to: smsRecipient,       // The recipient's phone number
      });
      console.log("SMS sent successfully via Twilio!");
    } catch (error: any) {
      console.error("Error sending SMS via Twilio:", error.message);
      // Optionally, return an error to the client
      // return { success: false, error: "Failed to send SMS notification." };
    }
  }
  */
  // --- END TWILIO INTEGRATION POINT ---


  // Simulate API call latency
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Example of a potential error
  // if (data.email.includes("testfail@example.com")) {
  //   return { success: false, error: "This email address is blocked." };
  // }

  // In a real application, you would:
  // 1. Validate data further on the server
  // 2. Sanitize inputs
  // 3. Send an email notification (if desired)
  // 4. Save the enquiry to a database
  // 5. Handle errors gracefully from the SMS service

  return { success: true };
}
