export { };

declare global {
    type MovieType = 'SINGLE' | 'SERIES';
    type MovieStatus = 'ONGOING' | 'COMPLETED';
    type Role = 'ADMIN' | 'USER';

    interface User {
        id: number;
        username: string;
        email: string;
        fullName: string;
        avatarUrl: string;
        role: Role;
        createdAt: string;
    }

    interface Category {
        id: number;
        name: string;
        slug: string;
    }

    interface Episode {
        id: number;
        movieId: number;
        movie_id?: number;
        name: string;
        slug: string;
        videoUrl: string;
        episodeOrder: number;
    }

    interface Movie {
        id: number;
        title: string;
        description: string;
        type: MovieType;
        status: MovieStatus;
        posterUrl: string;
        thumbUrl: string;
        publishYear: number;
        viewCount: number;
        slug: string;
        categories: Category[];
    }

    interface MovieRequest {
        id: number;
        title: string;
        description: string;
        type: MovieType;
        status: MovieStatus;
        posterUrl: string;
        thumbUrl: string;
        publishYear: number;
        viewCount: number;
        slug: string;
        createdAt: string;
        updatedAt: string;
        categories: string[];
    }

    interface MovieComment {
        id: number;
        movie_id: number;
        user_id: number;
        fullName: string;
        avatarUrl: string;
        content: string;
        createdAt?: string;
    }
}
