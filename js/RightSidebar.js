export class RightSidebar {
    constructor(profiles) {
        this.profiles = profiles;
        this.bindEvents();
    }

    render() {
        return `
            <aside class="right-sidebar">
                <div class="section-title">PROFILES</div>
                <div class="profiles-list">
                    ${this.profiles.map(profile => this.renderProfileItem(profile)).join('')}
                </div>
            </aside>
        `;
    }

    renderProfileItem(profile) {
        return `
            <div class="profile-item" data-profile-id="${profile.id}">
                <img src="${profile.avatar}" alt="${profile.name}">
                <div class="profile-info">
                    <div class="profile-name">${profile.name}</div>
                    <div class="profile-username">${profile.username}</div>
                </div>
                ${profile.status === 'online' ? '<div class="online-indicator"></div>' : ''}
            </div>
        `;
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            const profileItem = e.target.closest('.profile-item');
            if (profileItem) {
                const profileId = profileItem.dataset.profileId;
                this.showProfile(profileId);
            }

            if (e.target.closest('.close-modal')) {
                const modal = document.querySelector('.profile-modal');
                if (modal) modal.remove();
            }
        });
    }

    showProfile(profileId) {
        const profile = this.profiles.find(p => p.id === parseInt(profileId));
        if (!profile) return;

        const modal = document.createElement('div');
        modal.className = 'profile-modal';
        modal.innerHTML = this.renderProfileModal(profile);
        document.body.appendChild(modal);

        // Add active class after a small delay to trigger animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    renderProfileModal(profile) {
        return `
            <div class="modal-content profile-view">
                <div class="profile-banner">
                    <button class="close-modal">&times;</button>
                    <div class="profile-banner-content">
                        <img src="${profile.avatar}" alt="${profile.name}" class="profile-avatar-large">
                        <div class="profile-info">
                            <h1 class="profile-name">${profile.name}</h1>
                            <span class="profile-username">${profile.username}</span>
                        </div>
                    </div>
                    
                    <div class="profile-stats-bar">
                        <div class="profile-stat">
                            <span class="stat-number">${profile.stats.posts}</span>
                            <span>Post</span>
                        </div>
                        <div class="profile-stat">
                            <span class="stat-number">${profile.stats.followers}</span>
                            <span>Followers</span>
                        </div>
                        <div class="profile-stat">
                            <span class="stat-number">${profile.stats.following}</span>
                            <span>Following</span>
                        </div>
                        <div class="profile-stat">
                            <span class="stat-number">${profile.stats.likes}</span>
                            <span>Likes</span>
                        </div>
                    </div>
                </div>

                <div class="profile-posts">
                    ${profile.posts.map(post => this.renderProfilePost(post)).join('')}
                </div>
            </div>
        `;
    }

    renderProfilePost(post) {
        return `
            <div class="post-card">
                <div class="post-content">
                    ${post.content}
                    ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
                </div>
                <div class="post-stats">
                    <div class="stat-item">
                        <i class="far fa-comment"></i>
                        <span>${post.stats.comments} Comments</span>
                    </div>
                    <div class="stat-item">
                        <i class="far fa-heart"></i>
                        <span>${post.stats.likes} Likes</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-share"></i>
                        <span>${post.stats.shares} Share</span>
                    </div>
                </div>
            </div>
        `;
    }
}
