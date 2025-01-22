import { useState } from "react";
export interface CallT{
  id: string;
  initiator_id: string;
  receiver_id: string;
  channel_name: string;
  call_type: string;
  status: string;
  ended_at?: Date;
  started_at?: Date;
  expiration_duration: number;
  allocated_dyt_token: number;
  token?: string
}

export interface ResponseT{
  message: string;
  status_code: number;
  data: CallT
}


function CallInitiator() {
  const [receiverId, setReceiverId] = useState("");

  const initiateCall = async () => {
    const token = localStorage.getItem("access_token");
    console.log("token: ", token)
    
      
    fetch(`https://api.bondyt.com/api/v1/calls/${"01944a4b-bf33-71da-9f65-5638fb16b700"}/start`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        receiver_id: "01944a4b-bf33-71da-9f65-5638fb16b700", 
        call_type: 'video'
      }),
    }).then((response: Response): Promise<ResponseT> => {
      const data = response.json();
      console.log("data: ", data);
      return data;
           
    })
    .then((data: ResponseT) => {
      alert(`Call started! Channel: ${data.data.channel_name}`);
      window.location.href = `/call/${data.data.channel_name}`;
    })
    .catch((error) => {
      console.error('Error initializing calls: ', error);
    })
  }

  return (
    <div>
      <h2>Initiate Call</h2>
      <input
        type="text"
        placeholder="Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
      <button onClick={initiateCall}>Start Call</button>
    </div>
  );
}

export default CallInitiator;
