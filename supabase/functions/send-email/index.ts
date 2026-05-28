import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LeadPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service_type: string;
  description: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const NOTIFICATION_EMAIL = Deno.env.get("NOTIFICATION_EMAIL") || "info@freshimpressionspainting.com";
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "Fresh Impressions <onboarding@resend.dev>";

    const lead: LeadPayload = await req.json();

    // Send notification email to business owner
    const notificationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [NOTIFICATION_EMAIL],
        subject: `New Estimate Request: ${lead.first_name} ${lead.last_name} - ${lead.service_type}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #10263C; padding: 24px 32px;">
              <h1 style="color: #FACF10; margin: 0; font-size: 20px;">New Estimate Request</h1>
            </div>
            <div style="padding: 32px; background-color: #f9f9f9; border: 1px solid #e5e5e5;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #333; width: 130px;">Name:</td>
                  <td style="padding: 8px 0; color: #555;">${lead.first_name} ${lead.last_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #333;">Phone:</td>
                  <td style="padding: 8px 0; color: #555;"><a href="tel:${lead.phone}" style="color: #2B98BE;">${lead.phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #333;">Email:</td>
                  <td style="padding: 8px 0; color: #555;"><a href="mailto:${lead.email}" style="color: #2B98BE;">${lead.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #333;">Service:</td>
                  <td style="padding: 8px 0; color: #555;">${lead.service_type}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #333; vertical-align: top;">Details:</td>
                  <td style="padding: 8px 0; color: #555;">${lead.description || "No additional details provided."}</td>
                </tr>
              </table>
            </div>
            <div style="padding: 16px 32px; background-color: #10263C; text-align: center;">
              <p style="color: #ffffff80; font-size: 12px; margin: 0;">Fresh Impressions Painting - Lead Notification</p>
            </div>
          </div>
        `,
      }),
    });

    if (!notificationRes.ok) {
      const err = await notificationRes.text();
      return new Response(
        JSON.stringify({ error: "Failed to send notification email", details: err }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send confirmation email to the customer
    if (lead.email) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [lead.email],
          subject: "We received your estimate request - Fresh Impressions Painting",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #10263C; padding: 24px 32px;">
                <h1 style="color: #FACF10; margin: 0; font-size: 20px;">Fresh Impressions Painting</h1>
              </div>
              <div style="padding: 32px; background-color: #ffffff; border: 1px solid #e5e5e5;">
                <h2 style="color: #10263C; margin-top: 0;">Thanks, ${lead.first_name}!</h2>
                <p style="color: #555; line-height: 1.6;">
                  We've received your estimate request for <strong>${lead.service_type}</strong> and will be in touch within 24 hours to discuss your project.
                </p>
                <p style="color: #555; line-height: 1.6;">
                  In the meantime, feel free to call us at <a href="tel:+18172439116" style="color: #2B98BE; font-weight: 600;">(817) 243-9116</a> if you have any questions.
                </p>
                <p style="color: #555; line-height: 1.6; margin-bottom: 0;">
                  We look forward to helping transform your space!
                </p>
              </div>
              <div style="padding: 16px 32px; background-color: #10263C; text-align: center;">
                <p style="color: #ffffff80; font-size: 12px; margin: 0;">&copy; Fresh Impressions Painting | Granbury, TX</p>
              </div>
            </div>
          `,
        }),
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
