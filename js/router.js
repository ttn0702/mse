export class Router {
    constructor(app) {
        this.app = app;
        this.routes = {
            '/': () => this.app.renderMainProfile(),
            '/profile/:id': (id) => this.app.renderUserProfile(id)
        };
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('popstate', () => this.handleRoute());
        document.addEventListener('click', (e) => {
            const profileLink = e.target.closest('.profile-item');
            if (profileLink) {
                e.preventDefault();
                const profileId = profileLink.dataset.profileId;
                this.navigate(`/profile/${profileId}`);
            }
        });
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        if (path === '/') {
            this.routes['/'](null);
            return;
        }

        const profileMatch = path.match(/\/profile\/(\d+)/);
        if (profileMatch) {
            this.routes['/profile/:id'](profileMatch[1]);
        }
    }
}
