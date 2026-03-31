const statusStyles = {
  'Active': 'bg-blue-100 text-blue-700',
  'Urgent': 'bg-error-container text-on-error-container',
  'Review': 'bg-surface-container-highest text-on-surface-variant',
  'Pending': 'bg-secondary-container text-on-secondary-container',
  'In Progress': 'bg-primary-fixed-dim text-on-primary-fixed-variant',
  'Open': 'bg-surface-variant text-on-surface-variant',
  'Resolved': 'bg-on-surface/5 text-on-surface/60',
  'Delivered': 'bg-primary/10 text-primary',
  'In Review': 'bg-tertiary-container/20 text-tertiary',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${statusStyles[status] || 'bg-surface-container-highest text-outline'}`}>
      {status}
    </span>
  )
}
