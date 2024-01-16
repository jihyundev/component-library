import { DraggableScroller } from 'src/components/Scroller';

function Item({ content }: { content: string }) {
  const onClickButton = () => {
    window.alert('i clicked item!')
  };

  return (
    <button
      style={{
        minWidth: '80px',
        height: '100px',
        backgroundColor: 'skyblue',
        color: 'white',
        border: 'none',
      }}
      onClick={onClickButton}
    >
      {content}
    </button>
  );
}

const MOCK_LIST = [
  'Hi1',
  'Hi2',
  'Hi3',
  'Hi4',
  'Hi5',
  'Hi6',
  'Hi7',
  'Hi8',
  'Hi9',
  'Hi10',
];

export function ScrollerExample() {

  return (
    <>
      <div style={{ marginLeft: '50px' }}>
        <DraggableScroller style={{ gap: '10px', width: '500px' }}>
          {MOCK_LIST.map((item) => (
            <Item content={item} key={item} />
          ))}
        </DraggableScroller>
      </div>
    </>
  );
}