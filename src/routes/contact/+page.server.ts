import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY, TURNSTILE_SECRET } from '$app/env/private';
import type { Actions, PageServerLoad } from './$types';

const resend = new Resend(RESEND_API_KEY);
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const todayISO = () =>
  new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });

export const load: PageServerLoad = () => ({ today: todayISO() });

export const actions: Actions = {
  default: async ({ request, getClientAddress }) => {
    const data = await request.formData();
    const get = (k: string) => String(data.get(k) ?? '').trim();

    if (get('website')) return { success: true };

    const values = {
      name: get('name'),
      email: get('email'),
      phone: get('phone'),
      date: get('date'),
      guests: get('guests'),
      message: get('message')
    };

    const token = get('cf-turnstile-response');
    const errors: Record<string, string> = {};

    if (!token) errors.form = 'Please complete the security challenge.';
    if (!values.name) errors.name = 'Required';
    if (!emailRe.test(values.email)) errors.email = 'Invalid email';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) errors.date = 'Required';
    else if (values.date < todayISO())
      errors.date = 'Date must be today or later';
    if (!/^\d+$/.test(values.guests) || Number(values.guests) < 1)
      errors.guests = 'Enter a number';
    if (values.message.length > 2000) errors.message = 'Too long';

    if (Object.keys(errors).length) return fail(400, { values, errors });

    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET,
          response: token,
          remoteip: getClientAddress()
        })
      }
    );
    const outcome = await res.json();

    if (!outcome.success) {
      return fail(400, {
        values,
        errors: { form: 'Security check failed. Please retry the challenge.' }
      });
    }

    const esc = (s: string) =>
      s.replace(
        /[&<>"']/g,
        (c) =>
          ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
            c
          ]!
      );
    
    const fmtDate = (iso: string) =>
      new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    
    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:13px;text-transform:uppercase;letter-spacing:.04em;width:110px;vertical-align:top">${label}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:15px">${value}</td>
      </tr>`;
    
    const renderHtml = (v: Record<string, string>) => {
      const email = esc(v.email);
      const phone = esc(v.phone);
      return `<!doctype html>
    <html>
    <body style="margin:0;padding:24px;background:#f5f3ef;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
        <tr>
          <td style="background:#2f4f3a;padding:24px 28px;color:#fff">
            <div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;opacity:.8">River Street Market</div>
            <div style="font-size:22px;font-weight:600;margin-top:4px">New catering inquiry</div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 28px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${row('Name', esc(v.name))}
              ${row('Email', `<a href="mailto:${email}" style="color:#2f6f4a">${email}</a>`)}
              ${row('Phone', phone ? `<a href="tel:${phone}" style="color:#2f6f4a">${phone}</a>` : '—')}
              ${row('Date', esc(fmtDate(v.date)))}
              ${row('Guests', esc(v.guests))}
            </table>
            <div style="margin-top:20px;color:#888;font-size:13px;text-transform:uppercase;letter-spacing:.04em">Message</div>
            <div style="margin-top:8px;padding:14px 16px;background:#faf8f4;border-left:3px solid #2f4f3a;border-radius:4px;color:#222;font-size:15px;line-height:1.5;white-space:pre-wrap">${esc(v.message) || '—'}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 28px;background:#faf8f4;color:#999;font-size:12px">
            Reply directly to this email to respond to ${esc(v.name)}.
          </td>
        </tr>
      </table>
    </body>
    </html>`;
    };

    const { error } = await resend.emails.send({
      from: 'River Street Market <hello@shopriverstreetmarket.com>',
      to: 'garik.asplund@gmail.com',
      replyTo: values.email,
      subject: `Catering inquiry from ${values.name} · ${values.guests} guests · ${values.date}`,
      html: renderHtml(values),
      text: Object.entries(values)
        .map(([k, v]) => `${k}: ${v || '-'}`)
        .join('\n')
    });

    if (error) {
      return fail(500, {
        values,
        errors: { form: 'Could not send. Try again.' }
      });
    }

    const { name, email, date, guests } = values;
    return { success: true, values: { name, email, date, guests } };
  }
};