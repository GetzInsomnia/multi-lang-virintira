"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";

type LegacyProps = {
  /** ข้อความเดี่ยวตามสไตล์ legacy */
  text: string;
  /** ความเร็วพิมพ์ ต่ออักษร (ms) – ดีฟอลต์ 80 ตาม legacy */
  speed?: number;
  /** คลาสเพิ่มตามต้องการ */
  className?: string;
};

type CompatProps = {
  /** รูปแบบใหม่ที่เคยใช้ใน repo ปัจจุบัน – จะใช้เฉพาะตัวแรก */
  phrases?: string[];
  interval?: number;
  className?: string;
};

/**
 * พฤติกรรม & หน้าตาแบบ legacy:
 * - พิมพ์เดินหน้าอย่างเดียวจนจบ แล้วหยุด
 * - แสดงเป็น <h2> พร้อมสไตล์เดิม
 * - มีเคอร์เซอร์ '|' กระพริบ
 *
 * ยังรองรับ props แบบใหม่ (phrases) เพื่อไม่ให้ import เดิมพัง:
 * - ถ้าให้ phrases มา 1 ตัว: ถือว่าเป็นข้อความเดี่ยว (เหมือน text)
 * - ถ้าให้หลายตัว: ใช้เฉพาะตัวแรก (ไม่วน/ไม่ลบ) เพื่อคงพฤติกรรม legacy
 */
export function TypewriterText(props: LegacyProps | CompatProps) {
  // ปรับให้รองรับทั้ง text (legacy) และ phrases (ใหม่)
  const effectiveText = useMemo(() => {
    if ("text" in props && typeof props.text === "string") return props.text;
    if ("phrases" in props && Array.isArray(props.phrases)) {
      return props.phrases[0] ?? ""; // ใช้เฉพาะตัวแรก (คงพฤติกรรม legacy)
    }
    return "";
  }, [props]);

  const speed =
    "speed" in props && typeof props.speed === "number" ? props.speed : 80;

  const className =
    ("className" in props && props.className) || "";

  const [subIndex, setSubIndex] = useState(0);

  useEffect(() => {
    if (!effectiveText) {
      setSubIndex(0);
      return;
    }

    if (subIndex < effectiveText.length) {
      const t = setTimeout(() => {
        setSubIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(t);
    }
  }, [effectiveText, subIndex, speed]);

  const locale = useLocale();
  const isRTL = ["ar", "fa", "he"].includes(locale as string);

  return (
    <h2
      dir={isRTL ? "rtl" : "ltr"}
      style={{ fontWeight: 400 }}
      className={`inline-flex max-w-full items-baseline gap-[0.75ch] align-middle text-lg lg:text-2xl text-[#A70909] leading-relaxed ${className}`}
      aria-live="polite"
    >
      <span className="whitespace-pre-wrap">
        {effectiveText.substring(0, subIndex)}
      </span>
      <span
        aria-hidden
        className="pointer-events-none select-none inline-block h-[1.05em] w-[0.09em] translate-y-[0.08em] rounded-full bg-current motion-safe:animate-[pulse_1.2s_ease-in-out_infinite] motion-reduce:animate-none"
      />
    </h2>
  );
}

export default TypewriterText;
