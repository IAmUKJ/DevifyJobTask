import React from 'react';
import styled from 'styled-components';
import SkeletonBase from './SkeletonBase';

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap || '0.5rem'};
  width: 100%;
`;

const TextLine = styled(SkeletonBase)`
  height: ${props => props.lineHeight || '1rem'};
  width: ${props => props.lineWidth || '100%'};
`;

const SkeletonText = ({
  lines = 1,
  gap = '0.5rem',
  lineHeight = '1rem',
  lastLineWidth = '60%',
  firstLineWidth = '100%',
  randomWidths = false,
  animation = 'shimmer',
  speed = 1.5,
  backgroundColor,
  highlightColor,
  className,
  style,
  ariaLabel,
  variant = 'paragraph', // paragraph, heading, caption
  fontSize = 'medium', // small, medium, large
  ...props
}) => {
  // Predefined line configurations based on variant
  const variantConfig = {
    paragraph: {
      lines: lines || 3,
      lineHeight: '1rem',
      gap: '0.5rem'
    },
    heading: {
      lines: lines || 1,
      lineHeight: '2rem',
      gap: '0.75rem'
    },
    caption: {
      lines: lines || 2,
      lineHeight: '0.75rem',
      gap: '0.25rem'
    }
  };

  const config = variantConfig[variant] || variantConfig.paragraph;
  const actualLines = lines || config.lines;
  const actualLineHeight = lineHeight || config.lineHeight;
  const actualGap = gap || config.gap;

  // Generate line widths
  const generateLineWidths = () => {
    const widths = [];
    for (let i = 0; i < actualLines; i++) {
      if (randomWidths) {
        // Generate random widths between 60% and 100%
        widths.push(`${Math.floor(Math.random() * 40) + 60}%`);
      } else if (i === 0) {
        widths.push(firstLineWidth);
      } else if (i === actualLines - 1 && actualLines > 1) {
        widths.push(lastLineWidth);
      } else {
        widths.push('100%');
      }
    }
    return widths;
  };

  const lineWidths = generateLineWidths();

  // Adjust dimensions based on font size
  const sizeMultiplier = {
    small: 0.75,
    medium: 1,
    large: 1.25
  };

  const multiplier = sizeMultiplier[fontSize] || 1;
  const adjustedLineHeight = `${parseFloat(actualLineHeight) * multiplier}rem`;
  const adjustedGap = `${parseFloat(actualGap) * multiplier}rem`;

  if (actualLines === 1) {
    return (
      <TextLine
        width={lineWidths[0]}
        lineHeight={adjustedLineHeight}
        animation={animation}
        speed={speed}
        backgroundColor={backgroundColor}
        highlightColor={highlightColor}
        className={className}
        style={style}
        ariaLabel={ariaLabel || `Loading ${variant} text`}
        {...props}
      />
    );
  }

  return (
    <TextContainer
      gap={adjustedGap}
      className={className}
      style={style}
      role="group"
      aria-label={ariaLabel || `Loading ${variant} with ${actualLines} lines`}
    >
      {Array.from({ length: actualLines }, (_, index) => (
        <TextLine
          key={index}
          lineWidth={lineWidths[index]}
          lineHeight={adjustedLineHeight}
          animation={animation}
          speed={speed + (index * 0.1)} // Slight speed variation for organic feel
          backgroundColor={backgroundColor}
          highlightColor={highlightColor}
          ariaLabel={`Loading line ${index + 1} of ${actualLines}`}
          {...props}
        />
      ))}
    </TextContainer>
  );
};

// Preset components for common use cases
export const SkeletonHeading = (props) => (
  <SkeletonText variant="heading" {...props} />
);

export const SkeletonParagraph = (props) => (
  <SkeletonText variant="paragraph" {...props} />
);

export const SkeletonCaption = (props) => (
  <SkeletonText variant="caption" {...props} />
);

export default SkeletonText;