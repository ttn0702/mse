export const userData = {
    currentUser: {
        id: 1,
        name: "Ahmad Nur Fawaid",
        username: "@fawait",
        avatar: "https://i.pravatar.cc/150?img=11",
        stats: {
            posts: "10.3K",
            followers: "2,564",
            following: "3,154",
            likes: "12.2k",
            photos: "35",
            videos: "24"
        }
    },
    posts: Array(20).fill(null).map((_, index) => ({
        id: index + 1,
        user: {
            name: "Ahmad Nur Fawaid",
            avatar: "https://i.pravatar.cc/150?img=11",
            username: "@fawait"
        },
        content: `This is post number ${index + 1}. Lorem ipsum dolor sit amet...`,
        image: index % 3 === 0 ? "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800" : null,
        timestamp: "12 April at 09:28 PM",
        stats: {
            comments: 20,
            likes: Math.floor(Math.random() * 100),
            shares: Math.floor(Math.random() * 50)
        },
        comments: Array(20).fill(null).map((_, commentIndex) => ({
            id: commentIndex + 1,
            user: {
                name: `User ${commentIndex + 1}`,
                avatar: `https://i.pravatar.cc/150?img=${commentIndex + 1}`,
                username: `@user${commentIndex + 1}`
            },
            content: `This is comment ${commentIndex + 1} on post ${index + 1}. Lorem ipsum...`,
            timestamp: "12 April at 10:28 PM",
            likes: Math.floor(Math.random() * 20),
            sentiment: ['POSITIVE', 'NEGATIVE', 'NEUTRAL', 'UNPROCESSED'][Math.floor(Math.random() * 4)]
        }))
    }))
};
