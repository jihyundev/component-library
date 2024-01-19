import { ReactNode, CSSProperties, useRef } from 'react';
import styled from '@emotion/styled';
import { useDraggable } from 'src/hooks/useDraggable';

type Props = {
  children: ReactNode;
  maxWidth?: number;
  style?: CSSProperties;
};

type DivStyleProps = {
  maxWidth?: number;
};

const Container = styled.div<DivStyleProps>`
  display: flex;
  overflow: scroll;
  max-width: ${(props) => props.maxWidth && props.maxWidth};
`;

export const DraggableScroller = ({ children, maxWidth, style }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>();
  const events = useDraggable(containerRef)

  return (
    <>
      <Container
        maxWidth={maxWidth}
        style={style}
        ref={containerRef}
        {...events}
      >
        {children}
      </Container>
    </>
  );
};
