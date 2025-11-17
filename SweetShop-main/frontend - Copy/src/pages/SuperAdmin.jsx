import { useState, useEffect } from 'react';
import { adminAPI } from '../utils/api';

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [showForm, setShowForm] = useState('');
  const [stats, setStats] = useState(null);
  const [discounts, setDiscounts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [discountForm, setDiscountForm] = useState({
    code: '',
    type: 'percentage',
    value: '',
    minOrderAmount: '',
    maxDiscount: '',
    expiresAt: '',
    usageLimit: '',
  });

  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    image: '',
    link: '',
    position: 'hero',
    backgroundColor: '#B88646',
    textColor: '#ffffff',
  });

  useEffect(() => {
    if (activeTab === 'analytics') fetchStats();
    if (activeTab === 'promotions') fetchDiscounts();
    if (activeTab === 'marketing') fetchBanners();
    if (activeTab === 'customers') fetchUsers();
    // eslint-disable-next-line
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data } = await adminAPI.getDashboardStats();
      setStats(data.stats);
    } catch (err) {
      setError('Failed to load business analytics');
    } finally {
      setLoading(false);
    }
  };

  const fetchDiscounts = async () => {
    try {
      const { data } = await adminAPI.getAllDiscounts();
      setDiscounts(data.discounts);
    } catch (err) {
      setError('Failed to load promotional campaigns');
    }
  };

  const fetchBanners = async () => {
    try {
      const { data } = await adminAPI.getAllBanners();
      setBanners(data.banners);
    } catch (err) {
      setError('Failed to load marketing materials');
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await adminAPI.getAllUsers();
      setUsers(data.users);
    } catch (err) {
      setError('Failed to load customer database');
    }
  };

  const handleCreateDiscount = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.createDiscount(discountForm);
      setSuccess('Promotional campaign created successfully!');
      setDiscountForm({
        code: '',
        type: 'percentage',
        value: '',
        minOrderAmount: '',
        maxDiscount: '',
        expiresAt: '',
        usageLimit: '',
      });
      setShowForm('');
      fetchDiscounts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create promotional campaign');
    }
  };

  const handleCreateBanner = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.createBanner(bannerForm);
      setSuccess('Marketing banner deployed successfully!');
      setBannerForm({
        title: '',
        subtitle: '',
        image: '',
        link: '',
        position: 'hero',
        backgroundColor: '#B88646',
        textColor: '#ffffff',
      });
      setShowForm('');
      fetchBanners();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to deploy marketing banner');
    }
  };

  const tabs = [
    { id: 'analytics', label: '📊 Analytics', description: 'Revenue & Performance' },
    { id: 'promotions', label: '🎯 Promotions', description: 'Discounts & Offers' },
    { id: 'marketing', label: '📢 Marketing', description: 'Banners & Ads' },
    { id: 'customers', label: '👥 Customers', description: 'Users & Roles' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#FFF9F2,#FFF4E6)',
      paddingTop: '80px',
      paddingBottom: '60px',
      color: '#3E2F1D'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1 style={{
            fontSize: '36px',
            margin: 0,
            fontWeight: 900,
            color: '#6B4F2C',
            letterSpacing: '-1px'
          }}>
            🍮 Business Operations Center
          </h1>
          <p style={{ marginTop: '10px', color: '#6B4F2C', fontWeight: 600 }}>
            Central dashboard for business analytics, promotions and customer management
          </p>
        </div>

        {error && (
          <div style={{
            background: '#ffdddd',
            color: '#b13b3b',
            padding: '12px 16px',
            borderRadius: 10,
            marginBottom: 16,
            fontWeight: 700
          }}>{error}</div>
        )}

        {success && (
          <div style={{
            background: '#E8DCC5',
            color: '#6B4F2C',
            padding: '12px 16px',
            borderRadius: 10,
            marginBottom: 16,
            fontWeight: 700
          }}>{success}</div>
        )}

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 28
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setShowForm(''); setError(''); }}
              style={{
                background: activeTab === tab.id ? 'linear-gradient(135deg,#C59B5F,#B88646)' : 'white',
                color: activeTab === tab.id ? 'white' : '#4A3A2A',
                padding: '14px 20px',
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                border: '1px solid rgba(66, 42, 8, 0.06)',
                cursor: 'pointer',
                minWidth: 180,
                textAlign: 'center',
                boxShadow: activeTab === tab.id ? '0 8px 24px rgba(184,134,70,0.15)' : '0 4px 12px rgba(0,0,0,0.04)'
              }}>
              <div style={{ fontSize: 18 }}>{tab.label}</div>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>{tab.description}</div>
            </button>
          ))}
        </div>

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <section>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#5A4733', marginBottom: 18 }}>
              🍮 Performance Overview
            </h2>

            {loading ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div className="spinner"></div>
              </div>
            ) : stats ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
                gap: 18
              }}>
                <div style={{
                  background: 'white',
                  padding: 22,
                  borderRadius: 14,
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(66,42,8,0.06)',
                  border: '1px solid rgba(182,138,86,0.12)'
                }}>
                  <div style={{ fontSize: 34, marginBottom: 8 }}>📦</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#B88646' }}>{stats.totalOrders}</div>
                  <div style={{ color: '#7A6650', marginTop: 6 }}>Total Orders</div>
                </div>

                <div style={{
                  background: 'white',
                  padding: 22,
                  borderRadius: 14,
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(66,42,8,0.06)',
                  border: '1px solid rgba(182,138,86,0.12)'
                }}>
                  <div style={{ fontSize: 34, marginBottom: 8 }}>💰</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#B88646' }}>₹{(stats.totalRevenue || 0).toFixed(2)}</div>
                  <div style={{ color: '#7A6650', marginTop: 6 }}>Total Revenue</div>
                </div>

                <div style={{
                  background: 'white',
                  padding: 22,
                  borderRadius: 14,
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(66,42,8,0.06)',
                  border: '1px solid rgba(182,138,86,0.12)'
                }}>
                  <div style={{ fontSize: 34, marginBottom: 8 }}>🍰</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#B88646' }}>{stats.totalSweets}</div>
                  <div style={{ color: '#7A6650', marginTop: 6 }}>Products</div>
                </div>

                <div style={{
                  background: 'white',
                  padding: 22,
                  borderRadius: 14,
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(66,42,8,0.06)',
                  border: '1px solid rgba(182,138,86,0.12)'
                }}>
                  <div style={{ fontSize: 34, marginBottom: 8 }}>⚠️</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#B88646' }}>{stats.lowStockSweets}</div>
                  <div style={{ color: '#7A6650', marginTop: 6 }}>Low Stock Alerts</div>
                </div>
              </div>
            ) : (
              <div style={{ color: '#7A6650' }}>No analytics available</div>
            )}
          </section>
        )}

        {/* Promotions */}
        {activeTab === 'promotions' && (
          <section>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#5A4733', marginBottom: 18 }}>
              🎯 Promotional Campaigns
            </h2>

            {showForm !== 'discount' ? (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                <button onClick={() => setShowForm('discount')} style={{
                  background: 'linear-gradient(135deg,#C59B5F,#B88646)',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: 12,
                  border: 'none',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}>➕ Create Campaign</button>
              </div>
            ) : (
              <div style={{
                background: 'white',
                padding: 20,
                borderRadius: 12,
                marginBottom: 20,
                boxShadow: '0 8px 24px rgba(66,42,8,0.06)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#4A3A2A' }}>New Campaign</h3>
                  <button onClick={() => setShowForm('')} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
                </div>

                <form onSubmit={handleCreateDiscount}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
                    gap: 10,
                    marginBottom: 12
                  }}>
                    <input required placeholder="Code (SAVE20)" value={discountForm.code}
                      onChange={e => setDiscountForm({ ...discountForm, code: e.target.value.toUpperCase() })}
                      className="form-control" style={{ padding: 10, borderRadius: 10, border: '1px solid #E8DCC5' }} />

                    <select value={discountForm.type} onChange={e => setDiscountForm({ ...discountForm, type: e.target.value })}
                      className="form-control" style={{ padding: 10, borderRadius: 10, border: '1px solid #E8DCC5' }}>
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>

                    <input required type="number" placeholder="Value" value={discountForm.value}
                      onChange={e => setDiscountForm({ ...discountForm, value: e.target.value })}
                      className="form-control" style={{ padding: 10, borderRadius: 10, border: '1px solid #E8DCC5' }} />

                    <input type="number" placeholder="Min order (₹)" value={discountForm.minOrderAmount}
                      onChange={e => setDiscountForm({ ...discountForm, minOrderAmount: e.target.value })}
                      className="form-control" style={{ padding: 10, borderRadius: 10, border: '1px solid #E8DCC5' }} />
                  </div>

                  <button type="submit" style={{
                    background: 'linear-gradient(135deg,#C59B5F,#B88646)',
                    color: 'white',
                    padding: '10px 16px',
                    borderRadius: 12,
                    border: 'none',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}>
                    🚀 Launch Campaign
                  </button>
                </form>
              </div>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
              gap: 16
            }}>
              {discounts.map(d => (
                <div key={d._id} style={{
                  background: 'white',
                  padding: 18,
                  borderRadius: 12,
                  boxShadow: '0 8px 24px rgba(66,42,8,0.04)',
                  border: '1px solid rgba(182,138,86,0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ fontSize: 22 }}>🎫</div>
                    <div>
                      <div style={{ fontWeight: 900, color: '#6B4F2C' }}>{d.code}</div>
                      <div style={{ fontSize: 13, color: '#7A6650' }}>{d.type === 'percentage' ? `${d.value}% off` : `₹${d.value} off`}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 10, marginBottom: 12, color: '#7A6650' }}>
                    Min order: ₹{d.minOrderAmount || 0} • Used: {d.usedCount || 0}
                  </div>

                  <button onClick={() => adminAPI.deleteDiscount(d._id).then(fetchDiscounts)} style={{
                    width: '100%',
                    background: '#B13B3B',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: 10,
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}>🗑️ Terminate</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Marketing */}
        {activeTab === 'marketing' && (
          <section>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#5A4733', marginBottom: 18 }}>
              📢 Marketing & Banners
            </h2>

            {showForm !== 'banner' ? (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                <button onClick={() => setShowForm('banner')} style={{
                  background: 'linear-gradient(135deg,#C59B5F,#B88646)',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: 12,
                  border: 'none',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}>🎨 Create Banner</button>
              </div>
            ) : (
              <div style={{
                background: 'white',
                padding: 20,
                borderRadius: 12,
                marginBottom: 20,
                boxShadow: '0 8px 24px rgba(66,42,8,0.06)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#4A3A2A' }}>New Banner</h3>
                  <button onClick={() => setShowForm('')} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
                </div>

                <form onSubmit={handleCreateBanner}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
                    gap: 10,
                    marginBottom: 12
                  }}>
                    <input required placeholder="Title" value={bannerForm.title}
                      onChange={e => setBannerForm({ ...bannerForm, title: e.target.value })}
                      className="form-control" style={{ padding: 10, borderRadius: 10, border: '1px solid #E8DCC5' }} />

                    <input placeholder="Subtitle" value={bannerForm.subtitle}
                      onChange={e => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                      className="form-control" style={{ padding: 10, borderRadius: 10, border: '1px solid #E8DCC5' }} />

                    <input required placeholder="Image URL" type="url" value={bannerForm.image}
                      onChange={e => setBannerForm({ ...bannerForm, image: e.target.value })}
                      className="form-control" style={{ padding: 10, borderRadius: 10, border: '1px solid #E8DCC5' }} />

                    <select value={bannerForm.position} onChange={e => setBannerForm({ ...bannerForm, position: e.target.value })}
                      className="form-control" style={{ padding: 10, borderRadius: 10, border: '1px solid #E8DCC5' }}>
                      <option value="hero">Hero</option>
                      <option value="middle">Middle</option>
                      <option value="footer">Footer</option>
                    </select>
                  </div>

                  <button type="submit" style={{
                    background: 'linear-gradient(135deg,#C59B5F,#B88646)',
                    color: 'white',
                    padding: '10px 16px',
                    borderRadius: 12,
                    border: 'none',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}>📡 Deploy Banner</button>
                </form>
              </div>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
              gap: 16
            }}>
              {banners.map(b => (
                <div key={b._id} style={{
                  background: 'white',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(66,42,8,0.04)',
                  border: '1px solid rgba(182,138,86,0.08)'
                }}>
                  {b.image && <img src={b.image} alt={b.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />}
                  <div style={{ padding: 14 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ fontSize: 20 }}>🖼️</div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#6B4F2C' }}>{b.title}</div>
                        <div style={{ fontSize: 13, color: '#7A6650' }}>{b.subtitle}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                      <div style={{
                        padding: '6px 10px',
                        borderRadius: 8,
                        background: b.isActive ? '#BDE5C9' : '#F7D6D6',
                        color: b.isActive ? '#356B3E' : '#7A2B2B',
                        fontWeight: 700,
                        fontSize: 12
                      }}>
                        {b.isActive ? 'Live' : 'Inactive'}
                      </div>
                      <div style={{ marginLeft: 'auto', fontSize: 12, color: '#7A6650' }}>{b.position}</div>
                    </div>

                    <button onClick={() => adminAPI.deleteBanner(b._id).then(fetchBanners)} style={{
                      width: '100%',
                      background: '#B13B3B',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: 10,
                      border: 'none',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}>🗑️ Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Customers */}
        {activeTab === 'customers' && (
          <section>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#5A4733', marginBottom: 18 }}>
              👥 Customer Management
            </h2>

            <div style={{
              background: 'white',
              borderRadius: 12,
              boxShadow: '0 8px 24px rgba(66,42,8,0.04)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: 16, borderBottom: '1px solid #F2EAD7', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ fontSize: 26 }}>📋</div>
                <div>
                  <div style={{ fontWeight: 800, color: '#6B4F2C' }}>Customer Database</div>
                  <div style={{ fontSize: 13, color: '#7A6650' }}>Manage user accounts and access</div>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
                  <thead>
                    <tr style={{ textAlign: 'left', background: '#F8EFE2' }}>
                      <th style={{ padding: 12, fontWeight: 800, color: '#4A3A2A' }}>Customer Email</th>
                      <th style={{ padding: 12, fontWeight: 800, color: '#4A3A2A' }}>Account Type</th>
                      <th style={{ padding: 12, fontWeight: 800, color: '#4A3A2A' }}>Registered</th>
                      <th style={{ padding: 12, fontWeight: 800, color: '#4A3A2A' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id} style={{ borderBottom: '1px solid #F2EAD7' }}>
                        <td style={{ padding: 12, fontWeight: 700 }}>{u.email}</td>
                        <td style={{ padding: 12 }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '6px 10px',
                            borderRadius: 12,
                            fontWeight: 800,
                            color: 'white',
                            background: u.role === 'admin' ? '#B13B3B' : '#6B4F2C',
                            fontSize: 13
                          }}>
                            {u.role === 'admin' ? '👑 Admin' : '👤 Customer'}
                          </span>
                        </td>
                        <td style={{ padding: 12, color: '#7A6650' }}>
                          {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td style={{ padding: 12 }}>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            <button onClick={() => adminAPI.updateUserRole(u._id, u.role === 'admin' ? 'user' : 'admin').then(fetchUsers)} style={{
                              background: '#D8CBB3',
                              border: 'none',
                              padding: '8px 10px',
                              borderRadius: 10,
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}>
                              🔄 Change Role
                            </button>
                            <button onClick={() => adminAPI.deleteUser(u._id).then(fetchUsers)} style={{
                              background: '#B13B3B',
                              border: 'none',
                              padding: '8px 10px',
                              borderRadius: 10,
                              color: 'white',
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}>
                              🗑️ Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SuperAdmin;
