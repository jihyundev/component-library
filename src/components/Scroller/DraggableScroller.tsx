import { ReactNode, MouseEvent, CSSProperties, useRef, useState } from 'react';
import styled from '@emotion/styled';

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
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);

  const onDragStart = (e: MouseEvent) => {
    setIsDragging(true);
    if (containerRef.current) {
      setStartX(e.pageX + containerRef.current.scrollLeft);
    }
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onDragMove = (e: MouseEvent) => {
    if (!isDragging) return;

    // 이동해야 할 x축 거리
    const deltaX = startX - e.pageX;

    if (containerRef.current) {
      // 스크롤 발생
      containerRef.current.scrollLeft = deltaX;
    }
  };

  return (
    <>
      <Container
        maxWidth={maxWidth}
        style={style}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={containerRef}
      >
        {children}
      </Container>
    </>
  );
};
