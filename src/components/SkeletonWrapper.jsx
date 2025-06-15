import React from 'react';
import styled from 'styled-components';

const WrapperContainer = styled.div`
  display: ${props => props.display || 'block'};
  width: 100%;
  opacity: ${props => props.loading ? 1 : 0};
  transform: ${props => props.loading ? 'scale(1)' : 'scale(0.95)'};
  transition: all 0.3s ease-in-out;
  pointer-events: ${props => props.loading ? 'none' : 'auto'};
  
  /* Fade transition */
  ${props => props.fadeOut && !props.loading && `
    opacity: 0;
    visibility: hidden;
  `}

  /* Spacing between skeleton elements */
  & > * + * {
    margin-top: ${props => props.gap || '0.5rem'};
  }

  /* Grid layout support */
  ${props => props.layout === 'grid' && `
    display: grid;
    grid-template-columns: ${props.gridColumns || 'repeat(auto-fit, minmax(200px, 1fr))'};
    gap: ${props.gap || '1rem'};
    
    & > * + * {
      margin-top: 0;
    }
  `}

  /* Flex layout support */
  ${props => props.layout === 'flex' && `
    display: flex;
    flex-direction: ${props.flexDirection || 'row'};
    align-items: ${props.alignItems || 'stretch'};
    justify-content: ${props.justifyContent || 'flex-start'};
    gap: ${props.gap || '0.5rem'};
    flex-wrap: ${props.flexWrap || 'nowrap'};
    
    & > * + * {
      margin-top: 0;
    }
  `}

  /* Responsive adjustments */
  @media (max-width: 768px) {
    ${props => props.layout === 'grid' && `
      grid-template-columns: ${props.mobileGridColumns || '1fr'};
    `}
    
    ${props => props.layout === 'flex' && props.flexDirection === 'row' && `
      flex-direction: ${props.mobileFlexDirection || 'column'};
    `}
  }
`;

const ContentContainer = styled.div`
  opacity: ${props => props.loading ? 0 : 1};
  transform: ${props => props.loading ? 'scale(0.95)' : 'scale(1)'};
  transition: all 0.3s ease-in-out;
  pointer-events: ${props => props.loading ? 'none' : 'auto'};
  
  ${props => props.loading && `
    position: absolute;
    visibility: hidden;
  `}
`;

const SkeletonWrapper = ({
  loading = false,
  children,
  skeleton,
  fallback,
  layout = 'block', // block, flex, grid
  gap = '0.5rem',
  display,
  fadeOut = true,
  className,
  style,
  ariaLabel,
  // Grid specific props
  gridColumns,
  mobileGridColumns,
  // Flex specific props
  flexDirection = 'row',
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  flexWrap = 'nowrap',
  mobileFlexDirection,
  // Animation props
  staggerDelay = 0,
  animateChildren = false,
  ...props
}) => {
  // Stagger animation for children
  const childrenWithStagger = React.Children.map(skeleton || children, (child, index) => {
    if (!animateChildren || !React.isValidElement(child)) return child;
    
    return React.cloneElement(child, {
      style: {
        ...child.props.style,
        animationDelay: `${staggerDelay * index}ms`
      }
    });
  });

  if (loading) {
    return (
      <WrapperContainer
        loading={loading}
        layout={layout}
        gap={gap}
        display={display}
        fadeOut={fadeOut}
        gridColumns={gridColumns}
        mobileGridColumns={mobileGridColumns}
        flexDirection={flexDirection}
        alignItems={alignItems}
        justifyContent={justifyContent}
        flexWrap={flexWrap}
        mobileFlexDirection={mobileFlexDirection}
        className={className}
        style={style}
        role="status"
        aria-label={ariaLabel || 'Loading content'}
        aria-live="polite"
        {...props}
      >
        {animateChildren ? childrenWithStagger : (skeleton || children)}
      </WrapperContainer>
    );
  }

  return (
    <ContentContainer
      loading={loading}
      className={className}
      style={style}
      {...props}
    >
      {fallback || children}
    </ContentContainer>
  );
};

// Higher-order component for easier integration
export const withSkeleton = (WrappedComponent, skeletonConfig = {}) => {
  return React.forwardRef((props, ref) => {
    const { loading, skeleton, ...restProps } = props;
    
    return (
      <SkeletonWrapper
        loading={loading}
        skeleton={skeleton}
        {...skeletonConfig}
      >
        <WrappedComponent ref={ref} {...restProps} />
      </SkeletonWrapper>
    );
  });
};

export default SkeletonWrapper;