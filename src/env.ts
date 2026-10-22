// src/env.ts
import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  RESEND_API_KEY: {},
	TURNSTILE_SECRET: {},
});