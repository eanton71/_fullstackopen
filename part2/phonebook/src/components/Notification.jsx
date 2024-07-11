const Notification = ({ sucess, error }) => {
  
  if (sucess) {
     return <div className="sucess">{sucess}</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
 
};
export default Notification;