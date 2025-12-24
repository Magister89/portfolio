import React, { useMemo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import Markdown from 'react-markdown';
import { ScrollArea } from '@base-ui/react/scroll-area';
import { FaLinkedin, FaXTwitter, FaWhatsapp, FaFacebook } from 'react-icons/fa6';
import CookiePolicy from '../components/CookiePolicy';


// Share buttons component
const ShareButtons = ({ title, url }) => {
    const shareLinks = [
        {
            name: 'LinkedIn',
            icon: FaLinkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            hoverColor: '#0077b5'
        },
        {
            name: 'X',
            icon: FaXTwitter,
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            hoverColor: '#000000'
        },
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            href: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
            hoverColor: '#25d366'
        },
        {
            name: 'Facebook',
            icon: FaFacebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            hoverColor: '#1877f2'
        }
    ];

    return (
        <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 dark:text-gray-500">Condividi:</span>
            {shareLinks.map(({ name, icon: Icon, href, hoverColor }) => (
                <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 dark:text-gray-500 transition-colors"
                    onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
                    onMouseLeave={(e) => e.currentTarget.style.color = ''}
                    aria-label={`Condividi su ${name}`}
                >
                    <Icon className="w-4 h-4" />
                </a>
            ))}
        </div>
    );
};


// Import all markdown files from content/posts
const postModules = import.meta.glob('../content/posts/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
});

// Parse frontmatter from markdown content
function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { metadata: {}, content };

    const frontmatter = match[1];
    const body = match[2];

    const metadata = {};
    frontmatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();
            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            metadata[key] = value;
        }
    });

    return { metadata, content: body };
}

