document.addEventListener('DOMContentLoaded', () => {
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    const greeting = document.getElementById('greeting');
    const popularMomsGrid = document.getElementById('popular-moms-grid');
    const allMomsList = document.getElementById('all-moms-list');

    const user = JSON.parse(localStorage.getItem('momsKitchenUser'));
    if (user && user.user_name) {
        greeting.textContent = `Hello, ${user.user_name}!`;
    }

    const fetchSellers = async (filter = {}) => {
        let query = supabase.from('sellers').select('*');

        if (filter.category && filter.category !== 'All') {
            query = query.eq('category', filter.category);
        }

        if (filter.sortByLikes) {
            query = query.order('likes', { ascending: false });
        }

        const { data, error } = await query;
        if (error) {
            console.error('Error fetching sellers:', error);
            return [];
        }
        return data;
    };

    const renderSellers = (sellers, container) => {
        container.innerHTML = '';
        sellers.forEach(seller => {
            const card = document.createElement('div');
            card.className = 'customer-card';
            card.innerHTML = `
                <img src="${seller.image_url || 'https://via.placeholder.com/80'}" alt="${seller.seller_name}">
                <h4>${seller.seller_name}</h4>
                <p class="food-type">${seller.food_type}</p>
                <div class="card-actions">
                    <button class="like-btn" data-id="${seller.id}">❤️ <span class="like-count">${seller.likes}</span></button>
                    <button class="share-btn">🔄</button>
                    <button class="add-btn">➕</button>
                </div>
            `;
            // Add event listener for card tap
            card.addEventListener('click', () => {
                // For simplicity, we can store item details and redirect. 
                // A more robust solution might use URL params.
                localStorage.setItem('selectedSeller', JSON.stringify(seller));
                // window.location.href = 'item_details.html'; // Create this page
                alert(`Tapped on ${seller.seller_name}. Item details page to be implemented.`);
            });
            container.appendChild(card);
        });
    };

    const loadPopularMoms = async () => {
        const popularSellers = await fetchSellers({ sortByLikes: true });
        renderSellers(popularSellers.slice(0, 4), popularMomsGrid); // Show top 4
    };

    const loadAllMoms = async (category = 'All') => {
        const allSellers = await fetchSellers({ category });
        renderSellers(allSellers, allMomsList);
    };

    // Category filter logic
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.category-btn.active').classList.remove('active');
            button.classList.add('active');
            loadAllMoms(button.dataset.category);
        });
    });

    // Initial load
    loadPopularMoms();
    loadAllMoms();
});
