import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(2, { message: 'पूरा नाम दर्ज करें (कम से कम 2 अक्षर)' }),
  fatherName: z.string().min(2, { message: 'पिता / पति का नाम दर्ज करें' }),
  gotra: z.string().min(2, { message: 'गोत्र दर्ज करें' }),
  marwarLocation: z.string().min(2, { message: 'मूल निवास दर्ज करें' }),
  currentCity: z.string().min(2, { message: 'वर्तमान प्रवास शहर दर्ज करें' }),
  state: z.string().min(1, { message: 'राज्य चुनें' }),
  occupation: z.string().min(2, { message: 'व्यापार / व्यवसाय दर्ज करें' }),
  mobile: z.string().regex(/^[0-9]{10}$/, { message: 'वैध 10 अंकों का व्हाट्सएप मोबाइल नंबर दर्ज करें' }),
  email: z.string().email({ message: 'वैध ईमेल पता दर्ज करें' }).optional().or(z.literal('')),
  profileImage: z.string().optional(),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const adminLoginSchema = z.object({
  username: z.string().min(3, { message: 'Username is required' }),
  password: z.string().min(4, { message: 'Password is required' }),
});

export type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export const rejectionReasonSchema = z.object({
  reason: z.string().min(3, { message: 'अस्वीकृति का कारण दर्ज करें (Reason is required)' }),
});

export type RejectionReasonFormValues = z.infer<typeof rejectionReasonSchema>;