// Get all posts sorted by date (newest first)
function getPosts() {
    const posts = Object.entries(postModules).map(([path, content]) => {
        const filename = path.split('/').pop().replace('.md', '');
        const { metadata, content: body } = parseFrontmatter(content);

        return {
            slug: filename,
            title: metadata.title || filename,
            date: metadata.date || '',
            excerpt: metadata.excerpt || '',
            content: body
        };
    });

    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function Blog() {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const posts = useMemo(() => getPosts(), []);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState(false);

    const openCookiePolicy = (e) => {
        if (e) e.preventDefault();
        setIsCookiePolicyOpen(true);
    };

    const closeCookiePolicy = () => {
        setIsCookiePolicyOpen(false);
    };

    // Extract slug from URL path (e.g., /blog/my-post -> my-post)
    const pathParts = location.pathname.split('/');
    const slug = pathParts.length > 2 ? pathParts[2] : null;

    // Select latest post by default, or the one matching the slug
    const selectedPost = slug
        ? posts.find(p => p.slug === slug)
        : posts[0];

    // Redirect to latest post if no slug is provided
    useEffect(() => {
        if (!slug && posts.length > 0) {
            navigate(`/blog/${posts[0].slug}`, { replace: true });
        }
    }, [slug, posts, navigate]);

    // Scroll to top when entering blog page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    const handlePostClick = (postSlug) => {
        navigate(`/blog/${postSlug}`);
        setSidebarOpen(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-180px)] py-12 px-6 bg-surface dark:bg-surface-dark transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    {/* Header with title and toggle button */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-text dark:text-text-dark">
                            {t.blog?.title || 'Blog'}
                        </h1>
                        <button
                            onClick={toggleSidebar}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-text dark:text-text-dark"
                        >
                            <span className="material-symbols-outlined text-lg">
                                {sidebarOpen ? 'menu_open' : 'menu'}
                            </span>
                            {t.blog?.showPosts || 'Mostra articoli'}
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 overflow-hidden">
                        {/* Sidebar - Post List - Collapsible */}
                        <aside
                            className={`transition-all duration-300 ease-in-out overflow-hidden shrink-0 ${sidebarOpen
                                ? 'max-h-[400px] lg:max-h-none lg:w-72 opacity-100'
                                : 'max-h-0 lg:max-h-none lg:w-0 opacity-0'
                                }`}
                        >
                            <div className="w-full lg:w-72">
                                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                                    {t.blog?.posts || 'Posts'}
                                </h2>
                                <ScrollArea.Root className="h-auto lg:h-[600px] overflow-hidden">
                                    <ScrollArea.Viewport className="h-full w-full overscroll-contain">
                                        <nav className="space-y-2 pr-4">
                                            {posts.map((post) => (
                                                <button
                                                    key={post.slug}
                                                    onClick={() => handlePostClick(post.slug)}
                                                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${selectedPost?.slug === post.slug
                                                        ? 'bg-primary/10 dark:bg-primary/20 border-l-4 border-primary'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                                        }`}
                                                >
                                                    <h3 className={`font-medium text-sm ${selectedPost?.slug === post.slug
                                                        ? 'text-primary dark:text-blue-400'
                                                        : 'text-text dark:text-text-dark'
                                                        }`}>
                                                        {post.title}
                                                    </h3>
                                                    <time className="text-xs text-gray-500 dark:text-gray-400">
                                                        {post.date}
                                                    </time>
                                                </button>
                                            ))}
                                        </nav>
                                    </ScrollArea.Viewport>
                                    <ScrollArea.Scrollbar
                                        orientation="vertical"
                                        className="flex w-2.5 touch-none select-none p-0.5 transition-colors duration-150"
                                    >
                                        <ScrollArea.Thumb className="relative flex-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                                    </ScrollArea.Scrollbar>
                                </ScrollArea.Root>
                            </div>
                        </aside>

                        {/* Main Content - Post - Expands when sidebar is closed */}
                        <article className="flex-1 min-w-0 transition-all duration-300">
                            {selectedPost ? (
                                <div className="bg-background dark:bg-background-dark rounded-2xl p-8 shadow-card border border-gray-200 dark:border-gray-600">
                                    <header className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-600">
                                        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-2">
                                            {selectedPost.title}
                                        </h2>
                                        <time className="text-sm text-gray-500 dark:text-gray-400">
                                            {selectedPost.date}
                                        </time>
                                    </header>
                                    <div className="max-w-none">
                                        <Markdown
                                            components={{
                                                h1: ({ children }) => <h1 className="text-2xl font-bold text-text dark:text-text-dark mb-4">{children}</h1>,
                                                h2: ({ children }) => <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3 mt-6">{children}</h2>,
                                                h3: ({ children }) => <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2 mt-4">{children}</h3>,
                                                p: ({ children, node }) => {
                                                    // Check if paragraph contains only an em element (caption pattern)
                                                    const isCaption = node?.children?.length === 1 &&
                                                        node.children[0]?.tagName === 'em';
                                                    return <p className={`text-gray-700 dark:text-gray-100 mb-4 leading-relaxed ${isCaption ? 'text-center' : ''}`}>{children}</p>;
                                                },
                                                ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                                                ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                                                li: ({ children }) => <li className="text-gray-700 dark:text-gray-100">{children}</li>,
                                                strong: ({ children }) => <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>,
                                                em: ({ children }) => <em className="italic text-gray-700 dark:text-gray-200">{children}</em>,
                                                a: ({ href, children }) => <a href={href} className="text-primary hover:text-primary/80 underline">{children}</a>,
                                                code: ({ children }) => <code className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
                                                pre: ({ children }) => <pre className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm">{children}</pre>,
                                                hr: () => <hr className="border-gray-200 dark:border-gray-700 my-6" />,
                                                blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 dark:text-gray-300 my-4">{children}</blockquote>,
                                                img: ({ src, alt }) => <img src={src} alt={alt} className="max-w-md max-h-64 h-auto mx-auto block rounded-lg my-4" />,
                                            }}
                                        >
                                            {selectedPost.content}
                                        </Markdown>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                                        <ShareButtons
                                            title={selectedPost.title}
                                            url={typeof window !== 'undefined' ? window.location.href : ''}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-background dark:bg-background-dark rounded-2xl p-8 shadow-card text-center">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {t.blog?.noPostSelected || 'Select a post to read'}
                                    </p>
                                </div>
                            )}
                        </article>
                    </div>
                </div>
            </main>
            <Footer onOpenCookiePolicy={openCookiePolicy} />
            <CookiePolicy isOpen={isCookiePolicyOpen} onClose={closeCookiePolicy} />
        </>
    );
}

export default Blog;

