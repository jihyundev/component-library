export const Form = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      title: { value: input },
      country: { value: select },
      description: { value: textArea },
      size: { value: radio },
      terms: { checked: checkbox },
    } = event.target;
    alert(
      JSON.stringify({
        input,
        select,
        textArea,
        radio,
        checkbox,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        제목
        <input name="title" defaultValue="" />
      </label>

      <label>
        국가
        <select name="country" defaultValue="한국">
          <option>한국</option>
          <option>미국</option>
          <option>중국</option>
          <option>영국</option>
          <option>태국</option>
        </select>
      </label>

      <label>
        내용
        <textarea name="description" defaultValue="안녕하세요?" />
      </label>

      <fieldset>
        <legend>크기</legend>
        <label>
          <input type="radio" name="size" value="소" />소
        </label>
        <label>
          <input type="radio" name="size" value="중" defaultChecked />중
        </label>
        <label>
          <input type="radio" name="size" value="대" />대
        </label>
      </fieldset>

      <label>
        <input type="checkbox" name="terms" />
        약관에 동의합니다.
      </label>

      <button type="submit">제출</button>
    </form>
  );
}