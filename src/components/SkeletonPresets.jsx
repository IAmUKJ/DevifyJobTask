import React from 'react';
import styled from 'styled-components';
import SkeletonWrapper from './SkeletonWrapper';
import SkeletonText from './SkeletonText';
import SkeletonCircle from './SkeletonCircle';
import SkeletonRect from './SkeletonRect';

const PresetContainer = styled.div`
  width: 100%;
  padding: ${props => props.padding || '1rem'};
  border: ${props => props.showBorder ? '1px solid #e0e0e0' : 'none'};
  border-radius: ${props => props.borderRadius || '8px'};
  background-color: ${props => props.backgroundColor || 'transparent'};
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: ${props => props.alignItems || 'flex-start'};
  gap: ${props => props.gap || '1rem'};
  flex-direction: ${props => props.direction || 'row'};
  
  @media (max-width: 768px) {
    flex-direction: ${props => props.mobileDirection || props.direction || 'column'};
    gap: ${props => props.mobileGap || props.gap || '0.75rem'};
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(auto-fit, minmax(250px, 1fr))'};
  gap: ${props => props.gap || '1rem'};
  
  @media (max-width: 768px) {
    grid-template-columns: ${props => props.mobileColumns || '1fr'};
  }
`;

// Media Card Skeleton (image + content)
export const SkeletonMediaCard = ({
  showImage = true,
  imageAspectRatio = '16/9',
  showAvatar = false,
  titleLines = 1,
  descriptionLines = 2,
  showMeta = true,
  animation = 'shimmer',
  speed = 1.5,
  ...props
}) => (
  <PresetContainer {...props}>
    {showImage && (
      <SkeletonRect
        variant="card"
        aspectRatio={imageAspectRatio}
        animation={animation}
        speed={speed}
        style={{ marginBottom: '1rem' }}
      />
    )}
    <div>
      {showAvatar && (
        <FlexContainer gap="0.75rem" style={{ marginBottom: '0.75rem' }}>
          <SkeletonCircle size="sm" animation={animation} speed={speed} />
          <SkeletonText lines={1} animation={animation} speed={speed} style={{ flex: 1 }} />
        </FlexContainer>
      )}
      <SkeletonText
        variant="heading"
        lines={titleLines}
        animation={animation}
        speed={speed}
        style={{ marginBottom: '0.5rem' }}
      />
      <SkeletonText
        lines={descriptionLines}
        animation={animation}
        speed={speed}
        lastLineWidth="70%"
        style={{ marginBottom: showMeta ? '0.75rem' : 0 }}
      />
      {showMeta && (
        <FlexContainer gap="0.5rem">
          <SkeletonRect variant="badge" animation={animation} speed={speed} />
          <SkeletonText lines={1} width="4rem" animation={animation} speed={speed} />
        </FlexContainer>
      )}
    </div>
  </PresetContainer>
);

// User Profile Card Skeleton
export const SkeletonProfileCard = ({
  size = 'md',
  showBanner = false,
  showBadge = true,
  showStats = true,
  showBio = true,
  animation = 'shimmer',
  speed = 1.5,
  ...props
}) => (
  <PresetContainer {...props}>
    {showBanner && (
      <SkeletonRect
        variant="banner"
        aspectRatio="3/1"
        animation={animation}
        speed={speed}
        style={{ marginBottom: '1rem' }}
      />
    )}
    <FlexContainer direction="column" alignItems="center" gap="0.75rem">
      <SkeletonCircle
        size={size}
        showBadge={showBadge}
        animation={animation}
        speed={speed}
      />
      <div style={{ textAlign: 'center', width: '100%' }}>
        <SkeletonText
          variant="heading"
          lines={1}
          width="60%"
          animation={animation}
          speed={speed}
          style={{ marginBottom: '0.5rem' }}
        />
        <SkeletonText
          lines={1}
          width="40%"
          animation={animation}
          speed={speed}
          style={{ marginBottom: showBio ? '1rem' : (showStats ? '1rem' : 0) }}
        />
        {showBio && (
          <SkeletonText
            lines={2}
            animation={animation}
            speed={speed}
            lastLineWidth="80%"
            style={{ marginBottom: showStats ? '1rem' : 0 }}
          />
        )}
        {showStats && (
          <FlexContainer justifyContent="center" gap="2rem">
            {[1, 2, 3].map(i => (
              <div key={i} style={{ textAlign: 'center' }}>
                <SkeletonText lines={1} width="3rem" animation={animation} speed={speed} />
                <SkeletonText
                  lines={1}
                  width="4rem"
                  animation={animation}
                  speed={speed}
                  style={{ marginTop: '0.25rem' }}
                />
              </div>
            ))}
          </FlexContainer>
        )}
      </div>
    </FlexContainer>
  </PresetContainer>
);

