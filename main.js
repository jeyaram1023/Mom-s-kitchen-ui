document.addEventListener('DOMContentLoaded', () => {
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    const form = document.getElementById('user-form');
    const latSpan = document.getElementById('latitude');
    const lonSpan = document.getElementById('longitude');

    let userLat, userLon;

    // Initialize Leaflet map
    const map = L.map('map').setView([20.5937, 78.9629], 5); // Default view (India)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker;

    map.on('locationfound', (e) => {
        userLat = e.latlng.lat;
        userLon = e.latlng.lng;
        latSpan.textContent = userLat.toFixed(5);
        lonSpan.textContent = userLon.toFixed(5);

        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker([userLat, userLon]).addTo(map)
            .bindPopup("Your are here!").openPopup();
        map.setView([userLat, userLon], 13);
    });

    map.on('locationerror', (e) => {
        alert(e.message);
    });

    map.locate({ setView: true, maxZoom: 16 });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const userName = document.getElementById('user-name').value;
        const mobileNumber = document.getElementById('mobile-number').value;
        const pincode = document.getElementById('pincode').value;

        const { data, error } = await supabase
            .from('users')
            .insert([{ 
                user_name: userName, 
                mobile_number: mobileNumber, 
                pincode: pincode,
                latitude: userLat,
                longitude: userLon
            }])
            .select();

        if (error) {
            console.error('Error saving profile:', error);
            alert('Could not save your profile. Please try again.');
        } else {
            alert('Profile saved successfully!');
            localStorage.setItem('momsKitchenUser', JSON.stringify(data[0]));
            window.location.href = 'home.html';
        }
    });
});
