export class ProfilesView {
    constructor() {
        console.log('ProfilesView constructor called');
        this.profilesList = document.getElementById('profiles-list');
        this.mainContent = document.querySelector('.main-content');
        
        console.log('Found profilesList:', this.profilesList);
        console.log('Found mainContent:', this.mainContent);
    }

    async render() {
        console.log('ProfilesView render called');
        const profiles = await this.fetchProfiles();
        console.log('Fetched profiles:', profiles);
        
        if (!this.profilesList) {
            console.error('profiles-list element not found');
            return;
        }
        
        // Clear existing content
        this.profilesList.innerHTML = ''; 
        
        // Create and append profile elements
        profiles.forEach(profile => {
            const profileElement = this.createProfileElement(profile);
            this.profilesList.appendChild(profileElement);
            console.log('Added profile element for:', profile.name);
        });
    }

    createProfileElement(profile) {
        const div = document.createElement('div');
        div.className = 'profile-item';
        div.dataset.profileId = profile.id;
        div.innerHTML = `
            <img src="${profile.avatar}" alt="${profile.name}" class="profile-avatar">
            <div class="profile-info">
                <h3>${profile.name}</h3>
                <p>${profile.lastSeen || ''}</p>
            </div>
            <div class="profile-status ${profile.isOnline ? 'online' : 'offline'}"></div>
        `;
        
        // Add click event with immediate feedback
        div.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Profile clicked:', profile.name);
            
            // Add visual feedback
            div.style.opacity = '0.7';
            setTimeout(() => div.style.opacity = '1', 200);
            
            this.handleProfileClick(profile);
        });
        
        return div;
    }

    async handleProfileClick(profile) {
        console.log('handleProfileClick called for:', profile.name);
        console.log('mainContent element:', this.mainContent);
        
        if (!this.mainContent) {
            console.error('main-content element not found!');
            return;
        }

        try {
            // Show loading state
            this.mainContent.innerHTML = '<div>Loading...</div>';
            
            const postsResponse = await this.fetchProfilePosts(profile.id);
            console.log('Fetched posts:', postsResponse);
            
            this.updateMainContent(profile, postsResponse);
        } catch (error) {
            console.error('Error in handleProfileClick:', error);
            this.mainContent.innerHTML = '<div>Error loading profile content</div>';
        }
    }

    updateMainContent(profile, posts) {
        console.log('Updating main content for:', profile.name);
        
        this.mainContent.innerHTML = `
            <div class="profile">
                <div class="profile-banner">
                    <img src="images/cover-photo.jpg" alt="Cover Photo" class="cover-photo">
                </div>
                
                <div class="profile-info-wrapper">
                    <div class="profile-info">
                        <img src="${profile.avatar}" alt="${profile.name}" class="profile-avatar">
                        <div class="info">
                            <h2>${profile.name}</h2>
                            <p class="username">@${profile.username}</p>
                            <p class="bio">${profile.bio}</p>
                        </div>
                    </div>
                    
                    <div class="profile-stats">
                        <div class="stat">
                            <span class="stat-value">${profile.posts}</span>
                            <span class="stat-label">Posts</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${profile.followers}</span>
                            <span class="stat-label">Followers</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${profile.following}</span>
                            <span class="stat-label">Following</span>
                        </div>
                    </div>
                </div>

                <div class="posts-section">
                    ${posts.map(post => `
                        <div class="post">
                            <div class="post-header">
                                <img src="${profile.avatar}" 
                                     alt="${profile.name}" 
                                     class="author-avatar">
                                <div class="post-info">
                                    <h4 class="author-name">${profile.name}</h4>
                                    <p class="post-time">${new Date(post.created_at).toLocaleDateString()}</p>
                                </div>
                                <button class="more-options">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                            </div>
                            
                            <div class="post-content">
                                <p>${post.content}</p>
                                ${post.image ? 
                                    `<img src="${post.image}" alt="Post image" class="post-image">` 
                                    : ''}
                            </div>
                            
                            <div class="post-actions">
                                <button class="action-btn">
                                    <i class="far fa-heart"></i>
                                    <span>${post.likes}</span>
                                </button>
                                <button class="action-btn">
                                    <i class="far fa-comment"></i>
                                    <span>${post.comments.length}</span>
                                </button>
                                <button class="action-btn">
                                    <i class="far fa-share-square"></i>
                                    <span>${post.shares}</span>
                                </button>
                            </div>

                            <div class="comments-section">
                                ${post.comments.map(comment => `
                                    <div class="comment">
                                        <img src="${comment.author.avatar}" 
                                             alt="${comment.author.name}" 
                                             class="comment-avatar">
                                        <div class="comment-content">
                                            <div class="comment-header">
                                                <h5 class="comment-author">${comment.author.name}</h5>
                                                <span class="comment-time">
                                                    ${new Date(comment.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p class="comment-text">${comment.content}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    async fetchProfiles() {
        // Mock data với thông tin giống Ahmad Nur Fawaid
        return [
            {
                id: 1,
                name: 'Ahmad Nur Fawaid',
                username: 'ahmadnurfawaid',
                bio: 'UI/UX Designer & Web Developer',
                avatar: 'images/profile-pic.png',
                coverPhoto: 'images/cover-photo.jpg',
                posts: 245,
                followers: '15.3K',
                following: 234,
                isOnline: true
            },
            {
                id: 2,
                name: 'Cynthia Cox',
                username: 'cynthiacox',
                bio: 'Digital Artist',
                avatar: 'https://i.pravatar.cc/150?img=1',
                posts: 156,
                followers: '12.3K',
                following: 142,
                isOnline: false,
                lastSeen: '11 min'
            }
            // ... other profiles
        ];
    }

    async fetchProfilePosts(profileId) {
        // Mock data posts theo profile_id
        const posts = {
            "status": "success",
            "data": [
                {
                    "id": 1,
                    "profile_id": 1,
                    "content": "Excited to share that I've been promoted to Senior Developer! 🎉 Thanks to everyone who has supported me on this journey. Looking forward to taking on new challenges and continuing to grow in my career. #CareerMilestone #SoftwareDevelopment",
                    "image": null,
                    "created_at": "2024-01-15T09:23:00.000Z",
                    "likes": 142,
                    "comments": 28,
                    "shares": 12
                },
                {
                    "id": 2,
                    "profile_id": 1,
                    "content": "Just wrapped up an amazing project with my team! Check out our latest web application redesign. The new interface is more intuitive and user-friendly. What do you think? 💻✨ #WebDevelopment #UXDesign",
                    "image": "images/post-1.jpg",
                    "created_at": "2024-01-14T15:45:00.000Z",
                    "likes": 89,
                    "comments": 15,
                    "shares": 7
                }
            ]
        };

        // Fetch comments cho mỗi post
        const postsWithComments = await Promise.all(
            posts.data.filter(post => post.profile_id === parseInt(profileId))
                .map(async post => {
                    const comments = await this.fetchPostComments(post.id);
                    return { ...post, comments };
                })
        );

        return postsWithComments;
    }

    async fetchPostComments(postId) {
        // Mock data comments theo post_id
        const allComments = {
            "status": "success",
            "data": [
                {
                    "id": 1,
                    "post_id": 1,
                    "profile_id": 2,
                    "content": "Congratulations! Well deserved promotion! 🎉",
                    "created_at": "2024-01-15T10:00:00.000Z",
                    "author": {
                        "name": "Sarah Wilson",
                        "avatar": "https://i.pravatar.cc/150?img=5"
                    }
                },
                {
                    "id": 2,
                    "post_id": 1,
                    "profile_id": 3,
                    "content": "Amazing achievement! Looking forward to working with you on future projects!",
                    "created_at": "2024-01-15T10:15:00.000Z",
                    "author": {
                        "name": "John Davis",
                        "avatar": "https://i.pravatar.cc/150?img=8"
                    }
                },
                {
                    "id": 3,
                    "post_id": 2,
                    "profile_id": 4,
                    "content": "The new design looks fantastic! Great work!",
                    "created_at": "2024-01-14T16:00:00.000Z",
                    "author": {
                        "name": "Emily Chen",
                        "avatar": "https://i.pravatar.cc/150?img=9"
                    }
                },
                {
                    "id": 4,
                    "post_id": 2,
                    "profile_id": 5,
                    "content": "Love the new interface! Very user-friendly indeed.",
                    "created_at": "2024-01-14T16:30:00.000Z",
                    "author": {
                        "name": "Michael Brown",
                        "avatar": "https://i.pravatar.cc/150?img=11"
                    }
                }
            ]
        };

        // Filter comments theo post_id
        return allComments.data.filter(comment => comment.post_id === postId);
    }
}

