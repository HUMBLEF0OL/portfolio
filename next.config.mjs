/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['media.dev.to', 'avatars.githubusercontent.com', 'github-readme-stats.vercel.app', 'github-readme-streak-stats.herokuapp.com', 'stardev.io', 'github-profile-summary-cards.vercel.app', 'github-profile-trophy.vercel.app'],
        dangerouslyAllowSVG: true,
    }
};

export default nextConfig;
