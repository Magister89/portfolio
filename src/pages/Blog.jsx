import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import Markdown from 'react-markdown';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, MessageCircle, Facebook } from 'lucide-react';
import CookiePolicy from '../components/CookiePolicy';
import { useCookiePolicy } from '../hooks/useCookiePolicy';
import { useDocumentTitle } from '../hooks/useDocumentTitle';


// Share buttons component
const ShareButtons = ({ title, url }) => {
    const { t } = useLanguage();
    const shareLinks = [
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        },
        {
            name: 'X',
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            href: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
        },
        {
            name: 'Facebook',
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        }
    ];

    return (
        <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground dark:text-muted-foreground-dark">{t.blog?.share || 'Share:'}</span>
            {shareLinks.map(({ name, icon: Icon, href }) => (
                <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors"
                    aria-label={`${t.blog?.shareOn || 'Share on'} ${name}`}
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

// Get posts at module level (data is loaded eagerly, no need for useMemo)
const posts = getPosts();

// Memoized markdown components (defined outside component to prevent recreation)
const markdownComponents = {
    h1: ({ children }) => <h1 className="text-xl font-bold text-foreground dark:text-foreground-dark mb-3">{children}</h1>,
    h2: ({ children }) => <h2 className="text-lg font-bold text-foreground dark:text-foreground-dark mb-2 mt-5">{children}</h2>,
    h3: ({ children }) => <h3 className="text-base font-semibold text-foreground dark:text-foreground-dark mb-2 mt-4">{children}</h3>,
    p: ({ children, node }) => {
        const isCaption = node?.children?.length === 1 && node.children[0]?.tagName === 'em';
        return <p className={`text-sm text-foreground dark:text-foreground-dark mb-3 leading-relaxed ${isCaption ? 'text-center' : ''}`}>{children}</p>;
    },
    ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1 text-sm">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1 text-sm">{children}</ol>,
    li: ({ children }) => <li className="text-foreground dark:text-foreground-dark">{children}</li>,
    strong: ({ children }) => <strong className="font-bold text-foreground dark:text-foreground-dark">{children}</strong>,
    em: ({ children }) => <em className="italic text-muted-foreground dark:text-muted-foreground-dark">{children}</em>,
    a: ({ href, children }) => {
        // Allowlist approach for URL safety
        const isSafeUrl = href && (
            href.startsWith('https://') ||
            href.startsWith('http://') ||
            href.startsWith('mailto:') ||
            href.startsWith('/')
        );
        return isSafeUrl ? (
            <a href={href} className="text-foreground dark:text-foreground-dark underline underline-offset-4 hover:text-muted-foreground dark:hover:text-muted-foreground-dark transition-colors" target="_blank" rel="noopener noreferrer">{children}</a>
        ) : (
            <span className="text-foreground dark:text-foreground-dark">{children}</span>
        );
    },
    code: ({ children }) => <code className="bg-muted dark:bg-muted-dark text-foreground dark:text-foreground-dark px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>,
    pre: ({ children }) => <pre className="bg-muted dark:bg-muted-dark text-foreground dark:text-foreground-dark p-4 rounded-lg overflow-x-auto mb-3 text-xs">{children}</pre>,
    hr: () => <hr className="border-border dark:border-border-dark my-5" />,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-border dark:border-border-dark pl-4 italic text-muted-foreground dark:text-muted-foreground-dark my-3">{children}</blockquote>,
    img: ({ src, alt }) => <img src={src} alt={alt} className="max-w-md max-h-64 h-auto mx-auto block rounded-lg my-3" />,
};

function Blog() {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const cookiePolicy = useCookiePolicy();
    const mainContentRef = useRef(null);

    // Extract slug from URL path (e.g., /blog/my-post -> my-post)
    const pathParts = location.pathname.split('/');
    const slug = pathParts.length > 2 ? pathParts[2] : null;

    // Select latest post by default, or the one matching the slug
    const selectedPost = slug
        ? posts.find(p => p.slug === slug)
        : posts[0];

    // Set document title based on selected post
    useDocumentTitle(selectedPost?.title || 'Blog');

    // Redirect to latest post if no slug is provided
    useEffect(() => {
        if (!slug && posts.length > 0) {
            navigate(`/blog/${posts[0].slug}`, { replace: true });
        }
    }, [slug, navigate]);

    // Scroll to top and manage focus when post changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Focus main content for screen reader users
        mainContentRef.current?.focus();
    }, [slug]);



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
            <main ref={mainContentRef} id="main-content" tabIndex={-1} className="min-h-[calc(100vh-180px)] py-10 px-6 bg-muted dark:bg-muted-dark transition-colors duration-300 outline-none">
                <div className="max-w-7xl mx-auto">
                    {/* Toggle button for mobile sidebar */}
                    <div className="flex justify-end mb-6 lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                        >
                            <span className="material-symbols-outlined text-lg">
                                {sidebarOpen ? 'menu_open' : 'menu'}
                            </span>
                        </Button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 overflow-hidden">
                        {/* Sidebar - Post List - Collapsible */}
                        <aside
                            className={`transition-all duration-300 ease-in-out overflow-hidden shrink-0 lg:max-h-none lg:w-64 lg:opacity-100 ${sidebarOpen
                                ? 'max-h-[400px] opacity-100'
                                : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="w-full lg:w-64">
                                <h2 className="text-xs font-semibold text-muted-foreground dark:text-muted-foreground-dark uppercase tracking-wider mb-3">
                                    {t.blog?.posts || 'Posts'}
                                </h2>
                                <ScrollArea className="h-auto lg:h-[500px]">
                                    <nav className="space-y-2 pr-4">
                                        {posts.map((post) => (
                                            <button
                                                key={post.slug}
                                                onClick={() => handlePostClick(post.slug)}
                                                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${selectedPost?.slug === post.slug
                                                    ? 'bg-background dark:bg-background-dark border-l-4 border-foreground dark:border-foreground-dark'
                                                    : 'hover:bg-background dark:hover:bg-background-dark'
                                                    }`}
                                            >
                                                <h3 className={`font-medium text-xs ${selectedPost?.slug === post.slug
                                                    ? 'text-foreground dark:text-foreground-dark'
                                                    : 'text-muted-foreground dark:text-muted-foreground-dark'
                                                    }`}>
                                                    {post.title}
                                                </h3>
                                                <time className="text-xs text-muted-foreground dark:text-muted-foreground-dark">
                                                    {post.date}
                                                </time>
                                            </button>
                                        ))}
                                    </nav>
                                </ScrollArea>
                            </div>
                        </aside>

                        {/* Main Content - Post - Expands when sidebar is closed */}
                        <article className="flex-1 min-w-0 transition-all duration-300">
                            {selectedPost ? (
                                <Card className="p-0">
                                    <CardHeader className="p-6 pb-0">
                                        <header className="mb-5 pb-5 border-b border-border dark:border-border-dark">
                                            <h2 className="text-xl font-bold text-foreground dark:text-foreground-dark mb-1">
                                                {selectedPost.title}
                                            </h2>
                                            <time className="text-xs text-muted-foreground dark:text-muted-foreground-dark">
                                                {selectedPost.date}
                                            </time>
                                        </header>
                                    </CardHeader>
                                    <CardContent className="p-6 pt-0">
                                        <div className="max-w-none">
                                            <Markdown components={markdownComponents}>
                                                {selectedPost.content}
                                            </Markdown>
                                        </div>
                                        <div className="mt-6 pt-5 border-t border-border dark:border-border-dark">
                                            <ShareButtons
                                                title={selectedPost.title}
                                                url={typeof window !== 'undefined' ? window.location.href : ''}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="text-center p-6">
                                    <CardContent>
                                        <p className="text-muted-foreground dark:text-muted-foreground-dark text-sm">
                                            {t.blog?.noPostSelected || 'Select a post to read'}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </article>
                    </div>
                </div>
            </main>
            <Footer onOpenCookiePolicy={cookiePolicy.open} />
            <CookiePolicy isOpen={cookiePolicy.isOpen} onClose={cookiePolicy.close} />
        </>
    );
}

export default Blog;

