'use client';

import { MessageCircle } from 'lucide-react';

interface WhatsAppNotifyProps {
  phone: string;
  message: string;
  className?: string;
}

export function WhatsAppNotify({ phone, message, className = '' }: WhatsAppNotifyProps) {
  // Normalize phone number: remove dashes, spaces, dots
  const cleanPhone = phone.replace(/[-\s.()]/g, '');

  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium ${className}`}
      title="Notify via WhatsApp"
    >
      <MessageCircle className="h-3.5 w-3.5" />
      WhatsApp
    </a>
  );
}
