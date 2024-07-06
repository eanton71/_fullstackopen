const Filter = ({label , value, handle }) => {
    return (
      <>
        {label}
            <input value={value} onChange={handle} />
            <br/>
      </>
    );
}
export default Filter;
