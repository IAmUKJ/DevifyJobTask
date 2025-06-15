import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

// Keyframe animations
const shimmerAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const pulseAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const waveAnimation = keyframes`
  0%, 60%, 100% {
    transform: initial;
  }
  30% {
    transform: scaleY(0.8);
  }
`;

const breatheAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const glowAnimation = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
  }
`;

const StyledSkeleton = styled.div`
  display: inline-block;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '1rem'};
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => props.borderRadius || '4px'};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  /* Responsive */
  @media (max-width: 768px) {
    width: ${props => props.mobileWidth || props.width || '100%'};
    height: ${props => props.mobileHeight || props.height || '1rem'};
  }

  @media (max-width: 480px) {
    width: ${props =>
      props.smallMobileWidth ||
      props.mobileWidth ||
      props.width ||
      '100%'};
    height: ${props =>
      props.smallMobileHeight ||
      props.mobileHeight ||
      props.height ||
      '1rem'};
  }

  /* Animations */
  ${props =>
    props.animation === 'shimmer' &&
    css`
      background: linear-gradient(
        90deg,
        ${props.backgroundColor} 25%,
        ${props.highlightColor} 50%,
        ${props.backgroundColor} 75%
      );
      background-size: 200px 100%;
      animation: ${shimmerAnimation} ${props.speed || 1.5}s infinite linear;
    `}

  ${props =>
    props.animation === 'pulse' &&
    css`
      animation: ${pulseAnimation} ${props.speed || 1.5}s infinite ease-in-out;
    `}

  ${props =>
    props.animation === 'wave' &&
    css`
      animation: ${waveAnimation} ${props.speed || 1.5}s infinite ease-in-out;
    `}

  ${props =>
    props.animation === 'breathe' &&
    css`
      animation: ${breatheAnimation} ${props.speed || 1.5}s infinite ease-in-out;
    `}

  ${props =>
    props.animation === 'glow' &&
    css`
      animation: ${glowAnimation} ${props.speed || 1.5}s infinite ease-in-out;
    `}

  /* Accessibility */
  &:focus {
    outline: 2px solid ${props => props.highlightColor};
    outline-offset: 2px;
  }

  /* Custom styles if any */
  ${props => props.customStyles}
`;

const SkeletonBase = ({
  width,
  height,
  animation = 'shimmer',
  speed = 1.5,
  backgroundColor,
  highlightColor,
  borderRadius,
  className,
  style,
  customStyles,
  ariaLabel = 'Loading content',
  tabIndex = -1,
  mobileWidth,
  mobileHeight,
  smallMobileWidth,
  smallMobileHeight,
  testId,
  ...props
}) => {
  const { themeConfig } = useTheme();

  const finalBackgroundColor = backgroundColor || themeConfig.backgroundColor || '#e0e0e0';
  const finalHighlightColor = highlightColor || themeConfig.highlightColor || '#f5f5f5';

  return (
    <StyledSkeleton
      width={width}
      height={height}
      backgroundColor={finalBackgroundColor}
      highlightColor={finalHighlightColor}
      animation={animation}
      speed={speed}
      borderRadius={borderRadius}
      className={className}
      style={style}
      customStyles={customStyles}
      mobileWidth={mobileWidth}
      mobileHeight={mobileHeight}
      smallMobileWidth={smallMobileWidth}
      smallMobileHeight={smallMobileHeight}
      role="progressbar"
      aria-label={ariaLabel}
      aria-busy="true"
      tabIndex={tabIndex}
      data-testid={testId}
      {...props}
    />
  );
};

export default SkeletonBase;