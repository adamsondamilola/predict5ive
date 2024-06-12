const time = new Date().getHours();
let greeting;
if (time < 12) {
    greeting = "Good Morning";
} else if (time < 16) {
    greeting = "Good Afternoon";
} else {
    greeting = "Good Evening";
}

const greet = greeting;

export default {
    greet
}