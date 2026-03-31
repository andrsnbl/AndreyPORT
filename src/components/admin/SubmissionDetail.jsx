// ─────────────────────────────────────────────────────────
//  src/components/admin/SubmissionDetail.jsx
//  Modal untuk view submission details
// ─────────────────────────────────────────────────────────

import styles from './SubmissionDetail.module.css'

export default function SubmissionDetail({ submission, onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Submission Details</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.field}>
            <label>Name</label>
            <p>{submission.name}</p>
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <p>
              <a href={`mailto:${submission.email}`}>{submission.email}</a>
            </p>
          </div>

          <div className={styles.field}>
            <label>Subject</label>
            <p>{submission.subject || '-'}</p>
          </div>

          <div className={styles.field}>
            <label>Status</label>
            <p className={styles.status}>
              <span className={styles[submission.status]}>
                {submission.status}
              </span>
            </p>
          </div>

          <div className={styles.field}>
            <label>Date</label>
            <p>{new Date(submission.created_at).toLocaleDateString('id-ID')}</p>
          </div>

          <div className={styles.field}>
            <label>Message</label>
            <pre className={styles.message}>{submission.message}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}
