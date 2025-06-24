document.addEventListener('DOMContentLoaded', () => {
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    const form = document.getElementById('add-seller-form');
    const latSpan = document.getElementById('latitude');
    const lonSpan = document.getElementById('longitude');

    let sellerLat, sellerLon;

    // Initialize Leaflet map
    const map = L.map('map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    map.on('locationfound', (e) => {
        sellerLat = e.latlng.lat;
        sellerLon = e.latlng.lng;
        latSpan.textContent = sellerLat.toFixed(5);
        lonSpan.textContent = sellerLon.toFixed(5);
        L.marker([sellerLat, sellerLon]).addTo(map).bindPopup("Seller's location").openPopup();
        map.setView([sellerLat, sellerLon], 13);
    });
    map.locate({ setView: true, maxZoom: 16 });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const sellerName = document.getElementById('seller-name').value;
        const mobileNumber = document.getElementById('seller-mobile').value;
        const address = document.getElementById('seller-address').value;
        const pincode = document.getElementById('seller-pincode').value;

        const { error } = await supabase
            .from('sellers')
            .insert([{ 
                seller_name: sellerName, 
                mobile_number: mobileNumber, 
                address: address, 
                pincode: pincode,
                latitude: sellerLat,
                longitude: sellerLon
            }]);

        if (error) {
            console.error('Error adding seller:', error);
            alert('Failed to add seller.');
        } else {
            alert('Seller added successfully!');
            
            const message = `
👩‍🍳 Seller Name :- ${sellerName}
📱 Mobile Number :- ${mobileNumber}
📍 Address :- ${address}
Latitude longitude:- ${sellerLat}, ${sellerLon}
🔢 Pincode :- ${pincode}
            `;
            
            const whatsappUrl = `https://chat.whatsapp.com/C4YiM17Mlk6FX17ySLnmKQ?text=${encodeURIComponent(message)}`;
            window.location.href = whatsappUrl;
        }
    });
});
