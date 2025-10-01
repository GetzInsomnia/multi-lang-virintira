import BorderRevealButton from '@/components/BorderRevealButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ไม่พบหน้าที่คุณต้องการ | VIRINTIRA',
  description: 'ขออภัย ไม่พบหน้าเว็บที่คุณพยายามเข้าถึง',
}

export default function NotFound() {
  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center text-center px-6 bg-white">
      <div className="max-w-xl flex flex-col items-center">
        <div className="text-[80px] sm:text-[100px] leading-none mb-6">😢</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#A70909] mb-4 leading-relaxed">
          ไม่พบหน้าที่คุณต้องการ
        </h1>
        <p className="text-black text-lg sm:text-xl mb-10 leading-relaxed">
          ลิงก์อาจไม่ถูกต้อง หรือเนื้อหาอาจถูกย้ายไปแล้ว
        </p>
        <BorderRevealButton href="/" className="text-xs py-1 px-3">
          กลับไปหน้าแรก
        </BorderRevealButton>
      </div>
    </div>
  )
}

