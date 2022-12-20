import service from "../utils/request";

export function getData(data: any) {
  return service("/api", {
    method: "post",
    responseType: "json",
    data: JSON.stringify({
      message: '给女朋友写封信'
    })
  });
}