import { useState, useCallback, MouseEvent, RefObject } from 'react';
import { throttle } from 'src/utils/util';

type DraggableHook = {
  onMouseDown: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
  onMouseLeave: (e: MouseEvent) => void;
};

export const useDraggable = (
  scrollerRef: RefObject<HTMLElement>
): DraggableHook => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [totalX, setTotalX] = useState<number>(0);

  const preventUnexpectedEvents = useCallback( (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, []);

  const onDragStart = (e: MouseEvent) => {
    preventUnexpectedEvents(e)
    setIsDragging(true);
    const x = e.clientX;
    setStartX(x);
    if (scrollerRef.current && 'scrollLeft' in scrollerRef.current) {
      setTotalX(x + scrollerRef.current.scrollLeft);
    }
  };

  const onDragEnd = (e: MouseEvent) => {
    if (!isDragging) return;
    if (!scrollerRef.current) return;

    setIsDragging(false);

    const endX = e.clientX;
    const childNodes = [...(scrollerRef.current?.childNodes || [])];
    const dragDiff = Math.abs(startX - endX)

    // 지나치게 작은 범위 내로 드래그할 경우, 원래대로 클릭 이벤트가 동작하게끔 오차 범위 설정
    if (dragDiff > 10) {
      childNodes.forEach((child) => {
        child.addEventListener('click', preventUnexpectedEvents);
      });
    } else {
      childNodes.forEach((child) => {
        child.removeEventListener('click', preventUnexpectedEvents);
      });
    }
  };

  const onDragMove = (e: MouseEvent) => {
    if (!isDragging) return;
    throttle(function () {
      // 클릭 등 마우스 이동 외 다른 이벤트 실행되는 것 방지
      preventUnexpectedEvents(e);

      // 스크롤 포지션
      const scrollLeft = totalX - e.clientX;

      if (scrollerRef.current && 'scrollLeft' in scrollerRef.current) {
        // 스크롤 발생
        scrollerRef.current.scrollLeft = scrollLeft;
      }
    }, 100);
  };

  return {
    onMouseDown: onDragStart,
    onMouseMove: onDragMove,
    onMouseUp: onDragEnd,
    onMouseLeave: onDragEnd,
  };
};
