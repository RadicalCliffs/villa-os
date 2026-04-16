import { ImageResponse } from 'next/og'

export const alt = 'VillaOS - Your Villas. On Autopilot.'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0D2818 0%, #065F46 50%, #059669 100%)',
          fontFamily: 'Arial, Helvetica, sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle texture overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)',
            display: 'flex',
          }}
        />

        {/* V logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}
        >
          <svg width="90" height="70" viewBox="0 0 32 32">
            <path d="M4 8L16 24L28 8" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M26 7c-2 2-3 5-2 8" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            <path d="M27 6c-4 1-6 4-6 7" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          </svg>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '-1px',
            display: 'flex',
          }}
        >
          VillaOS
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: '#D4A843',
            fontWeight: '600',
            marginTop: '8px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          Your Villas. On Autopilot.
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '48px',
            padding: '20px 48px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {[
            { label: 'Villas Managed', value: '500+' },
            { label: 'Phuket, Thailand', value: '' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {stat.value && (
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', display: 'flex' }}>
                  {stat.value}
                </div>
              )}
              <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', display: 'flex' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
