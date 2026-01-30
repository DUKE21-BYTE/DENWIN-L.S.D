// DOM Elements
const providersGrid = document.getElementById('providersGrid');
const searchInput = document.getElementById('searchInput');
const categoryContainer = document.getElementById('categoryContainer');
const toggleVerified = document.getElementById('toggleVerified');
const toggleAvailability = document.getElementById('toggleAvailability');
const resultsCount = document.getElementById('resultsCount');
const activeFiltersContainer = document.getElementById('activeFilters');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const emptyState = document.getElementById('emptyState');
const emptyClearBtn = document.getElementById('emptyClearBtn');

// Icons
const icons = {
    'All': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
    'Plumbing': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path><path d="M17.64 15L22 10.64"></path><path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V7.86c0-.55-.45-1-1-1H16.14c-.85 0-1.65-.33-2.25-.93L12.64 4.64"></path><path d="M6 6l4 4"></path><path d="M12 2v2"></path><path d="M22 12h-2"></path></svg>',
    'Electrical': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',
    'Cleaning': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.74 5.88a5.95 5.95 0 0 1 1.69 4.3v7.41a2 2 0 0 1-2 2H6.57a2 2 0 0 1-2-2v-7.41c0-1.63.66-3.16 1.69-4.3L12 2.69z"></path></svg>',
    'Beauty & Grooming': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>',
    'IT & Tech': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
    'Tutoring': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 1-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
    'Moving': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
    'Laundry': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.4a2 2 0 0 0-2 0l-2.45 2.45a2 2 0 0 0 0 2.83l.25.25a2 2 0 0 0 2.83 0l2.45-2.45a2 2 0 0 0 0-2.83l-.25-.25z"></path><path d="M15 15l1.66 1.66a2 2 0 0 1 0 2.83l-1.9 1.9a2 2 0 0 1-2.83 0l-1.66-1.66a2 2 0 0 1 0-2.83l1.9-1.9a2 2 0 0 1 2.83 0z"></path></svg>', // Using sparkles/shirt abstract or generic
    'Painting': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.74 5.88a5.95 5.95 0 0 1 1.69 4.3v7.41a2 2 0 0 1-2 2H6.57a2 2 0 0 1-2-2v-7.41c0-1.63.66-3.16 1.69-4.3L12 2.69z"></path></svg>', // Reused droplet/brush shape for now or bucket
    'Default': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
};

// Fix for duplicate keys or specific icons if needed
icons['Painting'] = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.37 2.63L14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z"></path><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"></path></svg>';
icons['Laundry'] = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.4a2 2 0 0 0-2 0l-2.45 2.45a2 2 0 0 0 0 2.83l.25.25a2 2 0 0 0 2.83 0l2.45-2.45a2 2 0 0 0 0-2.83l-.25-.25z"></path><path d="M15 15l1.66 1.66a2 2 0 0 1 0 2.83l-1.9 1.9a2 2 0 0 1-2.83 0l-1.66-1.66a2 2 0 0 1 0-2.83l1.9-1.9a2 2 0 0 1 2.83 0z"></path></svg>'; // Retrying laundry, maybe T-shirt better?
icons['Laundry'] = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h7a3 3 0 1 0 0-6H3a3 3 0 0 0 0 6"></path><path d="M14 6h7a3 3 0 1 1 0-6h-7a3 3 0 0 1 0 6"></path><path d="M3 6v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6"></path><path d="M9 21v-8a3 3 0 0 1 6 0v8"></path></svg>'; // Shirt-ish

// State
let state = {
    search: '',
    category: 'All',
    verifiedOnly: false,
    availableOnly: false
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCategoryChips();
    renderProviders();
    setupEventListeners();
});

function renderCategoryChips() {
    const categories = ['All', 'Plumbing', 'Electrical', 'Cleaning', 'Beauty & Grooming', 'IT & Tech', 'Tutoring', 'Moving', 'Laundry', 'Painting'];
    
    categoryContainer.innerHTML = categories.map(cat => {
        const icon = icons[cat] || icons['Default'];
        return `<button class="chip ${cat === 'All' ? 'active' : ''}" data-category="${cat}">
            ${icon}
            <span>${cat}</span>
        </button>`;
    }).join('');
}

// Event Listeners
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        state.search = e.target.value.toLowerCase().trim();
        filterAndRender();
    });

    // Category Chips
    categoryContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (chip) {
            // Update active state in UI
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            // Update state
            state.category = chip.dataset.category;
            filterAndRender();
        }
    });

    // Toggles
    toggleVerified.addEventListener('change', (e) => {
        state.verifiedOnly = e.target.checked;
        filterAndRender();
    });

    toggleAvailability.addEventListener('change', (e) => {
        state.availableOnly = e.target.checked;
        filterAndRender();
    });

    // Clear Buttons
    clearFiltersBtn.addEventListener('click', clearAllFilters);
    emptyClearBtn.addEventListener('click', clearAllFilters);
}

