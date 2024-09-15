export function generateId() {
  // Get the current date and time
  const now = new Date();

  // Format the datetime as a string (YYYYMMDDHHMMSS)
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");
  const millisecond = String(now.getMilliseconds()).padStart(3, "0");

  // Combine all parts to form the datetime string
  const datetimeStr = `${year}${month}${day}${hour}${minute}${second}${millisecond}`;

  // Optionally, add a random number to the end for extra uniqueness
  const randomNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  // Combine the datetime string and the random number
  const uniqueId = `${datetimeStr}${randomNumber}`;

  return uniqueId;
}
