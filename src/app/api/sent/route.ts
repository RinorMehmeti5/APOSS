import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);
console.log("Resend initialized with API key:", process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  debugger;
  try {
    // Parse the request body to get the form data
    const { name, email, subject, message } = await req.json();

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "APOS Contact Form <onboarding@resend.dev>", // This is required by Resend for the free plan
      to: ["mehmetirinor7@gmail.com"], // Your testing email address
      subject: subject,
      replyTo: email,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // If there was an error sending the email, return an error response
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return a success response
    return NextResponse.json({
      message: "Email sent successfully!",
      data,
    });
  } catch (error) {
    // Handle any other errors
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
