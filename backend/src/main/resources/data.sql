-- Chèn phim Avengers
INSERT INTO movies (title, slug, description, type, status, poster_url, thumb_url, publish_year, view_count, created_at, updated_at) 
VALUES (
    'Avengers: Endgame', 
    'avengers-endgame', 
    'Các Avengers tập hợp lại một lần nữa để đảo ngược hành động của Thanos.', 
    'SINGLE', 
    'COMPLETED', 
    'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', 
    'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg', 
    2019, 
    1500000, 
    NOW(), 
    NOW()
);

-- Chèn phim Arcane
INSERT INTO movies (title, slug, description, type, status, poster_url, thumb_url, publish_year, view_count, created_at, updated_at) 
VALUES (
    'Arcane', 
    'arcane-season-1', 
    'Hai chị em Vi và Jinx chiến đấu ở hai chiến tuyến đối lập trong một cuộc chiến công nghệ ma thuật.', 
    'SERIES', 
    'COMPLETED', 
    'https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg', 
    'https://image.tmdb.org/t/p/original/rkB4LyZHo1NHXFETAg581B34ofj.jpg', 
    2021, 
    2800000, 
    NOW(), 
    NOW()
);

-- 1. Chèn dữ liệu Thể loại (Categories)
INSERT IGNORE INTO categories (id, name, slug, created_at, updated_at) VALUES (1, 'Hành động', 'hanh-dong', NOW(), NOW());
INSERT IGNORE INTO categories (id, name, slug, created_at, updated_at) VALUES (2, 'Viễn tưởng', 'vien-tuong', NOW(), NOW());
INSERT IGNORE INTO categories (id, name, slug, created_at, updated_at) VALUES (3, 'Hoạt hình', 'hoat-hinh', NOW(), NOW());


-- 3. Nối Phim và Thể loại vào Bảng trung gian (Movie_Category)
-- Avengers (id=1) có thể loại Hành động (id=1) và Viễn tưởng (id=2)
INSERT IGNORE INTO movie_category (movie_id, category_id) VALUES (1, 1);
INSERT IGNORE INTO movie_category (movie_id, category_id) VALUES (1, 2);

-- Arcane (id=2) có thể loại Hành động (id=1) và Hoạt hình (id=3)
INSERT IGNORE INTO movie_category (movie_id, category_id) VALUES (2, 1);
INSERT IGNORE INTO movie_category (movie_id, category_id) VALUES (2, 3);


-- 4. Chèn dữ liệu Người dùng (Users)
-- Tài khoản ADMIN
INSERT IGNORE INTO users (id, username, email, password, full_name, avatar_url, role, created_at, updated_at)
VALUES (
    1,
    'admin',
    'admin@movieapp.com',
    '123456', -- Lưu ý: Mật khẩu hiện tại đang để tạm dạng chữ thường để test
    'Quản Trị Viên',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    'ADMIN',
    NOW(),
    NOW()
);

-- Tài khoản USER bình thường
INSERT IGNORE INTO users (id, username, email, password, full_name, avatar_url, role, created_at, updated_at)
VALUES (
    2,
    'khangia1',
    'user1@gmail.com',
    '123456',
    'Khán Giả VIP',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=User1',
    'USER',
    NOW(),
    NOW()
);