// Article/Blog Post Skeleton
export const SkeletonArticle = ({
  showAuthor = true,
  showFeaturedImage = true,
  showMeta = true,
  paragraphs = 3,
  animation = 'shimmer',
  speed = 1.5,
  ...props
}) => (
  <PresetContainer {...props}>
    {showAuthor && (
      <FlexContainer gap="0.75rem" style={{ marginBottom: '1.5rem' }}>
        <SkeletonCircle size="sm" animation={animation} speed={speed} />
        <div style={{ flex: 1 }}>
          <SkeletonText lines={1} width="30%" animation={animation} speed={speed} />
          <SkeletonText
            lines={1}
            width="20%"
            animation={animation}
            speed={speed}
            style={{ marginTop: '0.25rem' }}
          />
        </div>
      </FlexContainer>
    )}
    
    <SkeletonText
      variant="heading"
      fontSize="large"
      lines={2}
      animation={animation}
      speed={speed}
      lastLineWidth="80%"
      style={{ marginBottom: '1rem' }}
    />
    
    {showMeta && (
      <FlexContainer gap="1rem" style={{ marginBottom: '1.5rem' }}>
        <SkeletonText lines={1} width="6rem" animation={animation} speed={speed} />
        <SkeletonRect variant="badge" animation={animation} speed={speed} />
        <SkeletonRect variant="badge" animation={animation} speed={speed} />
      </FlexContainer>
    )}
    
    {showFeaturedImage && (
      <SkeletonRect
        variant="banner"
        aspectRatio="2/1"
        animation={animation}
        speed={speed}
        style={{ marginBottom: '2rem' }}
      />
    )}
    
    {Array.from({ length: paragraphs }, (_, i) => (
      <SkeletonText
        key={i}
        lines={Math.floor(Math.random() * 3) + 2}
        animation={animation}
        speed={speed}
        randomWidths
        style={{ marginBottom: '1.5rem' }}
      />
    ))}
  </PresetContainer>
);

// Table Row Skeleton
export const SkeletonTableRow = ({
  columns = 4,
  showAvatar = false,
  showActions = true,
  animation = 'shimmer',
  speed = 1.5,
  ...props
}) => (
  <FlexContainer
    alignItems="center"
    gap="1rem"
    style={{
      padding: '1rem',
      borderBottom: '1px solid #f0f0f0',
      ...props.style
    }}
    {...props}
  >
    {showAvatar && <SkeletonCircle size="sm" animation={animation} speed={speed} />}
    {Array.from({ length: columns }, (_, i) => (
      <div key={i} style={{ flex: i === 0 ? 2 : 1 }}>
        <SkeletonText
          lines={1}
          animation={animation}
          speed={speed}
          width={i === columns - 1 ? '60%' : '100%'}
        />
      </div>
    ))}
    {showActions && (
      <FlexContainer gap="0.5rem">
        <SkeletonRect variant="button" width="2rem" height="2rem" animation={animation} speed={speed} />
        <SkeletonRect variant="button" width="2rem" height="2rem" animation={animation} speed={speed} />
      </FlexContainer>
    )}
  </FlexContainer>
);

// Comment Skeleton
export const SkeletonComment = ({
  showReplies = false,
  replyCount = 2,
  showActions = true,
  animation = 'shimmer',
  speed = 1.5,
  ...props
}) => (
  <div {...props}>
    <FlexContainer gap="0.75rem" alignItems="flex-start">
      <SkeletonCircle size="sm" animation={animation} speed={speed} />
      <div style={{ flex: 1 }}>
        <FlexContainer gap="0.5rem" style={{ marginBottom: '0.5rem' }}>
          <SkeletonText lines={1} width="8rem" animation={animation} speed={speed} />
          <SkeletonText lines={1} width="4rem" animation={animation} speed={speed} />
        </FlexContainer>
        <SkeletonText
          lines={2}
          animation={animation}
          speed={speed}
          randomWidths
          style={{ marginBottom: showActions ? '0.75rem' : 0 }}
        />
        {showActions && (
          <FlexContainer gap="1rem">
            <SkeletonText lines={1} width="3rem" animation={animation} speed={speed} />
            <SkeletonText lines={1} width="3rem" animation={animation} speed={speed} />
            <SkeletonText lines={1} width="4rem" animation={animation} speed={speed} />
          </FlexContainer>
        )}
      </div>
    </FlexContainer>
    
    {showReplies && (
      <div style={{ marginLeft: '3rem', marginTop: '1rem' }}>
        {Array.from({ length: replyCount }, (_, i) => (
          <SkeletonComment
            key={i}
            showReplies={false}
            animation={animation}
            speed={speed}
            style={{ marginBottom: i < replyCount - 1 ? '1rem' : 0 }}
          />
        ))}
      </div>
    )}
  </div>
);

// Grid Layout Skeleton
export const SkeletonGrid = ({
  items = 6,
  columns = 'repeat(auto-fit, minmax(250px, 1fr))',
  mobileColumns = '1fr',
  ItemComponent = SkeletonMediaCard,
  animation = 'shimmer',
  speed = 1.5,
  ...props
}) => (
  <GridContainer
    columns={columns}
    mobileColumns={mobileColumns}
    {...props}
  >
    {Array.from({ length: items }, (_, i) => (
      <ItemComponent
        key={i}
        animation={animation}
        speed={speed}
        showBorder
        style={{ animationDelay: `${i * 100}ms` }}
      />
    ))}
  </GridContainer>
);

// List Layout Skeleton
export const SkeletonList = ({
  items = 5,
  ItemComponent = SkeletonMediaCard,
  animation = 'shimmer',
  speed = 1.5,
  gap = '1rem',
  ...props
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }} {...props}>
    {Array.from({ length: items }, (_, i) => (
      <ItemComponent
        key={i}
        animation={animation}
        speed={speed}
        showBorder
        style={{ animationDelay: `${i * 100}ms` }}
      />
    ))}
  </div>
);