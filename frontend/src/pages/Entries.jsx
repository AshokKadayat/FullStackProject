import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import api from '../api/axios';

export default function Entries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null); // null means create new
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [saving, setSaving] = useState(false);
  
  const { addToast } = useToast();

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await api.get('/journal');
      setEntries(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      addToast(err.response?.data || 'Failed to load entries', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this entry permanently?')) return;
    
    try {
      await api.delete(`/journal/id/${id}`);
      addToast('Entry deleted', 'success');
      fetchEntries();
    } catch (err) {
      addToast('Failed to delete entry', 'error');
    }
  };

  const openModal = (entry = null) => {
    setCurrentEntry(entry);
    setFormData({
      title: entry?.title || '',
      content: entry?.content || ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEntry(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (currentEntry?.id) {
        // Update
        await api.put(`/journal/id/${currentEntry.id}`, formData);
        addToast('Entry updated', 'success');
      } else {
        // Create
        await api.post('/journal', formData);
        addToast('Entry created', 'success');
      }
      closeModal();
      fetchEntries();
    } catch (err) {
      addToast(err.response?.data || 'Failed to save entry', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Your Entries</h1>
          <p className="page-subtitle">Manage your daily thoughts securely.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={fetchEntries} disabled={loading}>
            Refresh
          </button>
          <button className="btn btn-primary" onClick={() => openModal()}>
            + New Entry
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card shadow-sm" style={{ height: '180px' }}>
              <div className="card-body">
                <div className="skeleton" style={{ height: '20px', width: '70%', marginBottom: '1rem' }} />
                <div className="skeleton" style={{ height: '14px', width: '100%', marginBottom: '0.5rem' }} />
                <div className="skeleton" style={{ height: '14px', width: '80%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="card empty-state">
          <div className="empty-state-icon">📝</div>
          <h3 className="text-xl mb-1">No entries yet</h3>
          <p className="text-muted mb-4">Start writing your first journal entry.</p>
          <button className="btn btn-primary" onClick={() => openModal()}>Create Entry</button>
        </div>
      ) : (
        <div className="grid grid-3">
          {/* Slice and reverse to show newest first if dates exist */}
          {[...entries].reverse().map((entry) => (
            <div 
              key={entry.id} 
              className="card entry-card flex flex-col" 
              onClick={() => openModal(entry)}
            >
              <div className="card-body flex-1">
                <div className="flex justify-between items-start gap-2 mb-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                      {entry.date ? new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Draft'}
                    </span>
                    <h3 className="text-lg font-bold truncate leading-tight">{entry.title || '(Untitled Entry)'}</h3>
                  </div>
                  {entry.sentiment && (
                    <span className="badge badge-purple sentiment-badge">{entry.sentiment}</span>
                  )}
                </div>
                <p className="text-sm text-muted line-clamp-3 leading-relaxed">
                  {entry.content || 'No content provided for this entry...'}
                </p>
              </div>
              <div className="card-footer bg-transparent border-t border-white/5 flex justify-between items-center py-4">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                   <span className="text-[10px] text-muted font-medium uppercase tracking-widest">Secured</span>
                </div>
                <button 
                  className="btn btn-danger btn-sm p-1.5 opacity-60 hover:opacity-100" 
                  onClick={(e) => handleDelete(entry.id, e)}
                  title="Delete Entry"
                >
                  <span style={{fontSize: '0.8rem'}}>🗑️</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{currentEntry ? 'Edit Entry' : 'New Entry'}</h2>
              <button className="btn-close" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input 
                    id="title" 
                    type="text" 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                    required 
                    placeholder="Entry title"
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea 
                    id="content" 
                    value={formData.content} 
                    onChange={(e) => setFormData({...formData, content: e.target.value})} 
                    placeholder="Write your thoughts here..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
