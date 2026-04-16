import { createServerSupabase } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ villaId: string }> }
) {
  const { villaId } = await params;
  const supabase = await createServerSupabase();

  const { data: villa } = await supabase
    .from('villas')
    .select('name')
    .eq('id', villaId)
    .single();

  const { data: reservations } = await supabase
    .from('reservations')
    .select('*')
    .eq('villa_id', villaId)
    .neq('status', 'cancelled');

  const villaName = villa?.name || 'VillaOS Calendar';
  const events = (reservations || [])
    .map((r) => {
      const uid = `${r.id}@villaos`;
      const dtStart = r.check_in.replace(/-/g, '');
      const dtEnd = r.check_out.replace(/-/g, '');
      return [
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTART;VALUE=DATE:${dtStart}`,
        `DTEND;VALUE=DATE:${dtEnd}`,
        `SUMMARY:${r.guest_name} (${r.source})`,
        `DESCRIPTION:Status: ${r.status}\\nRevenue: ${r.total_revenue} THB`,
        'END:VEVENT',
      ].join('\r\n');
    })
    .join('\r\n');

  const ical = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//VillaOS//Villa Calendar//EN',
    `X-WR-CALNAME:${villaName}`,
    events,
    'END:VCALENDAR',
  ].join('\r\n');

  return new NextResponse(ical, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${villaName.replace(/\s+/g, '_')}.ics"`,
    },
  });
}
