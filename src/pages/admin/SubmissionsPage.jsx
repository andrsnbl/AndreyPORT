// ─────────────────────────────────────────────────────────────
//  src/pages/admin/SubmissionsPage.jsx
//  Menampilkan daftar form submissions dari Supabase
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { useFormSubmissions, updateSubmissionStatus, deleteSubmission } from '../../hooks/useFormSubmissions'
import SubmissionDetail from '../../components/admin/SubmissionDetail'
import styles from './AdminDashboard.module.css'

export default function SubmissionsPage() {
  const [filters, setFilters] = useState({ status: null, page: 1, perPage: 10 })
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  const { submissions, loading, error, pageInfo } = useFormSubmissions(filters)

  const handleStatusChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }))
  }

  const handleOpenDetail = (submission) => {
    setSelectedSubmission(submission)
    setShowDetail(true)
  }

  const handleCloseDetail = () => {
    setShowDetail(false)
    setSelectedSubmission(null)
  }

  const handleMarkAsRead = async (id) => {
    const { error } = await updateSubmissionStatus(id, 'read')
    if (!error) {
      window.location.reload()
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin hapus submission ini?')) {
      const { error } = await deleteSubmission(id)
      if (!error) {
        window.location.reload()
      }
    }
  }

  return (
    <div className={styles.page}>
      <h2>Form Submissions</h2>

      {/* Filters */}
      <div className={styles.filters}>
        <select
          value={filters.status || ''}
          onChange={(e) => handleStatusChange('status', e.target.value || null)}
          className={styles.filterSelect}
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className={`${styles.alert} ${styles.error}`}>
          <span>⚠️ {error}</span>
        </div>
      )}

      {/* Loading */}
      {loading && <div className={styles.loading}>Loading submissions...</div>}

      {/* Table */}
      {!loading && submissions.length > 0 && (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.name}</td>
                    <td>{sub.email}</td>
                    <td>{sub.subject || '-'}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[sub.status]}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td>{new Date(sub.created_at).toLocaleDateString('id-ID')}</td>
                    <td>
                      <button
                        onClick={() => handleOpenDetail(sub)}
                        className={styles.btnSmall}
                        title="View details"
                      >
                        👁️
                      </button>
                      {sub.status === 'new' && (
                        <button
                          onClick={() => handleMarkAsRead(sub.id)}
                          className={styles.btnSmall}
                          title="Mark as read"
                        >
                          ✓
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className={`${styles.btnSmall} ${styles.danger}`}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span>
              Page {pageInfo.page} of {Math.ceil(pageInfo.total / pageInfo.perPage)} (Total: {pageInfo.total})
            </span>
          </div>
        </>
      )}

      {/* Empty */}
      {!loading && submissions.length === 0 && (
        <div className={styles.empty}>
          <p>No submissions found</p>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selectedSubmission && (
        <SubmissionDetail
          submission={selectedSubmission}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  )
}
