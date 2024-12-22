export const SENTIMENT_TYPES = {
    POSITIVE: {
        icon: '<i class="fas fa-circle"></i>',
        color: '#4CAF50',
        label: 'Positive'
    },
    NEGATIVE: {
        icon: '<i class="fas fa-circle"></i>',
        color: '#F44336',
        label: 'Negative'
    },
    NEUTRAL: {
        icon: '<i class="fas fa-circle"></i>',
        color: '#FFC107',
        label: 'Neutral'
    },
    UNPROCESSED: {
        icon: '<i class="fas fa-circle"></i>',
        color: '#9E9E9E',
        label: 'Unprocessed'
    }
};

export const PROFILES = [
    {
        id: 1,
        name: "Cynthia Cox",
        username: "@cynthia",
        avatar: "https://i.pravatar.cc/150?img=1",
        status: "online",
        stats: {
            posts: "8.2K",
            followers: "1,234",
            following: "1,156",
            likes: "9.1k",
            photos: "23",
            videos: "12"
        },
        posts: [
            {
                id: 1,
                content: "Just finished my new design project!",
                image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800",
                timestamp: "2 hours ago",
                stats: {
                    comments: 5,
                    likes: 23,
                    shares: 3
                }
            }
        ]
    },
    {
        id: 2,
        name: "Danny Quinn",
        username: "@danny",
        avatar: "https://i.pravatar.cc/150?img=2",
        status: "offline",
        stats: {
            posts: "5.1K",
            followers: "2,345",
            following: "1,234",
            likes: "12.3k",
            photos: "45",
            videos: "8"
        },
        posts: [
            {
                id: 1,
                content: "Working on something exciting!",
                timestamp: "5 hours ago",
                stats: {
                    comments: 8,
                    likes: 42,
                    shares: 5
                }
            }
        ]
    },
    {
        id: 3,
        name: "Morgan Stanley",
        username: "@morgan",
        avatar: "https://i.pravatar.cc/150?img=3",
        status: "online",
        stats: {
            posts: "3.4K",
            followers: "987",
            following: "876",
            likes: "5.6k",
            photos: "12",
            videos: "4"
        },
        posts: [
            {
                id: 1,
                content: "Great meeting with the team today!",
                image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800",
                timestamp: "1 day ago",
                stats: {
                    comments: 3,
                    likes: 15,
                    shares: 1
                }
            }
        ]
    }
];