function clearAllFilters() {
    state = {
        search: '',
        category: 'All',
        verifiedOnly: false,
        availableOnly: false
    };

    // Reset UI inputs
    searchInput.value = '';
    toggleVerified.checked = false;
    toggleAvailability.checked = false;

    // Reset Chips
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    document.querySelector('.chip[data-category="All"]').classList.add('active');

    filterAndRender();
}

// Core Logic
function filterAndRender() {
    // 1. Filter Data
    const filtered = providers.filter(provider => {
        // Category Filter
        if (state.category !== 'All' && provider.category !== state.category) {
            return false;
        }

        // Search Filter
        if (state.search) {
            const searchStr = state.search;
            const matchesName = provider.name.toLowerCase().includes(searchStr);
            const matchesCat = provider.category.toLowerCase().includes(searchStr);
            const matchesLoc = provider.location.toLowerCase().includes(searchStr);
            const matchesDesc = provider.description.toLowerCase().includes(searchStr);
            const matchesTags = provider.tags.some(tag => tag.toLowerCase().includes(searchStr));

            if (!matchesName && !matchesCat && !matchesLoc && !matchesDesc && !matchesTags) {
                return false;
            }
        }

        // Toggles
        if (state.verifiedOnly && !provider.verified) return false;
        if (state.availableOnly && provider.availability !== 'today') return false;

        return true;
    });

    // 2. Update UI
    updateResultsBar(filtered.length);
    renderGrid(filtered);
}

function updateResultsBar(count) {
    resultsCount.textContent = `Showing ${count} provider${count !== 1 ? 's' : ''}`;
    
    // Active Filters Display
    activeFiltersContainer.innerHTML = '';
    const filters = [];

    if (state.category !== 'All') filters.push(state.category);
    if (state.verifiedOnly) filters.push('Verified');
    if (state.availableOnly) filters.push('Available Today');

    filters.forEach(filter => {
        const span = document.createElement('span');
        span.className = 'filter-badge';
        span.textContent = filter;
        activeFiltersContainer.appendChild(span);
    });

    // Show/Hide Clear Button
    const hasFilters = state.search || state.category !== 'All' || state.verifiedOnly || state.availableOnly;
    clearFiltersBtn.style.display = hasFilters ? 'block' : 'none';
}

// Helper to prevent XSS if data becomes dynamic/user-generated
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function renderGrid(data) {
    providersGrid.innerHTML = '';

    if (data.length === 0) {
        providersGrid.style.display = 'none';
        emptyState.classList.remove('hidden');
        return;
    }

    providersGrid.style.display = 'grid';
    emptyState.classList.add('hidden');

    data.forEach(provider => {
        const card = document.createElement('div');
        card.className = 'provider-card';
        const icon = icons[provider.category] || icons['Default'];
        
        // Sanitize outputs
        const safeName = escapeHtml(provider.name);
        const safeDesc = escapeHtml(provider.description);
        const safeLoc = escapeHtml(provider.location);
        const safePrice = escapeHtml(provider.priceFrom.toString());
        const safeResponse = escapeHtml(provider.responseTime);

        card.innerHTML = `
            <div class="card-header">
                <span class="category-badge">${icon} ${provider.category}</span>
                <span class="location-badge">📍 ${safeLoc}</span>
            </div>
            
            <h3 class="provider-name">${safeName} ${provider.verified ? '<span class="verified-badge" title="Verified">✅</span>' : ''}</h3>
            <p class="provider-desc">${safeDesc}</p>
            
            <div class="provider-meta">
                <div class="meta-row">
                    <span class="price">From KSh ${safePrice}</span>
                </div>
                <div class="meta-row info">
                    <span>⏱ ${safeResponse}</span>
                    <span class="${provider.availability === 'today' ? 'avail-today' : 'avail-book'}">
                        ${provider.availability === 'today' ? '⚡ Available today' : '📅 Book ahead'}
                    </span>
                </div>
            </div>

            <a href="${generateWhatsAppLink(provider)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary full-width">
                Chat on WhatsApp
            </a>
        `;
        
        providersGrid.appendChild(card);
    });
}

function generateWhatsAppLink(provider) {
    const phone = provider.whatsapp;
    let text = `Hi, I found you on DENWIN LSD. I need help with ${provider.category}.`;
    
    if (state.availableOnly || provider.availability === 'today') {
        text += ` Are you available today?`;
    } else {
        text += ` Are you available?`;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

// Initial Render
function renderProviders() {
    filterAndRender();
}
