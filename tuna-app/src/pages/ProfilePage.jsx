import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import AppLayout from '../components/Layout/AppLayout'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const toast = useToast()
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState(user?.full_name || '')
  const [email] = useState(user?.email || '')
  const [bio, setBio] = useState(user?.bio || 'Business professional at TUNA')
  const [phone, setPhone] = useState(user?.phone || '')
  const [location, setLocation] = useState(user?.location || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 500))
    updateProfile({ full_name: fullName, bio, phone, location })
    setSaving(false)
    setEditing(false)
    toast.success('Profile updated successfully!')
  }

  const infoFieldStyle = {
    display: 'flex', flexDirection: 'column', gap: '0.375rem',
  }

  const inputStyle = {
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    border: '1.5px solid var(--color-border)',
    fontSize: '0.875rem',
    backgroundColor: 'var(--color-surface-50)',
    transition: 'all 0.2s ease',
    color: 'var(--color-text)',
    width: '100%',
  }

  const readOnlyStyle = {
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    backgroundColor: 'var(--color-surface-50)',
    color: 'var(--color-text)',
    border: '1.5px solid transparent',
  }

  const stats = [
    { label: 'Member since', value: new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), icon: 'calendar_month' },
    { label: 'Projects', value: '12', icon: 'folder' },
    { label: 'Team members', value: '8', icon: 'group' },
  ]

  return (
    <AppLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fade-in 0.4s ease' }}>

        {/* Profile Header */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: '1.25rem',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
        }}>
          {/* Cover */}
          <div style={{
            height: '140px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #0ea5e9 100%)',
            position: 'relative',
          }} />

          {/* Avatar + Info */}
          <div style={{ padding: '0 2rem 2rem', marginTop: '-40px', position: 'relative' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: '1.75rem',
              border: '4px solid var(--color-surface)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              marginBottom: '1rem',
            }}>
              {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {user?.full_name || 'User'}
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                  {user?.email || 'user@example.com'}
                </p>
              </div>
              <button
                onClick={() => editing ? handleSave() : setEditing(true)}
                disabled={saving}
                style={{
                  padding: '0.625rem 1.25rem', borderRadius: '0.75rem', border: 'none',
                  background: editing
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  color: '#fff', fontWeight: 600, fontSize: '0.8125rem',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  {editing ? 'check' : 'edit'}
                </span>
                {saving ? 'Saving...' : editing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              backgroundColor: 'var(--color-surface)', borderRadius: '1rem', padding: '1.25rem',
              border: '1px solid var(--color-border)',
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '0.75rem',
                backgroundColor: 'rgba(79, 70, 229, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--color-primary)' }}>{stat.icon}</span>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{stat.label}</p>
                <p style={{ fontWeight: 700, fontSize: '1rem' }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Profile Form */}
        <div style={{
          backgroundColor: 'var(--color-surface)', borderRadius: '1.25rem',
          border: '1px solid var(--color-border)', padding: '2rem',
        }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Personal Information</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.25rem',
          }}>
            <div style={infoFieldStyle}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Full Name</label>
              {editing ? (
                <input value={fullName} onChange={e => setFullName(e.target.value)} style={inputStyle} />
              ) : (
                <div style={readOnlyStyle}>{fullName || '—'}</div>
              )}
            </div>
            <div style={infoFieldStyle}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Email</label>
              <div style={readOnlyStyle}>{email}</div>
            </div>
            <div style={infoFieldStyle}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Phone</label>
              {editing ? (
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" style={inputStyle} />
              ) : (
                <div style={readOnlyStyle}>{phone || '—'}</div>
              )}
            </div>
            <div style={infoFieldStyle}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Location</label>
              {editing ? (
                <input value={location} onChange={e => setLocation(e.target.value)} placeholder="City, Country" style={inputStyle} />
              ) : (
                <div style={readOnlyStyle}>{location || '—'}</div>
              )}
            </div>
            <div style={{...infoFieldStyle, gridColumn: '1 / -1'}}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Bio</label>
              {editing ? (
                <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
                  style={{...inputStyle, resize: 'vertical', fontFamily: 'inherit'}}
                />
              ) : (
                <div style={readOnlyStyle}>{bio || '—'}</div>
              )}
            </div>
          </div>
          {editing && (
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setEditing(false); setFullName(user?.full_name || ''); }}
                style={{
                  padding: '0.625rem 1.25rem', borderRadius: '0.75rem',
                  border: '1.5px solid var(--color-border)', backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer',
                }}
              >Cancel</button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: '0.625rem 1.25rem', borderRadius: '0.75rem', border: 'none',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff',
                  fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer',
                }}
              >{saving ? 'Saving...' : 'Save Changes'}</button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
