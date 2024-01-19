import { useState, useMemo, MouseEvent, MutableRefObject } from 'react';
import { throttle } from 'src/utils/util';

type DraggableHook = {
  onMouseDown: (e: MouseEvent) => void,
  onMouseMove: (e: MouseEvent) => void,
  onMouseUp: (e: MouseEvent) => void,
  onMouseLeave: (e: MouseEvent) => void
}

export const useDraggable = (scrollerRef: MutableRefObject<HTMLElement>): DraggableHook => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0)
  const [totalX, setTotalX] = useState<number>(0);

  const preventClick = useMemo(() => (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const onDragStart = (e: MouseEvent) => {
    setIsDragging(true);
    const x = e.clientX
    setStartX(x)
    if (scrollerRef.current && 'scrollLeft' in scrollerRef.current) {
      setTotalX(x + scrollerRef.current.scrollLeft);
    }
  };

  const onDragEnd = (e: MouseEvent) => {
    if (!isDragging) return;

    preventClick(e)
    setIsDragging(false);

    const endX = e.clientX;
    const childNodes = [...(scrollerRef.current?.childNodes || [])]

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
    throttle(function() {
      // 클릭 등 마우스 이동 외 다른 이벤트 실행되는 것 방지
      preventClick(e)

      // 스크롤 포지션
      const scrollLeft = totalX - e.clientX;

      if (scrollerRef.current && 'scrollLeft' in scrollerRef.current) {
        // 스크롤 발생
        scrollerRef.current.scrollLeft = scrollLeft;
      }
    }, 100)
  };

  return {
    onMouseDown: onDragStart,
    onMouseMove: onDragMove,
    onMouseUp: onDragEnd,
    onMouseLeave: onDragEnd,
  }
}