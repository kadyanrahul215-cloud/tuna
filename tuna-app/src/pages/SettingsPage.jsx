import { useState } from 'react'
import { useToast } from '../contexts/ToastContext'
import { useTheme } from '../contexts/ThemeContext'
import AppLayout from '../components/Layout/AppLayout'

export default function SettingsPage() {
  const toast = useToast()
  const { isDark, toggleTheme } = useTheme()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    twoFactor: true,
    compactView: false,
    language: 'en',
    timezone: 'UTC-5',
  })

  const toggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    toast.success('Setting updated')
  }

  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      style={{
        width: '48px', height: '26px', borderRadius: '9999px', border: 'none',
        backgroundColor: checked ? '#4f46e5' : '#e2e8f0',
        position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s ease',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-surface)',
        position: 'absolute', top: '3px',
        left: checked ? '25px' : '3px',
        transition: 'left 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }} />
    </button>
  )

  const Section = ({ title, children }) => (
    <div style={{
      backgroundColor: 'var(--color-surface)', borderRadius: '1.25rem',
      border: '1px solid var(--color-border)', padding: '1.5rem',
    }}>
      <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '1.25rem' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {children}
      </div>
    </div>
  )

  const SettingRow = ({ icon, label, description, toggle: toggleEl, action }) => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1rem 0', borderBottom: '1px solid var(--color-border-light)',
      gap: '1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1, minWidth: 0 }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '0.625rem',
          backgroundColor: 'var(--color-surface-100)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-text-secondary)' }}>{icon}</span>
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{label}</p>
          {description && <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.125rem' }}>{description}</p>}
        </div>
      </div>
      {toggleEl || action}
    </div>
  )

  return (
    <AppLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fade-in 0.4s ease' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Settings</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Manage your preferences and account settings</p>
        </div>

        <Section title="Notifications">
          <SettingRow
            icon="mail" label="Email Notifications"
            description="Receive updates via email"
            toggle={<ToggleSwitch checked={settings.emailNotifications} onChange={() => toggle('emailNotifications')} />}
          />
          <SettingRow
            icon="notifications" label="Push Notifications"
            description="Browser push notifications"
            toggle={<ToggleSwitch checked={settings.pushNotifications} onChange={() => toggle('pushNotifications')} />}
          />
          <SettingRow
            icon="campaign" label="Marketing Emails"
            description="Product updates and offers"
            toggle={<ToggleSwitch checked={settings.marketingEmails} onChange={() => toggle('marketingEmails')} />}
          />
        </Section>

        <Section title="Security">
          <SettingRow
            icon="security" label="Two-Factor Authentication"
            description="Add an extra layer of security"
            toggle={<ToggleSwitch checked={settings.twoFactor} onChange={() => toggle('twoFactor')} />}
          />
          <SettingRow
            icon="key" label="Change Password"
            description="Update your account password"
            action={
              <button style={{
                padding: '0.5rem 1rem', borderRadius: '0.625rem',
                border: '1.5px solid var(--color-border)', backgroundColor: 'var(--color-surface)',
                fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', color: 'var(--color-text)',
                transition: 'all 0.2s ease', whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
              >Change</button>
            }
          />
          <SettingRow
            icon="devices" label="Active Sessions"
            description="Manage your active devices"
            action={
              <button style={{
                padding: '0.5rem 1rem', borderRadius: '0.625rem',
                border: '1.5px solid var(--color-border)', backgroundColor: 'var(--color-surface)',
                fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', color: 'var(--color-text)',
                transition: 'all 0.2s ease', whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
              >Manage</button>
            }
          />
        </Section>

        <Section title="Appearance">
          <SettingRow
            icon="dark_mode" label="Dark Mode"
            description="Toggle dark color scheme"
            toggle={<ToggleSwitch checked={isDark} onChange={toggleTheme} />}
          />
          <SettingRow
            icon="view_compact" label="Compact View"
            description="Reduce spacing in sidebar and cards"
            toggle={<ToggleSwitch checked={settings.compactView} onChange={() => toggle('compactView')} />}
          />
        </Section>

        <Section title="Preferences">
          <SettingRow
            icon="language" label="Language"
            description="Choose your preferred language"
            action={
              <select
                value={settings.language}
                onChange={e => setSettings(p => ({...p, language: e.target.value}))}
                style={{
                  padding: '0.5rem 0.75rem', borderRadius: '0.625rem',
                  border: '1.5px solid var(--color-border)', backgroundColor: 'var(--color-surface)',
                  fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', color: 'var(--color-text)',
                }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            }
          />
          <SettingRow
            icon="schedule" label="Timezone"
            description="Your current timezone"
            action={
              <select
                value={settings.timezone}
                onChange={e => setSettings(p => ({...p, timezone: e.target.value}))}
                style={{
                  padding: '0.5rem 0.75rem', borderRadius: '0.625rem',
                  border: '1.5px solid var(--color-border)', backgroundColor: 'var(--color-surface)',
                  fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', color: 'var(--color-text)',
                }}
              >
                <option value="UTC-5">UTC-5 (EST)</option>
                <option value="UTC+0">UTC+0 (GMT)</option>
                <option value="UTC+1">UTC+1 (CET)</option>
                <option value="UTC+5:30">UTC+5:30 (IST)</option>
              </select>
            }
          />
        </Section>

        {/* Danger Zone */}
        <div style={{
          backgroundColor: 'var(--color-surface)', borderRadius: '1.25rem',
          border: '1px solid var(--color-error-bg)', padding: '1.5rem',
        }}>
          <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-error)', marginBottom: '0.5rem' }}>Danger Zone</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
            Irreversible actions that affect your account
          </p>
          <button style={{
            padding: '0.625rem 1.25rem', borderRadius: '0.75rem', border: '1.5px solid rgba(239, 68, 68, 0.4)',
            backgroundColor: 'var(--color-surface)', color: 'var(--color-error)', fontWeight: 600, fontSize: '0.8125rem',
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-surface)' }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
