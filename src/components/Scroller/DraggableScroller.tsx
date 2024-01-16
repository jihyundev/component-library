import { ReactNode, MouseEvent, CSSProperties, useRef, useState, useMemo } from 'react';
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
  const containerRef = useRef<HTMLDivElement | null>();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0)
  const [totalX, setTotalX] = useState<number>(0);

  // addEventListener, removeEventListener 가 동일한 함수 인스턴스를 참조하도록 메모이제이션 추가
  const preventClick = useMemo(() => (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const onDragStart = (e: MouseEvent) => {
    setIsDragging(true);
    const x = e.clientX
    setStartX(x)
    if (containerRef.current && 'scrollLeft' in containerRef.current) {
      setTotalX(x + containerRef.current.scrollLeft);
    }
  };

  const onDragEnd = (e: MouseEvent) => {
    if (!isDragging) return;

    preventClick(e)
    setIsDragging(false);

    const endX = e.clientX;
    const childNodes = [...(containerRef.current?.childNodes || [])]

    if (startX !== endX) {
      childNodes.forEach((child) => {
        child.addEventListener("click", preventClick);
      })
    } else {
      childNodes.forEach((child) => {
        child.removeEventListener("click", preventClick);
      })
    }
  };

  const onDragMove = (e: MouseEvent) => {
    if (!isDragging) return;

    // 클릭 등 마우스 이동 외 다른 이벤트 실행되는 것 방지
    preventClick(e)

    // 스크롤 포지션
    const scrollLeft = totalX - e.clientX;

    if (containerRef.current && 'scrollLeft' in containerRef.current) {
      // 스크롤 발생
      containerRef.current.scrollLeft = scrollLeft;
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
