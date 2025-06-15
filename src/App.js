import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// Core Components

import { default as SkeletonBase } from './components/SkeletonBase';
import { default as SkeletonText, SkeletonHeading, SkeletonParagraph, SkeletonCaption } from './components/SkeletonText';
import { default as SkeletonCircle, SkeletonAvatar, SkeletonIcon, SkeletonDot, SkeletonButton as SkeletonCircleButton } from './components/SkeletonCircle';
import { default as SkeletonRect, SkeletonCard, SkeletonBanner, SkeletonThumbnail, SkeletonButton, SkeletonInput, SkeletonBadge, SkeletonChip } from './components/SkeletonRect';
import { default as SkeletonWrapper, withSkeleton } from './components/SkeletonWrapper';

// Preset Components
import {
  SkeletonMediaCard,
  SkeletonProfileCard,
  SkeletonArticle,
  SkeletonTableRow,
  SkeletonComment,
  SkeletonGrid,
  SkeletonList
} from './components/SkeletonPresets';

// Theme Context
import { ThemeProvider, useTheme } from './context/ThemeContext';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  transition: all 0.3s ease;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Navigation = styled.nav`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f8f9fa'};
  padding: 1rem 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#444' : '#e0e0e0'};
  flex-wrap: wrap;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? '#667eea' : 'transparent'};
  color: ${props => props.active ? 'white' : 'inherit'};
  border: 1px solid ${props => props.active ? '#667eea' : '#ccc'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#5a6fd8' : '#f0f0f0'};
  }
`;

const ThemeButton = styled(Button)`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border: none;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ControlPanel = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const LoadingToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  input {
    width: 18px;
    height: 18px;
  }
`;

const ContentSection = styled.section`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
`;

const DemoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const DemoItem = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#e0e0e0'};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AnimationControl = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin: 1rem 0;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
`;

const ComponentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ComponentDemo = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#e0e0e0'};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const AppContent = () => {
  const { theme, toggleTheme, setCustomTheme } = useTheme();
  const [activeDemo, setActiveDemo] = useState('cards');
  const [isLoading, setIsLoading] = useState(true);
  const [animation, setAnimation] = useState('shimmer');
  const [speed, setSpeed] = useState(1.5);

  // Auto-toggle loading state for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(prev => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const demos = {
    cards: 'Media Cards',
    profiles: 'Profile Cards', 
    articles: 'Articles',
    tables: 'Table Rows',
    comments: 'Comments',
    components: 'Individual Components'
  };

  const sampleData = {
    mediaCard: {
      title: "Amazing Nature Photography",
      description: "Discover the breathtaking beauty of nature through stunning photographs from around the world.",
      author: "John Photographer",
      date: "2 hours ago",
      tags: ["Nature", "Photography"]
    },
    profile: {
      name: "Sarah Johnson",
      username: "@sarahj_design",
      bio: "UI/UX Designer passionate about creating beautiful and functional digital experiences.",
      followers: "12.5K",
      following: "892",
      posts: "324"
    },
    article: {
      title: "The Future of Web Development: Trends to Watch in 2024",
      author: "Tech Writer",
      date: "March 15, 2024",
      readTime: "8 min read",
      content: "Web development continues to evolve at a rapid pace..."
    }
  };

  const renderDemo = () => {
    switch (activeDemo) {
      case 'cards':
        return (
          <DemoGrid>
            {[1, 2, 3, 4].map(i => (
              <SkeletonWrapper key={i} loading={isLoading}>
                <DemoItem theme={theme}>
                  <img 
                    src={`https://picsum.photos/300/200?random=${i}`} 
                    alt="Demo" 
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }}
                  />
                  <h3>{sampleData.mediaCard.title}</h3>
                  <p>{sampleData.mediaCard.description}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <span style={{ background: '#667eea', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                      {sampleData.mediaCard.tags[0]}
                    </span>
                    <span>{sampleData.mediaCard.date}</span>
                  </div>
                </DemoItem>
                <SkeletonMediaCard animation={animation} speed={speed} showBorder />
              </SkeletonWrapper>
            ))}
          </DemoGrid>
        );

      case 'profiles':
        return (
          <DemoGrid>
            {[1, 2, 3].map(i => (
              <SkeletonWrapper key={i} loading={isLoading}>
                <DemoItem theme={theme} style={{ textAlign: 'center' }}>
                  <img 
                    src={`https://i.pravatar.cc/100?img=${i}`} 
                    alt="Profile" 
                    style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '1rem' }}
                  />
                  <h3>{sampleData.profile.name}</h3>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>{sampleData.profile.username}</p>
                  <p style={{ marginBottom: '1rem' }}>{sampleData.profile.bio}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div><strong>{sampleData.profile.posts}</strong><br/>Posts</div>
                    <div><strong>{sampleData.profile.followers}</strong><br/>Followers</div>
                    <div><strong>{sampleData.profile.following}</strong><br/>Following</div>
                  </div>
                </DemoItem>
                <SkeletonProfileCard animation={animation} speed={speed} showBorder />
              </SkeletonWrapper>
            ))}
          </DemoGrid>
        );

      case 'articles':
        return (
          <div>
            <SkeletonWrapper loading={isLoading}>
              <DemoItem theme={theme}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <img 
                    src="https://i.pravatar.cc/40?img=5" 
                    alt="Author" 
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                  <div>
                    <div><strong>{sampleData.article.author}</strong></div>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>{sampleData.article.date}</div>
                  </div>
                </div>
                <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>{sampleData.article.title}</h1>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', color: '#666' }}>
                  <span>{sampleData.article.readTime}</span>
                  <span>Technology</span>
                  <span>Development</span>
                </div>
                <img 
                  src="https://picsum.photos/800/400?random=article" 
                  alt="Article" 
                  style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '2rem' }}
                />
                <div style={{ lineHeight: '1.6' }}>
                  <p>Web development continues to evolve at a rapid pace, with new technologies and methodologies emerging regularly. In this comprehensive guide, we'll explore the key trends that are shaping the future of web development.</p>
                  <p>From the rise of AI-powered development tools to the increasing importance of web performance optimization, developers need to stay ahead of the curve to remain competitive in today's market.</p>
                  <p>Let's dive into the most significant trends that will define web development in the coming years and how you can prepare for these changes.</p>
                </div>
              </DemoItem>
              <SkeletonArticle animation={animation} speed={speed} showBorder />
            </SkeletonWrapper>
          </div>
        );

      case 'tables':
        return (
          <div>
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
              {[1, 2, 3, 4, 5].map(i => (
                <SkeletonWrapper key={i} loading={isLoading}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '1rem', 
                    borderBottom: i < 5 ? '1px solid #f0f0f0' : 'none',
                    gap: '1rem'
                  }}>
                    <img 
                      src={`https://i.pravatar.cc/40?img=${i + 10}`} 
                      alt="User" 
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                    <div style={{ flex: 2 }}><strong>User Name {i}</strong></div>
                    <div style={{ flex: 3 }}>user{i}@example.com</div>
                    <div style={{ flex: 1 }}>Admin</div>
                    <div style={{ flex: 1 }}>Active</div>
                    <div style={{ flex: 1 }}>
                      <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
                        Edit
                      </button>
                    </div>
                  </div>
                  <SkeletonTableRow animation={animation} speed={speed} />
                </SkeletonWrapper>
              ))}
            </div>
          </div>
        );

      case 'comments':
        return (
          <div>
            {[1, 2, 3, 4].map(i => (
              <SkeletonWrapper key={i} loading={isLoading}>
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  padding: '1.5rem', 
                  borderBottom: '1px solid #f0f0f0',
                  backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff'
                }}>
                  <img 
                    src={`https://i.pravatar.cc/50?img=${i + 15}`} 
                    alt="Commenter" 
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <strong>Commenter {i}</strong>
                      <span style={{ color: '#666', fontSize: '0.9rem' }}>{i} hours ago</span>
                    </div>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.5' }}>
                      This is a sample comment to demonstrate how the skeleton component looks when loading. 
                      It includes multiple lines of text to show the realistic loading state.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#666' }}>
                      <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>👍 Like</button>
                      <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>💬 Reply</button>
                      <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>🔗 Share</button>
                    </div>
                  </div>
                </div>
                <SkeletonComment animation={animation} speed={speed} />
              </SkeletonWrapper>
            ))}
          </div>
        );

      case 'components':
        return (
          <div>
            <ComponentGrid>
              <ComponentDemo theme={theme}>
                <h4>Text Skeleton</h4>
                <SkeletonWrapper loading={isLoading}>
                  <div>
                    <p>This is sample text content that will be replaced by skeleton when loading.</p>
                    <p>Multiple lines of text to demonstrate the text skeleton component.</p>
                  </div>
                  <SkeletonText lines={3} animation={animation} speed={speed} />
                </SkeletonWrapper>
              </ComponentDemo>

              <ComponentDemo theme={theme}>
                <h4>Circle Skeleton</h4>
                <SkeletonWrapper loading={isLoading}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src="https://i.pravatar.cc/60?img=20" alt="Avatar" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
                    <div>Avatar Content</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <SkeletonCircle size={60} animation={animation} speed={speed} />
                    <SkeletonText lines={1} animation={animation} speed={speed} />
                  </div>
                </SkeletonWrapper>
              </ComponentDemo>

              <ComponentDemo theme={theme}>
                <h4>Rectangle Skeleton</h4>
                <SkeletonWrapper loading={isLoading}>
                  <div>
                    <img src="https://picsum.photos/200/120?random=comp" alt="Content" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
                  </div>
                  <SkeletonRect width="100%" height={120} animation={animation} speed={speed} />
                </SkeletonWrapper>
              </ComponentDemo>

              <ComponentDemo theme={theme}>
                <h4>Button Skeleton</h4>
                <SkeletonWrapper loading={isLoading}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ padding: '0.5rem 1rem', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px' }}>
                      Primary Button
                    </button>
                    <button style={{ padding: '0.5rem 1rem', backgroundColor: 'transparent', border: '1px solid #ccc', borderRadius: '4px' }}>
                      Secondary
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <SkeletonButton animation={animation} speed={speed} />
                    <SkeletonButton animation={animation} speed={speed} />
                  </div>
                </SkeletonWrapper>
              </ComponentDemo>

              <ComponentDemo theme={theme}>
                <h4>Input Skeleton</h4>
                <SkeletonWrapper loading={isLoading}>
                  <div>
                    <input type="text" placeholder="Enter your name" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '0.5rem' }} />
                    <input type="email" placeholder="Enter your email" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <SkeletonInput animation={animation} speed={speed} style={{ marginBottom: '0.5rem' }} />
                    <SkeletonInput animation={animation} speed={speed} />
                  </div>
                </SkeletonWrapper>
              </ComponentDemo>

              <ComponentDemo theme={theme}>
                <h4>Grid Skeleton</h4>
                <SkeletonWrapper loading={isLoading}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '4px', textAlign: 'center' }}>
                        Item {i}
                      </div>
                    ))}
                  </div>
                  <SkeletonGrid columns={2} rows={2} animation={animation} speed={speed} />
                </SkeletonWrapper>
              </ComponentDemo>
            </ComponentGrid>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppContainer theme={theme}>
      <Header>
        <h1>React Skeleton UI Demo</h1>
        <p>Beautiful, customizable skeleton loading components for React applications</p>
      </Header>

      <Navigation theme={theme}>
        <NavButtons>
          {Object.entries(demos).map(([key, label]) => (
            <Button
              key={key}
              active={activeDemo === key}
              onClick={() => setActiveDemo(key)}
            >
              {label}
            </Button>
          ))}
        </NavButtons>

        <ControlPanel>
          <LoadingToggle>
            <input
              type="checkbox"
              checked={isLoading}
              onChange={(e) => setIsLoading(e.target.checked)}
            />
            Loading State
          </LoadingToggle>

          <AnimationControl>
            <label>Animation:</label>
            <Select value={animation} onChange={(e) => setAnimation(e.target.value)} theme={theme}>
              <option value="shimmer">Shimmer</option>
              <option value="pulse">Pulse</option>
              <option value="wave">Wave</option>
            </Select>
          </AnimationControl>

          <AnimationControl>
            <label>Speed:</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={1 / speed}
                onChange={(e) => setSpeed(1 / parseFloat(e.target.value))}
                style={{ width: '100px' }}
              />
              {(1 / speed).toFixed(1)}x
            </label>
          </AnimationControl>
            
          <ThemeButton onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'} Toggle Theme
          </ThemeButton>
        </ControlPanel>
      </Navigation>

      <ContentSection>
        <SectionTitle theme={theme}>
          {demos[activeDemo]} Demo
        </SectionTitle>
        {renderDemo()}
      </ContentSection>
    </AppContainer>
  );
};

// Main App component with Theme Provider
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;