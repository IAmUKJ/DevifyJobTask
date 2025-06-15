import React from 'react';
import styled from 'styled-components';
import SkeletonBase from './SkeletonBase';

const CircleContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CircleSkeleton = styled(SkeletonBase)`
  border-radius: 50%;
  flex-shrink: 0;
  
  /* Size variants */
  ${props => props.size === 'xs' && `
    width: 1.5rem;
    height: 1.5rem;
  `}
  
  ${props => props.size === 'sm' && `
    width: 2rem;
    height: 2rem;
  `}
  
  ${props => props.size === 'md' && `
    width: 2.5rem;
    height: 2.5rem;
  `}
  
  ${props => props.size === 'lg' && `
    width: 3.5rem;
    height: 3.5rem;
  `}
  
  ${props => props.size === 'xl' && `
    width: 5rem;
    height: 5rem;
  `}

  ${props => props.size === '2xl' && `
    width: 6rem;
    height: 6rem;
  `}

  /* Badge/Status indicator */
  ${props => props.showBadge && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 25%;
      height: 25%;
      background-color: ${props.badgeColor || '#10B981'};
      border-radius: 50%;
      border: 2px solid ${props.backgroundColor};
      animation: ${props.animation === 'pulse' ? 'pulse 2s infinite' : 'none'};
    }
  `}
`;

const SkeletonCircle = ({
  size = 'md',
  diameter,
  showBadge = false,
  badgeColor = '#10B981',
  animation = 'shimmer',
  speed = 1.5,
  backgroundColor,
  highlightColor,
  className,
  style,
  ariaLabel,
  variant = 'avatar', // avatar, icon, button, dot
  ...props
}) => {
  // Custom diameter overrides size
  let finalWidth, finalHeight;
  
  if (diameter) {
    finalWidth = finalHeight = diameter;
  } else {
    // Use size-based dimensions (handled by styled component)
    finalWidth = finalHeight = undefined;
  }

  // Variant-specific configurations
  const variantConfig = {
    avatar: {
      ariaLabel: ariaLabel || 'Loading profile picture',
      showBadge: showBadge
    },
    icon: {
      ariaLabel: ariaLabel || 'Loading icon',
      showBadge: false
    },
    button: {
      ariaLabel: ariaLabel || 'Loading button',
      showBadge: false
    },
    dot: {
      ariaLabel: ariaLabel || 'Loading indicator',
      showBadge: false,
      size: 'xs'
    }
  };

  const config = variantConfig[variant] || variantConfig.avatar;
  const finalSize = variant === 'dot' ? 'xs' : size;

  return (
    <CircleContainer className={className} style={style}>
      <CircleSkeleton
        width={finalWidth}
        height={finalHeight}
        size={finalSize}
        animation={animation}
        speed={speed}
        backgroundColor={backgroundColor}
        highlightColor={highlightColor}
        showBadge={config.showBadge}
        badgeColor={badgeColor}
        ariaLabel={config.ariaLabel}
        borderRadius="50%"
        {...props}
      />
    </CircleContainer>
  );
};

// Preset components for common use cases
export const SkeletonAvatar = ({ size = 'md', showBadge = false, ...props }) => (
  <SkeletonCircle variant="avatar" size={size} showBadge={showBadge} {...props} />
);

export const SkeletonIcon = ({ size = 'sm', ...props }) => (
  <SkeletonCircle variant="icon" size={size} {...props} />
);

export const SkeletonDot = ({ ...props }) => (
  <SkeletonCircle variant="dot" {...props} />
);

export const SkeletonButton = ({ size = 'md', ...props }) => (
  <SkeletonCircle variant="button" size={size} {...props} />
);

export default SkeletonCircle;