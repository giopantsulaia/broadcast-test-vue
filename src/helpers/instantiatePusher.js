import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default function instantiatePusher() {
  window.Pusher = Pusher;
  window.Echo = new Echo({
    authEndpoint: `${import.meta.env.VITE_API_BASE_URL}broadcasting/auth`,
    broadcaster: "pusher",
    key: "5636ab9b33ce486e3b72",
    forceTLS: true,
    cluster: ["eu"],
    auth: {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    },
  });

  return true;
}
