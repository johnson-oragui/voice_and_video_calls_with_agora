
function CallReceiver({ callDetails }) {
  const acceptCall = async () => {

      const token = localStorage.getItem("access_token");
      fetch(`/api/v1/calls/accept/${callDetails.call_id}`,{
        headers: {Authorization: `Bearer ${token}`},
      }).then((res: Response) => res.json()).then((data) =>{
        console.log(data);
        alert("Call accepted!");
        window.location.href = `/call/${data.data.channel_name}`;
      }
        
      ).catch((error) => {
        console.error(error.response?.data || error.message);
      })
      

  };

  return (
    <div>
      <h2>Incoming Call</h2>
      <button onClick={acceptCall}>Accept Call</button>
    </div>
  );
}

export default CallReceiver;
