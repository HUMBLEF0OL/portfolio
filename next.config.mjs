/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: ['media.dev.to', 'avatars.githubusercontent.com', 'github-readme-stats.vercel.app', 'github-readme-activity-graph.vercel.app', 'github-readme-streak-stats.herokuapp.com', 'stardev.io', 'github-profile-summary-cards.vercel.app', 'github-profile-trophy.vercel.app'],
        dangerouslyAllowSVG: true,
    }
};

export default nextConfig;
