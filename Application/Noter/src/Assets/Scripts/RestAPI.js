import ExtractData from "./ExtractData";

// Version: 1.0
class RestAPI {
   constructor() {}

   StatusCode = {
      OK: "OK",
      ERROR: "ERROR",
      CANCELLED: "CANCELLED",
   };

   async ReadData(url, pathToData, callback) {
      setTimeout(() => {
         console.log("inside");
         fetch(url)
            .then((res) => {
               const code = res.status;
               console.warn("res code: " + code);
               //console.warn(res.url);
               if (!res.ok) {
                  let message = res.body
                  throw Error(message);
               }
               return res.json();
            })
             .then((data) => {
                 const status = data.status;
                 console.log(`responce status: ${status}`);
                 if (status !== "success") throw Error(data);
               if (data && pathToData) {
                  data = ExtractData(data, pathToData);
               }

               callback(data, this.StatusCode.OK, null);
            })
            .catch((err) => {
               if (err.name === "AbortError") {
                  console.log("fetch aborted");
                  callback(null, this.StatusCode.CANCELLED, "fetch aborted");
               } else {
                  callback(null, this.StatusCode.ERROR, err.message);
               }
            });
      }, 1000);
      console.log("outside");
   }
   async WriteData(url, data, callback, method = "POST") {
      console.log(url);
      console.log(JSON.stringify(data));
      setTimeout(() => {
         fetch(url, {
            method: method,
            headers: {
               "Content-Type": "application/json",
            },
             body: method === "DELETE" ? null : JSON.stringify(data),
         })
            .then((res) => {
               // if (!res.ok) {
               //    throw Error("could not fetch the data for this resource");
                // }
                if (res.status === 204) {
                    console.log("no content");
                    callback(null, this.StatusCode.OK, null);
                    return null;
                }

               return res.json();
            })
             .then((data) => {
                 console.log(data);
                 if (!data) return null;

                 const status = data.status;
                 console.log(`responce status: ${status}`);
                 if (status !== "success") throw Error(data);
               callback(data, this.StatusCode.OK, null);
            })
             .catch((err) => {
               if (err.name === "AbortError") {
                  console.log("fetch aborted");
                  callback(null, this.StatusCode.CANCELLED, "fetch aborted");
               } else {
                  callback(null, this.StatusCode.ERROR, err.message);
               }
            });
      }, 1000);
   }

    async DeleteData(url, callback) {
      this.WriteData(url, null, callback, "DELETE");
    }

   async UpdateData(url, data, callback) {
      this.WriteData(url, data, callback, "PATCH");
   }
   async PostData(url, data, callback) {
      this.WriteData(url, data, callback, "POST");
   }

}

export default RestAPI;