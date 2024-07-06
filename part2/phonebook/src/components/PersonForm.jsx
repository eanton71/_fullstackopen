import Filter from "./Filter";
const PersonForm = ({ add, val1, handle1, val2, handle2 }) => {
  return (
    <form onSubmit={add}>
      <Filter label={"name:"} value={val1} handle={handle1} />
      <Filter label={"number:"} value={val2} handle={handle2} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
