import React from 'react';
import styled from 'styled-components';
import SkeletonBase from './SkeletonBase';

const RectContainer = styled.div`
  display: inline-block;
  width: 100%;
`;

const RectSkeleton = styled(SkeletonBase)`
  display: block;
  
  /* Aspect ratio support */
  ${props => props.aspectRatio && `
    aspect-ratio: ${props.aspectRatio};
    height: auto;
  `}

  /* Preset dimensions based on variant */
  ${props => props.variant === 'card' && !props.width && !props.height && `
    width: 100%;
    height: 12rem;
  `}

  ${props => props.variant === 'banner' && !props.width && !props.height && `
    width: 100%;
    height: 8rem;
  `}

  ${props => props.variant === 'thumbnail' && !props.width && !props.height && `
    width: 6rem;
    height: 6rem;
  `}

  ${props => props.variant === 'button' && !props.width && !props.height && `
    width: 8rem;
    height: 2.5rem;
  `}

  ${props => props.variant === 'input' && !props.width && !props.height && `
    width: 100%;
    height: 2.5rem;
  `}

  ${props => props.variant === 'badge' && !props.width && !props.height && `
    width: 4rem;
    height: 1.5rem;
  `}

  ${props => props.variant === 'chip' && !props.width && !props.height && `
    width: 6rem;
    height: 2rem;
    border-radius: 1rem;
  `}

  /* Responsive adjustments */
  @media (max-width: 768px) {
    ${props => props.variant === 'card' && `
      height: 10rem;
    `}
    
    ${props => props.variant === 'banner' && `
      height: 6rem;
    `}
  }

  @media (max-width: 480px) {
    ${props => props.variant === 'card' && `
      height: 8rem;
    `}
    
    ${props => props.variant === 'banner' && `
      height: 5rem;
    `}
    
    ${props => props.variant === 'thumbnail' && `
      width: 4rem;
      height: 4rem;
    `}
  }
`;

const SkeletonRect = ({
  width,
  height,
  aspectRatio,
  variant = 'default', // default, card, banner, thumbnail, button, input, badge, chip
  borderRadius = '4px',
  animation = 'shimmer',
  speed = 1.5,
  backgroundColor,
  highlightColor,
  className,
  style,
  ariaLabel,
  responsive = true,
  ...props
}) => {
  // Variant-specific configurations
  const variantConfig = {
    default: {
      ariaLabel: ariaLabel || 'Loading content',
      borderRadius: borderRadius
    },
    card: {
      ariaLabel: ariaLabel || 'Loading card',
      borderRadius: '8px'
    },
    banner: {
      ariaLabel: ariaLabel || 'Loading banner',
      borderRadius: '6px'
    },
    thumbnail: {
      ariaLabel: ariaLabel || 'Loading thumbnail',
      borderRadius: '4px'
    },
    button: {
      ariaLabel: ariaLabel || 'Loading button',
      borderRadius: '6px'
    },
    input: {
      ariaLabel: ariaLabel || 'Loading input field',
      borderRadius: '4px'
    },
    badge: {
      ariaLabel: ariaLabel || 'Loading badge',
      borderRadius: '12px'
    },
    chip: {
      ariaLabel: ariaLabel || 'Loading chip',
      borderRadius: '16px'
    }
  };

  const config = variantConfig[variant] || variantConfig.default;
  const finalBorderRadius = borderRadius || config.borderRadius;

  return (
    <RectContainer className={className} style={style}>
      <RectSkeleton
        width={width}
        height={height}
        aspectRatio={aspectRatio}
        variant={variant}
        borderRadius={finalBorderRadius}
        animation={animation}
        speed={speed}
        backgroundColor={backgroundColor}
        highlightColor={highlightColor}
        ariaLabel={config.ariaLabel}
        {...props}
      />
    </RectContainer>
  );
};

// Preset components for common use cases
export const SkeletonCard = ({ aspectRatio = '16/9', ...props }) => (
  <SkeletonRect variant="card" aspectRatio={aspectRatio} {...props} />
);

export const SkeletonBanner = ({ aspectRatio = '3/1', ...props }) => (
  <SkeletonRect variant="banner" aspectRatio={aspectRatio} {...props} />
);

export const SkeletonThumbnail = ({ aspectRatio = '1/1', ...props }) => (
  <SkeletonRect variant="thumbnail" aspectRatio={aspectRatio} {...props} />
);

export const SkeletonButton = ({ ...props }) => (
  <SkeletonRect variant="button" {...props} />
);

export const SkeletonInput = ({ ...props }) => (
  <SkeletonRect variant="input" {...props} />
);

export const SkeletonBadge = ({ ...props }) => (
  <SkeletonRect variant="badge" {...props} />
);

export const SkeletonChip = ({ ...props }) => (
  <SkeletonRect variant="chip" {...props} />
);

export default SkeletonRect;