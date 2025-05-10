import axios from "axios"

export async function getAuthToken(): Promise<any> {
  const request = {
    email: "loejstarc@gmail.com",
    name: "joel velerian crasta",
    rollNo: "4so22cs067",
    accessCode: "KjJAxP",
    clientID: "99c28d58-283b-40c4-9d7c-83a2c2420c86",
    clientSecret: "tSzCnSGPVREWTeKD",
  }

  const url = "http://20.244.56.144/evaluation-service/auth"

  const response = await axios.post(url, request)

  return response.data.access_token
}
