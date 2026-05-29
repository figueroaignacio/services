import { type NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: add email sending (Resend / Nodemailer)
    // Example with Resend:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@tudominio.com',
    //   to: 'tu@email.com',
    //   subject: `Nuevo mensaje de ${name}`,
    //   text: message,
    // });

    console.log('[contact] New message from', name, email);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[contact] Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
