document.addEventListener('DOMContentLoaded', () => {
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    const form = document.getElementById('profile-form');
    const userNameInput = document.getElementById('user-name');
    const mobileNumberInput = document.getElementById('mobile-number');
    const profileImage = document.getElementById('profile-image');

    const user = JSON.parse(localStorage.getItem('momsKitchenUser'));

    if (!user) {
        alert('No user profile found. Redirecting to login.');
        window.location.href = 'index.html';
        return;
    }

    userNameInput.value = user.user_name || '';
    mobileNumberInput.value = user.mobile_number || '';
    if (user.profile_image_url) {
        profileImage.src = user.profile_image_url;
    }

    // Initialize map to user's saved location
    const map = L.map('map').setView([user.latitude || 20.5937, user.longitude || 78.9629], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    if(user.latitude && user.longitude) {
        L.marker([user.latitude, user.longitude]).addTo(map).bindPopup("Your saved location").openPopup();
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('users')
            .update({ 
                user_name: userNameInput.value, 
                mobile_number: mobileNumberInput.value 
                // Add lat/lng update logic if needed
            })
            .eq('id', user.id)
            .select();

        if (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        } else {
            alert('Profile updated successfully!');
            localStorage.setItem('momsKitchenUser', JSON.stringify(data[0]));
        }
    });
});
