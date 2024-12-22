import { ProfilesView } from './profiles.js';
import { userData } from './data.js';
import { PROFILES } from './constants.js';

class SquareApp {
    constructor() {
        this.data = userData;
        this.profiles = PROFILES;
        this.init();
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            const commentsTrigger = e.target.closest('.comments-trigger');
            if (commentsTrigger) {
                const postCard = commentsTrigger.closest('.post-card');
                const postId = postCard.dataset.postId;
                this.showComments(postId);
            }

            // Close modal when clicking outside or on close button
            if (e.target.matches('.comments-modal') || e.target.matches('.close-modal')) {
                const modal = document.querySelector('.comments-modal');
                if (modal) modal.remove();
            }
        });
    }

    showComments(postId) {
        const post = this.data.posts.find(p => p.id === parseInt(postId));
        if (!post) return;

        const modal = document.createElement('div');
        modal.className = 'comments-modal';
        modal.innerHTML = this.renderCommentsModal(post);
        document.body.appendChild(modal);

        // Add active class for animation
        setTimeout(() => modal.classList.add('active'), 10);
    }

    renderCommentsModal(post) {
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Comments</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="comments-container">
                    ${post.comments && post.comments.length ? 
                        post.comments.map(comment => this.renderComment(comment)).join('') :
                        '<div class="empty-comments"><i class="far fa-comments"></i><p>No comments yet. Be the first to comment!</p></div>'
                    }
                </div>
            </div>
        `;
    }

    renderComment(comment) {
        return `
            <div class="comment">
                <img src="${comment.user.avatar}" alt="${comment.user.name}" class="comment-avatar">
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-username">${comment.user.name}</span>
                        <span class="comment-time">${comment.timestamp}</span>
                    </div>
                    <p class="comment-text">${comment.content}</p>
                    <div class="comment-actions">
                        <button class="like-btn">
                            <i class="far fa-heart"></i>
                            <span>${comment.likes}</span>
                        </button>
                        <button class="reply-btn">Reply</button>
                    </div>
                </div>
                <div class="sentiment-indicator" style="background: ${this.getSentimentColor(comment.sentiment)}">
                    <span class="sentiment-tooltip">${comment.sentiment || 'UNPROCESSED'}</span>
                </div>
            </div>
        `;
    }

    getSentimentColor(sentiment) {
        const colors = {
            POSITIVE: '#4CAF50',
            NEGATIVE: '#F44336',
            NEUTRAL: '#FFC107',
            UNPROCESSED: '#9E9E9E'
        };
        return colors[sentiment] || colors.UNPROCESSED;
    }

    renderPost(post) {
        return `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <img src="${post.user.avatar}" alt="${post.user.name}" class="post-avatar">
                    <div class="post-user-info">
                        <div class="post-username">${post.user.name}</div>
                        <div class="post-time">${post.timestamp}</div>
                    </div>
                </div>

                <div class="post-content">
                    ${post.content}
                    ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
                </div>

                <div class="post-stats">
                    <div class="stat-item comments-trigger">
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

    async init() {
        try {
            console.log('Initializing app...');
            this.profilesView = new ProfilesView();
            await this.profilesView.render();
            this.renderApp();
            console.log('App initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    renderApp() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="container">
                <aside class="left-sidebar">
                    <div class="menu-list">
                        <a href="#" class="menu-item active">
                            <i class="fas fa-home"></i>
                            Home
                        </a>
                        <a href="#" class="menu-item">
                            <i class="fas fa-user-friends"></i>
                            Friends
                        </a>
                        <a href="#" class="menu-item">
                            <i class="fas fa-image"></i>
                            Photos
                        </a>
                        <a href="#" class="menu-item">
                            <i class="fas fa-video"></i>
                            Videos
                        </a>
                    </div>
                    <div id="profiles-list"></div>
                </aside>
                ${this.renderMainContent()}
                ${this.renderRightSidebar()}
            </div>
        `;
    }

    renderMainContent() {
        return `
            <main class="main-content">
                <div class="profile-banner">
                    <div class="profile-banner-content">
                        <img src="${this.data.currentUser.avatar}" alt="Profile" class="profile-avatar-large">
                        <div class="profile-info">
                            <h1 class="profile-name">${this.data.currentUser.name}</h1>
                            <span class="profile-username">${this.data.currentUser.username}</span>
                        </div>
                    </div>
                    
                    <div class="profile-stats-bar">
                        <div class="profile-stat">
                            <span class="stat-number">${this.data.currentUser.stats.posts}</span>
                            <span>Post</span>
                        </div>
                        <div class="profile-stat">
                            <span class="stat-number">${this.data.currentUser.stats.followers}</span>
                            <span>Followers</span>
                        </div>
                        <div class="profile-stat">
                            <span class="stat-number">${this.data.currentUser.stats.following}</span>
                            <span>Following</span>
                        </div>
                        <div class="profile-stat">
                            <span class="stat-number">${this.data.currentUser.stats.likes}</span>
                            <span>Likes</span>
                        </div>
                    </div>
                </div>

                <div class="posts-container">
                    ${this.data.posts.map(post => this.renderPost(post)).join('')}
                </div>
            </main>
        `;
    }

    renderRightSidebar() {
        return `
            <aside class="right-sidebar">
                <div class="section-title">PROFILES</div>
                <div class="profiles-list">
                    ${this.profiles.map(profile => `
                        <div class="profile-item" data-profile-id="${profile.id}">
                            <img src="${profile.avatar}" alt="${profile.name}">
                            <div class="profile-info">
                                <div class="profile-name">${profile.name}</div>
                                <div class="profile-username">${profile.username}</div>
                            </div>
                            ${profile.status === 'online' ? '<div class="online-indicator"></div>' : ''}
                        </div>
                    `).join('')}
                </div>
            </aside>
        `;
    }
}

// Đảm bảo DOM đã load hoàn toàn trước khi chạy code
document.addEventListener('DOMContentLoaded', () => {
    new SquareApp();
});
