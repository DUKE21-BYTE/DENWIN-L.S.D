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

// State
let state = {
    search: '',
    category: 'All',
    verifiedOnly: false,
    availableOnly: false
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProviders();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        state.search = e.target.value.toLowerCase().trim();
        filterAndRender();
    });

    // Category Chips
    categoryContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('chip')) {
            // Update active state in UI
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');

            // Update state
            state.category = e.target.dataset.category;
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
        
        card.innerHTML = `
            <div class="card-header">
                <span class="category-badge">${provider.category}</span>
                <span class="location-badge">📍 ${provider.location}</span>
            </div>
            
            <h3 class="provider-name">${provider.name} ${provider.verified ? '<span class="verified-badge" title="Verified">✅</span>' : ''}</h3>
            <p class="provider-desc">${provider.description}</p>
            
            <div class="provider-meta">
                <div class="meta-row">
                    <span class="price">From KSh ${provider.priceFrom}</span>
                </div>
                <div class="meta-row info">
                    <span>⏱ ${provider.responseTime}</span>
                    <span class="${provider.availability === 'today' ? 'avail-today' : 'avail-book'}">
                        ${provider.availability === 'today' ? '⚡ Available today' : '📅 Book ahead'}
                    </span>
                </div>
            </div>

            <a href="${generateWhatsAppLink(provider)}" target="_blank" class="btn btn-primary full-width">
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
