import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      name: name || undefined,
      category: category || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    });
  };

  const handleReset = () => {
    setName('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    onSearch({});
  };

  return (
    <>
      {/* Toggle Filter Button */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowFilter(!showFilter)}
          style={{
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(135deg, #C59B5F, #B88646)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(184,134,70,0.25)',
          }}
        >
          {showFilter ? '✕ Close Filters' : '🔍 Advanced Filters'}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilter && (
        <form
          onSubmit={handleSearch}
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '16px',
            border: '2px solid rgba(197,155,95,0.25)',
            boxShadow: '0 8px 24px rgba(66,42,8,0.05)',
            marginBottom: '30px',
          }}
        >
          {/* Input Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: '18px',
              marginBottom: '20px',
            }}
          >
            <input
              type="text"
              placeholder="Search by name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #E8DCC5',
                background: '#FFFDF7',
                fontSize: '14px',
                color: '#4A3A2A',
                outline: 'none',
              }}
            />

            <input
              type="text"
              placeholder="Filter by category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #E8DCC5',
                background: '#FFFDF7',
                fontSize: '14px',
                color: '#4A3A2A',
              }}
            />

            <input
              type="number"
              placeholder="Min price..."
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              step="0.01"
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #E8DCC5',
                background: '#FFFDF7',
                fontSize: '14px',
                color: '#4A3A2A',
              }}
            />

            <input
              type="number"
              placeholder="Max price..."
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              step="0.01"
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #E8DCC5',
                background: '#FFFDF7',
                fontSize: '14px',
                color: '#4A3A2A',
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                background: 'linear-gradient(135deg,#C59B5F,#B88646)',
                padding: '12px',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(197,155,95,0.25)',
              }}
            >
              🔍 Search
            </button>

            <button
              type="button"
              onClick={handleReset}
              style={{
                flex: 1,
                background: '#E8DCC5',
                padding: '12px',
                borderRadius: '12px',
                color: '#4A3A2A',
                fontSize: '16px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ↺ Reset
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default SearchBar;
