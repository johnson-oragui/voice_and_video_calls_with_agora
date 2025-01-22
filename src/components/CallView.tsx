import { ReactHTMLElement, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

function CallView({ channelName }) {
  useEffect(() => {
    const initAgora = async () => {
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      const token = localStorage.getItem("access_token");

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          const remoteContainer = document.getElementById("remote-container");
          const player = user.videoTrack.createPlayer();
          player.play(remoteContainer);
        }
      });

      await client.join("APP_ID", channelName, token, null);
      const localTrack = await AgoraRTC.createCameraVideoTrack();
      localTrack.play("local-container");
      await client.publish([localTrack]);
    };

    initAgora();
  }, [channelName]);

  return (
    <div>
      <h2>Ongoing Call</h2>
      <div id="local-container"></div>
      <div id="remote-container"></div>
    </div>
  );
}

export default CallView;
