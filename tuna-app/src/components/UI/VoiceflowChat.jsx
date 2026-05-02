import { useState, useRef, useEffect } from 'react'

/**
 * VoiceflowChat – Custom embedded chat panel for TUNA Business Solutions.
 *
 * Uses the public Voiceflow share URL embedded in an iframe so the chatbot
 * works immediately without needing the Voiceflow project to be published
 * to production or have API privacy set to public.
 *
 * The Nova chatbot at the share URL already has:
 *  ✅ Replies to customer questions
 *  ✅ Voice / microphone input
 *  ✅ Full conversation flow
 */

const VOICEFLOW_SHARE_URL =
  'https://creator.voiceflow.com/share/69f4aff8a6f73dca64540b20/production'

export default function VoiceflowChat () {
  const [open, setOpen]         = useState(false)
  const [loaded, setLoaded]     = useState(false)
  const [hasNotif, setHasNotif] = useState(true) // show red dot on first load
  const iframeRef               = useRef(null)
  const panelRef                = useRef(null)

  // Dismiss the notification dot when the user opens the chat
  const handleOpen = () => {
    setOpen(true)
    setHasNotif(false)
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* ── Floating launcher button ───────────────────────────────────── */}
      <button
        id="tuna-chat-launcher"
        aria-label="Open TUNA AI Assistant"
        onClick={open ? () => setOpen(false) : handleOpen}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)',
          boxShadow: '0 4px 24px rgba(79,70,229,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease',
          transform: open ? 'rotate(45deg) scale(1.05)' : 'scale(1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = open
            ? 'rotate(45deg) scale(1.12)'
            : 'scale(1.12)'
          e.currentTarget.style.boxShadow = '0 8px 36px rgba(79,70,229,0.65)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = open
            ? 'rotate(45deg) scale(1.05)'
            : 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(79,70,229,0.5)'
        }}
      >
        {/* Chat icon (closed) / X icon (open) */}
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              fill="rgba(255,255,255,0.25)" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
            <circle cx="9"  cy="10" r="1.2" fill="#fff"/>
            <circle cx="12" cy="10" r="1.2" fill="#fff"/>
            <circle cx="15" cy="10" r="1.2" fill="#fff"/>
          </svg>
        )}

        {/* Notification dot */}
        {hasNotif && !open && (
          <span style={{
            position: 'absolute',
            top: '3px',
            right: '3px',
            width: '14px',
            height: '14px',
            background: '#ef4444',
            borderRadius: '50%',
            border: '2px solid #fff',
            animation: 'vf-notif-pulse 2s ease-in-out infinite',
          }}/>
        )}

        {/* Pulse ring */}
        {!open && (
          <span style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            border: '2px solid rgba(79,70,229,0.4)',
            animation: 'vf-ring 2.4s ease-out infinite',
            pointerEvents: 'none',
          }}/>
        )}
      </button>

      {/* ── Chat panel ────────────────────────────────────────────────── */}
      <div
        ref={panelRef}
        id="tuna-chat-panel"
        style={{
          position: 'fixed',
          bottom: '5.5rem',
          right: '1.5rem',
          zIndex: 9998,
          width: 'min(420px, calc(100vw - 2rem))',
          height: 'min(640px, calc(100dvh - 7rem))',
          borderRadius: '1.25rem',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 4px 24px rgba(79,70,229,0.15)',
          border: '1px solid rgba(255,255,255,0.15)',
          background: '#fff',
          // slide in/out smoothly
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.95)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.28s cubic-bezier(.4,0,.2,1), transform 0.28s cubic-bezier(.34,1.56,.64,1)',
          transformOrigin: 'bottom right',
        }}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)',
          padding: '0.875rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexShrink: 0,
        }}>
          {/* Avatar */}
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"
                fill="#fff"/>
            </svg>
          </div>

          {/* Title + status */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.2 }}>
              TUNA AI Assistant
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px' }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#4ade80',
                animation: 'vf-online 2s ease-in-out infinite',
                flexShrink: 0,
              }}/>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem' }}>
                Online · Replies instantly
              </span>
            </div>
          </div>

          {/* Open in new tab */}
          <a
            href={VOICEFLOW_SHARE_URL}
            target="_blank"
            rel="noreferrer"
            title="Open in new tab"
            style={{
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              borderRadius: '6px',
              transition: 'color 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.7)', display: 'flex',
              alignItems: 'center', padding: '4px', borderRadius: '6px',
              transition: 'color 0.15s', flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Loading skeleton */}
        {!loaded && (
          <div style={{
            position: 'absolute', inset: '60px 0 0 0',
            background: '#f8fafc',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '0.75rem', zIndex: 1,
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              border: '3px solid #e2e8f0', borderTopColor: '#4f46e5',
              animation: 'vf-spin 0.7s linear infinite',
            }}/>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
              Connecting to TUNA AI…
            </p>
          </div>
        )}

        {/* Iframe — the actual Voiceflow chatbot */}
        {open && (
          <iframe
            ref={iframeRef}
            src={VOICEFLOW_SHARE_URL}
            title="TUNA AI Assistant"
            allow="microphone; camera; autoplay; clipboard-write"
            onLoad={() => setLoaded(true)}
            style={{
              flex: 1,
              border: 'none',
              width: '100%',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
              background: '#fff',
            }}
          />
        )}
      </div>

      {/* ── Keyframe styles ───────────────────────────────────────────── */}
      <style>{`
        @keyframes vf-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes vf-ring {
          0%   { opacity: 1;   transform: scale(1); }
          100% { opacity: 0;   transform: scale(1.55); }
        }
        @keyframes vf-notif-pulse {
          0%,100% { transform: scale(1); }
          50%     { transform: scale(1.2); }
        }
        @keyframes vf-online {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.4; }
        }
        #tuna-chat-launcher:focus-visible {
          outline: 3px solid #818cf8;
          outline-offset: 3px;
        }
      `}</style>
    </>
  )
}
