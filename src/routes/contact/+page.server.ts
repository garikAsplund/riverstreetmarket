// import { fail } from '@sveltejs/kit';
// import { Resend } from 'resend';
// import { RESEND_API_KEY } from '$env/static/private';
// 
// const resend = new Resend(RESEND_API_KEY);
// const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 
// const todayISO = () =>
//   new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
// 
// export const load = () => ({ today: todayISO() });
// 
// export const actions = {
//   default: async ({ request }) => {
//     const data = await request.formData();
//     const get = (k: string) => String(data.get(k) ?? '').trim();
// 
//     if (get('website')) return { success: true };
// 
//     const values = {
//       name: get('name'),
//       email: get('email'),
//       phone: get('phone'),
//       date: get('date'),
//       guests: get('guests'),
//       message: get('message')
//     };
// 
//     const errors: Record<string, string> = {};
//     if (!values.name) errors.name = 'Required';
//     if (!emailRe.test(values.email)) errors.email = 'Invalid email';
//     if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) errors.date = 'Required';
//     else if (values.date < todayISO()) errors.date = 'Date must be today or later';
//     if (!/^\d+$/.test(values.guests) || Number(values.guests) < 1)
//       errors.guests = 'Enter a number';
//     if (values.message.length > 2000) errors.message = 'Too long';
// 
//     if (Object.keys(errors).length) return fail(400, { values, errors });
// 
//     const { error } = await resend.emails.send({
//       from: 'Catering Form <catering@theirdomain.com>',
//       to: 'owner@theirdomain.com',
//       replyTo: values.email,
//       subject: `Catering inquiry from ${values.name}`,
//       text: Object.entries(values)
//         .map(([k, v]) => `${k}: ${v || '-'}`)
//         .join('\n')
//     });
// 
//     if (error) {
//       return fail(500, {
//         values,
//         errors: { form: 'Could not send. Try again.' }
//       });
//     }
// 
//     return { success: true };
//   }
// };