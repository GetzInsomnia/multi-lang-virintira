"use server";

import { z } from "zod";
import nodemailer from "nodemailer";
import { headers } from "next/headers";

// Basic schema for validation
const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(9, "Phone number is required"),
    email: z.string().email("Invalid email address"),
    lineId: z.string().optional(),
    service: z.string().min(1, "Please select a service"),
    message: z.string().optional(),
    socialPlatform: z.string().optional(),
    locale: z.string().optional(),
});

export type FormState = {
    success?: boolean;
    errors?: {
        [K in keyof z.infer<typeof formSchema>]?: string[];
    };
    message?: string;
    remaining?: number; // Cooldown in seconds
};

// Simple in-memory rate limiter (resets on server restart)
const rateLimitMap = new Map<string, number>();

// Helper to map service values to Thai names
const getServiceThaiName = (value: string) => {
    const services: Record<string, string> = {
        'registrations': 'จดทะเบียน',
        'corporate-changes': 'แก้ไขข้อมูลนิติบุคคล',
        'accounting-audit': 'บัญชีและตรวจสอบ',
        'licensing': 'ขอใบอนุญาต',
        'digital-marketing': 'การตลาดออนไลน์',
        'other': 'อื่นๆ'
    };
    return services[value] || value;
};

// Helper to map locale code to Thai name
const getLanguageName = (code?: string) => {
    const langs: Record<string, string> = {
        th: "ไทย", en: "อังกฤษ", fr: "ฝรั่งเศส", de: "เยอรมัน", nl: "ดัตช์",
        it: "อิตาลี", "zh-Hant": "จีนตัวเต็ม", "zh-Hans": "จีนตัวย่อ",
        ja: "ญี่ปุ่น", ko: "เกาหลี", ms: "มาเลย์", ta: "ทมิฬ", hi: "ฮินดี"
    };
    return langs[code || "en"] || code || "ไม่ระบุ";
};

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
    // 1. Honeypot Check (Bot Protection)
    if (formData.get("_gotcha")) {
        // Silently fail or return generic error
        console.warn("Honeypot triggered");
        return { success: false, message: "errorGeneric" };
    }

    // 2. Rate Limiting (3 Minutes)
    const forwardedFor = headers().get("x-forwarded-for");
    const realIp = headers().get("x-real-ip");
    // Handle localhost ::1 or multiple IPs
    const ip = forwardedFor?.split(',')[0] || realIp || "unknown_ip";

    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip);
    const COOLDOWN = 180 * 1000; // 3 minutes

    if (lastRequest && (now - lastRequest < COOLDOWN)) {
        const remaining = Math.ceil((COOLDOWN - (now - lastRequest)) / 1000);
        console.warn(`[RateLimit] Blocked ${ip}. Returning error. Wait ${remaining}s`);
        return {
            success: false,
            message: "errorRateLimit",
            remaining: remaining
        };
    }

    // Update timestamp
    console.log(`[RateLimit] Accepted ${ip}. Setting cooldown.`);
    rateLimitMap.set(ip, now);

    const rawData = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        lineId: formData.get("lineId"),
        service: formData.get("service"),
        message: formData.get("message"),
        socialPlatform: formData.get("socialPlatform"),
        locale: formData.get("locale"),
    };

    // Validate data
    const result = formSchema.safeParse(rawData);

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
            message: "errorGeneric",
        };
    }

    const { name, email, phone, service, message, lineId, socialPlatform, locale } = result.data;

    try {
        // Create Transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "virintirabusiness@gmail.com",
                pass: process.env.GMAIL_APP_PASSWORD, // Must be set in .env
            },
        });

        // Prepare Thai Content
        const langName = getLanguageName(locale);
        const serviceThai = getServiceThaiName(service);
        const emptyText = "ลูกค้าไม่ระบุมา";

        // Format Social ID: "LINE getzinsomnia" or "ลูกค้าไม่ระบุมา"
        const socialDisplay = lineId
            ? `${socialPlatform ? socialPlatform.charAt(0).toUpperCase() + socialPlatform.slice(1) : 'Social'} ${lineId}`
            : emptyText;

        const messageDisplay = message || emptyText;

        // Email Content
        const mailOptions = {
            from: `"Virintira Website" <virintirabusiness@gmail.com>`,
            to: "virintirabusiness@gmail.com", // Send to self
            replyTo: email, // Reply to user directly
            subject: `ลูกค้าใหม่ทางเว็บ: ${serviceThai} - ${name}`,
            text: `
มีลูกค้าที่สนใจบริการของเราติดต่อมาทางเว็บ (ลูกค้าใช้ภาษา${langName})

บริการที่สนใจ: ${serviceThai}
-----------------------------------
ชื่อลูกค้า: ${name}
เบอร์โทรศัพท์: ${phone}
อีเมล: ${email}
Social ID: ${socialDisplay}

ข้อความเพิ่มเติม:
${messageDisplay}
            `,
            html: `
            <div style="font-family: 'Sarabun', Arial, sans-serif; padding: 20px; color: #333; max-width: 600px;">
                <h2 style="color: #A70909; border-bottom: 2px solid #A70909; padding-bottom: 10px;">
                    มีลูกค้าที่สนใจบริการของเราติดต่อมาทางเว็บ
                </h2>
                <p style="font-size: 14px; color: #666; margin-top: -5px;">
                    (ลูกค้าใช้ภาษา<strong>${langName}</strong>)
                </p>

                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>บริการที่สนใจ:</strong> <span style="color: #A70909; font-weight: bold;">${serviceThai}</span></p>
                </div>

                <div style="line-height: 1.6;">
                    <p><strong>ชื่อลูกค้า:</strong> ${name}</p>
                    <p><strong>เบอร์โทรศัพท์:</strong> <a href="tel:${phone}" style="color: #333; text-decoration: none;">${phone}</a></p>
                    <p><strong>อีเมล:</strong> <a href="mailto:${email}" style="color: #0066cc;">${email}</a></p>
                    <p><strong>Social ID:</strong> ${socialDisplay}</p>
                </div>

                <br />
                <p><strong>ข้อความเพิ่มเติม:</strong></p>
                <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px; color: #555;">
                    ${messageDisplay.replace(/\n/g, '<br/>')}
                </div>
                
                <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
                <p style="font-size: 12px; color: #999; text-align: center;">
                    อีเมลนี้ส่งอัตโนมัติจากเว็บไซต์ <a href="https://www.virintira.com" style="color: #999; text-decoration: none;">www.virintira.com</a>
                </p>
            </div>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return {
            success: true,
            message: "successMessage",
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            success: false,
            message: "errorGeneric",
        };
    }
}
